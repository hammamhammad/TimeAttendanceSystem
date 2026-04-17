using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Phase 2 (v14.2): Production implementation of <see cref="IPayrollSideEffectReverser"/>.
/// Reverses loan / advance / expense linking without touching the PayrollRecord itself.
/// </summary>
public sealed class PayrollSideEffectReverser : IPayrollSideEffectReverser
{
    private readonly IApplicationDbContext _db;
    private readonly ILogger<PayrollSideEffectReverser> _logger;

    public PayrollSideEffectReverser(IApplicationDbContext db, ILogger<PayrollSideEffectReverser> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task ReverseAsync(long payrollRecordId, string reason, CancellationToken ct = default)
    {
        await ReverseLoansAsync(payrollRecordId, reason, ct);
        await ReverseAdvancesAsync(payrollRecordId, reason, ct);
        await ReverseExpensesAsync(payrollRecordId, reason, ct);
    }

    public async Task ReverseAllInPeriodAsync(long payrollPeriodId, string reason, CancellationToken ct = default)
    {
        var recordIds = await _db.PayrollRecords
            .Where(r => r.PayrollPeriodId == payrollPeriodId && !r.IsDeleted)
            .Select(r => r.Id)
            .ToListAsync(ct);

        foreach (var id in recordIds)
        {
            await ReverseAsync(id, reason, ct);
        }

        _logger.LogInformation(
            "PayrollSideEffectReverser: reversed side-effects for {Count} records in period {PeriodId}. Reason: {Reason}",
            recordIds.Count, payrollPeriodId, reason);
    }

    public async Task CascadeDeleteDetailsAsync(long payrollPeriodId, CancellationToken ct = default)
    {
        // Find all PayrollRecordDetail rows whose owning PayrollRecord is soft-deleted.
        // IgnoreQueryFilters is required because PayrollRecord has a global filter that
        // hides soft-deleted rows — this job explicitly targets those rows.
        var deletedRecordIds = await _db.PayrollRecords
            .IgnoreQueryFilters()
            .Where(r => r.PayrollPeriodId == payrollPeriodId && r.IsDeleted)
            .Select(r => r.Id)
            .ToListAsync(ct);

        if (deletedRecordIds.Count == 0) return;

        var orphanDetails = await _db.PayrollRecordDetails
            .Where(d => deletedRecordIds.Contains(d.PayrollRecordId) && !d.IsDeleted)
            .ToListAsync(ct);

        foreach (var d in orphanDetails)
        {
            d.IsDeleted = true;
            d.ModifiedAtUtc = DateTime.UtcNow;
            d.ModifiedBy = "SYSTEM:PayrollSideEffectReverser";
        }

        if (orphanDetails.Count > 0)
        {
            _logger.LogInformation(
                "PayrollSideEffectReverser: cascade-soft-deleted {Count} orphan PayrollRecordDetail rows in period {PeriodId}.",
                orphanDetails.Count, payrollPeriodId);
        }
    }

    private async Task ReverseLoansAsync(long payrollRecordId, string reason, CancellationToken ct)
    {
        var repayments = await _db.LoanRepayments
            .Include(r => r.LoanApplication)
            .Where(r => r.PayrollRecordId == payrollRecordId && !r.IsDeleted)
            .ToListAsync(ct);

        foreach (var rep in repayments)
        {
            if (rep.Status != LoanRepaymentStatus.Paid) continue;

            // Flip back to Scheduled so the next payroll run re-matches this installment.
            rep.Status = LoanRepaymentStatus.Scheduled;
            rep.PaidDate = null;
            rep.PayrollRecordId = null;
            rep.Notes = AppendNote(rep.Notes, $"Reversed on {DateTime.UtcNow:O}: {reason}");
            rep.ModifiedAtUtc = DateTime.UtcNow;
            rep.ModifiedBy = "SYSTEM:PayrollSideEffectReverser";

            var loan = rep.LoanApplication;
            if (loan.OutstandingBalance.HasValue)
            {
                loan.OutstandingBalance += rep.Amount;
                if (loan.Status == LoanApplicationStatus.FullyPaid)
                    loan.Status = LoanApplicationStatus.Active;
                loan.ModifiedAtUtc = DateTime.UtcNow;
                loan.ModifiedBy = "SYSTEM:PayrollSideEffectReverser";
            }
        }
    }

    private async Task ReverseAdvancesAsync(long payrollRecordId, string reason, CancellationToken ct)
    {
        var advances = await _db.SalaryAdvances
            .Where(a => a.PayrollRecordId == payrollRecordId && !a.IsDeleted)
            .ToListAsync(ct);

        foreach (var a in advances)
        {
            if (a.Status != SalaryAdvanceStatus.Deducted) continue;

            // Flip back to Approved so the next payroll run re-deducts.
            a.Status = SalaryAdvanceStatus.Approved;
            a.PayrollRecordId = null;
            a.ModifiedAtUtc = DateTime.UtcNow;
            a.ModifiedBy = "SYSTEM:PayrollSideEffectReverser";
        }
    }

    private async Task ReverseExpensesAsync(long payrollRecordId, string reason, CancellationToken ct)
    {
        var reimbursements = await _db.ExpenseReimbursements
            .Include(r => r.ExpenseClaim)
            .Where(r => r.PayrollRecordId == payrollRecordId && !r.IsDeleted)
            .ToListAsync(ct);

        foreach (var r in reimbursements)
        {
            // Flip claim back to Approved so the next payroll run re-reimburses.
            if (r.ExpenseClaim.Status == ExpenseClaimStatus.Reimbursed)
            {
                r.ExpenseClaim.Status = ExpenseClaimStatus.Approved;
                r.ExpenseClaim.ModifiedAtUtc = DateTime.UtcNow;
                r.ExpenseClaim.ModifiedBy = "SYSTEM:PayrollSideEffectReverser";
            }

            r.PayrollRecordId = null;
            r.ReimbursementDate = null;
            r.ModifiedAtUtc = DateTime.UtcNow;
            r.ModifiedBy = "SYSTEM:PayrollSideEffectReverser";
        }
    }

    private static string AppendNote(string? existing, string append)
        => string.IsNullOrWhiteSpace(existing) ? append : $"{existing} | {append}";
}
