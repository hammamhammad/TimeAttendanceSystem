using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for employee certifications expiring within their
/// configured RenewalReminderDays and creates notifications for the employee and HR users.
/// </summary>
public class CertificationExpiryAlertJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<CertificationExpiryAlertJob> _logger;

    public CertificationExpiryAlertJob(IApplicationDbContext context, ILogger<CertificationExpiryAlertJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting certification expiry alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            // Get HR user IDs to notify
            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HRManager" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

            // Find certifications that are active, have an expiry date, renewal is required,
            // and are within the renewal reminder window
            var expiringCerts = await _context.EmployeeCertifications
                .Include(c => c.Employee)
                .Where(c => c.Status == CertificationStatus.Active
                    && c.RenewalRequired
                    && c.ExpiryDate != null
                    && c.ExpiryDate.Value.Date >= today
                    && !c.IsDeleted)
                .ToListAsync();

            var notificationCount = 0;

            foreach (var cert in expiringCerts)
            {
                var reminderDays = cert.RenewalReminderDays ?? 30;
                var daysUntilExpiry = (cert.ExpiryDate!.Value.Date - today).Days;

                // Only notify if within the reminder window
                if (daysUntilExpiry > reminderDays) continue;

                // Only send reminders at key intervals: reminderDays, 15, 7, 1 day(s) before
                var alertDays = new[] { reminderDays, 15, 7, 1 };
                if (!alertDays.Contains(daysUntilExpiry)) continue;

                // Notify the employee (via their user link)
                var employeeUserLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.EmployeeId == cert.EmployeeId);

                if (employeeUserLink != null)
                {
                    var notification = new Notification
                    {
                        UserId = employeeUserLink.UserId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = $"Certification Expiring in {daysUntilExpiry} Day(s)",
                        TitleAr = $"الشهادة تنتهي خلال {daysUntilExpiry} يوم",
                        MessageEn = $"Your certification \"{cert.CertificationName}\" expires on {cert.ExpiryDate:yyyy-MM-dd}. Please arrange renewal.",
                        MessageAr = $"شهادتك \"{cert.CertificationNameAr ?? cert.CertificationName}\" تنتهي في {cert.ExpiryDate:yyyy-MM-dd}. يرجى ترتيب التجديد.",
                        EntityType = "EmployeeCertification",
                        EntityId = cert.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(notification);
                    notificationCount++;
                }

                // Notify HR users
                foreach (var hrUserId in hrUserIds)
                {
                    var hrNotification = new Notification
                    {
                        UserId = hrUserId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = $"Employee Certification Expiring in {daysUntilExpiry} Day(s)",
                        TitleAr = $"شهادة الموظف تنتهي خلال {daysUntilExpiry} يوم",
                        MessageEn = $"Certification \"{cert.CertificationName}\" for {cert.Employee.FullName} expires on {cert.ExpiryDate:yyyy-MM-dd}.",
                        MessageAr = $"شهادة \"{cert.CertificationNameAr ?? cert.CertificationName}\" للموظف {cert.Employee.FullNameAr ?? cert.Employee.FullName} تنتهي في {cert.ExpiryDate:yyyy-MM-dd}.",
                        EntityType = "EmployeeCertification",
                        EntityId = cert.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(hrNotification);
                    notificationCount++;
                }
            }

            if (notificationCount > 0)
            {
                await _context.SaveChangesAsync(default);
                _logger.LogInformation("Created {Count} certification expiry notifications", notificationCount);
            }

            _logger.LogInformation("Certification expiry alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running certification expiry alert job");
            throw;
        }
    }
}
