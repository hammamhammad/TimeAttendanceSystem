using TimeAttendanceSystem.Application.Services;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Service interface for attendance calculation operations.
/// Provides comprehensive attendance calculation methods based on transactions and shift rules.
/// </summary>
public interface IAttendanceCalculationService
{
    /// <summary>
    /// Calculates attendance record based on transactions and shift assignment.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="transactions">List of attendance transactions for the date</param>
    /// <param name="shiftAssignment">The shift assignment for the date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Calculated attendance record</returns>
    Task<AttendanceRecord> CalculateAttendanceAsync(
        long employeeId,
        DateTime attendanceDate,
        IEnumerable<AttendanceTransaction> transactions,
        ShiftAssignment? shiftAssignment,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Recalculates an existing attendance record with updated transactions.
    /// </summary>
    /// <param name="attendanceRecord">The attendance record to recalculate</param>
    /// <param name="transactions">Updated list of transactions</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Updated attendance record</returns>
    Task<AttendanceRecord> RecalculateAttendanceAsync(
        AttendanceRecord attendanceRecord,
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Calculates working day details from attendance record and transactions.
    /// </summary>
    /// <param name="attendanceRecord">The attendance record</param>
    /// <param name="transactions">List of transactions for the day</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Calculated working day details</returns>
    Task<WorkingDay> CalculateWorkingDayAsync(
        AttendanceRecord attendanceRecord,
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Determines attendance status based on shift rules and transactions.
    /// </summary>
    /// <param name="shift">The shift definition</param>
    /// <param name="transactions">List of transactions</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Calculated attendance status</returns>
    Task<AttendanceStatus> DetermineAttendanceStatusAsync(
        Shift? shift,
        IEnumerable<AttendanceTransaction> transactions,
        DateTime attendanceDate,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Determines attendance status based on shift rules, transactions, and holiday checking.
    /// </summary>
    /// <param name="employeeId">The employee identifier for holiday checking</param>
    /// <param name="shift">The shift definition</param>
    /// <param name="transactions">List of transactions</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Calculated attendance status</returns>
    Task<AttendanceStatus> DetermineAttendanceStatusAsync(
        long employeeId,
        Shift? shift,
        IEnumerable<AttendanceTransaction> transactions,
        DateTime attendanceDate,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Calculates working hours from transaction pairs.
    /// </summary>
    /// <param name="transactions">List of transactions ordered by time</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Tuple of working hours and break hours</returns>
    Task<(decimal WorkingHours, decimal BreakHours)> CalculateWorkingHoursAsync(
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Calculates comprehensive overtime details including pre-shift, post-shift, and rate calculations.
    /// </summary>
    /// <param name="employeeId">Employee identifier for branch context</param>
    /// <param name="attendanceDate">Date of attendance for day type calculation</param>
    /// <param name="transactions">All attendance transactions for the day</param>
    /// <param name="shift">The shift definition for overtime rules</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Comprehensive overtime calculation result</returns>
    Task<OvertimeCalculationResult> CalculateOvertimeAsync(
        long employeeId,
        DateTime attendanceDate,
        IEnumerable<AttendanceTransaction> transactions,
        Shift? shift,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Calculates late arrival minutes based on scheduled and actual times.
    /// </summary>
    /// <param name="scheduledStartTime">Scheduled start time</param>
    /// <param name="actualCheckInTime">Actual check-in time</param>
    /// <param name="gracePeriodMinutes">Grace period allowed</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Late minutes (0 if not late)</returns>
    Task<int> CalculateLateMinutesAsync(
        TimeOnly? scheduledStartTime,
        DateTime? actualCheckInTime,
        int? gracePeriodMinutes,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Calculates early leave minutes based on scheduled and actual times.
    /// </summary>
    /// <param name="scheduledEndTime">Scheduled end time</param>
    /// <param name="actualCheckOutTime">Actual check-out time</param>
    /// <param name="toleranceMinutes">Early leave tolerance</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Early leave minutes (0 if not early)</returns>
    Task<int> CalculateEarlyLeaveMinutesAsync(
        TimeOnly? scheduledEndTime,
        DateTime? actualCheckOutTime,
        int toleranceMinutes,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Validates that transactions follow proper sequence rules.
    /// </summary>
    /// <param name="transactions">List of transactions to validate</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Validation result with any issues found</returns>
    Task<TransactionValidationResult> ValidateTransactionSequenceAsync(
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the effective shift assignment for an employee on a specific date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="date">The date to check</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Effective shift assignment if any</returns>
    Task<ShiftAssignment?> GetEffectiveShiftAssignmentAsync(
        long employeeId,
        DateTime date,
        CancellationToken cancellationToken = default);
}