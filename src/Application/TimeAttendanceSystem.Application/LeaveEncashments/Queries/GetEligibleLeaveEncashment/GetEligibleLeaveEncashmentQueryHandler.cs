using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetEligibleLeaveEncashment;

public class GetEligibleLeaveEncashmentQueryHandler : BaseHandler<GetEligibleLeaveEncashmentQuery, Result<object>>
{
    public GetEligibleLeaveEncashmentQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetEligibleLeaveEncashmentQuery request, CancellationToken cancellationToken)
    {
        // Validate employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<object>("Employee not found.");

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            if (!CurrentUser.BranchIds.Contains(employee.BranchId))
                return Result.Failure<object>("Access denied. Employee is not in your branch scope.");
        }

        var currentYear = DateTime.UtcNow.Year;

        // Get vacation types that allow encashment
        var encashableTypes = await Context.VacationTypes
            .Where(vt => !vt.IsDeleted && vt.AllowEncashment)
            .ToListAsync(cancellationToken);

        if (!encashableTypes.Any())
            return Result.Success<object>(new { items = Array.Empty<object>() });

        var encashableTypeIds = encashableTypes.Select(vt => vt.Id).ToList();

        // Get leave balances for the employee for these vacation types
        var balances = await Context.LeaveBalances
            .Where(lb => lb.EmployeeId == request.EmployeeId
                && encashableTypeIds.Contains(lb.VacationTypeId)
                && lb.Year == currentYear)
            .ToListAsync(cancellationToken);

        // Get existing encashments for the current year to calculate already-encashed days
        var existingEncashments = await Context.LeaveEncashments
            .Where(le => le.EmployeeId == request.EmployeeId
                && le.Year == currentYear
                && !le.IsDeleted
                && le.Status != LeaveEncashmentStatus.Rejected
                && le.Status != LeaveEncashmentStatus.Cancelled)
            .ToListAsync(cancellationToken);

        var result = encashableTypes.Select(vt =>
        {
            var balance = balances.FirstOrDefault(b => b.VacationTypeId == vt.Id);
            var availableBalance = balance?.CurrentBalance ?? 0m;

            // Sum days already encashed (or pending) for this type this year
            var alreadyEncashed = existingEncashments
                .Where(e => e.VacationTypeId == vt.Id)
                .Sum(e => e.DaysEncashed);

            // Calculate max encashable days
            decimal maxEncashable = availableBalance;
            if (vt.EncashmentMaxDays.HasValue)
            {
                var remainingMax = vt.EncashmentMaxDays.Value - alreadyEncashed;
                maxEncashable = Math.Min(maxEncashable, Math.Max(0, remainingMax));
            }

            return new
            {
                vacationTypeId = vt.Id,
                vacationTypeName = vt.Name,
                vacationTypeNameAr = vt.NameAr,
                currentBalance = availableBalance,
                alreadyEncashedThisYear = alreadyEncashed,
                encashmentMaxDays = vt.EncashmentMaxDays,
                availableForEncashment = maxEncashable
            };
        }).ToList();

        return Result.Success<object>(new { items = result });
    }
}
