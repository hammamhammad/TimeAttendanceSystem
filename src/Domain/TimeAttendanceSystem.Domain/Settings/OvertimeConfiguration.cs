using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Settings;

/// <summary>
/// Domain entity representing the overtime calculation configuration for the organization.
/// Controls how overtime hours are calculated, including rates and conditions.
/// </summary>
/// <remarks>
/// OvertimeConfiguration Entity Features:
/// - Pre-shift and post-shift overtime enablement
/// - Configurable rate multipliers for different day types
/// - Flexible time consideration for overtime calculations
/// - Minimum overtime threshold configuration
/// - Organization-wide settings with audit trail
///
/// Business Rules:
/// - Pre-shift overtime: Hours worked before scheduled shift start (considering flexible time)
/// - Post-shift overtime: Hours worked after scheduled shift end (considering flexible time)
/// - Rate multipliers apply based on day type (normal/holiday/off day)
/// - Minimum threshold prevents micro-overtime payments
/// - Flexible time rules affect when overtime begins calculation
///
/// Day Type Classification:
/// - Normal Day: Regular working day with standard overtime rate
/// - Public Holiday: Government-declared holidays with premium rate
/// - Off Day: Weekend or designated rest days with highest rate
/// </remarks>
public class OvertimeConfiguration : BaseEntity
{
    /// <summary>
    /// Gets or sets whether pre-shift overtime is enabled.
    /// When enabled, hours worked before the scheduled shift start time are counted as overtime.
    /// </summary>
    public bool EnablePreShiftOvertime { get; set; } = false;

    /// <summary>
    /// Gets or sets whether post-shift overtime is enabled.
    /// When enabled, hours worked after the scheduled shift end time are counted as overtime.
    /// </summary>
    public bool EnablePostShiftOvertime { get; set; } = true;

    /// <summary>
    /// Gets or sets the overtime rate multiplier for normal working days.
    /// Example: 1.5 means 150% of regular hourly rate.
    /// </summary>
    public decimal NormalDayRate { get; set; } = 1.5m;

    /// <summary>
    /// Gets or sets the overtime rate multiplier for public holidays.
    /// Example: 2.0 means 200% of regular hourly rate.
    /// </summary>
    public decimal PublicHolidayRate { get; set; } = 2.0m;

    /// <summary>
    /// Gets or sets the overtime rate multiplier for off days (weekends/rest days).
    /// Example: 2.5 means 250% of regular hourly rate.
    /// </summary>
    public decimal OffDayRate { get; set; } = 2.5m;

    /// <summary>
    /// Gets or sets the minimum overtime threshold in minutes.
    /// Overtime is only counted if it exceeds this threshold.
    /// Example: 15 means overtime must be at least 15 minutes to count.
    /// </summary>
    public int MinimumOvertimeMinutes { get; set; } = 15;

    /// <summary>
    /// Gets or sets whether flexible time rules should be considered when calculating overtime.
    /// When true, flexible arrival/departure windows affect when overtime begins.
    /// </summary>
    public bool ConsiderFlexibleTime { get; set; } = true;

    /// <summary>
    /// Gets or sets the maximum pre-shift overtime hours allowed per day.
    /// Prevents excessive pre-shift overtime claims.
    /// </summary>
    public decimal MaxPreShiftOvertimeHours { get; set; } = 2.0m;

    /// <summary>
    /// Gets or sets the maximum post-shift overtime hours allowed per day.
    /// Prevents excessive post-shift overtime without approval.
    /// </summary>
    public decimal MaxPostShiftOvertimeHours { get; set; } = 4.0m;

    /// <summary>
    /// Gets or sets whether overtime calculation requires manager approval.
    /// When true, overtime must be pre-approved or validated by a manager.
    /// </summary>
    public bool RequireApproval { get; set; } = false;

    /// <summary>
    /// Gets or sets the grace period in minutes for overtime calculation.
    /// Small amounts of extra time within this period are not counted as overtime.
    /// </summary>
    public int OvertimeGracePeriodMinutes { get; set; } = 5;

    /// <summary>
    /// Gets or sets whether weekend days are automatically considered off days.
    /// When true, Saturday and Sunday use the off day rate.
    /// </summary>
    public bool WeekendAsOffDay { get; set; } = true;

    /// <summary>
    /// Gets or sets whether overtime calculation is rounded to nearest interval.
    /// Common values: 15, 30 (minutes). 0 = no rounding.
    /// </summary>
    public int RoundingIntervalMinutes { get; set; } = 15;

    /// <summary>
    /// Gets or sets additional notes or policies regarding overtime calculation.
    /// Free-text field for organization-specific overtime policies.
    /// </summary>
    public string? PolicyNotes { get; set; }

    /// <summary>
    /// Gets or sets whether this configuration is currently active.
    /// Allows for configuration versioning and activation control.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets the effective date from which this configuration applies.
    /// Enables scheduled configuration changes.
    /// </summary>
    public DateTime EffectiveFromDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the end date until which this configuration is valid.
    /// Null means indefinite validity.
    /// </summary>
    public DateTime? EffectiveToDate { get; set; }

