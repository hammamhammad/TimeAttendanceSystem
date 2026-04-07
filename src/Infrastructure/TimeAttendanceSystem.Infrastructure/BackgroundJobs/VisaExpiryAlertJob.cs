using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for employee visas expiring within 90, 60, 30, 15, or 7 days
/// and creates notifications for HR users to take action.
/// </summary>
public class VisaExpiryAlertJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<VisaExpiryAlertJob> _logger;

    public VisaExpiryAlertJob(IApplicationDbContext context, ILogger<VisaExpiryAlertJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting visa expiry alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var alertDays = new[] { 90, 60, 30, 15, 7 };

            // Get HR user IDs to notify
            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HRManager" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

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
