using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetBranchSettingsOverride;

public class GetBranchSettingsOverrideQueryHandler : BaseHandler<GetBranchSettingsOverrideQuery, Result<BranchSettingsOverrideDto>>
{
    public GetBranchSettingsOverrideQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<BranchSettingsOverrideDto>> Handle(GetBranchSettingsOverrideQuery request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == request.BranchId && !b.IsDeleted, cancellationToken);

        if (branch == null)
            return Result.Failure<BranchSettingsOverrideDto>("Branch not found");

        var overrides = await Context.BranchSettingsOverrides
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.BranchId == request.BranchId && !o.IsDeleted, cancellationToken);

        if (overrides == null)
        {
            // No overrides — return empty DTO (all nulls = all inherited)
            return Result.Success(new BranchSettingsOverrideDto { BranchId = request.BranchId });
        }

        var dto = new BranchSettingsOverrideDto
        {
            Id = overrides.Id,
            BranchId = overrides.BranchId,
            EnableGpsAttendance = overrides.EnableGpsAttendance,
            EnableNfcAttendance = overrides.EnableNfcAttendance,
            EnableBiometricAttendance = overrides.EnableBiometricAttendance,
            EnableManualAttendance = overrides.EnableManualAttendance,
            // Phase 6: AutoCheckOutEnabled / AutoCheckOutTime removed.
            LateGracePeriodMinutes = overrides.LateGracePeriodMinutes,
            EarlyLeaveGracePeriodMinutes = overrides.EarlyLeaveGracePeriodMinutes,
            TrackBreakTime = overrides.TrackBreakTime,
            MinimumWorkingHoursForPresent = overrides.MinimumWorkingHoursForPresent,
            MobileCheckInEnabled = overrides.MobileCheckInEnabled,
            RequireNfcForMobile = overrides.RequireNfcForMobile,
            RequireGpsForMobile = overrides.RequireGpsForMobile
        };

        return Result.Success(dto);
    }
}
