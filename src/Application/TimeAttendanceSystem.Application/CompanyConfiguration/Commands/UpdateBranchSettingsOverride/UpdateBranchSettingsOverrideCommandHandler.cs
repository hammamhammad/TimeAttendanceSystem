using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Commands.UpdateBranchSettingsOverride;

public class UpdateBranchSettingsOverrideCommandHandler : BaseHandler<UpdateBranchSettingsOverrideCommand, Result>
{
    public UpdateBranchSettingsOverrideCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateBranchSettingsOverrideCommand request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId && !b.IsDeleted, cancellationToken);

        if (branch == null)
            return Result.Failure("Branch not found");

        var overrides = await Context.BranchSettingsOverrides
            .FirstOrDefaultAsync(o => o.BranchId == request.BranchId && !o.IsDeleted, cancellationToken);

        if (overrides == null)
        {
            overrides = new BranchSettingsOverride
            {
                BranchId = request.BranchId,
                CreatedBy = CurrentUser.Username ?? "SYSTEM"
            };
            Context.BranchSettingsOverrides.Add(overrides);
        }

        overrides.EnableBiometricAttendance = request.EnableBiometricAttendance;
        overrides.EnableManualAttendance = request.EnableManualAttendance;
        overrides.LateGracePeriodMinutes = request.LateGracePeriodMinutes;
        overrides.EarlyLeaveGracePeriodMinutes = request.EarlyLeaveGracePeriodMinutes;
        overrides.TrackBreakTime = request.TrackBreakTime;
        overrides.MinimumWorkingHoursForPresent = request.MinimumWorkingHoursForPresent;
        overrides.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
