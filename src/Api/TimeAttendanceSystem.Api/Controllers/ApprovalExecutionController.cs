using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Features.ApprovalExecution;
using TecAxle.Hrms.Application.Features.ApprovalExecution.Commands;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Phase 1 (v14.1): Exposes the approval-to-execution layer for all 6 target request types.
/// On approval the HR/self-service layer should call the relevant execute endpoint.
/// Execution is idempotent and safe to call multiple times.
/// </summary>
[ApiController]
[Route("api/v1/approval-execution")]
[Authorize]
public sealed class ApprovalExecutionController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _db;

    public ApprovalExecutionController(IMediator mediator, IApplicationDbContext db)
    {
        _mediator = mediator;
        _db = db;
    }

    [HttpPost("allowance-requests/{id:long}/execute")]
    public Task<IActionResult> ExecuteAllowanceRequest(long id, CancellationToken ct)
        => RunAsync(ApprovalExecutionTargetType.AllowanceRequest, id, ct);

    [HttpPost("loan-applications/{id:long}/execute")]
    public Task<IActionResult> ExecuteLoanApplication(long id, CancellationToken ct)
        => RunAsync(ApprovalExecutionTargetType.LoanApplication, id, ct);

    [HttpPost("salary-advances/{id:long}/execute")]
    public Task<IActionResult> ExecuteSalaryAdvance(long id, CancellationToken ct)
        => RunAsync(ApprovalExecutionTargetType.SalaryAdvance, id, ct);

    [HttpPost("expense-claims/{id:long}/execute")]
    public Task<IActionResult> ExecuteExpenseClaim(long id, CancellationToken ct)
        => RunAsync(ApprovalExecutionTargetType.ExpenseClaim, id, ct);

    [HttpPost("benefit-enrollments/{id:long}/execute")]
    public Task<IActionResult> ExecuteBenefitEnrollment(long id, CancellationToken ct)
        => RunAsync(ApprovalExecutionTargetType.BenefitEnrollment, id, ct);

    [HttpPost("letter-requests/{id:long}/execute")]
    public Task<IActionResult> ExecuteLetterRequest(long id, CancellationToken ct)
        => RunAsync(ApprovalExecutionTargetType.LetterRequest, id, ct);

    /// <summary>
    /// Phase 1 (v14.1): Unified execution-status query for any of the 6 target types.
    /// Returns IsExecuted / ExecutedAtUtc / ExecutedByUserId / ExecutionError plus a
    /// resulting-entity pointer where applicable. HR/self-service uses this to show
    /// "approved but not yet executed" states and drill into failures.
    /// </summary>
    [HttpGet("{targetType}/{id:long}/execution-status")]
    public async Task<IActionResult> GetExecutionStatus(
        ApprovalExecutionTargetType targetType, long id, CancellationToken ct)
    {
        object? payload = targetType switch
        {
            ApprovalExecutionTargetType.AllowanceRequest =>
                await _db.AllowanceRequests.AsNoTracking()
                    .Where(x => x.Id == id && !x.IsDeleted)
                    .Select(x => new {
                        id = x.Id, status = x.Status.ToString(),
                        isExecuted = x.IsExecuted, executedAtUtc = x.ExecutedAtUtc,
                        executedByUserId = x.ExecutedByUserId, executionError = x.ExecutionError,
                        resultingEntityId = x.ResultingAssignmentId
                    })
                    .FirstOrDefaultAsync(ct),
            ApprovalExecutionTargetType.LoanApplication =>
                await _db.LoanApplications.AsNoTracking()
                    .Where(x => x.Id == id && !x.IsDeleted)
                    .Select(x => new {
                        id = x.Id, status = x.Status.ToString(),
                        isExecuted = x.IsExecuted, executedAtUtc = x.ExecutedAtUtc,
                        executedByUserId = x.ExecutedByUserId, executionError = x.ExecutionError,
                        scheduleGenerated = x.ScheduleGenerated,
                        installments = x.RepaymentMonths
                    })
                    .FirstOrDefaultAsync(ct),
            ApprovalExecutionTargetType.SalaryAdvance =>
                await _db.SalaryAdvances.AsNoTracking()
                    .Where(x => x.Id == id && !x.IsDeleted)
                    .Select(x => new {
                        id = x.Id, status = x.Status.ToString(),
                        isExecuted = x.IsExecuted, executedAtUtc = x.ExecutedAtUtc,
                        executedByUserId = x.ExecutedByUserId, executionError = x.ExecutionError,
                        deductionStartDate = x.DeductionStartDate,
                        deductionEndDate = x.DeductionEndDate,
                        payrollRecordId = x.PayrollRecordId
                    })
                    .FirstOrDefaultAsync(ct),
            ApprovalExecutionTargetType.ExpenseClaim =>
                await _db.ExpenseClaims.AsNoTracking()
                    .Where(x => x.Id == id && !x.IsDeleted)
                    .Select(x => new {
                        id = x.Id, status = x.Status.ToString(),
                        isExecuted = x.IsExecuted, executedAtUtc = x.ExecutedAtUtc,
                        executedByUserId = x.ExecutedByUserId, executionError = x.ExecutionError,
                        reimbursementMethod = x.ReimbursementMethod.ToString(),
                        reimbursementId = x.Reimbursement != null ? x.Reimbursement.Id : (long?)null
                    })
                    .FirstOrDefaultAsync(ct),
            ApprovalExecutionTargetType.BenefitEnrollment =>
                await _db.BenefitEnrollments.AsNoTracking()
                    .Where(x => x.Id == id && !x.IsDeleted)
                    .Select(x => new {
                        id = x.Id, status = x.Status.ToString(),
                        isExecuted = x.IsExecuted, executedAtUtc = x.ExecutedAtUtc,
                        executedByUserId = x.ExecutedByUserId, executionError = x.ExecutionError,
                        payrollDeductionEnabled = x.PayrollDeductionEnabled,
                        employeeMonthlyContribution = x.EmployeeMonthlyContribution,
                        employerMonthlyContribution = x.EmployerMonthlyContribution
                    })
                    .FirstOrDefaultAsync(ct),
            ApprovalExecutionTargetType.LetterRequest =>
                await _db.LetterRequests.AsNoTracking()
                    .Where(x => x.Id == id && !x.IsDeleted)
                    .Select(x => new {
                        id = x.Id, status = x.Status.ToString(),
                        isExecuted = x.IsExecuted, executedAtUtc = x.ExecutedAtUtc,
                        executedByUserId = x.ExecutedByUserId, executionError = x.ExecutionError,
                        generatedDocumentUrl = x.GeneratedDocumentUrl,
                        generatedAt = x.GeneratedAt
                    })
                    .FirstOrDefaultAsync(ct),
            _ => null
        };

        return payload is null ? NotFound() : Ok(payload);
    }

    private async Task<IActionResult> RunAsync(ApprovalExecutionTargetType target, long id, CancellationToken ct)
    {
        var result = await _mediator.Send(new ExecuteApprovalCommand(target, id), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        var outcome = result.Value!;
        return outcome.Outcome switch
        {
            ExecutionOutcome.Succeeded => Ok(new
            {
                outcome = outcome.Outcome.ToString(),
                message = outcome.Message,
                resultingEntityId = outcome.ResultingEntityId
            }),
            ExecutionOutcome.AlreadyExecuted => Ok(new
            {
                outcome = outcome.Outcome.ToString(),
                message = outcome.Message,
                resultingEntityId = outcome.ResultingEntityId
            }),
            ExecutionOutcome.NotReady => Conflict(new
            {
                outcome = outcome.Outcome.ToString(),
                message = outcome.Message
            }),
            ExecutionOutcome.ValidationFailed => UnprocessableEntity(new
            {
                outcome = outcome.Outcome.ToString(),
                failureCode = outcome.FailureCode,
                message = outcome.Message
            }),
            _ => StatusCode(500, new
            {
                outcome = outcome.Outcome.ToString(),
                failureCode = outcome.FailureCode,
                message = outcome.Message
            })
        };
    }
}
