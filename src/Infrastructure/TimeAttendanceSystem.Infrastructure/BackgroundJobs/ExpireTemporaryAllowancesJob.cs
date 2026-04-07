using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

public class ExpireTemporaryAllowancesJob : IInvocable
{
    private readonly IApplicationDbContext _context;

    public ExpireTemporaryAllowancesJob(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Invoke()
    {
        var today = DateTime.UtcNow.Date;
        var expiredAssignments = await _context.AllowanceAssignments
            .Where(a => a.Status == AllowanceAssignmentStatus.Active
                && a.EffectiveToDate != null
                && a.EffectiveToDate.Value.Date < today
                && !a.IsDeleted)
            .ToListAsync();

        foreach (var assignment in expiredAssignments)
        {
            assignment.Status = AllowanceAssignmentStatus.Expired;
            assignment.ModifiedAtUtc = DateTime.UtcNow;
            assignment.ModifiedBy = "SYSTEM";

            // Create change log
            _context.AllowanceChangeLogs.Add(new Domain.Payroll.AllowanceChangeLog
            {
                EmployeeId = assignment.EmployeeId,
                AllowanceTypeId = assignment.AllowanceTypeId,
                ChangeType = AllowanceChangeType.Removed,
                PreviousAmount = assignment.Amount,
                NewAmount = 0,
                EffectiveDate = today,
                Reason = "Temporary allowance expired",
                ChangedByUserId = null,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        if (expiredAssignments.Any())
        {
            await _context.SaveChangesAsync(default);
            Console.WriteLine($"Expired {expiredAssignments.Count} temporary allowance(s)");
        }
    }
}
