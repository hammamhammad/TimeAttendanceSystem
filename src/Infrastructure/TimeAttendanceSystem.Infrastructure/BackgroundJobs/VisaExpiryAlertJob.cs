using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for employee visas expiring within the tenant-configured alert
/// windows (<see cref="Domain.Tenants.TenantSettings.VisaExpiryAlertDaysCsv"/>,
/// default "90,60,30,15,7") and creates notifications for HR users to take action.
/// </summary>
public class VisaExpiryAlertJob : IInvocable
{
    private static readonly int[] DefaultAlertDays = { 90, 60, 30, 15, 7 };

    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<VisaExpiryAlertJob> _logger;

    public VisaExpiryAlertJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILogger<VisaExpiryAlertJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting visa expiry alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync();
            var alertDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.VisaExpiryAlertDaysCsv, DefaultAlertDays);

            var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync();

            if (!hrUserIds.Any())
            {
                _logger.LogWarning("No HR users found to send visa expiry alerts");
                return;
            }

            foreach (var days in alertDays)
            {
                var targetDate = today.AddDays(days);
                var expiringVisas = await _context.EmployeeVisas
                    .Include(v => v.Employee)
                    .Where(v => v.Status == VisaStatus.Active
                        && v.ExpiryDate.Date == targetDate
                        && !v.IsDeleted)
                    .ToListAsync();

                foreach (var visa in expiringVisas)
                {
                    foreach (var userId in hrUserIds)
                    {
                        var notification = new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Visa Expiring in {days} Days",
                            TitleAr = $"التأشيرة تنتهي خلال {days} يوم",
                            MessageEn = $"Visa {visa.VisaNumber ?? visa.VisaType.ToString()} for {visa.Employee.FullName} expires on {visa.ExpiryDate:yyyy-MM-dd}.",
                            MessageAr = $"تأشيرة {visa.VisaNumber ?? visa.VisaType.ToString()} للموظف {visa.Employee.FullNameAr ?? visa.Employee.FullName} تنتهي في {visa.ExpiryDate:yyyy-MM-dd}.",
                            EntityType = "EmployeeVisa",
                            EntityId = visa.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };
                        _context.Notifications.Add(notification);
                    }
                }

                if (expiringVisas.Any())
                {
                    _logger.LogInformation("Found {Count} visas expiring in {Days} days", expiringVisas.Count, days);
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Visa expiry alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running visa expiry alert job");
            throw;
        }
    }
}