    /// <summary>
    /// Validates the overtime configuration business rules and data integrity.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateConfiguration()
    {
        var errors = new List<string>();

        // Validate rate multipliers
        if (NormalDayRate <= 0)
            errors.Add("Normal day rate must be greater than 0");

        if (PublicHolidayRate <= 0)
            errors.Add("Public holiday rate must be greater than 0");

        if (OffDayRate <= 0)
            errors.Add("Off day rate must be greater than 0");

        // Validate minimum overtime threshold
        if (MinimumOvertimeMinutes < 0)
            errors.Add("Minimum overtime minutes cannot be negative");

        if (MinimumOvertimeMinutes > 120)
            errors.Add("Minimum overtime minutes should not exceed 2 hours (120 minutes)");

        // Validate maximum overtime limits
        if (MaxPreShiftOvertimeHours < 0)
            errors.Add("Maximum pre-shift overtime hours cannot be negative");

        if (MaxPostShiftOvertimeHours < 0)
            errors.Add("Maximum post-shift overtime hours cannot be negative");

        if (MaxPreShiftOvertimeHours > 8)
            errors.Add("Maximum pre-shift overtime hours should not exceed 8 hours");

        if (MaxPostShiftOvertimeHours > 12)
            errors.Add("Maximum post-shift overtime hours should not exceed 12 hours");

        // Validate grace period
        if (OvertimeGracePeriodMinutes < 0)
            errors.Add("Overtime grace period cannot be negative");

        if (OvertimeGracePeriodMinutes > 60)
            errors.Add("Overtime grace period should not exceed 1 hour");

        // Validate rounding interval
        if (RoundingIntervalMinutes < 0)
            errors.Add("Rounding interval cannot be negative");

        if (RoundingIntervalMinutes > 0 && RoundingIntervalMinutes != 5 && RoundingIntervalMinutes != 10 &&
            RoundingIntervalMinutes != 15 && RoundingIntervalMinutes != 30)
        {
            errors.Add("Rounding interval must be 0, 5, 10, 15, or 30 minutes");
        }

        // Validate effective dates
        if (EffectiveToDate.HasValue && EffectiveToDate <= EffectiveFromDate)
            errors.Add("Effective to date must be after effective from date");

        // Business logic validations
        if (!EnablePreShiftOvertime && !EnablePostShiftOvertime)
            errors.Add("At least one overtime type (pre-shift or post-shift) must be enabled");

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Calculates the effective overtime rate for a given day type.
    /// </summary>
    /// <param name="dayType">The type of day (normal, holiday, off day)</param>
    /// <returns>The overtime rate multiplier for the specified day type</returns>
    public decimal GetOvertimeRate(DayType dayType)
    {
        return dayType switch
        {
            DayType.Normal => NormalDayRate,
            DayType.PublicHoliday => PublicHolidayRate,
            DayType.OffDay => OffDayRate,
            _ => NormalDayRate
        };
    }

    /// <summary>
    /// Rounds overtime hours based on the configured rounding interval.
    /// </summary>
    /// <param name="overtimeHours">The raw overtime hours to round</param>
    /// <returns>Rounded overtime hours based on configuration</returns>
    public decimal RoundOvertimeHours(decimal overtimeHours)
    {
        if (RoundingIntervalMinutes <= 0)
            return overtimeHours;

        var intervalHours = RoundingIntervalMinutes / 60.0m;
        return Math.Round(overtimeHours / intervalHours) * intervalHours;
    }

    /// <summary>
    /// Determines if the overtime amount meets the minimum threshold requirement.
    /// </summary>
    /// <param name="overtimeMinutes">Overtime amount in minutes</param>
    /// <returns>True if overtime meets minimum threshold</returns>
    public bool MeetsMinimumThreshold(int overtimeMinutes)
    {
        return overtimeMinutes >= MinimumOvertimeMinutes;
    }

    /// <summary>
    /// Gets a description of the current overtime configuration.
    /// </summary>
    /// <returns>String description of the configuration</returns>
    public string GetConfigurationSummary()
    {
        var summary = $"Overtime Config: ";

        if (EnablePreShiftOvertime && EnablePostShiftOvertime)
            summary += "Pre & Post-shift enabled";
        else if (EnablePreShiftOvertime)
            summary += "Pre-shift only";
        else if (EnablePostShiftOvertime)
            summary += "Post-shift only";
        else
            summary += "Disabled";

        summary += $" | Rates: Normal {NormalDayRate:F1}x, Holiday {PublicHolidayRate:F1}x, Off-day {OffDayRate:F1}x";
        summary += $" | Min: {MinimumOvertimeMinutes}min";

        if (ConsiderFlexibleTime)
            summary += " | Flex-aware";

        return summary;
    }
}

/// <summary>
/// Enumeration representing different types of days for overtime calculation.
/// </summary>
public enum DayType
{
    /// <summary>
    /// Regular working day with standard overtime rates.
    /// </summary>
    Normal = 0,

    /// <summary>
    /// Public holiday with premium overtime rates.
    /// </summary>
    PublicHoliday = 1,

    /// <summary>
    /// Off day (weekend/rest day) with highest overtime rates.
    /// </summary>
    OffDay = 2
}