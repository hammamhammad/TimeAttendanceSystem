using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for Performance Improvement Plans (PIPs) that have reached their end date.
/// Sends a notification to the manager so they can manually complete or extend the PIP.
/// Does NOT auto-close the PIP -- the manager must take action.
/// Runs daily at 6:00 AM.
/// </summary>
public class PIPExpiryCheckJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<PIPExpiryCheckJob> _logger;

    public PIPExpiryCheckJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILogger<PIPExpiryCheckJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting PIP expiry check job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            // Find active PIPs that have reached or passed their end date
            var expiredPips = await _context.PerformanceImprovementPlans
                .Include(p => p.Employee)
                .Include(p => p.ManagerEmployee)
                .Where(p => p.Status == PipStatus.Active
                    && p.EndDate.Date <= today
                    && !p.IsDeleted)
                .ToListAsync();

            if (!expiredPips.Any())
            {
                _logger.LogInformation("No expired PIPs found");
                return;
            }

            _logger.LogInformation("Found {Count} PIPs that have reached their end date", expiredPips.Count);

            foreach (var pip in expiredPips)
            {
                var employeeName = pip.Employee.FullName;
                var employeeNameAr = pip.Employee.FullNameAr ?? employeeName;

                // Find user ID for the manager employee
                var managerUserIds = await _context.EmployeeUserLinks
                    .Where(eul => eul.EmployeeId == pip.ManagerEmployeeId)
                    .Select(eul => eul.UserId)
                    .ToListAsync();

                foreach (var userId in managerUserIds)
                {
                    var notification = new Notification
                    {
                        UserId = userId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = "PIP End Date Reached",
                        TitleAr = "انتهاء فترة خطة تحسين الأداء",
                        MessageEn = $"The Performance Improvement Plan for {employeeName} has reached its end date ({pip.EndDate:yyyy-MM-dd}). Please review the plan and record the outcome.",
                        MessageAr = $"خطة تحسين الأداء للموظف {employeeNameAr} وصلت إلى تاريخ الانتهاء ({pip.EndDate:yyyy-MM-dd}). يرجى مراجعة الخطة وتسجيل النتيجة.",
                        EntityType = "PerformanceImprovementPlan",
                        EntityId = pip.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(notification);
                }

                var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync();

                foreach (var hrUserId in hrUserIds)
                {
                    // Avoid duplicate notifications if the manager is also HR
                    if (managerUserIds.Contains(hrUserId))
                        continue;

                    var notification = new Notification
                    {
                        UserId = hrUserId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = "PIP End Date Reached",
                        TitleAr = "انتهاء فترة خطة تحسين الأداء",
                        MessageEn = $"The Performance Improvement Plan for {employeeName} has reached its end date ({pip.EndDate:yyyy-MM-dd}). Manager action is required.",
                        MessageAr = $"خطة تحسين الأداء للموظف {employeeNameAr} وصلت إلى تاريخ الانتهاء ({pip.EndDate:yyyy-MM-dd}). مطلوب إجراء من المدير.",
                        EntityType = "PerformanceImprovementPlan",
                        EntityId = pip.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(notification);
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("PIP expiry check job completed. Processed {Count} expired PIPs", expiredPips.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running PIP expiry check job");
            throw;
        }
    }
}
