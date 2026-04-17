using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): On <see cref="SalaryAdvance"/> approval, ensures the advance is ready
/// for payroll integration using a date-range window
/// (<see cref="SalaryAdvance.DeductionStartDate"/> / <see cref="SalaryAdvance.DeductionEndDate"/>).
///
/// Phase 7 (v14.7): the legacy-YYYYMM back-fill path was removed. When the request comes
/// in without a date range, the executor sets it to the first calendar month after the
/// approval date. Idempotent: <c>IsExecuted=true</c> short-circuits.
/// </summary>
public sealed class SalaryAdvanceExecutor : IApprovalExecutor
{
    private readonly IApplicationDbContext _db;
    public ApprovalExecutionTargetType TargetType => ApprovalExecutionTargetType.SalaryAdvance;

    public SalaryAdvanceExecutor(IApplicationDbContext db) => _db = db;

    public async Task<ExecutionResult> ExecuteAsync(long requestId, long? executingUserId, CancellationToken ct = default)
    {
        var adv = await _db.SalaryAdvances
            .FirstOrDefaultAsync(a => a.Id == requestId && !a.IsDeleted, ct);

        if (adv == null)
            return ExecutionResult.NotReady("SalaryAdvance not found.");
        if (adv.IsExecuted)
            return ExecutionResult.AlreadyExecuted(adv.Id);
        if (adv.Status != SalaryAdvanceStatus.Approved)
            return ExecutionResult.NotReady($"SalaryAdvance status is {adv.Status}, must be Approved.");
        if (adv.Amount <= 0)
            return ExecutionResult.ValidationFailed("InvalidAmount", "Amount must be > 0.");

        // Phase 7 (v14.7): date-range is the sole matching key. If the caller didn't
        // supply one, default to the first calendar month after the approval date.
        if (!adv.DeductionStartDate.HasValue || !adv.DeductionEndDate.HasValue)
        {
            var baseDate = (adv.ApprovedAt ?? DateTime.UtcNow).Date;
            var nextMonth = new DateTime(baseDate.Year, baseDate.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(1);
            adv.DeductionStartDate = nextMonth;
            adv.DeductionEndDate = nextMonth.AddMonths(1).AddDays(-1);
        }

        adv.IsExecuted = true;
        adv.ExecutedAtUtc = DateTime.UtcNow;
        adv.ExecutedByUserId = executingUserId;
        adv.ExecutionError = null;
        adv.ModifiedAtUtc = DateTime.UtcNow;
        adv.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";

        await _db.SaveChangesAsync(ct);
        return ExecutionResult.Succeeded(adv.Id,
            $"Advance marked ready for payroll {adv.DeductionStartDate:yyyy-MM-dd} → {adv.DeductionEndDate:yyyy-MM-dd}.");
    }
}
