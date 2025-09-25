using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Settings.Queries.GetOvertimeConfigurations;

/// <summary>
/// Data Transfer Object representing overtime configuration information for list views and display operations.
/// Contains overtime calculation rules, rate multipliers, and policy settings without sensitive internal data.
/// </summary>
/// <param name="Id">Unique identifier for the overtime configuration</param>
/// <param name="EnablePreShiftOvertime">Indicates if pre-shift overtime calculation is enabled</param>
/// <param name="EnablePostShiftOvertime">Indicates if post-shift overtime calculation is enabled</param>
/// <param name="NormalDayRate">Overtime rate multiplier for normal working days</param>
/// <param name="PublicHolidayRate">Overtime rate multiplier for public holidays</param>
/// <param name="OffDayRate">Overtime rate multiplier for off days (weekends/rest days)</param>
/// <param name="MinimumOvertimeMinutes">Minimum overtime threshold in minutes before overtime is counted</param>
/// <param name="ConsiderFlexibleTime">Indicates if flexible time rules should be considered in overtime calculations</param>
/// <param name="MaxPreShiftOvertimeHours">Maximum allowed pre-shift overtime hours per day</param>
/// <param name="MaxPostShiftOvertimeHours">Maximum allowed post-shift overtime hours per day</param>
/// <param name="RequireApproval">Indicates if overtime requires manager approval</param>
/// <param name="OvertimeGracePeriodMinutes">Grace period in minutes for overtime calculation</param>
/// <param name="WeekendAsOffDay">Indicates if weekends are automatically treated as off days</param>
/// <param name="RoundingIntervalMinutes">Rounding interval for overtime hours (0 = no rounding)</param>
/// <param name="PolicyNotes">Additional notes or policies regarding overtime calculation</param>
/// <param name="IsActive">Indicates if this configuration is currently active</param>
/// <param name="EffectiveFromDate">Date from which this configuration becomes effective</param>
/// <param name="EffectiveToDate">Date until which this configuration remains valid (null = indefinite)</param>
/// <param name="CreatedAtUtc">UTC timestamp when the configuration was created</param>
/// <param name="CreatedBy">Username or identifier of who created this configuration</param>
/// <remarks>
/// DTO Design Principles:
/// - Contains complete overtime configuration data for display and management
/// - Includes all rate multipliers and policy settings for transparency
/// - Provides effective date range for configuration versioning
/// - Optimized for serialization and API response transmission
/// - Immutable record type ensures data integrity during transport
///
/// Business Rules Represented:
/// - Pre-shift and post-shift overtime enablement controls
/// - Differentiated rates for normal days, holidays, and off days
/// - Minimum threshold prevents micro-overtime calculations
/// - Maximum limits protect against excessive overtime claims
/// - Grace period provides flexibility for minor time variations
/// - Rounding intervals standardize overtime calculations
/// - Approval requirements enforce business authorization workflows
///
/// Configuration Management:
/// - Active status enables configuration activation/deactivation
/// - Effective date range supports scheduled configuration changes
/// - Created timestamp and user provide audit trail
/// - Policy notes allow documentation of business rules
/// - Flexible time consideration integrates with shift flexibility
///
/// Rate Structure:
/// - Normal day rate: Standard overtime multiplier (typically 1.5x)
/// - Public holiday rate: Premium rate for holiday work (typically 2.0x)
/// - Off day rate: Highest rate for weekend/rest day work (typically 2.5x)
/// - Weekend automatic classification simplifies day type determination
///
/// Time Management:
/// - Minimum overtime threshold prevents trivial overtime payments
/// - Maximum overtime limits control daily overtime exposure
/// - Grace period accommodates minor timing variations
/// - Rounding intervals standardize payroll calculations
/// - Flexible time integration respects shift scheduling policies
///
/// Usage Contexts:
/// - Overtime configuration management interfaces
/// - Payroll system integration and rate display
/// - Policy documentation and compliance reporting
/// - Configuration comparison and versioning
/// - API responses for configuration retrieval
/// </remarks>
public record OvertimeConfigurationDto(
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
    DateTime? EffectiveToDate,
    DateTime CreatedAtUtc,
    string CreatedBy
);