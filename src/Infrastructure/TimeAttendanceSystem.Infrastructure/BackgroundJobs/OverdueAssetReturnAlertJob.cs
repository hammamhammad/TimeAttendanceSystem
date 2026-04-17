using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Assets;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for overdue asset returns (assets with ExpectedReturnDate in the past
/// that are still assigned) and creates notifications for the assigned employee and HR users.
/// Also updates assignment status from Active to Overdue.
/// </summary>
public class OverdueAssetReturnAlertJob : IInvocable
{
    private static readonly int[] DefaultAlertDays = { 1, 3, 7, 14, 30 };

    private readonly IApplicationDbContext _context;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<OverdueAssetReturnAlertJob> _logger;

    public OverdueAssetReturnAlertJob(
        IApplicationDbContext context,
        INotificationRecipientResolver recipientResolver,
        ILogger<OverdueAssetReturnAlertJob> logger)
    {
        _context = context;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting overdue asset return alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var settings = await _context.CompanySettings.AsNoTracking().FirstOrDefaultAsync();
            var alertDays = BackgroundJobSettingsHelper.ParseCsvDays(settings?.AssetOverdueReturnAlertDaysCsv, DefaultAlertDays);

            // HR recipients via resolver, with legacy "Admin" extension preserved.
            var hrUserIds = await _recipientResolver.GetRecipientUserIdsAsync(new[] { "Admin" });

            // Find active assignments with overdue expected return dates
            var overdueAssignments = await _context.AssetAssignments
                .Include(a => a.Asset)
                .Include(a => a.Employee)
                .Where(a => a.Status == AssetAssignmentStatus.Active
                    && !a.IsDeleted
                    && a.ExpectedReturnDate != null
                    && a.ExpectedReturnDate.Value.Date < today)
                .ToListAsync();

            var notificationCount = 0;

            foreach (var assignment in overdueAssignments)
            {
                var daysOverdue = (today - assignment.ExpectedReturnDate!.Value.Date).Days;

                // Update status to Overdue
                assignment.Status = AssetAssignmentStatus.Overdue;
                assignment.ModifiedAtUtc = DateTime.UtcNow;
                assignment.ModifiedBy = "SYSTEM";

                if (!alertDays.Contains(daysOverdue)) continue;

                // Notify the employee (via their user link)
                var employeeUserLink = await _context.EmployeeUserLinks
                    .FirstOrDefaultAsync(eul => eul.EmployeeId == assignment.EmployeeId);

                if (employeeUserLink != null)
                {
                    var notification = new Notification
                    {
                        UserId = employeeUserLink.UserId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = $"Asset Return Overdue by {daysOverdue} Day(s)",
                        TitleAr = $"تأخر إعادة الأصل بمقدار {daysOverdue} يوم",
                        MessageEn = $"Asset \"{assignment.Asset.Name}\" (Tag: {assignment.Asset.AssetTag}) was due for return on {assignment.ExpectedReturnDate:yyyy-MM-dd}. Please return it immediately.",
                        MessageAr = $"الأصل \"{assignment.Asset.NameAr ?? assignment.Asset.Name}\" (رقم: {assignment.Asset.AssetTag}) كان مستحقا للإعادة في {assignment.ExpectedReturnDate:yyyy-MM-dd}. يرجى إعادته فورا.",
                        EntityType = "AssetAssignment",
                        EntityId = assignment.Id,
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
                        TitleEn = $"Asset Return Overdue by {daysOverdue} Day(s)",
                        TitleAr = $"تأخر إعادة الأصل بمقدار {daysOverdue} يوم",
                        MessageEn = $"Asset \"{assignment.Asset.Name}\" (Tag: {assignment.Asset.AssetTag}) assigned to {assignment.Employee.FullName} is overdue for return since {assignment.ExpectedReturnDate:yyyy-MM-dd}.",
                        MessageAr = $"الأصل \"{assignment.Asset.NameAr ?? assignment.Asset.Name}\" (رقم: {assignment.Asset.AssetTag}) المخصص لـ {assignment.Employee.FullNameAr ?? assignment.Employee.FullName} متأخر في الإعادة منذ {assignment.ExpectedReturnDate:yyyy-MM-dd}.",
                        EntityType = "AssetAssignment",
                        EntityId = assignment.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(hrNotification);
                    notificationCount++;
                }
            }

            if (notificationCount > 0 || overdueAssignments.Any())
            {
                await _context.SaveChangesAsync(default);
                _logger.LogInformation("Marked {OverdueCount} assignments as overdue, created {NotifCount} notifications",
                    overdueAssignments.Count, notificationCount);
            }

            _logger.LogInformation("Overdue asset return alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running overdue asset return alert job");
            throw;
        }
    }
}
