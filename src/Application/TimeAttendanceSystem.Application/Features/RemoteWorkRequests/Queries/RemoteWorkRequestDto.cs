using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries;

/// <summary>
/// DTO for remote work request information.
/// </summary>
public class RemoteWorkRequestDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string? EmployeeName { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string? Reason { get; set; }
    public long CreatedByUserId { get; set; }
    public string? CreatedByUserName { get; set; }
    public RemoteWorkRequestStatus Status { get; set; }
    public long? ApprovedByUserId { get; set; }
    public string? ApprovedByUserName { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? RejectionReason { get; set; }
    public string? ApprovalComments { get; set; }
    public long RemoteWorkPolicyId { get; set; }
    public int WorkingDaysCount { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }

    // Workflow information
    public long? WorkflowInstanceId { get; set; }
    public string? WorkflowStatus { get; set; }
    public string? CurrentApproverName { get; set; }
    public string? CurrentApproverRole { get; set; }
    public int? CurrentStepOrder { get; set; }
    public int? TotalSteps { get; set; }

    // Computed status flags
    public bool IsApproved => Status == RemoteWorkRequestStatus.Approved;
    public bool IsCurrentlyActive => IsApproved &&
        DateOnly.FromDateTime(DateTime.Today) >= StartDate &&
        DateOnly.FromDateTime(DateTime.Today) <= EndDate;
    public bool IsUpcoming => IsApproved && DateOnly.FromDateTime(DateTime.Today) < StartDate;
    public bool IsCompleted => IsApproved && DateOnly.FromDateTime(DateTime.Today) > EndDate;

    // Approval history
    public List<RemoteWorkApprovalStepDto>? ApprovalHistory { get; set; }
}

/// <summary>
/// DTO for a single approval step in the remote work request workflow.
/// </summary>
public class RemoteWorkApprovalStepDto
{
    public int StepOrder { get; set; }
    public string StepName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string AssignedToName { get; set; } = string.Empty;
    public string? ActionByName { get; set; }
    public DateTime AssignedAt { get; set; }
    public DateTime? ActionAt { get; set; }
    public string? Comments { get; set; }
}