using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Branches;

/// <summary>
/// Branch-level overrides for company settings.
/// Every property is nullable: null = inherit from CompanySettings, non-null = branch-specific value.
/// One row per branch (optional — no row means full inheritance).
/// </summary>
public class BranchSettingsOverride : BaseEntity
{
    public long BranchId { get; set; }
    public Branch Branch { get; set; } = null!;

    // ── Attendance Overrides ─────────────────────────────

    public bool? EnableBiometricAttendance { get; set; }
    public bool? EnableManualAttendance { get; set; }
    public int? LateGracePeriodMinutes { get; set; }
    public int? EarlyLeaveGracePeriodMinutes { get; set; }
    public bool? TrackBreakTime { get; set; }
    public int? MinimumWorkingHoursForPresent { get; set; }
}
