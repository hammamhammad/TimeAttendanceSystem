using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.TenantConfiguration.Queries.GetBranchSettingsOverride;

public class GetBranchSettingsOverrideQueryHandler : BaseHandler<GetBranchSettingsOverrideQuery, Result<BranchSettingsOverrideDto>>
{
    private readonly ITenantContext _tenantContext;

    public GetBranchSettingsOverrideQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _tenantContext = tenantContext;
    }

    public override async Task<Result<BranchSettingsOverrideDto>> Handle(GetBranchSettingsOverrideQuery request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure<BranchSettingsOverrideDto>("Tenant context not resolved");

        var branch = await Context.Branches
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == request.BranchId && b.TenantId == tenantId.Value && !b.IsDeleted, cancellationToken);

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
            AutoCheckOutEnabled = overrides.AutoCheckOutEnabled,
            AutoCheckOutTime = overrides.AutoCheckOutTime?.ToString("HH:mm"),
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
