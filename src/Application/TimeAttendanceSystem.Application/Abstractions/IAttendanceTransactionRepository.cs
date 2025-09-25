using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Repository interface for attendance transaction data access operations.
/// Provides comprehensive data access methods for transaction management and tracking.
/// </summary>
public interface IAttendanceTransactionRepository
{
    /// <summary>
    /// Gets an attendance transaction by identifier.
    /// </summary>
    /// <param name="id">The transaction identifier</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Attendance transaction if found, null otherwise</returns>
    Task<AttendanceTransaction?> GetByIdAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance transactions for an employee on a specific date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance transactions ordered by time</returns>
    Task<List<AttendanceTransaction>> GetByEmployeeAndDateAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance transactions for an employee within a date range.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance transactions ordered by date and time</returns>
    Task<List<AttendanceTransaction>> GetByEmployeeAndDateRangeAsync(long employeeId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the latest transaction for an employee.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Latest attendance transaction if any</returns>
    Task<AttendanceTransaction?> GetLatestByEmployeeAsync(long employeeId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets transactions that need verification.
    /// </summary>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of unverified transactions</returns>
    Task<List<AttendanceTransaction>> GetUnverifiedTransactionsAsync(long? branchId = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets manual transactions within a date range.
    /// </summary>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of manual transactions</returns>
    Task<List<AttendanceTransaction>> GetManualTransactionsAsync(long? branchId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets transactions by type within a date range.
    /// </summary>
    /// <param name="transactionType">The transaction type to filter</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of transactions of specified type</returns>
    Task<List<AttendanceTransaction>> GetByTypeAndDateRangeAsync(TransactionType transactionType, long? branchId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new attendance transaction.
    /// </summary>
    /// <param name="transaction">The transaction to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created transaction</returns>
    Task<AttendanceTransaction> CreateAsync(AttendanceTransaction transaction, CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates multiple transactions in batch.
    /// </summary>
    /// <param name="transactions">List of transactions to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of created transactions</returns>
    Task<List<AttendanceTransaction>> CreateBatchAsync(IEnumerable<AttendanceTransaction> transactions, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing transaction.
    /// </summary>
    /// <param name="transaction">The transaction to update</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The updated transaction</returns>
    Task<AttendanceTransaction> UpdateAsync(AttendanceTransaction transaction, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes a transaction.
    /// </summary>
    /// <param name="id">The transaction identifier</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if deleted successfully</returns>
    Task<bool> DeleteAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks if a transaction type exists for employee on date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="transactionType">The transaction type</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if transaction type exists</returns>
    Task<bool> ExistsTransactionTypeAsync(long employeeId, DateTime attendanceDate, TransactionType transactionType, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the check-in/check-out pair for an employee on a date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Tuple of check-in and check-out transactions</returns>
    Task<(AttendanceTransaction? CheckIn, AttendanceTransaction? CheckOut)> GetCheckInOutPairAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all break periods for an employee on a date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of break period pairs (start, end)</returns>
    Task<List<(AttendanceTransaction BreakStart, AttendanceTransaction? BreakEnd)>> GetBreakPeriodsAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Validates transaction sequence for business rules.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Validation result with any issues found</returns>
    Task<TransactionValidationResult> ValidateTransactionSequenceAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the most recent transactions across all employees.
    /// </summary>
    /// <param name="limit">Maximum number of transactions to return</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="departmentId">Optional department filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of recent transactions</returns>
    Task<List<AttendanceTransaction>> GetRecentTransactionsAsync(int limit = 10, long? branchId = null, long? departmentId = null, CancellationToken cancellationToken = default);
}

/// <summary>
/// Result of transaction sequence validation.
/// </summary>
public class TransactionValidationResult
{
    public bool IsValid { get; set; }
    public List<string> Issues { get; set; } = new();
    public bool HasIncompleteCheckOut { get; set; }
    public bool HasIncompleteBreaks { get; set; }
    public bool HasInvalidSequence { get; set; }
}