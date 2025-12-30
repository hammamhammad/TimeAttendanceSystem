using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Service interface for leave accrual calculations and balance management.
/// </summary>
public interface ILeaveAccrualService
{
    /// <summary>
    /// Processes monthly accrual for a specific employee and year.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="year">Year to process accrual for</param>
    /// <param name="month">Month to process accrual for (1-12)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    Task<Result> ProcessMonthlyAccrualForEmployeeAsync(
        long employeeId,
        int year,
        int month,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Processes monthly accrual for all employees.
    /// </summary>
    /// <param name="year">Year to process accrual for</param>
    /// <param name="month">Month to process accrual for (1-12)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result with number of employees processed</returns>
    Task<Result<int>> ProcessMonthlyAccrualForAllEmployeesAsync(
        int year,
        int month,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Initializes leave balance for an employee for a specific year.
    /// Creates balance records based on entitlements.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="year">Year to initialize balance for</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    Task<Result> InitializeLeaveBalanceForYearAsync(
        long employeeId,
        int year,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Reserves leave balance for a pending vacation request.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Vacation type ID</param>
    /// <param name="days">Number of days to reserve</param>
    /// <param name="vacationId">Vacation request ID</param>
    /// <param name="year">Year</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    Task<Result> ReserveLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        long vacationId,
        int year,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Releases reserved leave balance (when vacation is cancelled or rejected).
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Vacation type ID</param>
    /// <param name="days">Number of days to release</param>
    /// <param name="vacationId">Vacation request ID</param>
    /// <param name="year">Year</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    Task<Result> ReleaseLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        long vacationId,
        int year,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Confirms leave usage (when vacation is approved).
    /// Moves balance from pending to used.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Vacation type ID</param>
    /// <param name="days">Number of days to confirm</param>
    /// <param name="vacationId">Vacation request ID</param>
    /// <param name="year">Year</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    Task<Result> ConfirmLeaveUsageAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        long vacationId,
        int year,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks if employee has sufficient balance for a vacation request.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Vacation type ID</param>
    /// <param name="days">Number of days requested</param>
    /// <param name="year">Year</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating if balance is sufficient</returns>
    Task<Result<bool>> CheckSufficientBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        int year,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the current leave balance for an employee.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Vacation type ID</param>
    /// <param name="year">Year</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Leave balance or null if not found</returns>
    Task<LeaveBalance?> GetLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        int year,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Processes year-end carry-over for an employee.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="fromYear">Year to carry over from</param>
    /// <param name="toYear">Year to carry over to</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    Task<Result> ProcessYearEndCarryOverAsync(
        long employeeId,
        int fromYear,
        int toYear,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Applies manual adjustment to leave balance.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Vacation type ID</param>
    /// <param name="adjustmentDays">Adjustment amount (positive or negative)</param>
    /// <param name="reason">Reason for adjustment</param>
    /// <param name="year">Year</param>
    /// <param name="adjustedBy">User making the adjustment</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    Task<Result> AdjustLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal adjustmentDays,
        string reason,
        int year,
        string adjustedBy,
        CancellationToken cancellationToken = default);
}
