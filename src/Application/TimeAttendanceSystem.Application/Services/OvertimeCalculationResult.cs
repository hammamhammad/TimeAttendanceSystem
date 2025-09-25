using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Services;

/// <summary>
/// Result of overtime calculation containing detailed breakdown of overtime hours,
/// rates, and payment calculations for different periods and day types.
/// </summary>
public class OvertimeCalculationResult
{
    /// <summary>
    /// Total overtime hours across all periods and day types.
    /// </summary>
    public decimal TotalOvertimeHours { get; set; }

    /// <summary>
    /// Total overtime payment amount.
    /// </summary>
    public decimal TotalOvertimeAmount { get; set; }

    /// <summary>
    /// Pre-shift overtime details.
    /// </summary>
    public OvertimePeriodDetails PreShiftOvertime { get; set; } = new();

    /// <summary>
    /// Post-shift overtime details.
    /// </summary>
    public OvertimePeriodDetails PostShiftOvertime { get; set; } = new();

    /// <summary>
    /// Day type for the attendance date (Normal, PublicHoliday, OffDay).
    /// </summary>
    public DayType DayType { get; set; }

    /// <summary>
    /// Base overtime rate multiplier for the day type.
    /// </summary>
    public decimal BaseOvertimeRate { get; set; }

    /// <summary>
    /// Whether overtime calculation was enabled for this date.
    /// </summary>
    public bool IsOvertimeEnabled { get; set; }

    /// <summary>
    /// Whether flexible time was considered in calculations.
    /// </summary>
    public bool ConsideredFlexibleTime { get; set; }

    /// <summary>
    /// Any calculation notes or warnings.
    /// </summary>
    public List<string> CalculationNotes { get; set; } = new();

    /// <summary>
    /// Gets a summary of the overtime calculation.
    /// </summary>
    public string GetCalculationSummary()
    {
        if (!IsOvertimeEnabled || TotalOvertimeHours == 0)
        {
            return "No overtime calculated";
        }

        var summary = $"Total: {TotalOvertimeHours:F2}h";

        if (PreShiftOvertime.RawHours > 0)
        {
            summary += $" (Pre: {PreShiftOvertime.RawHours:F2}h)";
        }

        if (PostShiftOvertime.RawHours > 0)
        {
            summary += $" (Post: {PostShiftOvertime.RawHours:F2}h)";
        }

        summary += $" @ {BaseOvertimeRate}x rate";

        return summary;
    }
}

/// <summary>
/// Detailed breakdown of overtime for a specific period (pre-shift or post-shift).
/// </summary>
public class OvertimePeriodDetails
{
    /// <summary>
    /// Raw overtime hours before any adjustments.
    /// </summary>
    public decimal RawHours { get; set; }

    /// <summary>
    /// Overtime hours after considering flexible time adjustments.
    /// </summary>
    public decimal FlexibleTimeAdjustedHours { get; set; }

    /// <summary>
    /// Final overtime hours after rounding and minimum threshold application.
    /// </summary>
    public decimal FinalHours { get; set; }

    /// <summary>
    /// Overtime rate multiplier applied for this period.
    /// </summary>
    public decimal Rate { get; set; }

    /// <summary>
    /// Payment amount for this overtime period.
    /// </summary>
    public decimal Amount { get; set; }

    /// <summary>
    /// Whether this period exceeded the maximum allowed overtime hours.
    /// </summary>
    public bool ExceededMaximum { get; set; }

    /// <summary>
    /// Maximum allowed overtime hours for this period.
    /// </summary>
    public decimal MaximumAllowedHours { get; set; }

    /// <summary>
    /// Whether the overtime met the minimum threshold requirement.
    /// </summary>
    public bool MetMinimumThreshold { get; set; }

    /// <summary>
    /// Minimum threshold in minutes for overtime to be counted.
    /// </summary>
    public int MinimumThresholdMinutes { get; set; }

    /// <summary>
    /// Whether overtime was enabled for this period.
    /// </summary>
    public bool IsEnabled { get; set; }

    /// <summary>
    /// Flexible time hours that were considered in the calculation.
    /// </summary>
    public decimal FlexibleTimeHours { get; set; }

    /// <summary>
    /// Start time of the overtime period.
    /// </summary>
    public TimeOnly? StartTime { get; set; }

    /// <summary>
    /// End time of the overtime period.
    /// </summary>
    public TimeOnly? EndTime { get; set; }

    /// <summary>
    /// Any period-specific calculation notes.
    /// </summary>
    public List<string> Notes { get; set; } = new();

    /// <summary>
    /// Gets a summary of this overtime period.
    /// </summary>
    public string GetPeriodSummary()
    {
        if (!IsEnabled || FinalHours == 0)
        {
            return "No overtime";
        }

        var summary = $"{FinalHours:F2}h";

        if (RawHours != FinalHours)
        {
            summary += $" (from {RawHours:F2}h raw)";
        }

        if (FlexibleTimeHours > 0)
        {
            summary += $" (flex: {FlexibleTimeHours:F2}h)";
        }

        if (ExceededMaximum)
        {
            summary += $" (capped at {MaximumAllowedHours:F2}h)";
        }

        if (!MetMinimumThreshold)
        {
            summary += " (below threshold)";
        }

        return summary;
    }
}