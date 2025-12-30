using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Domain.Excuses;

/// <summary>
/// Domain entity representing an employee's excuse request for time away from work.
/// Supports both personal excuses (subject to policy limits) and official duties (exempt from limits).
/// </summary>
/// <remarks>
/// EmployeeExcuse Entity Features:
/// - Comprehensive excuse request management with approval workflow
/// - Integration with attendance calculations and working hour adjustments
/// - Support for both personal excuses and official duties
/// - File attachment support for documentation requirements
/// - Audit trail for approval decisions and status changes
/// - Automatic duration calculation from start/end times
///
/// Business Rules:
/// - Personal excuses are subject to policy limits and approval requirements
/// - Official duties are exempt from policy limits but require approval
/// - Excuse times must be within normal working hours or justified
/// - Cannot overlap with existing approved excuses for the same employee
/// - Past date excuses have limited retroactive creation window
/// - Approved excuses automatically adjust attendance calculations
///
/// Approval Workflow:
/// - Pending: Initial state, awaiting manager/HR approval
/// - Approved: Accepted and applied to attendance calculations
/// - Rejected: Denied with optional rejection reason
///
/// Security Considerations:
/// - Employee can only create their own excuses (unless privileged user)
/// - Approval rights restricted to managers and HR personnel
/// - Branch-based access control for multi-tenant environments
/// - Audit trail for all excuse modifications
/// </remarks>
public class EmployeeExcuse : BaseEntity
{
    /// <summary>
    /// Gets or sets the employee identifier for this excuse request.
    /// Links the excuse to the specific employee requesting time away.
    /// </summary>
    /// <value>Employee ID for excuse assignment</value>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the date for which the excuse is requested.
    /// Must be a working day and within policy-defined retroactive limits.
    /// </summary>
    /// <value>Date of the excuse request</value>
    public DateTime ExcuseDate { get; set; }

    /// <summary>
    /// Gets or sets the type of excuse being requested.
    /// Determines policy applicability and approval requirements.
    /// </summary>
    /// <value>Personal excuse or official duty classification</value>
    public ExcuseType ExcuseType { get; set; }

    /// <summary>
    /// Gets or sets the start time of the excuse period within the working day.
    /// Combined with end time to calculate total excuse duration.
    /// </summary>
    /// <value>Start time of excuse period</value>
    public TimeOnly StartTime { get; set; }

    /// <summary>
    /// Gets or sets the end time of the excuse period within the working day.
    /// Must be after start time to ensure valid duration calculation.
    /// </summary>
    /// <value>End time of excuse period</value>
    public TimeOnly EndTime { get; set; }

    /// <summary>
    /// Gets or sets the total duration of the excuse in hours.
    /// Automatically calculated from start and end times.
    /// </summary>
    /// <value>Duration in hours (calculated field)</value>
    public decimal DurationHours { get; set; }

