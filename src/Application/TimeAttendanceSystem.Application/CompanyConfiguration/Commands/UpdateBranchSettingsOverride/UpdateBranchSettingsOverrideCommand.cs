using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Commands.UpdateBranchSettingsOverride;

public record UpdateBranchSettingsOverrideCommand(
    long BranchId,
    bool? EnableBiometricAttendance,
    bool? EnableManualAttendance,
    int? LateGracePeriodMinutes,
    int? EarlyLeaveGracePeriodMinutes,
    bool? TrackBreakTime,
    int? MinimumWorkingHoursForPresent
) : ICommand<Result>;
