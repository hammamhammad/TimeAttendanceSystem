using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that sends reminder notifications for upcoming performance review deadlines.
/// Checks for self-assessment and manager assessment deadlines within 7, 3, and 1 days.
/// Runs daily at 7:00 AM.
/// </summary>
public class ReviewCycleReminderJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<ReviewCycleReminderJob> _logger;

    public ReviewCycleReminderJob(IApplicationDbContext context, ILogger<ReviewCycleReminderJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    private static readonly int[] DefaultReminderDays = { 7, 3, 1 };

    public async Task Invoke()
    {
        _logger.LogInformation("Starting review cycle reminder job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync();
            var reminderDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.ReviewReminderDaysCsv, DefaultReminderDays);

            int selfAssessmentReminders = 0;
            int managerReviewReminders = 0;

            foreach (var days in reminderDays)
            {
                var targetDate = today.AddDays(days);

                // Self-assessment reminders: reviews pending self-assessment with deadline approaching
                var selfAssessmentReviews = await _context.PerformanceReviews
                    .Include(r => r.Employee)
                    .Include(r => r.ReviewCycle)
                    .Where(r => r.Status == ReviewStatus.SelfAssessmentPending
                        && r.ReviewCycle.SelfAssessmentDeadline != null
                        && r.ReviewCycle.SelfAssessmentDeadline.Value.Date == targetDate
                        && r.ReviewCycle.Status == ReviewCycleStatus.Active
                        && !r.IsDeleted)
                    .ToListAsync();

                foreach (var review in selfAssessmentReviews)
                {
                    // Find user ID for the employee
                    var userIds = await _context.EmployeeUserLinks
                        .Where(eul => eul.EmployeeId == review.EmployeeId)
                        .Select(eul => eul.UserId)
                        .ToListAsync();

                    foreach (var userId in userIds)
                    {
                        var notification = new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Self-Assessment Due in {days} Day{(days > 1 ? "s" : "")}",
                            TitleAr = $"التقييم الذاتي مستحق خلال {days} يوم",
                            MessageEn = $"Your self-assessment for \"{review.ReviewCycle.Name}\" is due on {review.ReviewCycle.SelfAssessmentDeadline:yyyy-MM-dd}. Please complete it before the deadline.",
                            MessageAr = $"التقييم الذاتي لدورة \"{review.ReviewCycle.NameAr ?? review.ReviewCycle.Name}\" مستحق بتاريخ {review.ReviewCycle.SelfAssessmentDeadline:yyyy-MM-dd}. يرجى إكماله قبل الموعد النهائي.",
                            EntityType = "PerformanceReview",
                            EntityId = review.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };
                        _context.Notifications.Add(notification);
                        selfAssessmentReminders++;
                    }
                }

                // Manager review reminders: reviews pending manager assessment with deadline approaching
                var managerReviewPending = await _context.PerformanceReviews
                    .Include(r => r.ReviewerEmployee)
                    .Include(r => r.Employee)
                    .Include(r => r.ReviewCycle)
                    .Where(r => r.Status == ReviewStatus.ManagerReviewPending
                        && r.ReviewCycle.ManagerAssessmentDeadline != null
                        && r.ReviewCycle.ManagerAssessmentDeadline.Value.Date == targetDate
                        && r.ReviewCycle.Status == ReviewCycleStatus.Active
                        && !r.IsDeleted)
                    .ToListAsync();

                foreach (var review in managerReviewPending)
                {
                    // Find user ID for the reviewer/manager employee
                    var reviewerUserIds = await _context.EmployeeUserLinks
                        .Where(eul => eul.EmployeeId == review.ReviewerEmployeeId)
                        .Select(eul => eul.UserId)
                        .ToListAsync();

                    foreach (var userId in reviewerUserIds)
                    {
                        var notification = new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Manager Review Due in {days} Day{(days > 1 ? "s" : "")}",
                            TitleAr = $"تقييم المدير مستحق خلال {days} يوم",
                            MessageEn = $"Your manager review for {review.Employee.FullName} in \"{review.ReviewCycle.Name}\" is due on {review.ReviewCycle.ManagerAssessmentDeadline:yyyy-MM-dd}. Please complete it before the deadline.",
                            MessageAr = $"تقييم المدير للموظف {review.Employee.FullNameAr ?? review.Employee.FullName} في دورة \"{review.ReviewCycle.NameAr ?? review.ReviewCycle.Name}\" مستحق بتاريخ {review.ReviewCycle.ManagerAssessmentDeadline:yyyy-MM-dd}. يرجى إكماله قبل الموعد النهائي.",
                            EntityType = "PerformanceReview",
                            EntityId = review.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };
                        _context.Notifications.Add(notification);
                        managerReviewReminders++;
                    }
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation(
                "Review cycle reminder job completed. Sent {SelfCount} self-assessment and {ManagerCount} manager review reminders",
                selfAssessmentReminders, managerReviewReminders);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running review cycle reminder job");
            throw;
        }
    }
}
