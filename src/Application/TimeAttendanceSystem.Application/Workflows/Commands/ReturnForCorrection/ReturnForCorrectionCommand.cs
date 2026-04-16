using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.ReturnForCorrection;

/// <summary>
/// v13.6 — non-final approver action: return the workflow to the requester for corrections.
/// The workflow transitions to <c>WorkflowStatus.ReturnedForCorrection</c>; the requester can
/// subsequently call <c>ResubmitWorkflowCommand</c> to resume approval from step 1.
/// </summary>
public record ReturnForCorrectionCommand(
    long WorkflowInstanceId,
    long UserId,
    string Comments
) : IRequest<Result<bool>>;
