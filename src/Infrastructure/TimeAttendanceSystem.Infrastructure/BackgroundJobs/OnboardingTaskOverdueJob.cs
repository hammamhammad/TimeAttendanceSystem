using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for onboarding tasks past their due date
/// and marks them as Overdue. Creates notifications for the assigned employee and HR users.
/// Runs daily at 5:00 AM.
/// </summary>
public class OnboardingTaskOverdueJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<OnboardingTaskOverdueJob> _logger;

    public OnboardingTaskOverdueJob(IApplicationDbContext context, ILogger<OnboardingTaskOverdueJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting onboarding task overdue check job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            // Find tasks that are past due and still Pending or InProgress
            var overdueTasks = await _context.OnboardingTasks
                .Include(t => t.OnboardingProcess)
                    .ThenInclude(p => p.Employee)
                .Include(t => t.AssignedToEmployee)
                .Where(t => t.DueDate.Date < today
                    && (t.Status == OnboardingTaskStatus.Pending || t.Status == OnboardingTaskStatus.InProgress)
                    && !t.IsDeleted)
                .ToListAsync();

            if (!overdueTasks.Any())
            {
                _logger.LogInformation("No overdue onboarding tasks found");
                return;
            }

            _logger.LogInformation("Found {Count} overdue onboarding tasks", overdueTasks.Count);

            // Get HR user IDs to notify
            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HRManager" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

            foreach (var task in overdueTasks)
            {
                // Mark as overdue
                task.Status = OnboardingTaskStatus.Overdue;
                task.ModifiedAtUtc = DateTime.UtcNow;
                task.ModifiedBy = "SYSTEM";

                var employeeName = task.OnboardingProcess.Employee.FullName;
                var employeeNameAr = task.OnboardingProcess.Employee.FullNameAr ?? employeeName;
                var taskName = task.TaskName;
                var taskNameAr = task.TaskNameAr ?? taskName;

                // Notify the assigned employee if they have a user account
                if (task.AssignedToEmployeeId.HasValue)
                {
                    var assignedUserIds = await _context.EmployeeUserLinks
                        .Where(eul => eul.EmployeeId == task.AssignedToEmployeeId.Value)
                        .Select(eul => eul.UserId)
                        .ToListAsync();

                    foreach (var userId in assignedUserIds)
                    {
                        var notification = new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = "Onboarding Task Overdue",
                            TitleAr = "مهمة التأهيل متأخرة",
                            MessageEn = $"Onboarding task \"{taskName}\" for {employeeName} is past its due date ({task.DueDate:yyyy-MM-dd}).",
                            MessageAr = $"مهمة التأهيل \"{taskNameAr}\" للموظف {employeeNameAr} تجاوزت تاريخ الاستحقاق ({task.DueDate:yyyy-MM-dd}).",
                            EntityType = "OnboardingTask",
                            EntityId = task.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };
                        _context.Notifications.Add(notification);
                    }
                }

                // Notify HR users
                foreach (var hrUserId in hrUserIds)
                {
                    var notification = new Notification
                    {
                        UserId = hrUserId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = "Onboarding Task Overdue",
                        TitleAr = "مهمة التأهيل متأخرة",
                        MessageEn = $"Onboarding task \"{taskName}\" for {employeeName} is past its due date ({task.DueDate:yyyy-MM-dd}).",
                        MessageAr = $"مهمة التأهيل \"{taskNameAr}\" للموظف {employeeNameAr} تجاوزت تاريخ الاستحقاق ({task.DueDate:yyyy-MM-dd}).",
                        EntityType = "OnboardingTask",
                        EntityId = task.Id,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(notification);
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Onboarding task overdue check job completed. Marked {Count} tasks as overdue", overdueTasks.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running onboarding task overdue check job");
            throw;
        }
    }
}
