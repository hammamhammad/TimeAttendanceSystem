using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for creating a new attendance transaction.
/// Used for manual entry of check-in, check-out, and break transactions.
/// </summary>
public class CreateAttendanceTransactionRequest
{
    /// <summary>
    /// Gets or sets the employee identifier for this transaction.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the type of transaction being created.
    /// </summary>
    public TransactionType TransactionType { get; set; }

    /// <summary>
    /// Gets or sets the transaction timestamp in UTC.
    /// If not provided, current time will be used.
    /// </summary>
    public DateTime? TransactionTimeUtc { get; set; }

    /// <summary>
    /// Gets or sets the attendance date this transaction belongs to.
    /// If not provided, date will be derived from transaction time.
    /// </summary>
    public DateTime? AttendanceDate { get; set; }

    /// <summary>
    /// Gets or sets optional notes about this transaction.
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Gets or sets the location where this transaction was recorded.
    /// </summary>
    public string? Location { get; set; }

    /// <summary>
    /// Gets or sets the device identifier used for this transaction.
    /// </summary>
    public string? DeviceId { get; set; }
}