using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution.Commands;

/// <summary>
/// Phase 1 (v14.1): Dispatches an <see cref="ExecuteApprovalCommand"/> to the appropriate
/// <see cref="IApprovalExecutor"/>. On Failed / ValidationFailed outcomes, raises an
/// <see cref="OperationalFailureAlert"/> via <see cref="IFailureAlertService"/>.
/// </summary>
public sealed class ExecuteApprovalCommandHandler : BaseHandler<ExecuteApprovalCommand, Result<ExecutionResult>>
{
    private readonly IEnumerable<IApprovalExecutor> _executors;
    private readonly IFailureAlertService _alerts;

    public ExecuteApprovalCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IEnumerable<IApprovalExecutor> executors,
        IFailureAlertService alerts)
        : base(context, currentUser)
    {
        _executors = executors;
        _alerts = alerts;
    }

    public override async Task<Result<ExecutionResult>> Handle(ExecuteApprovalCommand request, CancellationToken ct)
    {
        var executor = _executors.FirstOrDefault(e => e.TargetType == request.TargetType);
        if (executor == null)
            return Result.Failure<ExecutionResult>($"No approval executor registered for {request.TargetType}.");

        ExecutionResult result;
        try
        {
            result = await executor.ExecuteAsync(request.RequestId, CurrentUser.UserId, ct);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            await _alerts.RaiseAsync(new RaiseFailureAlertRequest
            {
                Category = OperationalFailureCategory.ApprovalExecution,
                SourceEntityType = request.TargetType.ToString(),
                SourceEntityId = request.RequestId,
                FailureCode = "ExecutorException",
                Reason = $"Executor for {request.TargetType} threw an unhandled exception.",
                ErrorMessage = ex.Message,
                Severity = OperationalFailureSeverity.Error,
                IsRetryable = true
            }, ct);
            return Result.Failure<ExecutionResult>(ex.Message);
        }

        if (result.Outcome == ExecutionOutcome.Failed || result.Outcome == ExecutionOutcome.ValidationFailed)
        {
            await _alerts.RaiseAsync(new RaiseFailureAlertRequest
            {
                Category = OperationalFailureCategory.ApprovalExecution,
                SourceEntityType = request.TargetType.ToString(),
                SourceEntityId = request.RequestId,
                FailureCode = result.FailureCode ?? "ExecutionFailed",
                Reason = result.Message ?? "Execution failed.",
                Severity = result.Outcome == ExecutionOutcome.ValidationFailed
                    ? OperationalFailureSeverity.Warning
                    : OperationalFailureSeverity.Error,
                IsRetryable = result.Outcome == ExecutionOutcome.Failed
            }, ct);
        }

        return Result.Success(result);
    }
}
