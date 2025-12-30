using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetEmployeeLeaveBalance;

/// <summary>
/// Query handler for retrieving employee leave balance.
/// </summary>
public class GetEmployeeLeaveBalanceQueryHandler : BaseHandler<GetEmployeeLeaveBalanceQuery, Result<LeaveBalanceDto?>>
{
    public GetEmployeeLeaveBalanceQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<LeaveBalanceDto?>> Handle(GetEmployeeLeaveBalanceQuery request, CancellationToken cancellationToken)
    {
        // Validate employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
            return Result.Failure<LeaveBalanceDto?>("Employee does not exist.");

        // Enforce branch-scoped access control
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<LeaveBalanceDto?>("Access denied to this employee's branch.");

        // Query leave balance with related data
        var balance = await Context.LeaveBalances
            .Include(lb => lb.Employee)
            .Include(lb => lb.VacationType)
            .Where(lb =>
                lb.EmployeeId == request.EmployeeId &&
                lb.VacationTypeId == request.VacationTypeId &&
                lb.Year == request.Year)
            .Select(lb => new LeaveBalanceDto
            {
                Id = lb.Id,
                EmployeeId = lb.EmployeeId,
                EmployeeNumber = lb.Employee.EmployeeNumber,
                EmployeeName = lb.Employee.FirstName + " " + lb.Employee.LastName,
                VacationTypeId = lb.VacationTypeId,
                VacationTypeName = lb.VacationType.Name,
                VacationTypeNameAr = lb.VacationType.NameAr ?? string.Empty,
                Year = lb.Year,
                EntitledDays = lb.EntitledDays,
                AccruedDays = lb.AccruedDays,
                UsedDays = lb.UsedDays,
                PendingDays = lb.PendingDays,
                AdjustedDays = lb.AdjustedDays,
                CurrentBalance = lb.CurrentBalance,
                LastAccrualDate = lb.LastAccrualDate,
                CreatedAtUtc = lb.CreatedAtUtc,
                ModifiedAtUtc = lb.ModifiedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        return Result.Success(balance);
    }
}
