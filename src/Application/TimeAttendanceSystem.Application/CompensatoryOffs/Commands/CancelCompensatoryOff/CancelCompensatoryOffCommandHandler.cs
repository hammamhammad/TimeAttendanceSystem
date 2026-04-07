using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.CancelCompensatoryOff;

public class CancelCompensatoryOffCommandHandler : BaseHandler<CancelCompensatoryOffCommand, Result>
{
    public CancelCompensatoryOffCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(CancelCompensatoryOffCommand request, CancellationToken cancellationToken)
    {
        var compensatoryOff = await Context.CompensatoryOffs
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

        if (compensatoryOff == null)
            return Result.Failure("Compensatory off not found.");

        if (compensatoryOff.Status != CompensatoryOffStatus.Available)
            return Result.Failure("Only compensatory offs with Available status can be cancelled.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(compensatoryOff.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        compensatoryOff.Status = CompensatoryOffStatus.Cancelled;
        compensatoryOff.ModifiedAtUtc = DateTime.UtcNow;
        compensatoryOff.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
