using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): On <see cref="ExpenseClaim"/> approval, creates the single
/// <see cref="ExpenseReimbursement"/> row according to the claim's
/// <see cref="ExpenseClaim.ReimbursementMethod"/>:
/// <list type="bullet">
///   <item><c>Payroll</c> → reimbursement with no ReimbursementDate; next payroll run picks it up.</item>
///   <item><c>BankTransfer</c> / <c>Cash</c> → reimbursement with ReimbursementDate = null and a reference placeholder; finance must settle manually, which is outside payroll scope.</item>
/// </list>
/// Idempotent: existing reimbursement or <c>IsExecuted=true</c> short-circuits.
/// </summary>
public sealed class ExpenseClaimExecutor : IApprovalExecutor
{
    private readonly IApplicationDbContext _db;
    public ApprovalExecutionTargetType TargetType => ApprovalExecutionTargetType.ExpenseClaim;

    public ExpenseClaimExecutor(IApplicationDbContext db) => _db = db;

    public async Task<ExecutionResult> ExecuteAsync(long requestId, long? executingUserId, CancellationToken ct = default)
    {
        var claim = await _db.ExpenseClaims
            .Include(c => c.Reimbursement)
            .FirstOrDefaultAsync(c => c.Id == requestId && !c.IsDeleted, ct);

        if (claim == null)
            return ExecutionResult.NotReady("ExpenseClaim not found.");

        if (claim.IsExecuted && claim.Reimbursement != null)
            return ExecutionResult.AlreadyExecuted(claim.Reimbursement.Id);

        if (claim.Status != ExpenseClaimStatus.Approved)
            return ExecutionResult.NotReady($"Claim status is {claim.Status}, must be Approved.");
        if (claim.TotalAmount <= 0)
            return ExecutionResult.ValidationFailed("InvalidAmount", "TotalAmount must be > 0.");

        // If a reimbursement already exists (legacy manual path), mark executed idempotently.
        if (claim.Reimbursement != null)
        {
            claim.IsExecuted = true;
            claim.ExecutedAtUtc ??= DateTime.UtcNow;
            claim.ExecutedByUserId ??= executingUserId;
            await _db.SaveChangesAsync(ct);
            return ExecutionResult.AlreadyExecuted(claim.Reimbursement.Id);
        }

        var reimb = new ExpenseReimbursement
        {
            ExpenseClaimId = claim.Id,
            Amount = claim.TotalAmount,
            Method = claim.ReimbursementMethod,
            ReimbursementDate = null, // filled when payroll runs (Payroll method) or finance settles (BankTransfer/Cash)
            Notes = $"Auto-created from ExpenseClaim #{claim.ClaimNumber} on approval.",
            ReferenceNumber = null,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = executingUserId?.ToString() ?? "SYSTEM"
        };
        _db.ExpenseReimbursements.Add(reimb);

        claim.IsExecuted = true;
        claim.ExecutedAtUtc = DateTime.UtcNow;
        claim.ExecutedByUserId = executingUserId;
        claim.ExecutionError = null;
        claim.ModifiedAtUtc = DateTime.UtcNow;
        claim.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";

        await _db.SaveChangesAsync(ct);
        return ExecutionResult.Succeeded(reimb.Id,
            $"Reimbursement #{reimb.Id} ({claim.ReimbursementMethod}) created for claim {claim.ClaimNumber}.");
    }
}
