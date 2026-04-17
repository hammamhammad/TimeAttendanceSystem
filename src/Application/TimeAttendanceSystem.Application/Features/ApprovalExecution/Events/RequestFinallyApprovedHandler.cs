using MediatR;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Features.ApprovalExecution.Commands;
using TecAxle.Hrms.Domain.Operations;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution.Events;

/// <summary>
/// Phase 1 (v14.1): Single subscriber for <see cref="RequestFinallyApprovedEvent"/>.
/// Maps the workflow's entity type to an <see cref="ApprovalExecutionTargetType"/> and
/// sends <c>ExecuteApprovalCommand</c> through the mediator so the same code path is used
/// whether the trigger is the workflow engine OR an explicit HTTP /execute call.
///
/// Design notes:
/// - Unknown/non-target entity types are silently ignored (returns early). This lets the
///   workflow handler unconditionally publish the event on Approved without a giant switch.
/// - Any exception is caught and converted into an <see cref="OperationalFailureAlert"/>
///   (category <c>ApprovalExecution</c>, retryable). The originating approval command must
///   never see an HTTP 500 because its downstream executor crashed.
/// - Idempotency is delegated to the executors themselves (IsExecuted flags). So if this
///   event fires twice for the same request (e.g. retry from the timeout job), only the
///   first invocation materializes side-effects; subsequent ones return <c>AlreadyExecuted</c>.
/// </summary>
public sealed class RequestFinallyApprovedHandler : INotificationHandler<RequestFinallyApprovedEvent>
{
    private readonly IMediator _mediator;
    private readonly IFailureAlertService _alerts;
    private readonly ILogger<RequestFinallyApprovedHandler> _logger;

    public RequestFinallyApprovedHandler(
        IMediator mediator,
        IFailureAlertService alerts,
        ILogger<RequestFinallyApprovedHandler> logger)
    {
        _mediator = mediator;
        _alerts = alerts;
        _logger = logger;
    }

    public async Task Handle(RequestFinallyApprovedEvent notification, CancellationToken ct)
    {
        var target = Map(notification.EntityType);
        if (target is null) return; // not one of the Phase 1 execution targets

        try
        {
            var result = await _mediator.Send(
                new ExecuteApprovalCommand(target.Value, notification.EntityId), ct);

            if (!result.IsSuccess)
            {
                await _alerts.RaiseAsync(new RaiseFailureAlertRequest
                {
                    Category = OperationalFailureCategory.ApprovalExecution,
                    SourceEntityType = target.Value.ToString(),
                    SourceEntityId = notification.EntityId,
                    FailureCode = "AutoExecuteCommandFailed",
                    Reason = $"Auto-execute from workflow {notification.WorkflowInstanceId} returned failure.",
                    ErrorMessage = result.Error,
                    Severity = OperationalFailureSeverity.Error,
                    IsRetryable = true,
                    MetadataJson = $"{{\"workflowInstanceId\":{notification.WorkflowInstanceId}}}"
                }, ct);
            }
            else
            {
                _logger.LogInformation(
                    "Auto-executed {Target} #{EntityId}: {Outcome} ({Message})",
                    target.Value, notification.EntityId,
                    result.Value!.Outcome, result.Value.Message);
            }
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex,
                "Auto-execute handler threw for {EntityType} #{EntityId} (workflow {WorkflowId}).",
                notification.EntityType, notification.EntityId, notification.WorkflowInstanceId);

            await _alerts.RaiseAsync(new RaiseFailureAlertRequest
            {
                Category = OperationalFailureCategory.ApprovalExecution,
                SourceEntityType = target.Value.ToString(),
                SourceEntityId = notification.EntityId,
                FailureCode = "AutoExecuteHandlerException",
                Reason = "Auto-execute handler threw an unhandled exception after workflow approval.",
                ErrorMessage = ex.Message,
                Severity = OperationalFailureSeverity.Error,
                IsRetryable = true,
                MetadataJson = $"{{\"workflowInstanceId\":{notification.WorkflowInstanceId}}}"
            }, ct);
        }
    }

    private static ApprovalExecutionTargetType? Map(WorkflowEntityType entity) => entity switch
    {
        WorkflowEntityType.AllowanceRequest => ApprovalExecutionTargetType.AllowanceRequest,
        WorkflowEntityType.LoanApplication => ApprovalExecutionTargetType.LoanApplication,
        WorkflowEntityType.SalaryAdvance => ApprovalExecutionTargetType.SalaryAdvance,
        WorkflowEntityType.ExpenseClaim => ApprovalExecutionTargetType.ExpenseClaim,
        WorkflowEntityType.BenefitEnrollment => ApprovalExecutionTargetType.BenefitEnrollment,
        WorkflowEntityType.LetterRequest => ApprovalExecutionTargetType.LetterRequest,
        _ => null
    };
}
