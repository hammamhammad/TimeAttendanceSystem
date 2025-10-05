using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Domain.RemoteWork;

/// <summary>
/// Domain entity representing a remote work request for an employee.
/// Similar to vacation requests - individual, date-based requests managed by HR.
/// </summary>
/// <remarks>
/// Remote Work Request Features:
/// - Individual employee requests (not bulk)
/// - Date range based (StartDate to EndDate)
/// - Status workflow (Pending → Approved/Rejected/Cancelled)
/// - Policy-based quota validation and tracking
/// - Affects attendance calculations when approved
///
/// Business Rules:
/// - StartDate cannot be in the past (except for ongoing requests)
/// - EndDate must be after or equal to StartDate
/// - Request dates must not fall within blackout periods
/// - Must comply with policy quota limits (weekly/monthly/yearly)
/// - Must respect consecutive days restrictions
/// - Cannot overlap with other approved requests for same employee
/// - Working days count excludes weekends and holidays
///
/// Status Workflow:
/// - Pending: Awaiting HR approval
/// - Approved: Active and affects attendance
/// - Rejected: Declined by HR with reason
/// - Cancelled: Cancelled by HR
///
/// Security Considerations:
/// - Branch-scoped through employee relationship
/// - Permission-based operations for request management
/// - Audit trail through CreatedByUserId and approval fields
/// - Soft delete support through BaseEntity
/// </remarks>
public class RemoteWorkRequest : BaseEntity
{
    /// <summary>
    /// Gets or sets the employee identifier for this remote work request.
    /// </summary>
    /// <value>Employee ID requesting remote work</value>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the start date of the remote work period (inclusive).
    /// </summary>
    /// <value>Start date of remote work</value>
    public DateOnly StartDate { get; set; }

    /// <summary>
    /// Gets or sets the end date of the remote work period (inclusive).
    /// </summary>
    /// <value>End date of remote work</value>
    public DateOnly EndDate { get; set; }

    /// <summary>
    /// Gets or sets the reason for this remote work request.
    /// Can include business justification, special circumstances, or coordination notes.
    /// </summary>
    /// <value>Request reason (nullable)</value>
    public string? Reason { get; set; }

    /// <summary>
    /// Gets or sets the user ID who created this remote work request (typically HR user).
    /// Used for audit trail and accountability.
    /// </summary>
    /// <value>User ID who created the request</value>
    public long CreatedByUserId { get; set; }

    /// <summary>
    /// Gets or sets the current status of this remote work request.
    /// Controls workflow and whether request affects attendance.
    /// </summary>
    /// <value>Request status</value>
    public RemoteWorkRequestStatus Status { get; set; } = RemoteWorkRequestStatus.Pending;

    /// <summary>
    /// Gets or sets the user ID who approved or rejected this request.
    /// Only populated when action is taken.
    /// </summary>
    /// <value>Approving/rejecting user ID (nullable)</value>
    public long? ApprovedByUserId { get; set; }

    /// <summary>
    /// Gets or sets when the user took action on this request.
    /// Null if pending.
    /// </summary>
    /// <value>Approval/rejection timestamp (nullable)</value>
    public DateTime? ApprovedAt { get; set; }

    /// <summary>
    /// Gets or sets the rejection reason if status is Rejected.
    /// Provides feedback to HR/employee about why request was declined.
    /// </summary>
    /// <value>Rejection reason text (nullable)</value>
    public string? RejectionReason { get; set; }

    /// <summary>
    /// Gets or sets the approval comments or notes from the reviewer/approver.
    /// Can include approval notes, special considerations, or instructions.
    /// Similar to ProcessingNotes in EmployeeExcuse.
    /// </summary>
    /// <value>Approval comments and notes (nullable)</value>
    public string? ApprovalComments { get; set; }

    /// <summary>
    /// Gets or sets the remote work policy ID that governs this request.
    /// Links request to specific branch policy and quota rules.
    /// </summary>
    /// <value>Policy ID for validation and quota tracking</value>
    public long RemoteWorkPolicyId { get; set; }

