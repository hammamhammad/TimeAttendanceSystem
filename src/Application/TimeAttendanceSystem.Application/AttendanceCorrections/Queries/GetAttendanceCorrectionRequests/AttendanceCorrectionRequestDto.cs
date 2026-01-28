using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequests;

/// <summary>
/// Data Transfer Object representing a single approval step in workflow history.
/// </summary>
public class CorrectionApprovalStepDto
{
    /// <summary>
    /// Order of the step in the workflow.
    /// </summary>
    public int StepOrder { get; set; }

    /// <summary>
    /// Name of the workflow step.
    /// </summary>
    public string StepName { get; set; } = string.Empty;

    /// <summary>
    /// Status of the step (Pending, Approved, Rejected, etc.).
    /// </summary>
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// Name of the user/role assigned to this step.
    /// </summary>
    public string AssignedToName { get; set; } = string.Empty;

    /// <summary>
    /// Name of the user who took action.
    /// </summary>
    public string? ActionByName { get; set; }

    /// <summary>
    /// When the step was assigned.
    /// </summary>
    public DateTime AssignedAt { get; set; }

    /// <summary>
    /// When the action was taken.
    /// </summary>
    public DateTime? ActionAt { get; set; }

    /// <summary>
    /// Comments provided with the action.
    /// </summary>
    public string? Comments { get; set; }
}

/// <summary>
/// Data Transfer Object for attendance correction request information.
/// Contains all correction request details for frontend consumption.
/// </summary>
public class AttendanceCorrectionRequestDto
{
    /// <summary>
    /// Gets or sets the unique identifier for the correction request.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets the employee identifier this correction request belongs to.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the employee's full name.
    /// </summary>
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee's full name in Arabic.
    /// </summary>
    public string EmployeeNameAr { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee's employee number.
    /// </summary>
    public string EmployeeNumber { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the department name.
    /// </summary>
    public string DepartmentName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the branch name.
    /// </summary>
    public string BranchName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the date of the correction.
    /// </summary>
    public DateTime CorrectionDate { get; set; }

    /// <summary>
    /// Gets or sets the time of the correction.
    /// </summary>
    public TimeOnly CorrectionTime { get; set; }

    /// <summary>
    /// Gets or sets the type of correction.
    /// </summary>
    public AttendanceCorrectionType CorrectionType { get; set; }

    /// <summary>
    /// Gets or sets the correction type as a string.
    /// </summary>
    public string CorrectionTypeDisplay { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the reason for the correction.
    /// </summary>
    public string Reason { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the approval status.
    /// </summary>
    public ApprovalStatus ApprovalStatus { get; set; }

    /// <summary>
    /// Gets or sets the approval status as a string.
    /// </summary>
    public string ApprovalStatusDisplay { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the approver's user ID.
    /// </summary>
    public long? ApprovedById { get; set; }

    /// <summary>
    /// Gets or sets the approver's name.
    /// </summary>
    public string? ApprovedByName { get; set; }

    /// <summary>
    /// Gets or sets when the request was approved or rejected.
    /// </summary>
    public DateTime? ApprovedAt { get; set; }

    /// <summary>
    /// Gets or sets the rejection reason if rejected.
    /// </summary>
    public string? RejectionReason { get; set; }

    /// <summary>
    /// Gets or sets the attachment file path.
    /// </summary>
    public string? AttachmentPath { get; set; }

    /// <summary>
    /// Gets or sets processing notes for the request.
    /// </summary>
    public string? ProcessingNotes { get; set; }

    /// <summary>
    /// Gets or sets the ID of the created transaction after approval.
    /// </summary>
    public long? CreatedTransactionId { get; set; }

    /// <summary>
    /// Gets or sets when the request was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who created the request.
    /// </summary>
    public string CreatedBy { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets when the request was last modified.
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who last modified the request.
    /// </summary>
    public string? ModifiedBy { get; set; }

    /// <summary>
    /// Gets or sets whether the request can be modified.
    /// </summary>
    public bool CanBeModified { get; set; }

    /// <summary>
    /// Gets or sets a summary of the correction for display.
    /// </summary>
    public string CorrectionSummary { get; set; } = string.Empty;

    // Workflow information

    /// <summary>
    /// Gets or sets the workflow instance ID for approval actions.
    /// </summary>
    public long? WorkflowInstanceId { get; set; }

    /// <summary>
    /// Gets or sets the current workflow status (e.g., Pending, Approved, Rejected).
    /// </summary>
    public string? WorkflowStatus { get; set; }

    /// <summary>
    /// Gets or sets the name of the current approver.
    /// </summary>
    public string? CurrentApproverName { get; set; }

    /// <summary>
    /// Gets or sets the role of the current approver.
    /// </summary>
    public string? CurrentApproverRole { get; set; }

    /// <summary>
    /// Gets or sets the current step order in the workflow.
    /// </summary>
    public int? CurrentStepOrder { get; set; }

    /// <summary>
    /// Gets or sets the total number of steps in the workflow.
    /// </summary>
    public int? TotalSteps { get; set; }

    /// <summary>
    /// Gets or sets the approval history for this request.
    /// </summary>
    public List<CorrectionApprovalStepDto>? ApprovalHistory { get; set; }
}
