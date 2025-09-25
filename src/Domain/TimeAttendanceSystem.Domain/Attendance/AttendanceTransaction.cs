using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Domain entity representing an individual attendance transaction (check-in, check-out, break).
/// Records specific time-stamped events in an employee's daily attendance tracking.
/// </summary>
/// <remarks>
/// AttendanceTransaction Entity Features:
/// - Precise timestamp recording for all attendance events
/// - Support for manual and automatic transaction entry
/// - Location and device tracking for compliance and security
/// - Comprehensive audit trail with user attribution
/// - Integration with attendance calculation engine
/// - Support for corrections and adjustments
///
/// Transaction Types:
/// - Check-in/Check-out for work period tracking
/// - Break start/end for break period management
/// - Manual adjustments for corrections and compliance
/// - Automatic transactions for system-generated events
///
/// Business Rules:
/// - Transactions must be chronologically ordered within a day
/// - Check-ins must be paired with check-outs
/// - Break periods must be within work periods
/// - Manual adjustments require proper authorization
/// - Location tracking for compliance requirements
/// </remarks>
public class AttendanceTransaction : BaseEntity
{
    /// <summary>
    /// Gets or sets the employee identifier for this transaction.
    /// Links the transaction to the specific employee being tracked.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the type of attendance transaction.
    /// Determines how this transaction affects attendance calculations.
    /// </summary>
    public TransactionType TransactionType { get; set; }

    /// <summary>
    /// Gets or sets the precise timestamp when this transaction occurred.
    /// Stored in UTC for consistent cross-timezone operations.
    /// </summary>
    public DateTime TransactionTimeUtc { get; set; }

    /// <summary>
    /// Gets or sets the local timestamp for display and reporting purposes.
    /// Adjusted to the employee's branch timezone for user-friendly display.
    /// </summary>
    public DateTime TransactionTimeLocal { get; set; }

    /// <summary>
    /// Gets or sets the attendance date this transaction belongs to.
    /// Used for grouping transactions and daily attendance calculations.
    /// </summary>
    public DateTime AttendanceDate { get; set; }

    /// <summary>
    /// Gets or sets whether this transaction was entered manually.
    /// Distinguishes between automatic system transactions and manual entries.
    /// </summary>
    public bool IsManual { get; set; } = false;

    /// <summary>
    /// Gets or sets the user who entered this transaction manually.
    /// Required for manual transactions to maintain audit trail.
    /// </summary>
    public long? EnteredByUserId { get; set; }

    /// <summary>
    /// Gets or sets optional notes about this transaction.
    /// Provides context for manual adjustments or special circumstances.
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Gets or sets the location where this transaction was recorded.
    /// Used for compliance and security monitoring.
    /// </summary>
    public string? Location { get; set; }

    /// <summary>
    /// Gets or sets the device identifier used for this transaction.
    /// Tracks which device or terminal was used for the transaction.
    /// </summary>
    public string? DeviceId { get; set; }

    /// <summary>
    /// Gets or sets the IP address from which this transaction was recorded.
    /// Used for security monitoring and fraud detection.
    /// </summary>
    public string? IpAddress { get; set; }

    /// <summary>
    /// Gets or sets whether this transaction has been verified.
    /// Used for transactions requiring approval or validation.
    /// </summary>
    public bool IsVerified { get; set; } = true;

    /// <summary>
    /// Gets or sets the user who verified this transaction.
    /// Required for transactions needing supervisory approval.
    /// </summary>
    public long? VerifiedByUserId { get; set; }

    /// <summary>
    /// Gets or sets when this transaction was verified.
    /// Tracks the verification timeline for audit purposes.
    /// </summary>
    public DateTime? VerifiedAtUtc { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the employee entity this transaction belongs to.
    /// Navigation property providing access to employee details.
    /// </summary>
    public Employee Employee { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user who manually entered this transaction.
    /// Navigation property for manual transaction attribution.
    /// </summary>
    public User? EnteredByUser { get; set; }

    /// <summary>
    /// Gets or sets the user who verified this transaction.
    /// Navigation property for verification audit trail.
    /// </summary>
    public User? VerifiedByUser { get; set; }

    /// <summary>
    /// Validates the transaction business rules and data integrity.
    /// Ensures transaction is properly configured and follows business logic.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages if validation fails</returns>
    public (bool IsValid, List<string> Errors) ValidateTransaction()
    {
        var errors = new List<string>();

        // Validate transaction date is not in the future
        if (AttendanceDate.Date > DateTime.UtcNow.Date)
        {
            errors.Add("Attendance date cannot be in the future");
        }

        // Validate transaction time is not too far in the future
        if (TransactionTimeUtc > DateTime.UtcNow.AddMinutes(5))
        {
            errors.Add("Transaction time cannot be more than 5 minutes in the future");
        }

        // Validate manual transactions have required fields
        if (IsManual && !EnteredByUserId.HasValue)
        {
            errors.Add("Manual transactions must specify who entered them");
        }

        // Validate verified transactions have verification details
        if (IsVerified && VerifiedByUserId.HasValue && !VerifiedAtUtc.HasValue)
        {
            errors.Add("Verified transactions must have verification timestamp");
        }

        // Validate transaction time is on the correct attendance date
        if (TransactionTimeLocal.Date != AttendanceDate.Date)
        {
            // Allow some flexibility for night shifts
            var dayDifference = Math.Abs((TransactionTimeLocal.Date - AttendanceDate.Date).Days);
            if (dayDifference > 1)
            {
                errors.Add("Transaction time must be within one day of attendance date");
            }
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Determines if this transaction represents the start of a work period.
    /// </summary>
    /// <returns>True if this is a check-in or break-end transaction</returns>
    public bool IsWorkStartTransaction()
    {
        return TransactionType is TransactionType.CheckIn or TransactionType.BreakEnd;
    }

    /// <summary>
    /// Determines if this transaction represents the end of a work period.
    /// </summary>
    /// <returns>True if this is a check-out or break-start transaction</returns>
    public bool IsWorkEndTransaction()
    {
        return TransactionType is TransactionType.CheckOut or TransactionType.AutoCheckOut or TransactionType.BreakStart;
    }

    /// <summary>
    /// Gets a display-friendly description of this transaction.
    /// </summary>
    /// <returns>String description of the transaction type and time</returns>
    public string GetDisplayDescription()
    {
        var typeDescription = TransactionType switch
        {
            TransactionType.CheckIn => "Check In",
            TransactionType.CheckOut => "Check Out",
            TransactionType.BreakStart => "Break Start",
            TransactionType.BreakEnd => "Break End",
            TransactionType.ManualAdjustment => "Manual Adjustment",
            TransactionType.AutoCheckOut => "Auto Check Out",
            _ => "Unknown"
        };

        var manualIndicator = IsManual ? " (Manual)" : "";
        return $"{typeDescription} at {TransactionTimeLocal:HH:mm}{manualIndicator}";
    }
}