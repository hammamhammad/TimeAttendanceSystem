namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Enumeration defining the types of attendance transactions that can be recorded.
/// Represents different kinds of time tracking events in the attendance system.
/// </summary>
public enum TransactionType
{
    /// <summary>
    /// Check-in transaction marking the start of work.
    /// </summary>
    CheckIn = 1,

    /// <summary>
    /// Check-out transaction marking the end of work.
    /// </summary>
    CheckOut = 2,

    /// <summary>
    /// Break start transaction marking the beginning of a break period.
    /// </summary>
    BreakStart = 3,

    /// <summary>
    /// Break end transaction marking the end of a break period.
    /// </summary>
    BreakEnd = 4,

    /// <summary>
    /// Manual adjustment transaction for corrections.
    /// </summary>
    ManualAdjustment = 5,

    /// <summary>
    /// System-generated automatic check-out at shift end.
    /// </summary>
    AutoCheckOut = 6
}