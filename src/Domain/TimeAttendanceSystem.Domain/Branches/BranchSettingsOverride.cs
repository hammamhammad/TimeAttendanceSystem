using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Branches;

/// <summary>
/// Branch-level overrides for company settings.
/// Every property is nullable: null = inherit from CompanySettings, non-null = branch-specific value.
/// Only attendance and mobile settings are branch-overridable.
/// One row per branch (optional — no row means full inheritance).
/// </summary>
public class BranchSettingsOverride : BaseEntity
{
    public long BranchId { get; set; }
    public Branch Branch { get; set; } = null!;

    // ── Attendance Overrides ─────────────────────────────

    public bool? EnableGpsAttendance { get; set; }
    public bool? EnableNfcAttendance { get; set; }
    public bool? EnableBiometricAttendance { get; set; }
    public bool? EnableManualAttendance { get; set; }
    // Phase 6 (v14.6): removed `AutoCheckOutEnabled` / `AutoCheckOutTime` — superseded by
    // per-shift logic. See CompanySettings.
    public int? LateGracePeriodMinutes { get; set; }
    public int? EarlyLeaveGracePeriodMinutes { get; set; }
    public bool? TrackBreakTime { get; set; }
    public int? MinimumWorkingHoursForPresent { get; set; }

    // ── Mobile Overrides ─────────────────────────────────

    public bool? MobileCheckInEnabled { get; set; }
    public bool? RequireNfcForMobile { get; set; }
    public bool? RequireGpsForMobile { get; set; }
}
