namespace TimeAttendanceSystem.Domain.Shifts;

/// <summary>
/// Enumeration defining the types of shifts supported by the time attendance system.
/// Determines how working hours are calculated and validated for different shift patterns.
/// </summary>
public enum ShiftType
{
    /// <summary>
    /// Time-based shift with fixed start and end times.
    /// Requires specific check-in/check-out times with grace period and flexible hours support.
    /// </summary>
    TimeBased = 1,

    /// <summary>
    /// Hours-only shift requiring specific total hours per day.
    /// No fixed start/end times - employees can work flexible hours to meet daily hour requirement.
    /// </summary>
    HoursOnly = 2
}