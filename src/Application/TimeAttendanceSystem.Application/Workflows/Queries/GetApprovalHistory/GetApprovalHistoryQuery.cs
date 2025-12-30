using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetApprovalHistory;

/// <summary>
/// Query to get approval history for a user.
/// </summary>
public record GetApprovalHistoryQuery : IRequest<Result<PagedResult<ApprovalHistoryDto>>>
{
    /// <summary>
    /// User ID to get history for.
    /// </summary>
    public long UserId { get; init; }

    /// <summary>
    /// Filter by entity type.
    /// </summary>
    public WorkflowEntityType? EntityType { get; init; }

    /// <summary>
    /// Filter by action type.
    /// </summary>
    public ApprovalAction? Action { get; init; }

    /// <summary>
    /// Filter by date from.
    /// </summary>
    public DateTime? FromDate { get; init; }

    /// <summary>
    /// Filter by date to.
    /// </summary>
    public DateTime? ToDate { get; init; }

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
/// DTO for approval history.
/// </summary>
public class ApprovalHistoryDto
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
    public ApprovalAction Action { get; set; }
    public string ActionName { get; set; } = string.Empty;
    public DateTime ActionTakenAt { get; set; }
    public string? Comments { get; set; }
    public long? DelegatedToUserId { get; set; }
    public string? DelegatedToUserName { get; set; }
    public WorkflowStatus WorkflowFinalStatus { get; set; }
    public string WorkflowFinalStatusName { get; set; } = string.Empty;
}
