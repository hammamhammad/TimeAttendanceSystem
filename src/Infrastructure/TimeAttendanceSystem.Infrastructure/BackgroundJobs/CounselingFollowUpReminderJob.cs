using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for counseling records with upcoming or overdue follow-ups
/// and creates notifications for the counselor to take action.
/// </summary>
public class CounselingFollowUpReminderJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<CounselingFollowUpReminderJob> _logger;

    public CounselingFollowUpReminderJob(IApplicationDbContext context, ILogger<CounselingFollowUpReminderJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting counseling follow-up reminder job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            // Get pending follow-ups that are due today or overdue
            var pendingFollowUps = await _context.CounselingRecords
                .Include(c => c.Employee)
                .Where(c => c.FollowUpRequired
                    && !c.FollowUpCompleted
                    && c.FollowUpDate.HasValue
                    && c.FollowUpDate.Value.Date <= today
                    && !c.IsDeleted)
                .ToListAsync();

            foreach (var record in pendingFollowUps)
            {
                var isOverdue = record.FollowUpDate!.Value.Date < today;
                var daysPast = isOverdue ? (today - record.FollowUpDate.Value.Date).Days : 0;

                // Notify the counselor
                _context.Notifications.Add(new Notification
                {
                    UserId = record.CounselorUserId,
                    Type = NotificationType.ApprovalReminder,
                    TitleEn = isOverdue
                        ? $"Counseling Follow-Up Overdue ({daysPast} days)"
                        : "Counseling Follow-Up Due Today",
                    TitleAr = isOverdue
                        ? $"متابعة الإرشاد متأخرة ({daysPast} يوم)"
                        : "متابعة الإرشاد مستحقة اليوم",
                    MessageEn = isOverdue
                        ? $"Follow-up for counseling session with {record.Employee.FullName} (Subject: {record.Subject}) is overdue by {daysPast} day(s)."
                        : $"Follow-up for counseling session with {record.Employee.FullName} (Subject: {record.Subject}) is due today.",
                    MessageAr = isOverdue
                        ? $"متابعة جلسة الإرشاد مع {record.Employee.FullNameAr ?? record.Employee.FullName} (الموضوع: {record.SubjectAr ?? record.Subject}) متأخرة {daysPast} يوم(أيام)."
                        : $"متابعة جلسة الإرشاد مع {record.Employee.FullNameAr ?? record.Employee.FullName} (الموضوع: {record.SubjectAr ?? record.Subject}) مستحقة اليوم.",
                    EntityType = "CounselingRecord",
                    EntityId = record.Id,
                    IsRead = false,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "SYSTEM"
                });
            }

            // Also remind for follow-ups due tomorrow (1-day advance notice)
            var tomorrowDate = today.AddDays(1);
            var upcomingFollowUps = await _context.CounselingRecords
                .Include(c => c.Employee)
                .Where(c => c.FollowUpRequired
                    && !c.FollowUpCompleted
                    && c.FollowUpDate.HasValue
                    && c.FollowUpDate.Value.Date == tomorrowDate
                    && !c.IsDeleted)
                .ToListAsync();

            foreach (var record in upcomingFollowUps)
            {
                _context.Notifications.Add(new Notification
                {
                    UserId = record.CounselorUserId,
                    Type = NotificationType.ApprovalReminder,
                    TitleEn = "Counseling Follow-Up Due Tomorrow",
                    TitleAr = "متابعة الإرشاد مستحقة غدا",
                    MessageEn = $"Follow-up for counseling session with {record.Employee.FullName} (Subject: {record.Subject}) is due tomorrow.",
                    MessageAr = $"متابعة جلسة الإرشاد مع {record.Employee.FullNameAr ?? record.Employee.FullName} (الموضوع: {record.SubjectAr ?? record.Subject}) مستحقة غدا.",
                    EntityType = "CounselingRecord",
                    EntityId = record.Id,
                    IsRead = false,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "SYSTEM"
                });
            }

            var totalNotifications = pendingFollowUps.Count + upcomingFollowUps.Count;
            if (totalNotifications > 0)
            {
                await _context.SaveChangesAsync(default);
                _logger.LogInformation("Created {Count} counseling follow-up reminders ({Overdue} overdue/due, {Upcoming} upcoming)",
                    totalNotifications, pendingFollowUps.Count, upcomingFollowUps.Count);
            }

            _logger.LogInformation("Counseling follow-up reminder job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running counseling follow-up reminder job");
            throw;
        }
    }
}
