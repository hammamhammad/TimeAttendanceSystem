using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution.Commands;

/// <summary>
/// Phase 1 (v14.1): MediatR command that dispatches to the correct <see cref="IApprovalExecutor"/>.
/// Wrapped by per-controller /execute endpoints and callable from lifecycle/workflow completion handlers.
/// </summary>
public sealed record ExecuteApprovalCommand(
    ApprovalExecutionTargetType TargetType,
    long RequestId) : IRequest<Result<ExecutionResult>>;
