using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.DelegateApproval;

/// <summary>
/// CQRS command for delegating approval to another user.
/// </summary>
public record DelegateApprovalCommand(
    long WorkflowInstanceId,
    long CurrentUserId,
    long DelegateToUserId,
    string? Comments = null
) : IRequest<Result<bool>>;
