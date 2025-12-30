using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.DelegateApproval;

/// <summary>
/// CQRS command for delegating approval to another user.
/// </summary>
public record DelegateApprovalCommand(
    long WorkflowInstanceId,
    long CurrentUserId,
    long DelegateToUserId,
    string? Comments = null
) : IRequest<Result<bool>>;
