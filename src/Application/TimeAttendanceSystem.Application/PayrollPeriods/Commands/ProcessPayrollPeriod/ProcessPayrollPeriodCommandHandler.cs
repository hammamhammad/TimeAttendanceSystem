using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Payroll.Exceptions;
using TecAxle.Hrms.Application.Payroll.Services;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Operations;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.ProcessPayrollPeriod;

/// <summary>
/// Orchestrates payroll processing for a period. Delegates all arithmetic to
/// <see cref="IPayrollCalculationService"/>. Opens a <see cref="PayrollRunAudit"/>
/// row, iterates employees, persists results and per-employee audit items,
/// and integrates loan/advance/expense/benefit side-effects.
///
/// Handles both:
///   - Initial processing: period.Status must be Draft.
///   - Recalculation:     period.Status must be Processed AND <c>request.IsRecalculation</c> is true.
/// Finalized/Paid periods CANNOT be processed — explicitly rejected.
///
/// Phase 1 (v14.1) changes:
///   - Per-employee work (calculate + side-effects + linking) is wrapped in a DB transaction
///     so that a failure never leaves loans marked Paid without a PayrollRecord (transactional
///     side-effect safety).
///   - SalaryAdvance matching prefers DeductionStartDate/EndDate (date range) over the legacy
///     YYYYMM DeductionMonth integer.
///   - Expense reimbursement integration requires the claim to have been approved on or before
///     the period end (claim-date validation) to avoid double-reimbursement of stale claims.
///   - Benefit enrollment payroll deductions are integrated (employee premium only; employer-side
///     is already tracked on <see cref="BenefitEnrollment.EmployerMonthlyContribution"/>).
///   - Per-employee failures raise an <see cref="OperationalFailureAlert"/> so HR sees them.
/// </summary>
public class ProcessPayrollPeriodCommandHandler : BaseHandler<ProcessPayrollPeriodCommand, Result<long>>
{
    private readonly IPayrollCalculationService _calculator;
    private readonly IFailureAlertService _alerts;
    private readonly IPayrollSideEffectReverser _sideEffectReverser;

    public ProcessPayrollPeriodCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IPayrollCalculationService calculator,
        IFailureAlertService alerts,
        IPayrollSideEffectReverser sideEffectReverser)
        : base(context, currentUser)
    {
        _calculator = calculator;
        _alerts = alerts;
        _sideEffectReverser = sideEffectReverser;
    }

    public override async Task<Result<long>> Handle(ProcessPayrollPeriodCommand request, CancellationToken cancellationToken)
    {
        var period = await Context.PayrollPeriods
            .Include(p => p.Records)
            .FirstOrDefaultAsync(p => p.Id == request.PayrollPeriodId && !p.IsDeleted, cancellationToken);

        if (period == null)
            return Result.Failure<long>("Payroll period not found.");

        if (period.LockedAtUtc.HasValue || period.Status == PayrollPeriodStatus.Paid)
            return Result.Failure<long>("Payroll period is locked (Paid) and cannot be processed or recalculated.");

        var isRecalc = request.IsRecalculation;
        if (!isRecalc && period.Status != PayrollPeriodStatus.Draft)
            return Result.Failure<long>("Only Draft payroll periods can be processed. To reprocess a processed period, use Recalculate.");
        if (isRecalc && period.Status != PayrollPeriodStatus.Processed && period.Status != PayrollPeriodStatus.Draft)
            return Result.Failure<long>("Only Draft or Processed payroll periods can be recalculated.");

        // ---- Open audit run ----
        var audit = new PayrollRunAudit
        {
            PayrollPeriodId = period.Id,
            RunType = isRecalc ? PayrollRunType.Recalculation : PayrollRunType.InitialProcess,
            TriggeredByUserId = CurrentUser.UserId,
            TriggeredByUsername = CurrentUser.Username,
            StartedAtUtc = DateTime.UtcNow,
            Status = PayrollRunStatus.Running,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };
        Context.PayrollRunAudits.Add(audit);

        // ---- Transition to Processing ----
        period.Status = PayrollPeriodStatus.Processing;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = CurrentUser.Username;
        await Context.SaveChangesAsync(cancellationToken);

        // ---- If recalc, soft-delete existing records (preserved for audit) ----
        if (isRecalc && period.Records.Any(r => !r.IsDeleted))
        {
            foreach (var existing in period.Records.Where(r => !r.IsDeleted))
            {
                if (existing.LockedAtUtc.HasValue || existing.Status == PayrollRecordStatus.Finalized)
                    continue; // never overwrite a locked record

                // Phase 2 (v14.2): reverse side-effects (loans/advances/expenses) BEFORE
                // soft-deleting the PayrollRecord, so the fresh calc run sees a clean slate
                // and won't double-deduct or skip linked rows already stuck on the old record.
                await _sideEffectReverser.ReverseAsync(existing.Id, "recalc supersede", cancellationToken);

                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
                existing.Notes = (existing.Notes ?? "") + $" | Superseded by recalc on {DateTime.UtcNow:O}";
            }

            // Phase 2 (v14.2): cascade-soft-delete orphaned PayrollRecordDetail rows that
            // were attached to just-superseded (or previously superseded) records. Keeps the
            // detail table clean — no misleading "Benefit Premium" line orphaned under a
            // soft-deleted parent record.
            await _sideEffectReverser.CascadeDeleteDetailsAsync(period.Id, cancellationToken);
        }

        // ---- Load active employees ----
        var employees = await Context.Employees
            .Where(e => e.BranchId == period.BranchId && !e.IsDeleted && e.IsActive
                        && e.EmploymentStatus != EmploymentStatus.Terminated
                        && e.EmploymentStatus != EmploymentStatus.Resigned)
            .ToListAsync(cancellationToken);

        var adjustments = await Context.PayrollAdjustments
            .Where(a => a.PayrollPeriodId == period.Id && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        decimal totalGross = 0, totalDeductions = 0, totalNet = 0;
        int employeeCount = 0;
        var warningsAll = new List<object>();
        var errorsAll = new List<object>();

        foreach (var emp in employees)
        {
            var empAdjustments = adjustments.Where(a => a.EmployeeId == emp.Id).ToList();
            var auditItem = new PayrollRunAuditItem
            {
                PayrollRunAuditId = audit.Id,
                EmployeeId = emp.Id,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "SYSTEM"
            };

            // Phase 1 (v14.1): per-employee transactional boundary spanning
            // calculation + side-effects + linking. Partial failure rolls back.
            var tx = await Context.BeginTransactionAsync(cancellationToken);
            try
            {
                var calc = await _calculator.CalculateAsync(emp, period, empAdjustments, cancellationToken);

                // --- Integrate external module side-effects (loans, advances, reimbursements, benefits) BEFORE final net total ---
                await IntegrateLoanRepaymentsAsync(emp, period, calc, cancellationToken);
                await IntegrateSalaryAdvancesAsync(emp, period, calc, cancellationToken);
                await IntegrateExpenseReimbursementsAsync(emp, period, calc, cancellationToken);
                await IntegrateBenefitDeductionsAsync(emp, period, calc, cancellationToken);

                // Recompute totals after side-effects may have added detail lines.
                RecomputeTotalsFromDetails(calc);

                var record = new PayrollRecord
                {
                    PayrollPeriodId = period.Id,
                    EmployeeId = emp.Id,
                    BaseSalary = calc.BaseSalary,
                    TotalAllowances = calc.TotalAllowances,
                    GrossEarnings = calc.GrossEarnings,
                    TotalDeductions = calc.TotalDeductions,
                    TaxAmount = calc.TaxAmount,
                    SocialInsuranceEmployee = calc.SocialInsuranceEmployee,
                    SocialInsuranceEmployer = calc.SocialInsuranceEmployer,
                    OvertimePay = calc.OvertimePay,
                    AbsenceDeduction = calc.AbsenceDeduction,
                    LoanDeduction = calc.LoanDeduction,
                    OtherDeductions = calc.OtherDeductions,
                    NetSalary = calc.NetSalary,
                    OvertimeHours = calc.OvertimeHours,
                    WorkingDays = calc.WorkingDays,
                    PaidDays = calc.PaidDays,
                    AbsentDays = calc.AbsentDays,
                    Status = PayrollRecordStatus.Calculated,
                    CalculationVersion = isRecalc ? 2 : 1,
                    LastRunId = audit.Id,
                    CalculationBreakdownJson = calc.CalculationBreakdownJson,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                };
                Context.PayrollRecords.Add(record);
                await Context.SaveChangesAsync(cancellationToken);

                foreach (var detail in calc.Details)
                {
                    detail.PayrollRecordId = record.Id;
                    detail.CreatedAtUtc = DateTime.UtcNow;
                    detail.CreatedBy = CurrentUser.Username ?? "SYSTEM";
                    Context.PayrollRecordDetails.Add(detail);
                }

                // Link the external module records (deferred until after record.Id is known).
                await LinkIntegrationsAsync(emp, period, record.Id, cancellationToken);

                auditItem.PayrollRecordId = record.Id;
                auditItem.Status = calc.Warnings.Count > 0 ? PayrollRunItemStatus.CompletedWithWarnings : PayrollRunItemStatus.Succeeded;
                auditItem.GrossEarnings = calc.GrossEarnings;
                auditItem.NetSalary = calc.NetSalary;
                auditItem.TaxAmount = calc.TaxAmount;
                auditItem.SocialInsuranceEmployee = calc.SocialInsuranceEmployee;
                auditItem.OvertimePay = calc.OvertimePay;
                auditItem.AbsenceDeduction = calc.AbsenceDeduction;
                if (calc.Warnings.Count > 0)
                {
                    auditItem.WarningsJson = JsonSerializer.Serialize(calc.Warnings);
                    warningsAll.Add(new { employeeId = emp.Id, warnings = calc.Warnings });
                }

                totalGross += calc.GrossEarnings;
                totalDeductions += calc.TotalDeductions;
                totalNet += calc.NetSalary;
                employeeCount++;

                if (tx != null) await tx.CommitAsync(cancellationToken);
            }
            catch (PayrollCalculationException pex)
            {
                if (tx != null) await tx.RollbackAsync(cancellationToken);
                auditItem.Status = PayrollRunItemStatus.FailedWithError;
                auditItem.ErrorMessage = pex.Message;
                errorsAll.Add(new { employeeId = emp.Id, category = pex.Category, error = pex.Message });

                await _alerts.RaiseAsync(new RaiseFailureAlertRequest
                {
                    Category = OperationalFailureCategory.PayrollProcessing,
                    SourceEntityType = "PayrollPeriod",
                    SourceEntityId = period.Id,
                    EmployeeId = emp.Id,
                    FailureCode = pex.Category ?? "CalculationError",
                    Reason = $"Payroll calculation failed for employee #{emp.Id} in period {period.StartDate:yyyy-MM}.",
                    ErrorMessage = pex.Message,
                    Severity = OperationalFailureSeverity.Error,
                    IsRetryable = true
                }, cancellationToken);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                if (tx != null) await tx.RollbackAsync(cancellationToken);
                auditItem.Status = PayrollRunItemStatus.FailedWithError;
                auditItem.ErrorMessage = ex.Message;
                errorsAll.Add(new { employeeId = emp.Id, category = "Unexpected", error = ex.Message });

                await _alerts.RaiseAsync(new RaiseFailureAlertRequest
                {
                    Category = OperationalFailureCategory.PayrollProcessing,
                    SourceEntityType = "PayrollPeriod",
                    SourceEntityId = period.Id,
                    EmployeeId = emp.Id,
                    FailureCode = "UnhandledException",
                    Reason = $"Unhandled exception while processing payroll for employee #{emp.Id}.",
                    ErrorMessage = ex.Message,
                    Severity = OperationalFailureSeverity.Error,
                    IsRetryable = true
                }, cancellationToken);
            }
            finally
            {
                tx?.Dispose();
            }

            Context.PayrollRunAuditItems.Add(auditItem);
        }

        // ---- Update period aggregates ----
        period.TotalGross = totalGross;
        period.TotalDeductions = totalDeductions;
        period.TotalNet = totalNet;
        period.EmployeeCount = employeeCount;
        period.Status = PayrollPeriodStatus.Processed;
        period.ProcessedAt = DateTime.UtcNow;
        period.ProcessedByUserId = CurrentUser.UserId;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = CurrentUser.Username;

        // ---- Close audit run ----
        audit.CompletedAtUtc = DateTime.UtcNow;
        audit.EmployeesProcessed = employeeCount;
        audit.EmployeesFailed = errorsAll.Count;
        audit.EmployeesSkipped = employees.Count - employeeCount - errorsAll.Count;
        audit.WarningCount = warningsAll.Count;
        audit.WarningsJson = warningsAll.Count > 0 ? JsonSerializer.Serialize(warningsAll) : null;
        audit.ErrorsJson = errorsAll.Count > 0 ? JsonSerializer.Serialize(errorsAll) : null;

        audit.Status = errorsAll.Count > 0
            ? (employeeCount > 0 ? PayrollRunStatus.CompletedWithWarnings : PayrollRunStatus.Failed)
            : (warningsAll.Count > 0 ? PayrollRunStatus.CompletedWithWarnings : PayrollRunStatus.Completed);

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success(period.Id);
    }

    private async Task IntegrateLoanRepaymentsAsync(Domain.Employees.Employee emp, PayrollPeriod period, TecAxle.Hrms.Application.Payroll.Models.PayrollCalculationResult calc, CancellationToken ct)
    {
        // Match by date range: any scheduled repayment whose DueDate falls inside the payroll period.
        var periodStart = period.StartDate.Date;
        var periodEnd = period.EndDate.Date;
        var dueRepayments = await Context.LoanRepayments
            .Include(r => r.LoanApplication)
            .Where(r => r.Status == LoanRepaymentStatus.Scheduled
                && r.DueDate.Date >= periodStart
                && r.DueDate.Date <= periodEnd
                && r.LoanApplication.EmployeeId == emp.Id
                && r.PayrollRecordId == null
                && !r.IsDeleted && !r.LoanApplication.IsDeleted)
            .ToListAsync(ct);

        foreach (var repayment in dueRepayments)
        {
            calc.Details.Add(new PayrollRecordDetail
            {
                ComponentName = "Loan Installment",
                ComponentNameAr = "قسط قرض",
                ComponentType = SalaryComponentType.LoanDeduction,
                Amount = -repayment.Amount,
                Notes = $"Loan #{repayment.LoanApplicationId} - Installment #{repayment.InstallmentNumber}"
            });
            calc.LoanDeduction += repayment.Amount;
        }
    }

    private async Task IntegrateSalaryAdvancesAsync(Domain.Employees.Employee emp, PayrollPeriod period, TecAxle.Hrms.Application.Payroll.Models.PayrollCalculationResult calc, CancellationToken ct)
    {
        // Phase 1 (v14.1): date-range matching over DeductionStartDate/EndDate. Correctly
        // handles payroll periods that straddle month boundaries (e.g. Apr 20 → May 20).
        // Phase 7 (v14.7): the legacy YYYYMM `DeductionMonth` fallback branch was removed
        // after the pre-drop migration back-filled every row to the date-range pair.
        var periodStart = period.StartDate.Date;
        var periodEnd = period.EndDate.Date;

        var approvedAdvances = await Context.SalaryAdvances
            .Where(a => a.EmployeeId == emp.Id
                && a.Status == SalaryAdvanceStatus.Approved
                && a.PayrollRecordId == null
                && !a.IsDeleted
                && a.DeductionStartDate != null
                && a.DeductionEndDate != null
                && a.DeductionStartDate.Value.Date <= periodEnd
                && a.DeductionEndDate.Value.Date >= periodStart)
            .ToListAsync(ct);

        foreach (var advance in approvedAdvances)
        {
            calc.Details.Add(new PayrollRecordDetail
            {
                ComponentName = "Salary Advance Deduction",
                ComponentNameAr = "خصم سلفة راتب",
                ComponentType = SalaryComponentType.OtherDeduction,
                Amount = -advance.Amount,
                Notes = $"Advance #{advance.Id}"
            });
            calc.OtherDeductions += advance.Amount;
        }
    }

    private async Task IntegrateExpenseReimbursementsAsync(Domain.Employees.Employee emp, PayrollPeriod period, TecAxle.Hrms.Application.Payroll.Models.PayrollCalculationResult calc, CancellationToken ct)
    {
        // Phase 1 (v14.1): require ExpenseClaim.ApprovedAt <= period.EndDate to prevent stale
        // claims from being re-reimbursed months after their approval window.
        var periodEnd = period.EndDate.Date;
        var pending = await Context.ExpenseReimbursements
            .Include(r => r.ExpenseClaim)
            .Where(r => r.Method == ReimbursementMethod.Payroll
                && r.PayrollRecordId == null
                && r.ExpenseClaim.EmployeeId == emp.Id
                && r.ExpenseClaim.Status == ExpenseClaimStatus.Approved
                && r.ExpenseClaim.ApprovedAt != null
                && r.ExpenseClaim.ApprovedAt.Value.Date <= periodEnd
                && !r.IsDeleted && !r.ExpenseClaim.IsDeleted)
            .ToListAsync(ct);

        foreach (var r in pending)
        {
            calc.Details.Add(new PayrollRecordDetail
            {
                ComponentName = "Expense Reimbursement",
                ComponentNameAr = "تعويض مصروفات",
                ComponentType = SalaryComponentType.Benefit,
                Amount = r.Amount,
                Notes = $"Claim #{r.ExpenseClaim.ClaimNumber}"
            });
            calc.TotalAllowances += r.Amount;
        }
    }

    /// <summary>
    /// Phase 1 (v14.1): Integrate active benefit enrollments with payroll deduction enabled.
    /// Adds a single "Benefit Premium" deduction line per enrollment for the employee premium.
    /// Idempotency: we only add a detail line here; no enrollment state is mutated, so payroll
    /// recalculation on the same period is safe.
    /// </summary>
    private async Task IntegrateBenefitDeductionsAsync(Domain.Employees.Employee emp, PayrollPeriod period, TecAxle.Hrms.Application.Payroll.Models.PayrollCalculationResult calc, CancellationToken ct)
    {
        var periodStart = period.StartDate.Date;
        var periodEnd = period.EndDate.Date;
        var enrollments = await Context.BenefitEnrollments
            .Include(e => e.BenefitPlan)
            .Where(e => !e.IsDeleted
                        && e.EmployeeId == emp.Id
                        && e.Status == BenefitEnrollmentStatus.Active
                        && e.PayrollDeductionEnabled
                        && e.EmployeeMonthlyContribution > 0
                        && e.EffectiveDate.Date <= periodEnd
                        && (e.TerminationDate == null || e.TerminationDate.Value.Date >= periodStart))
            .ToListAsync(ct);

        foreach (var en in enrollments)
        {
            var planName = en.BenefitPlan?.Name ?? $"Plan #{en.BenefitPlanId}";

            // Employee premium → deduction line (negative), included in OtherDeductions.
            calc.Details.Add(new PayrollRecordDetail
            {
                ComponentName = $"Benefit Premium: {planName}",
                ComponentNameAr = $"قسط تأمين: {planName}",
                ComponentType = SalaryComponentType.OtherDeduction,
                Amount = -en.EmployeeMonthlyContribution,
                Notes = $"BenefitEnrollment #{en.Id}"
            });
            calc.OtherDeductions += en.EmployeeMonthlyContribution;

            // Phase 1 (v14.1): informational employer-contribution line. Not included in any
            // total — mirrors the SocialInsuranceEmployer pattern on PayrollRecord. Visible on
            // payslips and in PayrollRecordDetail queries so finance can reconcile full cost.
            if (en.EmployerMonthlyContribution > 0)
            {
                calc.Details.Add(new PayrollRecordDetail
                {
                    ComponentName = $"Employer Benefit Contribution: {planName}",
                    ComponentNameAr = $"مساهمة صاحب العمل في التأمين: {planName}",
                    ComponentType = SalaryComponentType.EmployerContribution,
                    Amount = en.EmployerMonthlyContribution,
                    Notes = $"Informational only. BenefitEnrollment #{en.Id}"
                });
            }
        }
    }

    private async Task LinkIntegrationsAsync(Domain.Employees.Employee emp, PayrollPeriod period, long payrollRecordId, CancellationToken ct)
    {
        var periodStart = period.StartDate.Date;
        var periodEnd = period.EndDate.Date;
        // Phase 7: periodMonth YYYYMM key removed together with SalaryAdvance.DeductionMonth.

        // Link loan repayments (date-range match)
        var dueRepayments = await Context.LoanRepayments
            .Include(r => r.LoanApplication)
            .Where(r => r.Status == LoanRepaymentStatus.Scheduled
                && r.DueDate.Date >= periodStart
                && r.DueDate.Date <= periodEnd
                && r.LoanApplication.EmployeeId == emp.Id
                && r.PayrollRecordId == null
                && !r.IsDeleted && !r.LoanApplication.IsDeleted)
            .ToListAsync(ct);

        foreach (var rep in dueRepayments)
        {
            rep.PayrollRecordId = payrollRecordId;
            rep.PaidDate = DateTime.UtcNow;
            rep.Status = LoanRepaymentStatus.Paid;
            rep.ModifiedAtUtc = DateTime.UtcNow;
            rep.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

            var loan = rep.LoanApplication;
            if (loan.OutstandingBalance.HasValue)
            {
                loan.OutstandingBalance -= rep.Amount;
                if (loan.OutstandingBalance <= 0)
                {
                    loan.OutstandingBalance = 0;
                    loan.Status = LoanApplicationStatus.FullyPaid;
                }
                loan.ModifiedAtUtc = DateTime.UtcNow;
                loan.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            }
        }

        // Phase 7: date-range matching only; legacy YYYYMM fallback removed.
        var approvedAdvances = await Context.SalaryAdvances
            .Where(a => a.EmployeeId == emp.Id
                && a.Status == SalaryAdvanceStatus.Approved
                && a.PayrollRecordId == null
                && !a.IsDeleted
                && a.DeductionStartDate != null
                && a.DeductionEndDate != null
                && a.DeductionStartDate.Value.Date <= periodEnd
                && a.DeductionEndDate.Value.Date >= periodStart)
            .ToListAsync(ct);

        foreach (var advance in approvedAdvances)
        {
            advance.PayrollRecordId = payrollRecordId;
            advance.Status = SalaryAdvanceStatus.Deducted;
            advance.ModifiedAtUtc = DateTime.UtcNow;
            advance.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
        }

        // Link expense reimbursements (with ApprovedAt <= period end filter)
        var reimb = await Context.ExpenseReimbursements
            .Include(r => r.ExpenseClaim)
            .Where(r => r.Method == ReimbursementMethod.Payroll
                && r.PayrollRecordId == null
                && r.ExpenseClaim.EmployeeId == emp.Id
                && r.ExpenseClaim.Status == ExpenseClaimStatus.Approved
                && r.ExpenseClaim.ApprovedAt != null
                && r.ExpenseClaim.ApprovedAt.Value.Date <= periodEnd
                && !r.IsDeleted && !r.ExpenseClaim.IsDeleted)
            .ToListAsync(ct);

        foreach (var r in reimb)
        {
            r.PayrollRecordId = payrollRecordId;
            r.ReimbursementDate = DateTime.UtcNow;
            r.ModifiedAtUtc = DateTime.UtcNow;
            r.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            r.ExpenseClaim.Status = ExpenseClaimStatus.Reimbursed;
            r.ExpenseClaim.ModifiedAtUtc = DateTime.UtcNow;
            r.ExpenseClaim.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
        }

        // NOTE: BenefitEnrollment is NOT mutated here — deduction is a pure read, re-runnable
        // across payroll recalculations without cascading state drift.
    }

    private static void RecomputeTotalsFromDetails(TecAxle.Hrms.Application.Payroll.Models.PayrollCalculationResult calc)
    {
        calc.GrossEarnings = Math.Round(calc.BaseSalary + calc.TotalAllowances, 2, MidpointRounding.AwayFromZero);
        calc.TotalDeductions = Math.Round(
            calc.TaxAmount + calc.SocialInsuranceEmployee + calc.AbsenceDeduction + calc.OtherDeductions + calc.LoanDeduction,
            2, MidpointRounding.AwayFromZero);
        calc.NetSalary = Math.Round(calc.GrossEarnings - calc.TotalDeductions, 2, MidpointRounding.AwayFromZero);
    }
}
