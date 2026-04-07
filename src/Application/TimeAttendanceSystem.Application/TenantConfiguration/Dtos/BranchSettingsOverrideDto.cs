namespace TecAxle.Hrms.Application.TenantConfiguration.Dtos;

public class BranchSettingsOverrideDto
{
    public long Id { get; set; }
    public long BranchId { get; set; }

    // All nullable — null means "inherited from tenant"
    public bool? EnableGpsAttendance { get; set; }
    public bool? EnableNfcAttendance { get; set; }
    public bool? EnableBiometricAttendance { get; set; }
    public bool? EnableManualAttendance { get; set; }
    public bool? AutoCheckOutEnabled { get; set; }
    public string? AutoCheckOutTime { get; set; }
    public int? LateGracePeriodMinutes { get; set; }
    public int? EarlyLeaveGracePeriodMinutes { get; set; }
    public bool? TrackBreakTime { get; set; }
    public int? MinimumWorkingHoursForPresent { get; set; }
    public bool? MobileCheckInEnabled { get; set; }
    public bool? RequireNfcForMobile { get; set; }
    public bool? RequireGpsForMobile { get; set; }
}
