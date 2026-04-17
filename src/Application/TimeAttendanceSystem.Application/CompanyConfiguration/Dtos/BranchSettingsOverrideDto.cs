namespace TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

public class BranchSettingsOverrideDto
{
    public long Id { get; set; }
    public long BranchId { get; set; }

    // All nullable — null means "inherited from company"
    public bool? EnableBiometricAttendance { get; set; }
    public bool? EnableManualAttendance { get; set; }
    public int? LateGracePeriodMinutes { get; set; }
    public int? EarlyLeaveGracePeriodMinutes { get; set; }
    public bool? TrackBreakTime { get; set; }
    public int? MinimumWorkingHoursForPresent { get; set; }
}
