using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for employee contracts expiring within 30, 15, or 7 days
/// and creates notifications for HR users to take action.
/// </summary>
public class ContractExpiryAlertJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<ContractExpiryAlertJob> _logger;

    public ContractExpiryAlertJob(IApplicationDbContext context, ILogger<ContractExpiryAlertJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting contract expiry alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var alertDays = new[] { 30, 15, 7 };

            // Get HR user IDs to notify
            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HRManager" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

            if (!hrUserIds.Any())
            {
                _logger.LogWarning("No HR users found to send contract expiry alerts");
                return;
            }

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
                        var notification = new Notification
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
                        };
                        _context.Notifications.Add(notification);
                    }
                }

                if (expiringContracts.Any())
                {
                    _logger.LogInformation("Found {Count} contracts expiring in {Days} days", expiringContracts.Count, days);
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Contract expiry alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running contract expiry alert job");
            throw;
        }
    }
}
