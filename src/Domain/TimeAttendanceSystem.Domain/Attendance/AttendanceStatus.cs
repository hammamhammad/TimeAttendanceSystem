namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Enumeration defining the possible attendance status values for employees.
/// Represents the calculated attendance state based on shift rules and check-in/out transactions.
/// </summary>
public enum AttendanceStatus
{
    /// <summary>
    /// Employee is present and has checked in according to shift requirements.
    /// </summary>
    Present = 1,

    /// <summary>
    /// Employee is absent - no check-in recorded and shift requires attendance.
    /// </summary>
    Absent = 2,

    /// <summary>
    /// Employee checked in late beyond the allowed grace period.
    /// </summary>
    Late = 3,

    /// <summary>
    /// Employee left early before the required shift end time.
    /// </summary>
    EarlyLeave = 4,

    /// <summary>
    /// Employee is on approved vacation or leave.
    /// </summary>
    OnLeave = 5,

    /// <summary>
    /// Employee is on a scheduled day off (non-working day per shift).
    /// </summary>
    DayOff = 6,

    /// <summary>
    /// Employee worked overtime beyond the regular shift hours.
    /// </summary>
    Overtime = 7,

    /// <summary>
    /// Employee has incomplete attendance (missing check-out).
    /// </summary>
    Incomplete = 8,

    /// <summary>
    /// Employee worked on a scheduled holiday.
    /// </summary>
    Holiday = 9,

    /// <summary>
    /// Employee is on sick leave.
    /// </summary>
    SickLeave = 10,

    /// <summary>
    /// Employee attendance is pending calculation or review.
    /// </summary>
    Pending = 11
}