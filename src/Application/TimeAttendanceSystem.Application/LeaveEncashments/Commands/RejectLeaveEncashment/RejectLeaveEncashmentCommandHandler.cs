using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.RejectLeaveEncashment;

public class RejectLeaveEncashmentCommandHandler : BaseHandler<RejectLeaveEncashmentCommand, Result>
{
    public RejectLeaveEncashmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(RejectLeaveEncashmentCommand request, CancellationToken cancellationToken)
    {
        var encashment = await Context.LeaveEncashments
            .Include(le => le.Employee)
            .FirstOrDefaultAsync(le => le.Id == request.Id && !le.IsDeleted, cancellationToken);

        if (encashment == null)
            return Result.Failure("Leave encashment not found.");

        if (encashment.Status != LeaveEncashmentStatus.Pending)
            return Result.Failure("Only pending leave encashment requests can be rejected.");

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            if (!CurrentUser.BranchIds.Contains(encashment.Employee.BranchId))
                return Result.Failure("Access denied. Employee is not in your branch scope.");
        }

        encashment.Status = LeaveEncashmentStatus.Rejected;
        encashment.Notes = request.Notes ?? encashment.Notes;
        encashment.ModifiedAtUtc = DateTime.UtcNow;
        encashment.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
