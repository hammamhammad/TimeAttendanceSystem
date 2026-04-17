using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Commands.UpdateBranchSettingsOverride;

public record UpdateBranchSettingsOverrideCommand(
    long BranchId,
    bool? EnableGpsAttendance,
    bool? EnableNfcAttendance,
    bool? EnableBiometricAttendance,
    bool? EnableManualAttendance,
    // Phase 6: AutoCheckOutEnabled / AutoCheckOutTime removed.
    int? LateGracePeriodMinutes,
    int? EarlyLeaveGracePeriodMinutes,
    bool? TrackBreakTime,
    int? MinimumWorkingHoursForPresent,
    bool? MobileCheckInEnabled,
    bool? RequireNfcForMobile,
    bool? RequireGpsForMobile
) : ICommand<Result>;
