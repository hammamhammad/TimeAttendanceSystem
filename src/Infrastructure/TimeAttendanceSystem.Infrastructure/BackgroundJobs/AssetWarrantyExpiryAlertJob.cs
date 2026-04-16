using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for assets with warranty expiring within 30 days
/// and creates notifications for HR users.
/// </summary>
public class AssetWarrantyExpiryAlertJob : IInvocable
{
    private static readonly int[] DefaultAlertDays = { 30, 15, 7, 1 };

    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<AssetWarrantyExpiryAlertJob> _logger;

    public AssetWarrantyExpiryAlertJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILogger<AssetWarrantyExpiryAlertJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting asset warranty expiry alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync();
            var alertDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.AssetWarrantyExpiryAlertDaysCsv, DefaultAlertDays);

            // Recipients via resolver; pass "Admin" as extra role so legacy behavior is preserved
            // for tenants still relying on it. Admin can later remove it from the tenant CSV.
            var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync(new[] { "Admin" });

            // Find active assets with warranty expiring soon (next X days where X = max alert window).
            var maxAlertDays = alertDays.DefaultIfEmpty(30).Max();
            var horizon = today.AddDays(maxAlertDays);

            var expiringAssets = await _context.Assets
                .Include(a => a.Category)
                .Include(a => a.Branch)
                .Where(a => a.IsActive
                    && !a.IsDeleted
                    && a.WarrantyExpiryDate != null
                    && a.WarrantyExpiryDate.Value.Date >= today
                    && a.WarrantyExpiryDate.Value.Date <= horizon
                    && a.Status != AssetStatus.Disposed
                    && a.Status != AssetStatus.Retired)
                .ToListAsync();

            var notificationCount = 0;

            foreach (var asset in expiringAssets)
            {
                var daysUntilExpiry = (asset.WarrantyExpiryDate!.Value.Date - today).Days;

                // Only send reminders at key intervals
                if (!alertDays.Contains(daysUntilExpiry)) continue;

                // Notify HR users
                foreach (var hrUserId in hrUserIds)
                {
                    var notification = new Notification
                    {
                        UserId = hrUserId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = $"Asset Warranty Expiring in {daysUntilExpiry} Day(s)",
                        TitleAr = $"ضمان الأصل ينتهي خلال {daysUntilExpiry} يوم",
                        MessageEn = $"Warranty for asset \"{asset.Name}\" (Tag: {asset.AssetTag}) at {asset.Branch.Name} expires on {asset.WarrantyExpiryDate:yyyy-MM-dd}.",
                        MessageAr = $"ضمان الأصل \"{asset.NameAr ?? asset.Name}\" (رقم: {asset.AssetTag}) في {asset.Branch.Name} ينتهي في {asset.WarrantyExpiryDate:yyyy-MM-dd}.",
                        EntityType = "Asset",
                        EntityId = asset.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(notification);
                    notificationCount++;
                }
            }

            if (notificationCount > 0)
            {
                await _context.SaveChangesAsync(default);
                _logger.LogInformation("Created {Count} asset warranty expiry notifications", notificationCount);
            }

            _logger.LogInformation("Asset warranty expiry alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running asset warranty expiry alert job");
            throw;
        }
    }
}
