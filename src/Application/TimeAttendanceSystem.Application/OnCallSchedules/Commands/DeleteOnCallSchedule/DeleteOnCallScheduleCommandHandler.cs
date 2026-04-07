using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.DeleteOnCallSchedule;

public class DeleteOnCallScheduleCommandHandler : BaseHandler<DeleteOnCallScheduleCommand, Result>
{
    public DeleteOnCallScheduleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteOnCallScheduleCommand request, CancellationToken cancellationToken)
    {
        var schedule = await Context.OnCallSchedules
            .Include(o => o.Employee)
            .FirstOrDefaultAsync(o => o.Id == request.Id && !o.IsDeleted, cancellationToken);

        if (schedule == null)
            return Result.Failure("On-call schedule not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(schedule.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        schedule.IsDeleted = true;
        schedule.ModifiedAtUtc = DateTime.UtcNow;
        schedule.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
