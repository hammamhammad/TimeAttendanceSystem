using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that sends reminders to participants who have not yet
/// completed active surveys. Runs daily at 9 AM.
/// </summary>
public class SurveyReminderJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly IInAppNotificationService _notificationService;
    private readonly ILogger<SurveyReminderJob> _logger;

    public SurveyReminderJob(
        IApplicationDbContext context,
        IInAppNotificationService notificationService,
        ILogger<SurveyReminderJob> logger)
    {
        _context = context;
        _notificationService = notificationService;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting survey reminder job at {Time}", DateTime.UtcNow);

        try
        {
            var now = DateTime.UtcNow;

            // Find active distributions that need reminders
            var distributions = await _context.SurveyDistributions
                .Where(d => d.Status == SurveyDistributionStatus.Active
                    && d.ReminderFrequencyDays != null
                    && d.ReminderFrequencyDays > 0
                    && d.EndDate > now
                    && !d.IsDeleted)
                .ToListAsync();

            if (!distributions.Any())
            {
                _logger.LogDebug("No survey distributions need reminders");
                return;
            }

            var totalReminders = 0;

            foreach (var distribution in distributions)
            {
                // Check if enough time has passed since last reminder
                var lastReminder = distribution.LastReminderSentAt ?? distribution.CreatedAtUtc;
                var daysSinceLastReminder = (now - lastReminder).TotalDays;

                if (daysSinceLastReminder < distribution.ReminderFrequencyDays!.Value)
                    continue;

                // Find pending participants (Invited or Started status)
                var pendingParticipants = await _context.SurveyParticipants
                    .Where(p => p.SurveyDistributionId == distribution.Id
                        && (p.Status == SurveyParticipantStatus.Invited || p.Status == SurveyParticipantStatus.Started)
                        && !p.IsDeleted)
                    .Select(p => new { p.EmployeeId })
                    .ToListAsync();

                if (!pendingParticipants.Any())
                    continue;

                // Get user IDs for the pending participants
                var employeeIds = pendingParticipants.Select(p => p.EmployeeId).ToList();
                var userLinks = await _context.EmployeeUserLinks
                    .Where(eul => employeeIds.Contains(eul.EmployeeId))
                    .Select(eul => new { eul.EmployeeId, eul.UserId })
                    .ToListAsync();

                // Send reminder notifications
                var notifications = userLinks.Select(ul => new CreateNotificationRequest
                {
                    UserId = ul.UserId,
                    Type = NotificationType.ApprovalReminder,
                    TitleEn = "Survey Reminder",
                    TitleAr = "تذكير بالاستبيان",
                    MessageEn = $"You have a pending survey: {distribution.Title}. Please complete it before {distribution.EndDate:yyyy-MM-dd}.",
                    MessageAr = $"لديك استبيان معلق: {distribution.TitleAr ?? distribution.Title}. يرجى إكماله قبل {distribution.EndDate:yyyy-MM-dd}.",
                    EntityType = "SurveyDistribution",
                    EntityId = distribution.Id
                });

                await _notificationService.SendBulkNotificationsAsync(notifications);

                // Update last reminder timestamp
                distribution.LastReminderSentAt = now;
                distribution.ModifiedAtUtc = now;
                distribution.ModifiedBy = "SYSTEM";

                totalReminders += pendingParticipants.Count;
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Sent {Count} survey reminders", totalReminders);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running survey reminder job");
            throw;
        }
    }
}
