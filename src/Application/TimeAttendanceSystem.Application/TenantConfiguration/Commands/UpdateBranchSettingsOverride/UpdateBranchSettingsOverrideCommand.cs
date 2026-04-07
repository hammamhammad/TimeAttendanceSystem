using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.TenantConfiguration.Commands.UpdateBranchSettingsOverride;

public record UpdateBranchSettingsOverrideCommand(
    long BranchId,
    bool? EnableGpsAttendance,
    bool? EnableNfcAttendance,
    bool? EnableBiometricAttendance,
    bool? EnableManualAttendance,
    bool? AutoCheckOutEnabled,
    string? AutoCheckOutTime,
    int? LateGracePeriodMinutes,
    int? EarlyLeaveGracePeriodMinutes,
    bool? TrackBreakTime,
    int? MinimumWorkingHoursForPresent,
    bool? MobileCheckInEnabled,
    bool? RequireNfcForMobile,
    bool? RequireGpsForMobile
) : ICommand<Result>;
