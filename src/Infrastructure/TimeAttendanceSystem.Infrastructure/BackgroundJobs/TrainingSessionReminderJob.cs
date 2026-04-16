using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that sends reminders to enrolled employees about upcoming training sessions.
/// Sends notifications 7 days, 3 days, and 1 day before the session start date.
/// </summary>
public class TrainingSessionReminderJob : IInvocable
{
    private static readonly int[] DefaultReminderDays = { 7, 3, 1 };

    private readonly IApplicationDbContext _context;
    private readonly ILogger<TrainingSessionReminderJob> _logger;

    public TrainingSessionReminderJob(IApplicationDbContext context, ILogger<TrainingSessionReminderJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting training session reminder job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync();
            var reminderDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.TrainingSessionReminderDaysCsv, DefaultReminderDays);
            var notificationCount = 0;

            foreach (var days in reminderDays)
            {
                var targetDate = today.AddDays(days);

                // Find scheduled sessions starting on the target date
                var upcomingSessions = await _context.TrainingSessions
                    .Include(s => s.Course)
                    .Include(s => s.Enrollments.Where(e => !e.IsDeleted
                        && (e.Status == TrainingEnrollmentStatus.Approved || e.Status == TrainingEnrollmentStatus.InProgress)))
                    .Where(s => s.Status == TrainingSessionStatus.Scheduled
                        && s.StartDate.Date == targetDate
                        && !s.IsDeleted)
                    .ToListAsync();

                foreach (var session in upcomingSessions)
                {
                    foreach (var enrollment in session.Enrollments)
                    {
                        // Get the user ID for this employee
                        var employeeUserLink = await _context.EmployeeUserLinks
                            .FirstOrDefaultAsync(eul => eul.EmployeeId == enrollment.EmployeeId);

                        if (employeeUserLink == null) continue;

                        var sessionTitle = session.Title ?? session.Course.Title;
                        var sessionTitleAr = session.Course.TitleAr ?? sessionTitle;

                        var notification = new Notification
                        {
                            UserId = employeeUserLink.UserId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Training Session in {days} Day(s)",
                            TitleAr = $"جلسة تدريبية خلال {days} يوم",
                            MessageEn = $"Reminder: \"{sessionTitle}\" starts on {session.StartDate:yyyy-MM-dd}" +
                                (session.Location != null ? $" at {session.Location}" : "") + ".",
                            MessageAr = $"تذكير: \"{sessionTitleAr}\" تبدأ في {session.StartDate:yyyy-MM-dd}" +
                                ((session.LocationAr ?? session.Location) != null ? $" في {session.LocationAr ?? session.Location}" : "") + ".",
                            EntityType = "TrainingSession",
                            EntityId = session.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };
                        _context.Notifications.Add(notification);
                        notificationCount++;
                    }
                }
            }

            if (notificationCount > 0)
            {
                await _context.SaveChangesAsync(default);
                _logger.LogInformation("Created {Count} training session reminder notifications", notificationCount);
            }

            _logger.LogInformation("Training session reminder job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running training session reminder job");
            throw;
        }
    }
}
