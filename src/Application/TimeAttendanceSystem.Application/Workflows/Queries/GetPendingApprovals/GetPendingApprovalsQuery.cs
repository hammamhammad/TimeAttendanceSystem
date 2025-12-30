using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetPendingApprovals;

/// <summary>
/// Query to get pending approvals for a user.
/// </summary>
public record GetPendingApprovalsQuery : IRequest<Result<PagedResult<PendingApprovalDto>>>
{
    /// <summary>
    /// User ID to get pending approvals for.
    /// </summary>
    public long UserId { get; init; }

    /// <summary>
    /// Filter by entity type.
    /// </summary>
    public WorkflowEntityType? EntityType { get; init; }

    /// <summary>
    /// Filter by overdue status.
    /// </summary>
    public bool? IsOverdue { get; init; }

    /// <summary>
    /// Page number (1-based).
    /// </summary>
    public int Page { get; init; } = 1;

    /// <summary>
    /// Page size.
    /// </summary>
    public int PageSize { get; init; } = 10;
}

/// <summary>
/// DTO for pending approval.
/// </summary>
public class PendingApprovalDto
{
    public long WorkflowInstanceId { get; set; }
    public long StepExecutionId { get; set; }
    public WorkflowEntityType EntityType { get; set; }
    public string EntityTypeName { get; set; } = string.Empty;
    public long EntityId { get; set; }
    public string EntityDescription { get; set; } = string.Empty;
    public string WorkflowName { get; set; } = string.Empty;
    public string StepName { get; set; } = string.Empty;
    public long RequestedByUserId { get; set; }
    public string RequestedByUserName { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; }
    public DateTime AssignedAt { get; set; }
    public DateTime? DueAt { get; set; }
    public bool IsOverdue { get; set; }
    public bool AllowDelegation { get; set; }
    public string? ApproverInstructions { get; set; }
    public bool RequireCommentsOnApprove { get; set; }
    public bool RequireCommentsOnReject { get; set; }
}
