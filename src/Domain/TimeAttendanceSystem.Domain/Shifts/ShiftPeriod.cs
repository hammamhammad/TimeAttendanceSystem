using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Shifts;

/// <summary>
/// Domain entity representing a working time period within a shift.
/// Supports single-period shifts (standard workday) and multi-period shifts (split shifts with breaks).
/// Handles night shifts spanning midnight and automatic total hours calculation.
/// </summary>
public class ShiftPeriod : BaseEntity
{
    /// <summary>
    /// Gets or sets the shift identifier this period belongs to.
    /// </summary>
    public long ShiftId { get; set; }

    /// <summary>
    /// Gets or sets the period sequence number within the shift.
    /// First period = 1, second period = 2 for multi-period shifts.
    /// </summary>
    public int PeriodOrder { get; set; }

    /// <summary>
    /// Gets or sets the start time of this working period.
    /// Format: HH:mm (24-hour format).
    /// </summary>
    public TimeOnly StartTime { get; set; }

    /// <summary>
    /// Gets or sets the end time of this working period.
    /// Format: HH:mm (24-hour format).
    /// If earlier than StartTime, indicates night shift spanning midnight.
    /// </summary>
    public TimeOnly EndTime { get; set; }

    /// <summary>
    /// Gets or sets the calculated duration of this period in hours.
    /// Automatically calculated based on StartTime and EndTime.
    /// Accounts for midnight spanning in night shifts.
    /// </summary>
    public decimal Hours { get; set; }

    /// <summary>
    /// Gets or sets whether this period spans midnight (night shift period).
    /// Automatically determined when EndTime is earlier than StartTime.
    /// </summary>
    public bool IsNightPeriod { get; set; }

    /// <summary>
    /// Navigation property to the parent shift.
    /// </summary>
    public Shift Shift { get; set; } = null!;

    /// <summary>
    /// Calculates the hours for this period, handling night shifts spanning midnight.
    /// Implements Rule 7.2: For Night Shifts, calculation spans midnight.
    /// </summary>
    public void CalculateHours()
    {
        if (EndTime > StartTime)
        {
            // Normal day period
            Hours = (decimal)(EndTime - StartTime).TotalHours;
            IsNightPeriod = false;
        }
        else if (EndTime < StartTime)
        {
            // Night period spanning midnight
            // Calculate time from start to midnight + time from midnight to end
            var hoursToMidnight = (decimal)(new TimeSpan(23, 59, 59) - StartTime.ToTimeSpan()).TotalHours + (1.0m / 60.0m); // Add 1 minute to reach midnight
            var hoursFromMidnight = (decimal)EndTime.ToTimeSpan().TotalHours;
            Hours = hoursToMidnight + hoursFromMidnight;
            IsNightPeriod = true;
        }
        else
        {
            // Same start and end time - invalid
            Hours = 0;
            IsNightPeriod = false;
        }
    }

    /// <summary>
    /// Validates that this period has valid start and end times.
    /// Implements Rule 8: If two periods are defined, both must be valid ranges.
    /// </summary>
    public (bool IsValid, string? ErrorMessage) ValidatePeriod()
    {
        if (StartTime == EndTime)
        {
            return (false, "Start time and end time cannot be the same");
        }

        if (Hours <= 0)
        {
            return (false, "Period must have positive working hours");
        }

        if (Hours > 24)
        {
            return (false, "Period cannot exceed 24 hours");
        }

        return (true, null);
    }
}