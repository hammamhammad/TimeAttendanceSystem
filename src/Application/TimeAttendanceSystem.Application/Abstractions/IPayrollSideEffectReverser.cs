namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Phase 2 (v14.2): Reverses payroll-linked side-effects when a payroll record is
/// admin-unlocked, soft-deleted during recalculation, or its owning period is cancelled.
///
/// Without this reversal, after an admin-unlock + recalc, loan repayments originally
/// linked to the unlocked PayrollRecord would stay in <c>LoanRepaymentStatus.Paid</c>,
/// leaving the business state inconsistent (repayment marked Paid but sitting behind
/// a soft-deleted PayrollRecord, OutstandingBalance incorrectly decremented).
///
/// The reverser touches only the state that Phase 1 actually writes during the link
/// step — loans, advances, expense claims. Benefit deductions are NOT mutated at
/// link time (they are pure reads from enrollments), so they need no reversal.
///
/// All operations are idempotent: calling twice on the same PayrollRecord is a no-op
/// for any row already in the "scheduled/approved/approved" state.
/// </summary>
public interface IPayrollSideEffectReverser
{
    /// <summary>
    /// Reverse side-effects for a single PayrollRecord (used when one record is
    /// soft-deleted during recalculation or when the whole period is being cancelled).
    /// Does NOT SaveChangesAsync — the caller is responsible (so reversal is part
    /// of the same transaction as the status change).
    /// </summary>
    Task ReverseAsync(long payrollRecordId, string reason, CancellationToken ct = default);

    /// <summary>
    /// Reverse side-effects for every non-soft-deleted PayrollRecord in a period.
    /// Used by admin-unlock and period-cancel paths.
    /// </summary>
    Task ReverseAllInPeriodAsync(long payrollPeriodId, string reason, CancellationToken ct = default);

    /// <summary>
    /// Cascade-soft-delete orphaned <c>PayrollRecordDetail</c> rows that belong to
    /// already-soft-deleted <c>PayrollRecord</c> rows in a period. Idempotent cleanup
    /// for pre-Phase-2 data and for detail rows left behind by recalculation.
    /// </summary>
    Task CascadeDeleteDetailsAsync(long payrollPeriodId, CancellationToken ct = default);
}
