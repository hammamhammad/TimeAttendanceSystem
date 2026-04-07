using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.ApproveLeaveEncashment;

public class ApproveLeaveEncashmentCommandHandler : BaseHandler<ApproveLeaveEncashmentCommand, Result>
{
    public ApproveLeaveEncashmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ApproveLeaveEncashmentCommand request, CancellationToken cancellationToken)
    {
        var encashment = await Context.LeaveEncashments
            .Include(le => le.Employee)
            .FirstOrDefaultAsync(le => le.Id == request.Id && !le.IsDeleted, cancellationToken);

        if (encashment == null)
            return Result.Failure("Leave encashment not found.");

        if (encashment.Status != LeaveEncashmentStatus.Pending)
            return Result.Failure("Only pending leave encashment requests can be approved.");

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            if (!CurrentUser.BranchIds.Contains(encashment.Employee.BranchId))
                return Result.Failure("Access denied. Employee is not in your branch scope.");
        }

        // Deduct from leave balance
        var balance = await Context.LeaveBalances
            .FirstOrDefaultAsync(lb => lb.EmployeeId == encashment.EmployeeId
                && lb.VacationTypeId == encashment.VacationTypeId
                && lb.Year == encashment.Year, cancellationToken);

        if (balance == null)
            return Result.Failure("Leave balance not found for the employee and vacation type.");

        if (balance.CurrentBalance < encashment.DaysEncashed)
            return Result.Failure($"Insufficient leave balance. Available: {balance.CurrentBalance}, Encashment: {encashment.DaysEncashed}");

        // Deduct the encashed days from the balance
        balance.UsedDays += encashment.DaysEncashed;
        balance.ModifiedAtUtc = DateTime.UtcNow;

        encashment.Status = LeaveEncashmentStatus.Approved;
        encashment.ApprovedByUserId = CurrentUser.UserId;
        encashment.ModifiedAtUtc = DateTime.UtcNow;
        encashment.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
