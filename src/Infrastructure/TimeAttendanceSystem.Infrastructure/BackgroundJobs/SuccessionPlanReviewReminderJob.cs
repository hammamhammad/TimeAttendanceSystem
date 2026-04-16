using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Succession;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that sends reminder notifications for succession plans due for review.
/// Checks for plans with ReviewDate within 30, 7, and 1 days.
/// Runs monthly on the 1st.
/// </summary>
public class SuccessionPlanReviewReminderJob : IInvocable
{
    private static readonly int[] DefaultReminderDays = { 30, 7, 1 };

    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<SuccessionPlanReviewReminderJob> _logger;

    public SuccessionPlanReviewReminderJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILogger<SuccessionPlanReviewReminderJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting succession plan review reminder job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync();
            var reminderDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.SuccessionPlanReminderDaysCsv, DefaultReminderDays);

            // Resolve recipients once (legacy "HR" / "Admin" preserved as extras for backward-compat).
            var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync(new[] { "HR", "Admin" });
            int remindersSent = 0;

            foreach (var days in reminderDays)
            {
                var targetDate = today.AddDays(days);

                // Find active plans with ReviewDate matching targetDate
                var plansNeedingReview = await _context.SuccessionPlans
                    .Include(p => p.KeyPosition)
                        .ThenInclude(kp => kp.Branch)
                    .Where(p => p.IsActive
                        && !p.IsDeleted
                        && p.Status == SuccessionPlanStatus.Active
                        && p.ReviewDate != null
                        && p.ReviewDate.Value.Date == targetDate)
                    .ToListAsync();

                foreach (var plan in plansNeedingReview)
                {
                    foreach (var userId in hrUserIds)
                    {
                        var notification = new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Succession Plan Review Due in {days} Day{(days > 1 ? "s" : "")}",
                            TitleAr = $"مراجعة خطة التعاقب مستحقة خلال {days} يوم",
                            MessageEn = $"Succession plan \"{plan.Name}\" for key position \"{plan.KeyPosition.JobTitle}\" ({plan.KeyPosition.Branch.Name}) is due for review on {plan.ReviewDate:yyyy-MM-dd}.",
                            MessageAr = $"خطة التعاقب \"{plan.NameAr ?? plan.Name}\" للمنصب الرئيسي \"{plan.KeyPosition.JobTitleAr ?? plan.KeyPosition.JobTitle}\" ({plan.KeyPosition.Branch.Name}) مستحقة للمراجعة بتاريخ {plan.ReviewDate:yyyy-MM-dd}.",
                            EntityType = "SuccessionPlan",
                            EntityId = plan.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };
                        _context.Notifications.Add(notification);
                        remindersSent++;
                    }
                }
            }

            if (remindersSent > 0)
            {
                await _context.SaveChangesAsync(default);
            }

            _logger.LogInformation(
                "Succession plan review reminder job completed. Sent {Count} reminders",
                remindersSent);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running succession plan review reminder job");
            throw;
        }
    }
}
