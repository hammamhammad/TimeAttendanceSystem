namespace TimeAttendanceSystem.Application.Settings.Commands.UpdateOvertimeConfiguration;

/// <summary>
/// Request object for updating an existing overtime configuration.
/// Contains all modifiable overtime calculation rules and policies with the configuration identifier.
/// </summary>
/// <param name="Id">Unique identifier of the overtime configuration to update</param>
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
/// <param name="IsActive">Whether this configuration should be active</param>
/// <param name="EffectiveFromDate">Date when this configuration becomes effective</param>
/// <param name="EffectiveToDate">Optional end date for this configuration</param>
/// <remarks>
/// Update Behavior:
/// - All fields are required and will completely replace existing configuration values
/// - Partial updates are not supported - provide all current values even if unchanged
/// - Configuration must exist and be accessible to the requesting user
/// - Changes to active configuration take effect immediately
/// - Historical overtime calculations are not retroactively modified
///
/// Validation Rules:
/// - Configuration ID must exist and be valid
/// - At least one overtime type (pre-shift or post-shift) must be enabled
/// - All rate multipliers must be positive numbers
/// - Minimum overtime minutes must be between 0 and 120
/// - Maximum overtime hours must be reasonable (pre-shift ≤ 8, post-shift ≤ 12)
/// - Grace period must be between 0 and 60 minutes
/// - Rounding interval must be 0, 5, 10, 15, or 30 minutes
/// - Effective from date cannot be more than 30 days in future if active
/// - Effective to date must be after effective from date
///
/// Business Impact:
/// - Active configuration changes affect all future overtime calculations
/// - Rate changes impact payroll calculations for subsequent periods
/// - Policy changes may require employee notification
/// - Effective date changes allow for scheduled policy implementation
/// - Maximum limit changes affect overtime approval workflows
///
/// Audit Considerations:
/// - All updates are logged for compliance and audit trails
/// - Previous configuration values are preserved in system logs
/// - User identity and timestamp recorded for accountability
/// - Changes to critical rates may require additional approval
/// - Policy note updates should document reason for changes
///
/// Concurrency Handling:
/// - Updates use optimistic concurrency control
/// - Simultaneous updates may result in conflicts requiring resolution
/// - Last-writer-wins approach for non-conflicting changes
/// - Critical rate changes may require exclusive access during update
/// - Active configuration switches are handled atomically
/// </remarks>
public record UpdateOvertimeConfigurationRequest(
    long Id,
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