namespace TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

public class BranchSettingsOverrideDto
{
    public long Id { get; set; }
    public long BranchId { get; set; }

    // All nullable — null means "inherited from company"
    public bool? EnableGpsAttendance { get; set; }
    public bool? EnableNfcAttendance { get; set; }
    public bool? EnableBiometricAttendance { get; set; }
    public bool? EnableManualAttendance { get; set; }
    // Phase 6: AutoCheckOutEnabled / AutoCheckOutTime removed.
    public int? LateGracePeriodMinutes { get; set; }
    public int? EarlyLeaveGracePeriodMinutes { get; set; }
    public bool? TrackBreakTime { get; set; }
    public int? MinimumWorkingHoursForPresent { get; set; }
    public bool? MobileCheckInEnabled { get; set; }
    public bool? RequireNfcForMobile { get; set; }
    public bool? RequireGpsForMobile { get; set; }
}