    /// <summary>
    /// Gets or sets the count of actual working days in this request period.
    /// Excludes weekends and holidays. Used for quota validation.
    /// Calculated at creation time and stored for performance.
    /// </summary>
    /// <value>Number of working days in this request</value>
    public int WorkingDaysCount { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the employee entity this request belongs to.
    /// </summary>
    /// <value>Employee entity navigation</value>
    public Employee? Employee { get; set; }

    /// <summary>
    /// Gets or sets the user entity who created this remote work request.
    /// </summary>
    /// <value>Creating user entity navigation</value>
    public User? CreatedByUser { get; set; }

    /// <summary>
    /// Gets or sets the user entity who approved/rejected this request.
    /// </summary>
    /// <value>Approving user entity navigation (nullable)</value>
    public User? ApprovedByUser { get; set; }

    /// <summary>
    /// Gets or sets the remote work policy entity that governs this request.
    /// </summary>
    /// <value>Policy entity navigation</value>
    public RemoteWorkPolicy? RemoteWorkPolicy { get; set; }

    // Business Logic Methods

    /// <summary>
    /// Validates the remote work request for business rule compliance.
    /// Ensures dates are logical and request is operationally viable.
    /// </summary>
    /// <returns>Result indicating validation success or specific failure reasons</returns>
    /// <remarks>
    /// Validation Rules:
    /// - EmployeeId must be greater than 0
    /// - StartDate cannot be in the past (grace period of 1 day for editing)
    /// - EndDate must be after or equal to StartDate
    /// - Date range cannot exceed 365 days
    /// - RemoteWorkPolicyId must be greater than 0
    /// - WorkingDaysCount must be greater than 0
    /// - CreatedByUserId must be greater than 0
    /// - Reason must not exceed 500 characters
    /// - RejectionReason must not exceed 500 characters
    /// </remarks>
    public (bool IsValid, List<string> Errors) ValidateRequest()
    {
        var errors = new List<string>();

        if (EmployeeId <= 0)
            errors.Add("Employee ID is required");

        if (RemoteWorkPolicyId <= 0)
            errors.Add("Remote work policy ID is required");

        if (CreatedByUserId <= 0)
            errors.Add("Created by user ID is required");

        // Date validations
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var gracePeriod = today.AddDays(-1); // Allow 1 day grace for editing

        if (StartDate < gracePeriod)
            errors.Add("Start date cannot be in the past");

        if (EndDate < StartDate)
            errors.Add("End date must be after or equal to start date");

        var daysDifference = EndDate.DayNumber - StartDate.DayNumber + 1;
        if (daysDifference > 365)
            errors.Add("Remote work request cannot exceed 365 days");

        if (WorkingDaysCount <= 0)
            errors.Add("Working days count must be greater than 0");

        if (WorkingDaysCount > daysDifference)
            errors.Add("Working days count cannot exceed total days in range");

        // String length validations
        if (!string.IsNullOrEmpty(Reason) && Reason.Length > 500)
            errors.Add("Reason must not exceed 500 characters");

        if (!string.IsNullOrEmpty(RejectionReason) && RejectionReason.Length > 500)
            errors.Add("Rejection reason must not exceed 500 characters");

        if (!string.IsNullOrEmpty(ApprovalComments) && ApprovalComments.Length > 1000)
            errors.Add("Approval comments must not exceed 1000 characters");

        // Status validations
        if (Status == RemoteWorkRequestStatus.Rejected && string.IsNullOrWhiteSpace(RejectionReason))
            errors.Add("Rejection reason is required when status is Rejected");

        if ((Status == RemoteWorkRequestStatus.Approved || Status == RemoteWorkRequestStatus.Rejected) &&
            !ApprovedByUserId.HasValue)
            errors.Add("Approving user ID is required for approved/rejected requests");

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Checks if this request is currently active (in effect today).
    /// </summary>
    /// <returns>True if request is active today, false otherwise</returns>
    public bool IsActiveNow()
    {
        if (Status != RemoteWorkRequestStatus.Approved)
            return false;

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        return today >= StartDate && today <= EndDate;
    }

    /// <summary>
    /// Checks if this request overlaps with another request date range.
    /// </summary>
    /// <param name="otherStartDate">Start date of other request</param>
    /// <param name="otherEndDate">End date of other request</param>
    /// <returns>True if date ranges overlap, false otherwise</returns>
    public bool OverlapsWith(DateOnly otherStartDate, DateOnly otherEndDate)
    {
        return StartDate <= otherEndDate && EndDate >= otherStartDate;
    }

    /// <summary>
    /// Approves this remote work request.
    /// </summary>
    /// <param name="userId">ID of user approving the request</param>
    public void Approve(long userId)
    {
        Status = RemoteWorkRequestStatus.Approved;
        ApprovedByUserId = userId;
        ApprovedAt = DateTime.UtcNow;
        RejectionReason = null;
    }

    /// <summary>
    /// Rejects this remote work request with a reason.
    /// </summary>
    /// <param name="userId">ID of user rejecting the request</param>
    /// <param name="reason">Reason for rejection</param>
    public void Reject(long userId, string reason)
    {
        Status = RemoteWorkRequestStatus.Rejected;
        ApprovedByUserId = userId;
        ApprovedAt = DateTime.UtcNow;
        RejectionReason = reason;
    }

    /// <summary>
    /// Cancels this remote work request.
    /// </summary>
    public void Cancel()
    {
        Status = RemoteWorkRequestStatus.Cancelled;
    }

    /// <summary>
    /// Gets the number of days in the request period.
    /// </summary>
    /// <returns>Total number of days (including weekends)</returns>
    public int GetTotalDays()
    {
        return EndDate.DayNumber - StartDate.DayNumber + 1;
    }
}

/// <summary>
/// Enum representing the status of a remote work request.
/// </summary>
public enum RemoteWorkRequestStatus
{
    /// <summary>
    /// Request is pending approval
    /// </summary>
    Pending = 0,

    /// <summary>
    /// Request has been approved
    /// </summary>
    Approved = 1,

    /// <summary>
    /// Request has been rejected
    /// </summary>
    Rejected = 2,

    /// <summary>
    /// Request has been cancelled
    /// </summary>
    Cancelled = 3
}