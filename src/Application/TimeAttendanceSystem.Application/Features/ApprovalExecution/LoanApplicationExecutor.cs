using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Application.Features.ApprovalExecution;

/// <summary>
/// Phase 1 (v14.1): On <see cref="LoanApplication"/> approval, generates the full
/// <see cref="LoanRepayment"/> schedule so the payroll engine can deduct installments.
///
/// Schedule generation rules:
/// <list type="bullet">
///   <item>ApprovedAmount and RepaymentMonths must be set; MonthlyInstallment is re-derived.</item>
///   <item>First installment DueDate = StartDate (fall back: today + 1 month) day-of-month = 1.</item>
///   <item>Interest distributed evenly across installments (simple amortization).</item>
///   <item>BalanceRemaining is recorded per installment.</item>
///   <item>Idempotent: if <c>ScheduleGenerated</c> is true OR existing scheduled rows found, no duplicate.</item>
/// </list>
///
/// Sets <see cref="LoanApplication.Status"/> to <c>Active</c> after schedule creation.
/// </summary>
public sealed class LoanApplicationExecutor : IApprovalExecutor
{
    private readonly IApplicationDbContext _db;
    public ApprovalExecutionTargetType TargetType => ApprovalExecutionTargetType.LoanApplication;

    public LoanApplicationExecutor(IApplicationDbContext db) => _db = db;

    public async Task<ExecutionResult> ExecuteAsync(long requestId, long? executingUserId, CancellationToken ct = default)
    {
        var loan = await _db.LoanApplications
            .Include(l => l.Repayments)
            .FirstOrDefaultAsync(l => l.Id == requestId && !l.IsDeleted, ct);

        if (loan == null)
            return ExecutionResult.NotReady("LoanApplication not found.");

        if (loan.IsExecuted && loan.ScheduleGenerated)
            return ExecutionResult.AlreadyExecuted(loan.Id);

        if (loan.Status != LoanApplicationStatus.Approved)
            return ExecutionResult.NotReady($"Loan status is {loan.Status}, must be Approved.");

        var amount = loan.ApprovedAmount ?? loan.RequestedAmount;
        if (amount <= 0)
            return ExecutionResult.ValidationFailed("InvalidAmount", "Approved amount must be > 0.");
        if (loan.RepaymentMonths <= 0)
            return ExecutionResult.ValidationFailed("InvalidTerm", "RepaymentMonths must be > 0.");

        // Idempotency safety net: if repayment rows already exist, treat as already executed.
        var existingSchedule = loan.Repayments.Where(r => !r.IsDeleted).ToList();
        if (existingSchedule.Count > 0 && existingSchedule.Count >= loan.RepaymentMonths)
        {
            loan.ScheduleGenerated = true;
            loan.IsExecuted = true;
            loan.ExecutedAtUtc ??= DateTime.UtcNow;
            loan.ExecutedByUserId ??= executingUserId;
            await _db.SaveChangesAsync(ct);
            return ExecutionResult.AlreadyExecuted(loan.Id);
        }

        // Derive monthly installment (simple amortization with equal total installments).
        var totalPayable = amount + (amount * loan.InterestRate / 100m);
        var monthlyInstallment = Math.Round(totalPayable / loan.RepaymentMonths, 2, MidpointRounding.AwayFromZero);

        var startDate = (loan.StartDate ?? DateTime.UtcNow.Date).Date;
        if (startDate.Day != 1) startDate = new DateTime(startDate.Year, startDate.Month, 1).AddMonths(1);

        var principalPortion = Math.Round(amount / loan.RepaymentMonths, 2, MidpointRounding.AwayFromZero);
        var interestPortion = Math.Round(monthlyInstallment - principalPortion, 2, MidpointRounding.AwayFromZero);
        var remaining = amount;

        for (int i = 1; i <= loan.RepaymentMonths; i++)
        {
            var due = startDate.AddMonths(i - 1);
            remaining = Math.Max(0m, Math.Round(remaining - principalPortion, 2, MidpointRounding.AwayFromZero));

            _db.LoanRepayments.Add(new LoanRepayment
            {
                LoanApplicationId = loan.Id,
                InstallmentNumber = i,
                Amount = monthlyInstallment,
                PrincipalAmount = principalPortion,
                InterestAmount = interestPortion,
                DueDate = due,
                Status = LoanRepaymentStatus.Scheduled,
                BalanceRemaining = remaining,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = executingUserId?.ToString() ?? "SYSTEM"
            });
        }

        loan.MonthlyInstallment = monthlyInstallment;
        loan.OutstandingBalance = amount;
        loan.EndDate = startDate.AddMonths(loan.RepaymentMonths - 1);
        loan.Status = LoanApplicationStatus.Active;

        loan.IsExecuted = true;
        loan.ScheduleGenerated = true;
        loan.ExecutedAtUtc = DateTime.UtcNow;
        loan.ExecutedByUserId = executingUserId;
        loan.ExecutionError = null;
        loan.ModifiedAtUtc = DateTime.UtcNow;
        loan.ModifiedBy = executingUserId?.ToString() ?? "SYSTEM";

        await _db.SaveChangesAsync(ct);
        return ExecutionResult.Succeeded(loan.Id, $"Schedule generated: {loan.RepaymentMonths} installments of {monthlyInstallment}.");
    }
}
