namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): Outcome of an approval-to-execution attempt.
/// <list type="bullet">
///   <item><c>Succeeded</c> — the downstream business artifact was created/updated; marker flags flipped.</item>
///   <item><c>AlreadyExecuted</c> — idempotency hit: the request was executed previously; no-op.</item>
///   <item><c>NotReady</c> — not in a state that allows execution (e.g. still Pending, or Rejected).</item>
///   <item><c>ValidationFailed</c> — a business-rule validation (e.g. missing template) blocked execution; a failure alert is raised.</item>
///   <item><c>Failed</c> — unexpected exception; a failure alert is raised; caller may retry.</item>
/// </list>
/// </summary>
public enum ExecutionOutcome
{
    Succeeded = 1,
    AlreadyExecuted = 2,
    NotReady = 3,
    ValidationFailed = 4,
    Failed = 5
}

public sealed record ExecutionResult(
    ExecutionOutcome Outcome,
    string? Message = null,
    long? ResultingEntityId = null,
    string? FailureCode = null)
{
    public bool IsSuccess => Outcome == ExecutionOutcome.Succeeded || Outcome == ExecutionOutcome.AlreadyExecuted;

    public static ExecutionResult Succeeded(long? resultingEntityId = null, string? message = null)
        => new(ExecutionOutcome.Succeeded, message, resultingEntityId);

    public static ExecutionResult AlreadyExecuted(long? resultingEntityId = null)
        => new(ExecutionOutcome.AlreadyExecuted, "Already executed (idempotent no-op).", resultingEntityId);

    public static ExecutionResult NotReady(string message)
        => new(ExecutionOutcome.NotReady, message);

    public static ExecutionResult ValidationFailed(string code, string message)
        => new(ExecutionOutcome.ValidationFailed, message, null, code);

    public static ExecutionResult Failed(string code, string message)
        => new(ExecutionOutcome.Failed, message, null, code);
}
