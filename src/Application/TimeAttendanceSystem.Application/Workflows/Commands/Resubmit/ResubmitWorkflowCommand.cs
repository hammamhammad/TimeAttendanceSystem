using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.Resubmit;

/// <summary>
/// v13.6 — requester resubmits a workflow that was previously returned for correction.
/// Resumes the workflow at step 1 (or <c>ResumeFromStepOrder</c> if configured).
/// Only the original requester may invoke; increments <c>ResubmissionCount</c>; capped by
/// <c>CompanySettings.MaxWorkflowResubmissions</c>.
/// </summary>
public record ResubmitWorkflowCommand(
    long WorkflowInstanceId,
    long UserId,
    string? Comments = null
) : IRequest<Result<bool>>;
