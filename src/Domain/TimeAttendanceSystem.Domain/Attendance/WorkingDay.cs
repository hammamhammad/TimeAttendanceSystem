using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Domain entity representing a calculated working day with detailed time breakdown.
/// Provides comprehensive analysis of an employee's working time including core hours,
/// break periods, and overtime calculations based on shift rules and transactions.
/// </summary>
/// <remarks>
/// WorkingDay Entity Features:
/// - Detailed time period breakdown and analysis
/// - Core hours compliance tracking for flexible shifts
/// - Break time analysis and policy compliance
/// - Overtime calculations with different rates
/// - Working time distribution across periods
/// - Integration with shift policies and labor regulations
///
/// Time Period Analysis:
/// - Start/end time determination from transactions
/// - Work period identification and duration calculation
/// - Break period detection and duration tracking
/// - Core hours compliance for flexible shift requirements
/// - Overtime identification and categorization
///
/// Business Applications:
/// - Payroll calculation support with detailed time breakdown
/// - Labor law compliance monitoring and reporting
/// - Performance analysis and productivity metrics
/// - Shift effectiveness evaluation and optimization
/// - Employee time utilization reporting and insights
/// </remarks>
public class WorkingDay : BaseEntity
{
    /// <summary>
    /// Gets or sets the attendance record identifier this working day belongs to.
    /// Links to the daily attendance record for comprehensive tracking.
    /// </summary>
    public long AttendanceRecordId { get; set; }

    /// <summary>
    /// Gets or sets the calculated start time of the working day.
    /// Determined from the first check-in transaction of the day.
    /// </summary>
    public DateTime? WorkStartTime { get; set; }

    /// <summary>
    /// Gets or sets the calculated end time of the working day.
    /// Determined from the last check-out transaction of the day.
    /// </summary>
    public DateTime? WorkEndTime { get; set; }

    /// <summary>
    /// Gets or sets the total time spent on premises (including breaks).
    /// Calculated as the difference between first check-in and last check-out.
    /// </summary>
    public decimal TotalTimeOnPremises { get; set; }

    /// <summary>
    /// Gets or sets the total productive working time (excluding breaks).
    /// Sum of all work periods minus break periods.
    /// </summary>
    public decimal ProductiveWorkingTime { get; set; }

    /// <summary>
    /// Gets or sets the total time spent on breaks.
    /// Sum of all break periods during the working day.
    /// </summary>
    public decimal TotalBreakTime { get; set; }

    /// <summary>
    /// Gets or sets the number of separate break periods taken.
    /// Count of distinct break start/end transaction pairs.
    /// </summary>
    public int BreakPeriodCount { get; set; }

    /// <summary>
    /// Gets or sets the longest single break period duration.
    /// Maximum duration among all break periods taken.
    /// </summary>
    public decimal LongestBreakDuration { get; set; }

    /// <summary>
    /// Gets or sets the core hours worked within mandatory core time.
    /// Time worked during required core hours for flexible shifts.
    /// </summary>
    public decimal CoreHoursWorked { get; set; }

    /// <summary>
    /// Gets or sets whether core hours requirement was met.
    /// True if employee worked the required core hours period.
    /// </summary>
    public bool CoreHoursCompliant { get; set; } = true;

    /// <summary>
    /// Gets or sets the regular overtime hours (first tier).
    /// Overtime hours within the first overtime rate tier.
    /// </summary>
    public decimal RegularOvertimeHours { get; set; }

    /// <summary>
    /// Gets or sets the premium overtime hours (higher tier).
    /// Overtime hours in higher rate tiers for extended work.
    /// </summary>
    public decimal PremiumOvertimeHours { get; set; }

    /// <summary>
    /// Gets or sets the time worked before scheduled start time.
    /// Early arrival working time before official shift start.
    /// </summary>
    public decimal EarlyStartHours { get; set; }

    /// <summary>
    /// Gets or sets the time worked after scheduled end time.
    /// Late departure working time after official shift end.
    /// </summary>
    public decimal LateEndHours { get; set; }

    /// <summary>
    /// Gets or sets the efficiency percentage for this working day.
    /// Ratio of productive time to total time on premises.
    /// </summary>
    public decimal EfficiencyPercentage { get; set; }

    /// <summary>
    /// Gets or sets any gaps in time tracking (incomplete periods).
    /// Time periods where tracking was incomplete or inconsistent.
    /// </summary>
    public decimal TrackingGaps { get; set; }

