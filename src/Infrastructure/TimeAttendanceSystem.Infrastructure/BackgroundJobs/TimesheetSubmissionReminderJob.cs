using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that sends reminder notifications to employees who have
/// draft or no timesheets as the submission deadline approaches. Runs daily.
/// </summary>
public class TimesheetSubmissionReminderJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly IInAppNotificationService _notificationService;
    private readonly ILogger<TimesheetSubmissionReminderJob> _logger;

    public TimesheetSubmissionReminderJob(
        IApplicationDbContext context,
        IInAppNotificationService notificationService,
        ILogger<TimesheetSubmissionReminderJob> logger)
    {
        _context = context;
        _notificationService = notificationService;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting timesheet submission reminder job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.CompanySettings.AsNoTracking().FirstOrDefaultAsync();
            var reminderDaysBefore = settings?.TimesheetSubmissionReminderDaysBefore > 0
                ? settings.TimesheetSubmissionReminderDaysBefore
                : 2;

            // Find open periods with approaching deadlines
            var approachingPeriods = await _context.TimesheetPeriods
                .Where(p => p.Status == TimesheetPeriodStatus.Open
                    && !p.IsDeleted
                    && p.IsActive
                    && p.SubmissionDeadline.Date >= today
                    && p.SubmissionDeadline.Date <= today.AddDays(reminderDaysBefore))
                .ToListAsync();

            if (!approachingPeriods.Any())
            {
                _logger.LogDebug("No timesheet periods with approaching deadlines");
                return;
            }

            var totalReminders = 0;

            foreach (var period in approachingPeriods)
            {
                // Get all active employees in this branch
                var branchEmployees = await _context.Employees
                    .Where(e => e.BranchId == period.BranchId
                        && e.IsActive
                        && !e.IsDeleted)
                    .Select(e => e.Id)
                    .ToListAsync();

                // Find employees who have NOT submitted a timesheet for this period
                var submittedEmployeeIds = await _context.Timesheets
                    .Where(t => t.TimesheetPeriodId == period.Id
                        && !t.IsDeleted
                        && (t.Status == TimesheetStatus.Submitted
                            || t.Status == TimesheetStatus.Approved))
                    .Select(t => t.EmployeeId)
                    .ToListAsync();

                var pendingEmployeeIds = branchEmployees
                    .Except(submittedEmployeeIds)
                    .ToList();

                if (!pendingEmployeeIds.Any())
                    continue;

                // Get user IDs for the pending employees
                var userLinks = await _context.EmployeeUserLinks
                    .Where(eul => pendingEmployeeIds.Contains(eul.EmployeeId))
                    .Select(eul => new { eul.EmployeeId, eul.UserId })
                    .ToListAsync();

                var daysUntilDeadline = (period.SubmissionDeadline.Date - today).Days;

                // Send reminder notifications
                var notifications = userLinks.Select(ul => new CreateNotificationRequest
                {
                    UserId = ul.UserId,
                    Type = NotificationType.ApprovalReminder,
                    TitleEn = "Timesheet Submission Reminder",
                    TitleAr = "تذكير بتقديم الجدول الزمني",
                    MessageEn = $"Your timesheet for period \"{period.Name}\" is due in {daysUntilDeadline} day(s). Please submit before {period.SubmissionDeadline:yyyy-MM-dd}.",
                    MessageAr = $"الجدول الزمني للفترة \"{period.Name}\" مطلوب خلال {daysUntilDeadline} يوم/أيام. يرجى التقديم قبل {period.SubmissionDeadline:yyyy-MM-dd}.",
                    EntityType = "TimesheetPeriod",
                    EntityId = period.Id
                });

                await _notificationService.SendBulkNotificationsAsync(notifications);
                totalReminders += userLinks.Count;
            }

            _logger.LogInformation("Sent {Count} timesheet submission reminders", totalReminders);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running timesheet submission reminder job");
            throw;
        }
    }
}
