using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Domain entity representing an employee's attendance correction request.
/// Used when an employee forgets to clock in or out and needs to submit a correction.
/// </summary>
/// <remarks>
/// AttendanceCorrectionRequest Entity Features:
/// - Comprehensive correction request management with approval workflow
/// - Integration with attendance calculations after approval
/// - Support for both check-in and check-out corrections
/// - File attachment support for documentation requirements
/// - Audit trail for approval decisions and status changes
/// - Automatic transaction creation upon approval
///
/// Business Rules:
/// - Correction requests are subject to approval workflow
/// - Cannot create correction for future dates
/// - Cannot overlap with existing transactions for the same time
/// - Past date corrections have limited retroactive window
/// - Approved corrections automatically create attendance transactions
/// - Approved corrections trigger attendance recalculation
///
/// Approval Workflow:
/// - Pending: Initial state, awaiting manager/HR approval
/// - Approved: Accepted, transaction created, attendance recalculated
/// - Rejected: Denied with optional rejection reason
/// - Cancelled: Cancelled by employee before approval
///
/// Security Considerations:
/// - Employee can only create their own corrections (unless privileged user)
/// - Approval rights restricted to managers and HR personnel
/// - Branch-based access control for multi-tenant environments
/// - Audit trail for all correction modifications
/// </remarks>
public class AttendanceCorrectionRequest : BaseEntity
{
    /// <summary>
    /// Gets or sets the employee identifier for this correction request.
    /// Links the correction to the specific employee requesting the time adjustment.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the date for which the correction is requested.
    /// Must be a past working day and within policy-defined retroactive limits.
    /// </summary>
    public DateTime CorrectionDate { get; set; }

    /// <summary>
    /// Gets or sets the time of the missed clock-in or clock-out.
    /// This is the time that will be recorded as the transaction time upon approval.
    /// </summary>
    public TimeOnly CorrectionTime { get; set; }

    /// <summary>
    /// Gets or sets the type of correction being requested.
    /// Determines whether a check-in or check-out transaction will be created.
    /// </summary>
    public AttendanceCorrectionType CorrectionType { get; set; }

