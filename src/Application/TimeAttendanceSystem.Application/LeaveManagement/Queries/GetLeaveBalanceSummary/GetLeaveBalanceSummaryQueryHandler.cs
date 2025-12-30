using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveBalanceSummary;

/// <summary>
/// Query handler for retrieving comprehensive leave balance summary for an employee.
/// </summary>
public class GetLeaveBalanceSummaryQueryHandler : BaseHandler<GetLeaveBalanceSummaryQuery, Result<LeaveBalanceSummaryDto>>
{
    public GetLeaveBalanceSummaryQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<LeaveBalanceSummaryDto>> Handle(GetLeaveBalanceSummaryQuery request, CancellationToken cancellationToken)
    {
        // Validate employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
            return Result.Failure<LeaveBalanceSummaryDto>("Employee does not exist.");

        // Enforce branch-scoped access control
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<LeaveBalanceSummaryDto>("Access denied to this employee's branch.");

        // Query all leave balances for the employee and year
        var balances = await Context.LeaveBalances
            .Include(lb => lb.VacationType)
            .Where(lb => lb.EmployeeId == request.EmployeeId && lb.Year == request.Year)
            .Select(lb => new VacationTypeBalanceDto
            {
                VacationTypeId = lb.VacationTypeId,
                VacationTypeName = lb.VacationType.Name,
                VacationTypeNameAr = lb.VacationType.NameAr ?? string.Empty,
                EntitledDays = lb.EntitledDays,
                AccruedDays = lb.AccruedDays,
                UsedDays = lb.UsedDays,
                PendingDays = lb.PendingDays,
                AdjustedDays = lb.AdjustedDays,
                CurrentBalance = lb.CurrentBalance,
                LastAccrualDate = lb.LastAccrualDate
            })
            .ToListAsync(cancellationToken);

        // Create summary
        var summary = new LeaveBalanceSummaryDto
        {
            EmployeeId = request.EmployeeId,
            EmployeeNumber = employee.EmployeeNumber,
            EmployeeName = $"{employee.FirstName} {employee.LastName}",
            Year = request.Year,
            VacationTypeBalances = balances,
            TotalEntitled = balances.Sum(b => b.EntitledDays),
            TotalAccrued = balances.Sum(b => b.AccruedDays),
            TotalUsed = balances.Sum(b => b.UsedDays),
            TotalPending = balances.Sum(b => b.PendingDays),
            TotalAvailable = balances.Sum(b => b.CurrentBalance)
        };

        return Result.Success(summary);
    }
}
