namespace TimeAttendanceSystem.Application.Settings.Commands.CreateOvertimeConfiguration;

/// <summary>
/// Request object for creating a new overtime configuration.
/// Contains all necessary data to establish overtime calculation rules and policies.
/// </summary>
/// <param name="EnablePreShiftOvertime">Enable overtime calculation for work before scheduled shift start</param>
/// <param name="EnablePostShiftOvertime">Enable overtime calculation for work after scheduled shift end</param>
/// <param name="NormalDayRate">Overtime rate multiplier for normal working days (e.g., 1.5 = 150%)</param>
/// <param name="PublicHolidayRate">Overtime rate multiplier for public holidays (e.g., 2.0 = 200%)</param>
/// <param name="OffDayRate">Overtime rate multiplier for off days/weekends (e.g., 2.5 = 250%)</param>
/// <param name="MinimumOvertimeMinutes">Minimum minutes of overtime before it's counted (typically 15-30)</param>
/// <param name="ConsiderFlexibleTime">Whether to account for flexible work time when calculating overtime</param>
/// <param name="MaxPreShiftOvertimeHours">Maximum pre-shift overtime hours allowed per day</param>
/// <param name="MaxPostShiftOvertimeHours">Maximum post-shift overtime hours allowed per day</param>
/// <param name="RequireApproval">Whether overtime requires manager approval</param>
/// <param name="OvertimeGracePeriodMinutes">Grace period in minutes before overtime calculation begins</param>
/// <param name="WeekendAsOffDay">Automatically treat weekends as off days for rate calculation</param>
/// <param name="RoundingIntervalMinutes">Rounding interval for overtime (0=none, 15=quarter hour, 30=half hour)</param>
/// <param name="PolicyNotes">Additional notes about overtime policies and rules</param>
/// <param name="IsActive">Whether this configuration should be active immediately</param>
/// <param name="EffectiveFromDate">Date when this configuration becomes effective</param>
/// <param name="EffectiveToDate">Optional end date for this configuration</param>
/// <remarks>
/// Validation Rules:
/// - At least one overtime type (pre-shift or post-shift) must be enabled
/// - All rate multipliers must be positive numbers
/// - Minimum overtime minutes must be between 0 and 120
/// - Maximum overtime hours must be reasonable (pre-shift ≤ 8, post-shift ≤ 12)
/// - Grace period must be between 0 and 60 minutes
/// - Rounding interval must be 0, 5, 10, 15, or 30 minutes
/// - Effective from date cannot be more than 30 days in future if active
/// - Effective to date must be after effective from date
///
/// Business Considerations:
/// - Pre-shift overtime accounts for early arrivals before scheduled start
/// - Post-shift overtime covers extended work beyond scheduled end
/// - Rate multipliers reflect labor law and organizational policy
/// - Minimum threshold prevents administrative overhead for trivial overtime
/// - Maximum limits protect against excessive overtime without approval
/// - Grace period accommodates normal timing variations
/// - Flexible time integration respects modern work arrangements
/// - Weekend classification simplifies day type determination
///
/// Default Recommendations:
/// - Normal day rate: 1.5x (time and a half)
/// - Holiday rate: 2.0x (double time)
/// - Off day rate: 2.5x (premium rate)
/// - Minimum threshold: 15 minutes
/// - Grace period: 5 minutes
/// - Rounding: 15 minutes (quarter hour)
/// - Max pre-shift: 2 hours
/// - Max post-shift: 4 hours
/// </remarks>
public record CreateOvertimeConfigurationRequest(
    bool EnablePreShiftOvertime,
    bool EnablePostShiftOvertime,
    decimal NormalDayRate,
    decimal PublicHolidayRate,
    decimal OffDayRate,
    int MinimumOvertimeMinutes,
    bool ConsiderFlexibleTime,
    decimal MaxPreShiftOvertimeHours,
    decimal MaxPostShiftOvertimeHours,
    bool RequireApproval,
    int OvertimeGracePeriodMinutes,
    bool WeekendAsOffDay,
    int RoundingIntervalMinutes,
    string? PolicyNotes,
    bool IsActive,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate
);