namespace TimeAttendanceSystem.Domain.LeaveManagement;

/// <summary>
/// Types of leave balance transactions.
/// </summary>
public enum LeaveTransactionType
{
    /// <summary>
    /// Monthly accrual of leave balance.
    /// </summary>
    Accrual = 1,

    /// <summary>
    /// Leave used when vacation is approved.
    /// </summary>
    Usage = 2,

    /// <summary>
    /// Manual adjustment by administrator.
    /// </summary>
    Adjustment = 3,

    /// <summary>
    /// Carry-over from previous year.
    /// </summary>
    CarryOver = 4,

    /// <summary>
    /// Reset at end of year (use-it-or-lose-it).
    /// </summary>
    Reset = 5,

    /// <summary>
    /// Reserved for pending vacation request.
    /// </summary>
    Reservation = 6,

    /// <summary>
    /// Release reserved balance (vacation rejected/cancelled).
    /// </summary>
    ReservationRelease = 7
}