    /// <summary>
    /// Gets or sets the reason or description for the excuse request.
    /// Required for approval workflow and audit purposes.
    /// </summary>
    /// <value>Reason for the excuse request</value>
    public string Reason { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the current approval status of this excuse request.
    /// Determines whether the excuse affects attendance calculations.
    /// </summary>
    /// <value>Current status in the approval workflow</value>
    public ApprovalStatus ApprovalStatus { get; set; } = ApprovalStatus.Pending;

    /// <summary>
    /// Gets or sets the identifier of the user who approved or rejected this excuse.
    /// Null if still pending approval.
    /// </summary>
    /// <value>Approver user ID (nullable)</value>
    public long? ApprovedById { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the excuse was approved or rejected.
    /// Null if still pending approval.
    /// </summary>
    /// <value>Approval decision timestamp (nullable)</value>
    public DateTime? ApprovedAt { get; set; }

    /// <summary>
    /// Gets or sets the reason for rejection if the excuse was denied.
    /// Provides feedback to the employee on denial reasons.
    /// </summary>
    /// <value>Rejection reason explanation (nullable)</value>
    public string? RejectionReason { get; set; }

    /// <summary>
    /// Gets or sets the file path for any supporting documentation.
    /// Optional attachment for excuse justification or evidence.
    /// </summary>
    /// <value>File path to supporting documentation (nullable)</value>
    public string? AttachmentPath { get; set; }

    /// <summary>
    /// Gets or sets whether this excuse affects salary calculation.
    /// Personal excuses may be deducted while official duties are fully paid.
    /// </summary>
    /// <value>True if excuse should be deducted from salary</value>
    public bool AffectsSalary { get; set; } = true;

    /// <summary>
    /// Gets or sets additional notes about the excuse processing.
    /// Used for approval comments, special considerations, or instructions.
    /// </summary>
    /// <value>Processing notes and comments (nullable)</value>
    public string? ProcessingNotes { get; set; }

    /// <summary>
    /// Gets or sets the workflow instance ID for approval tracking.
    /// Null if no workflow is configured for this entity type.
    /// </summary>
    /// <value>Workflow instance ID for approval workflow (nullable)</value>
    public long? WorkflowInstanceId { get; set; }

    /// <summary>
    /// Gets or sets the user ID who submitted this excuse request.
    /// This may differ from the employee's user when a manager submits on behalf of a team member.
    /// </summary>
    /// <value>User ID of the request submitter</value>
    public long? SubmittedByUserId { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the employee entity this excuse belongs to.
    /// Navigation property for accessing employee details.
    /// </summary>
    /// <value>Employee entity for excuse assignment</value>
    public Employee Employee { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user entity who approved or rejected this excuse.
    /// Navigation property for approval workflow tracking.
    /// </summary>
    /// <value>Approver user entity (nullable)</value>
    public User? ApprovedBy { get; set; }

    /// <summary>
    /// Gets or sets the workflow instance for approval tracking.
    /// Navigation property for accessing workflow status and history.
    /// </summary>
    /// <value>Workflow instance entity (nullable)</value>
    public WorkflowInstance? WorkflowInstance { get; set; }

    // Business Logic Methods

    /// <summary>
    /// Calculates and updates the duration hours based on start and end times.
    /// Automatically called when start or end times are modified.
    /// </summary>
    public void CalculateDuration()
    {
        if (EndTime <= StartTime)
        {
            throw new InvalidOperationException("End time must be after start time");
        }

        var duration = EndTime - StartTime;
        DurationHours = (decimal)duration.TotalHours;
    }

    /// <summary>
    /// Validates the excuse request for business rule compliance.
    /// Checks time validity, reason requirements, and basic data integrity.
    /// </summary>
    /// <returns>Validation result with specific error details</returns>
    public (bool IsValid, List<string> Errors) ValidateExcuse()
    {
        var errors = new List<string>();

        if (EmployeeId <= 0)
            errors.Add("Employee is required");

        if (ExcuseDate.Date > DateTime.Today.AddDays(30))
            errors.Add("Excuse cannot be created more than 30 days in the future");

        if (EndTime <= StartTime)
            errors.Add("End time must be after start time");

        if (string.IsNullOrWhiteSpace(Reason))
            errors.Add("Reason is required");

        if (Reason.Length > 500)
            errors.Add("Reason must not exceed 500 characters");

        if (DurationHours <= 0)
            errors.Add("Duration must be greater than zero");

        if (DurationHours > 24)
            errors.Add("Single excuse cannot exceed 24 hours");

        if (!string.IsNullOrEmpty(RejectionReason) && RejectionReason.Length > 500)
            errors.Add("Rejection reason must not exceed 500 characters");

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Approves the excuse request with specified approver details.
    /// </summary>
    /// <param name="approverId">ID of the user approving the excuse</param>
    /// <param name="processingNotes">Optional notes about the approval</param>
    public void Approve(long approverId, string? processingNotes = null)
    {
        if (ApprovalStatus != ApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Only pending excuses can be approved");
        }

        ApprovalStatus = ApprovalStatus.Approved;
        ApprovedById = approverId;
        ApprovedAt = DateTime.UtcNow;
        ProcessingNotes = processingNotes;
        RejectionReason = null;

        // Official duties don't affect salary
        if (ExcuseType == ExcuseType.OfficialDuty)
        {
            AffectsSalary = false;
        }
    }

    /// <summary>
    /// Rejects the excuse request with specified reason and approver details.
    /// </summary>
    /// <param name="approverId">ID of the user rejecting the excuse</param>
    /// <param name="rejectionReason">Reason for rejection</param>
    /// <param name="processingNotes">Optional additional notes</param>
    public void Reject(long approverId, string rejectionReason, string? processingNotes = null)
    {
        if (ApprovalStatus != ApprovalStatus.Pending)
        {
            throw new InvalidOperationException("Only pending excuses can be rejected");
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
    /// Checks if this excuse overlaps with another excuse time period.
    /// </summary>
    /// <param name="otherStartTime">Start time of other excuse</param>
    /// <param name="otherEndTime">End time of other excuse</param>
    /// <returns>True if there is time overlap</returns>
    public bool OverlapsWith(TimeOnly otherStartTime, TimeOnly otherEndTime)
    {
        return StartTime < otherEndTime && EndTime > otherStartTime;
    }

    /// <summary>
    /// Determines if this excuse affects attendance calculations.
    /// Only approved excuses should impact attendance status.
    /// </summary>
    /// <returns>True if excuse should be applied to attendance</returns>
    public bool ShouldAffectAttendance()
    {
        return ApprovalStatus == ApprovalStatus.Approved;
    }

    /// <summary>
    /// Gets a formatted time range string for display purposes.
    /// </summary>
    /// <returns>Time range in format "HH:mm - HH:mm"</returns>
    public string GetTimeRangeDisplay()
    {
        return $"{StartTime:HH:mm} - {EndTime:HH:mm}";
    }

    /// <summary>
    /// Gets a comprehensive summary of the excuse for display or reporting.
    /// </summary>
    /// <returns>Human-readable excuse summary</returns>
    public string GetExcuseSummary()
    {
        var typeLabel = ExcuseType == ExcuseType.PersonalExcuse ? "Personal" : "Official Duty";
        var statusLabel = ApprovalStatus.ToString();
        var timeRange = GetTimeRangeDisplay();

        return $"{ExcuseDate:MMM dd, yyyy} {timeRange} ({DurationHours:F1}h) - {typeLabel} - {statusLabel}";
    }

    /// <summary>
    /// Checks if the excuse can be modified based on its current status and date.
    /// </summary>
    /// <returns>True if excuse can still be modified</returns>
    public bool CanBeModified()
    {
        // Cannot modify approved excuses or excuses for past dates
        if (ApprovalStatus == ApprovalStatus.Approved)
            return false;

        if (ExcuseDate.Date < DateTime.Today)
            return false;

        return true;
    }

    /// <summary>
    /// Updates the excuse times and recalculates duration.
    /// </summary>
    /// <param name="startTime">New start time</param>
    /// <param name="endTime">New end time</param>
    public void UpdateTimes(TimeOnly startTime, TimeOnly endTime)
    {
        if (!CanBeModified())
        {
            throw new InvalidOperationException("Excuse cannot be modified in its current state");
        }

        StartTime = startTime;
        EndTime = endTime;
        CalculateDuration();
    }
}