    /// <summary>
    /// Gets or sets the reason or description for the correction request.
    /// Required for approval workflow and audit purposes.
    /// </summary>
    public string Reason { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the file path for any supporting documentation.
    /// Optional attachment for correction justification or evidence.
    /// </summary>
    public string? AttachmentPath { get; set; }

    /// <summary>
    /// Gets or sets the current approval status of this correction request.
    /// Determines whether the correction affects attendance calculations.
    /// </summary>
    public ApprovalStatus ApprovalStatus { get; set; } = ApprovalStatus.Pending;

    /// <summary>
    /// Gets or sets the identifier of the user who approved or rejected this request.
    /// Null if still pending approval.
    /// </summary>
    public long? ApprovedById { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the request was approved or rejected.
    /// Null if still pending approval.
    /// </summary>
    public DateTime? ApprovedAt { get; set; }

    /// <summary>
    /// Gets or sets the reason for rejection if the request was denied.
    /// Provides feedback to the employee on denial reasons.
    /// </summary>
    public string? RejectionReason { get; set; }

    /// <summary>
    /// Gets or sets additional notes about the request processing.
    /// Used for approval comments, special considerations, or instructions.
    /// </summary>
    public string? ProcessingNotes { get; set; }

    /// <summary>
    /// Gets or sets the workflow instance ID for approval tracking.
    /// Null if no workflow is configured for this entity type.
    /// </summary>
    public long? WorkflowInstanceId { get; set; }

    /// <summary>
    /// Gets or sets the user ID who submitted this correction request.
    /// This may differ from the employee's user when a manager submits on behalf of a team member.
    /// </summary>
    public long? SubmittedByUserId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the attendance transaction created upon approval.
    /// Links to the actual transaction record that was created.
    /// </summary>
    public long? CreatedTransactionId { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the employee entity this correction belongs to.
    /// Navigation property for accessing employee details.
    /// </summary>
    public virtual Employee Employee { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user entity who approved or rejected this request.
    /// Navigation property for approval workflow tracking.
    /// </summary>
    public virtual User? ApprovedBy { get; set; }

    /// <summary>
    /// Gets or sets the workflow instance for approval tracking.
    /// Navigation property for accessing workflow status and history.
    /// </summary>
    public virtual WorkflowInstance? WorkflowInstance { get; set; }

    /// <summary>
    /// Gets or sets the attendance transaction created upon approval.
    /// Navigation property for accessing the created transaction.
    /// </summary>
    public virtual AttendanceTransaction? CreatedTransaction { get; set; }

    // Business Logic Methods

    /// <summary>
    /// Validates the correction request for business rule compliance.
    /// Checks date validity, reason requirements, and basic data integrity.
    /// </summary>
    /// <returns>Validation result with specific error details</returns>
    public (bool IsValid, List<string> Errors) ValidateRequest()
    {
        var errors = new List<string>();

        if (EmployeeId <= 0)
            errors.Add("Employee is required");

        if (CorrectionDate.Date > DateTime.Today)
            errors.Add("Correction cannot be created for future dates");

        if (string.IsNullOrWhiteSpace(Reason))
            errors.Add("Reason is required");

        if (Reason.Length > 500)
            errors.Add("Reason must not exceed 500 characters");

        if (Reason.Length < 10)
            errors.Add("Reason must be at least 10 characters");

        if (!string.IsNullOrEmpty(RejectionReason) && RejectionReason.Length > 500)
            errors.Add("Rejection reason must not exceed 500 characters");

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Approves the correction request with specified approver details.
    /// </summary>
    /// <param name="approverId">ID of the user approving the request</param>
    /// <param name="processingNotes">Optional notes about the approval</param>
    public void Approve(long approverId, string? processingNotes = null)
    {
        if (ApprovalStatus != ApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Only pending corrections can be approved");
        }

        ApprovalStatus = ApprovalStatus.Approved;
        ApprovedById = approverId;
        ApprovedAt = DateTime.UtcNow;
        ProcessingNotes = processingNotes;
        RejectionReason = null;
    }

    /// <summary>
    /// Rejects the correction request with specified reason and approver details.
    /// </summary>
    /// <param name="approverId">ID of the user rejecting the request</param>
    /// <param name="rejectionReason">Reason for rejection</param>
    /// <param name="processingNotes">Optional additional notes</param>
    public void Reject(long approverId, string rejectionReason, string? processingNotes = null)
    {
        if (ApprovalStatus != ApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Only pending corrections can be rejected");
        }

        if (string.IsNullOrWhiteSpace(rejectionReason))
        {
            throw new ArgumentException("Rejection reason is required", nameof(rejectionReason));
        }

        ApprovalStatus = ApprovalStatus.Rejected;
        ApprovedById = approverId;
        ApprovedAt = DateTime.UtcNow;
        RejectionReason = rejectionReason;
        ProcessingNotes = processingNotes;
    }

    /// <summary>
    /// Cancels the correction request.
    /// </summary>
    public void Cancel()
    {
        if (ApprovalStatus != ApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Only pending corrections can be cancelled");
        }

        ApprovalStatus = ApprovalStatus.Cancelled;
    }

    /// <summary>
    /// Checks if the correction can be modified based on its current status.
    /// </summary>
    /// <returns>True if correction can still be modified</returns>
    public bool CanBeModified()
    {
        // Cannot modify approved, rejected, or cancelled corrections
        return ApprovalStatus == ApprovalStatus.Pending;
    }

    /// <summary>
    /// Gets the correction type as a display string.
    /// </summary>
    /// <returns>Human-readable correction type</returns>
    public string GetCorrectionTypeDisplay()
    {
        return CorrectionType switch
        {
            AttendanceCorrectionType.CheckIn => "Check In",
            AttendanceCorrectionType.CheckOut => "Check Out",
            _ => "Unknown"
        };
    }

    /// <summary>
    /// Gets a comprehensive summary of the correction for display or reporting.
    /// </summary>
    /// <returns>Human-readable correction summary</returns>
    public string GetCorrectionSummary()
    {
        var typeLabel = GetCorrectionTypeDisplay();
        var statusLabel = ApprovalStatus.ToString();
        var timeDisplay = CorrectionTime.ToString("HH:mm");

        return $"{CorrectionDate:MMM dd, yyyy} {timeDisplay} - {typeLabel} - {statusLabel}";
    }
}

/// <summary>
/// Types of attendance corrections.
/// </summary>
public enum AttendanceCorrectionType
{
    /// <summary>
    /// Correction for a missed check-in.
    /// </summary>
    CheckIn = 1,

    /// <summary>
    /// Correction for a missed check-out.
    /// </summary>
    CheckOut = 2
}
