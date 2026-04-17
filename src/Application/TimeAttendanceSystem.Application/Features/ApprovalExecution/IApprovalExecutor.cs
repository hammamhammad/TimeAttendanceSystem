namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): Common contract for every per-module approval executor.
/// Executors are idempotent: calling ExecuteAsync a second time on an already-executed
/// request returns <see cref="ExecutionOutcome.AlreadyExecuted"/> without side-effects.
///
/// Implementations live in <c>Features/ApprovalExecution/*Executor.cs</c> and are discovered
/// via DI. The <see cref="ExecuteApprovalCommand"/> MediatR command dispatches to the
/// correct executor based on <see cref="ApprovalExecutionTargetType"/>.
/// </summary>
public interface IApprovalExecutor
{
    /// <summary>Which target entity this executor handles.</summary>
    ApprovalExecutionTargetType TargetType { get; }

    /// <summary>Run the post-approval business logic idempotently.</summary>
    Task<ExecutionResult> ExecuteAsync(long requestId, long? executingUserId, CancellationToken ct = default);
}

public enum ApprovalExecutionTargetType
{
    AllowanceRequest = 1,
    LoanApplication = 2,
    SalaryAdvance = 3,
    ExpenseClaim = 4,
    BenefitEnrollment = 5,
    LetterRequest = 6
}