    /// <summary>
    /// Gets or sets whether this working day calculation is complete.
    /// False if the day is still in progress or has incomplete transactions.
    /// </summary>
    public bool IsCalculationComplete { get; set; } = false;

    /// <summary>
    /// Gets or sets notes about the working day calculation.
    /// Additional context about time calculations or anomalies.
    /// </summary>
    public string? CalculationNotes { get; set; }

    // Navigation property
    /// <summary>
    /// Gets or sets the attendance record this working day belongs to.
    /// Navigation property providing access to related attendance data.
    /// </summary>
    public AttendanceRecord AttendanceRecord { get; set; } = null!;

    /// <summary>
    /// Calculates the total compensable hours including overtime.
    /// </summary>
    /// <returns>Total hours eligible for compensation</returns>
    public decimal CalculateTotalCompensableHours()
    {
        return ProductiveWorkingTime + RegularOvertimeHours + PremiumOvertimeHours;
    }

    /// <summary>
    /// Calculates the break time compliance percentage.
    /// </summary>
    /// <param name="maximumAllowedBreakTime">Maximum break time allowed per day</param>
    /// <returns>Compliance percentage (100% or less)</returns>
    public decimal CalculateBreakCompliance(decimal maximumAllowedBreakTime)
    {
        if (maximumAllowedBreakTime <= 0)
            return 100;

        var compliance = (maximumAllowedBreakTime - Math.Max(0, TotalBreakTime - maximumAllowedBreakTime)) / maximumAllowedBreakTime * 100;
        return Math.Max(0, Math.Min(100, compliance));
    }

    /// <summary>
    /// Determines if the working day has excessive break time.
    /// </summary>
    /// <param name="maximumAllowedBreakTime">Maximum allowed break time</param>
    /// <returns>True if break time exceeds the maximum allowed</returns>
    public bool HasExcessiveBreakTime(decimal maximumAllowedBreakTime)
    {
        return TotalBreakTime > maximumAllowedBreakTime;
    }

    /// <summary>
    /// Calculates the average break duration.
    /// </summary>
    /// <returns>Average duration per break period</returns>
    public decimal CalculateAverageBreakDuration()
    {
        if (BreakPeriodCount <= 0)
            return 0;

        return TotalBreakTime / BreakPeriodCount;
    }

    /// <summary>
    /// Validates the working day calculations and data integrity.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateWorkingDay()
    {
        var errors = new List<string>();

        // Validate time relationships
        if (WorkStartTime.HasValue && WorkEndTime.HasValue)
        {
            if (WorkEndTime <= WorkStartTime)
            {
                errors.Add("Work end time must be after work start time");
            }
        }

        // Validate productive time doesn't exceed total time
        if (ProductiveWorkingTime > TotalTimeOnPremises)
        {
            errors.Add("Productive working time cannot exceed total time on premises");
        }

        // Validate break time relationships
        if (TotalBreakTime < 0)
        {
            errors.Add("Total break time cannot be negative");
        }

        if (BreakPeriodCount < 0)
        {
            errors.Add("Break period count cannot be negative");
        }

        // Validate overtime calculations
        if (RegularOvertimeHours < 0 || PremiumOvertimeHours < 0)
        {
            errors.Add("Overtime hours cannot be negative");
        }

        // Validate efficiency percentage
        if (EfficiencyPercentage < 0 || EfficiencyPercentage > 100)
        {
            errors.Add("Efficiency percentage must be between 0 and 100");
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Gets a summary of the working day time distribution.
    /// </summary>
    /// <returns>Formatted string showing time breakdown</returns>
    public string GetTimeSummary()
    {
        var summary = $"Total: {TotalTimeOnPremises:F2}h, ";
        summary += $"Productive: {ProductiveWorkingTime:F2}h, ";
        summary += $"Breaks: {TotalBreakTime:F2}h";

        if (RegularOvertimeHours > 0 || PremiumOvertimeHours > 0)
        {
            summary += $", Overtime: {RegularOvertimeHours + PremiumOvertimeHours:F2}h";
        }

        return summary;
    }

    /// <summary>
    /// Determines if this is a perfect attendance day (no issues).
    /// </summary>
    /// <returns>True if all compliance metrics are met</returns>
    public bool IsPerfectAttendanceDay()
    {
        return CoreHoursCompliant &&
               TrackingGaps == 0 &&
               IsCalculationComplete &&
               EfficiencyPercentage >= 85; // Configurable threshold
    }
}