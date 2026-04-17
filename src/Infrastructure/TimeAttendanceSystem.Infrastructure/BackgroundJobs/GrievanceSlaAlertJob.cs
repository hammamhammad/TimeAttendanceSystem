using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for grievances approaching or past their due date
/// and creates notifications for assigned users and HR to take action.
/// </summary>
public class GrievanceSlaAlertJob : IInvocable
{
    private static readonly int[] DefaultAlertDays = { 3, 1 };

    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<GrievanceSlaAlertJob> _logger;

    public GrievanceSlaAlertJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILogger<GrievanceSlaAlertJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting grievance SLA alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.CompanySettings.AsNoTracking().FirstOrDefaultAsync();
            var alertDaysConfigured = BackgroundJobSettingsHelper.ParseCsvDays(settings?.GrievanceSlaAlertDaysCsv, DefaultAlertDays);

            // Recipients: tenant-configured set + legacy "HR" role for backward compat.
            var hrUserIdsList = await _recipientResolver.GetRecipientUserIdsAsync(new[] { "HR" });
            var hrUserIds = hrUserIdsList.ToList();

            if (!hrUserIds.Any())
            {
                _logger.LogWarning("No recipients resolved for grievance SLA alerts");
                return;
            }

            // Active statuses that should be checked
            var activeStatuses = new[]
            {
                GrievanceStatus.Filed,
                GrievanceStatus.UnderReview,
                GrievanceStatus.InvestigationStarted,
                GrievanceStatus.PendingResolution,
                GrievanceStatus.Escalated
            };

            // Check for overdue grievances (past due date)
            var overdueGrievances = await _context.Grievances
                .Where(g => g.DueDate.HasValue
                    && g.DueDate.Value.Date < today
                    && activeStatuses.Contains(g.Status)
                    && !g.IsDeleted)
                .ToListAsync();

            foreach (var grievance in overdueGrievances)
            {
                var targetUserIds = new HashSet<long>(hrUserIds);
                if (grievance.AssignedToUserId.HasValue)
                    targetUserIds.Add(grievance.AssignedToUserId.Value);
                if (grievance.EscalatedToUserId.HasValue)
                    targetUserIds.Add(grievance.EscalatedToUserId.Value);

                var daysPast = (today - grievance.DueDate!.Value.Date).Days;

                foreach (var userId in targetUserIds)
                {
                    _context.Notifications.Add(new Notification
                    {
                        UserId = userId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = $"Grievance Overdue ({daysPast} days)",
                        TitleAr = $"شكوى متأخرة ({daysPast} يوم)",
                        MessageEn = $"Grievance {grievance.GrievanceNumber} is overdue by {daysPast} day(s). Due date was {grievance.DueDate:yyyy-MM-dd}.",
                        MessageAr = $"الشكوى {grievance.GrievanceNumber} متأخرة {daysPast} يوم(أيام). تاريخ الاستحقاق كان {grievance.DueDate:yyyy-MM-dd}.",
                        EntityType = "Grievance",
                        EntityId = grievance.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    });
                }
            }

            if (overdueGrievances.Any())
                _logger.LogInformation("Found {Count} overdue grievances", overdueGrievances.Count);

            // Check for grievances approaching due date using tenant-configured windows.
            foreach (var days in alertDaysConfigured)
            {
                var targetDate = today.AddDays(days);
                var approachingGrievances = await _context.Grievances
                    .Where(g => g.DueDate.HasValue
                        && g.DueDate.Value.Date == targetDate
                        && activeStatuses.Contains(g.Status)
                        && !g.IsDeleted)
                    .ToListAsync();

                foreach (var grievance in approachingGrievances)
                {
                    var targetUserIds = new HashSet<long>(hrUserIds);
                    if (grievance.AssignedToUserId.HasValue)
                        targetUserIds.Add(grievance.AssignedToUserId.Value);

                    foreach (var userId in targetUserIds)
                    {
                        _context.Notifications.Add(new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Grievance Due in {days} Day(s)",
                            TitleAr = $"شكوى مستحقة خلال {days} يوم(أيام)",
                            MessageEn = $"Grievance {grievance.GrievanceNumber} is due on {grievance.DueDate:yyyy-MM-dd}.",
                            MessageAr = $"الشكوى {grievance.GrievanceNumber} مستحقة في {grievance.DueDate:yyyy-MM-dd}.",
                            EntityType = "Grievance",
                            EntityId = grievance.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        });
                    }
                }

                if (approachingGrievances.Any())
                    _logger.LogInformation("Found {Count} grievances due in {Days} day(s)", approachingGrievances.Count, days);
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Grievance SLA alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running grievance SLA alert job");
            throw;
        }
    }
}
