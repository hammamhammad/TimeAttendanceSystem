using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Daily job with two responsibilities:
/// 1. Send alert notifications for contracts expiring within the tenant-configured windows
///    (<see cref="Domain.Company.CompanySettings.ContractExpiryAlertDaysCsv"/>, default "30,15,7").
/// 2. v13.5: for contracts whose <c>EndDate &lt;= today</c> and <c>Status == Active</c>, publish a
///    <see cref="ContractExpiredEvent"/> so the lifecycle handler applies the tenant-configured
///    <c>ContractExpiredAction</c> (NotifyOnly / AutoMarkExpired / Suspend / Deactivate).
///
/// The type name stays <c>ContractExpiryAlertJob</c> for scheduler + log-filter compatibility.
/// </summary>
public class ContractExpiryAlertJob : IInvocable
{
    private static readonly int[] DefaultAlertDays = { 30, 15, 7 };

    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILifecycleEventPublisher _lifecyclePublisher;
    private readonly ILogger<ContractExpiryAlertJob> _logger;

    public ContractExpiryAlertJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILifecycleEventPublisher lifecyclePublisher,
        ILogger<ContractExpiryAlertJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _lifecyclePublisher = lifecyclePublisher;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting contract lifecycle job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.CompanySettings.AsNoTracking().FirstOrDefaultAsync();
            var alertDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.ContractExpiryAlertDaysCsv, DefaultAlertDays);

            var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync();

            // 1. Pre-expiry alerts (unchanged from v13.x).
            if (hrUserIds.Count == 0)
            {
                _logger.LogWarning("No notification recipients resolved for contract expiry alerts");
            }
            else
            {
                foreach (var days in alertDays)
                {
                    var targetDate = today.AddDays(days);
                    var expiringContracts = await _context.EmployeeContracts
                        .Include(c => c.Employee)
                        .Where(c => c.Status == ContractStatus.Active
                            && c.EndDate != null
                            && c.EndDate.Value.Date == targetDate
                            && !c.IsDeleted)
                        .ToListAsync();

                    foreach (var contract in expiringContracts)
                    {
                        foreach (var userId in hrUserIds)
                        {
                            _context.Notifications.Add(new Notification
                            {
                                UserId = userId,
                                Type = NotificationType.ApprovalReminder,
                                TitleEn = $"Contract Expiring in {days} Days",
                                TitleAr = $"العقد ينتهي خلال {days} يوم",
                                MessageEn = $"Contract {contract.ContractNumber} for {contract.Employee.FullName} expires on {contract.EndDate:yyyy-MM-dd}.",
                                MessageAr = $"العقد {contract.ContractNumber} للموظف {contract.Employee.FullNameAr ?? contract.Employee.FullName} ينتهي في {contract.EndDate:yyyy-MM-dd}.",
                                EntityType = "EmployeeContract",
                                EntityId = contract.Id,
                                IsRead = false,
                                CreatedAtUtc = DateTime.UtcNow,
                                CreatedBy = "SYSTEM"
                            });
                        }
                    }

                    if (expiringContracts.Any())
                    {
                        _logger.LogInformation("Found {Count} contracts expiring in {Days} days", expiringContracts.Count, days);
                    }
                }
                await _context.SaveChangesAsync(default);
            }

            // 2. v13.5: contracts whose EndDate has passed → publish ContractExpiredEvent.
            // Filter to Active so already-Expired contracts don't re-fire. Handler dedupes via audit.
            var justExpired = await _context.EmployeeContracts
                .Where(c => c.Status == ContractStatus.Active
                    && c.EndDate != null
                    && c.EndDate.Value.Date <= today
                    && !c.IsDeleted)
                .Select(c => new { c.Id, c.EmployeeId })
                .ToListAsync();

            foreach (var c in justExpired)
            {
                await _lifecyclePublisher.PublishAsync(new ContractExpiredEvent(c.Id, c.EmployeeId));
            }

            if (justExpired.Any())
            {
                _logger.LogInformation("Published ContractExpiredEvent for {Count} contracts past EndDate", justExpired.Count);
            }

            _logger.LogInformation("Contract lifecycle job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running contract lifecycle job");
            throw;
        }
    }
}
