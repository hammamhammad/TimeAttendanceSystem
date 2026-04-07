using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for overdue loan repayments and upcoming due dates,
/// creating notifications for HR and the employee.
/// </summary>
public class LoanRepaymentReminderJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<LoanRepaymentReminderJob> _logger;

    public LoanRepaymentReminderJob(IApplicationDbContext context, ILogger<LoanRepaymentReminderJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting loan repayment reminder job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            // Mark overdue repayments
            var overdueRepayments = await _context.LoanRepayments
                .Include(r => r.LoanApplication)
                    .ThenInclude(l => l.Employee)
                .Where(r => r.Status == LoanRepaymentStatus.Scheduled
                    && r.DueDate.Date < today
                    && !r.IsDeleted)
                .ToListAsync();

            foreach (var repayment in overdueRepayments)
            {
                repayment.Status = LoanRepaymentStatus.Overdue;
                repayment.ModifiedAtUtc = DateTime.UtcNow;
                repayment.ModifiedBy = "SYSTEM";
            }

            if (overdueRepayments.Any())
            {
                _logger.LogInformation("Marked {Count} loan repayments as overdue", overdueRepayments.Count);
            }

            // Get HR users for notifications
            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HRManager" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

            // Notify about upcoming repayments (7 days)
            var upcomingDate = today.AddDays(7);
            var upcomingRepayments = await _context.LoanRepayments
                .Include(r => r.LoanApplication)
                    .ThenInclude(l => l.Employee)
                .Where(r => r.Status == LoanRepaymentStatus.Scheduled
                    && r.DueDate.Date == upcomingDate
                    && !r.IsDeleted)
                .ToListAsync();

            foreach (var repayment in upcomingRepayments)
            {
                var emp = repayment.LoanApplication.Employee;
                foreach (var userId in hrUserIds)
                {
                    var notification = new Notification
                    {
                        UserId = userId,
                        Type = NotificationType.ApprovalReminder,
                        TitleEn = "Loan Repayment Due in 7 Days",
                        TitleAr = "قسط قرض مستحق خلال 7 أيام",
                        MessageEn = $"Installment #{repayment.InstallmentNumber} ({repayment.Amount:N2} SAR) for {emp.FullName} is due on {repayment.DueDate:yyyy-MM-dd}.",
                        MessageAr = $"القسط رقم {repayment.InstallmentNumber} ({repayment.Amount:N2} ر.س) للموظف {emp.FullNameAr ?? emp.FullName} مستحق في {repayment.DueDate:yyyy-MM-dd}.",
                        EntityType = "LoanApplication",
                        EntityId = repayment.LoanApplicationId,
                        IsRead = false,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    _context.Notifications.Add(notification);
                }
            }

            if (upcomingRepayments.Any())
            {
                _logger.LogInformation("Found {Count} loan repayments due in 7 days", upcomingRepayments.Count);
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Loan repayment reminder job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running loan repayment reminder job");
            throw;
        }
    }
}
