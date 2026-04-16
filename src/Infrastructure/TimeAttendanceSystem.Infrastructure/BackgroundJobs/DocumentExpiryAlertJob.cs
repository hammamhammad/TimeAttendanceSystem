using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for employee documents expiring within the tenant-configured
/// alert windows (<see cref="Domain.Tenants.TenantSettings.DocumentExpiryAlertDaysCsv"/>,
/// default "30,15,7") and notifies the resolved recipients (via
/// <see cref="INotificationRecipientResolver"/>).
/// </summary>
public class DocumentExpiryAlertJob : IInvocable
{
    private static readonly int[] DefaultAlertDays = { 30, 15, 7 };

    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<DocumentExpiryAlertJob> _logger;

    public DocumentExpiryAlertJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILogger<DocumentExpiryAlertJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting document expiry alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync();
            var alertDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.DocumentExpiryAlertDaysCsv, DefaultAlertDays);

            var recipientIds = await _recipientResolver.GetRecipientUserIdsAsync();
            if (recipientIds.Count == 0)
            {
                _logger.LogWarning("No notification recipients resolved for document expiry alerts");
                return;
            }

            foreach (var days in alertDays)
            {
                var targetDate = today.AddDays(days);
                var expiringDocs = await _context.EmployeeDocuments
                    .Include(d => d.Employee)
                    .Where(d => d.ExpiryDate != null
                        && d.ExpiryDate.Value.Date == targetDate
                        && d.VerificationStatus != DocumentVerificationStatus.Rejected
                        && !d.IsDeleted)
                    .ToListAsync();

                foreach (var doc in expiringDocs)
                {
                    foreach (var userId in recipientIds)
                    {
                        _context.Notifications.Add(new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Document Expiring in {days} Days",
                            TitleAr = $"مستند ينتهي خلال {days} يوم",
                            MessageEn = $"Document '{doc.DocumentName}' for {doc.Employee.FullName} expires on {doc.ExpiryDate:yyyy-MM-dd}.",
                            MessageAr = $"المستند '{doc.DocumentNameAr ?? doc.DocumentName}' للموظف {doc.Employee.FullNameAr ?? doc.Employee.FullName} ينتهي في {doc.ExpiryDate:yyyy-MM-dd}.",
                            EntityType = "EmployeeDocument",
                            EntityId = doc.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        });
                    }
                }

                if (expiringDocs.Any())
                    _logger.LogInformation("Found {Count} documents expiring in {Days} days", expiringDocs.Count, days);
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Document expiry alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running document expiry alert job");
            throw;
        }
    }
}
