using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Payroll.Exceptions;
using TecAxle.Hrms.Application.Payroll.Services;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.ProcessPayrollPeriod;

/// <summary>
/// Orchestrates payroll processing for a period. Delegates all arithmetic to
/// <see cref="IPayrollCalculationService"/>. Opens a <see cref="PayrollRunAudit"/>
/// row, iterates employees, persists results and per-employee audit items,
/// and integrates loan/advance/expense reimbursement side-effects.
///
/// Handles both:
///   - Initial processing: period.Status must be Draft.
///   - Recalculation:     period.Status must be Processed AND <c>request.IsRecalculation</c> is true.
/// Finalized/Paid periods CANNOT be processed — explicitly rejected.
/// </summary>
public class ProcessPayrollPeriodCommandHandler : BaseHandler<ProcessPayrollPeriodCommand, Result<long>>
{
    private readonly IPayrollCalculationService _calculator;

    public ProcessPayrollPeriodCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IPayrollCalculationService calculator)
        : base(context, currentUser)
    {
        _calculator = calculator;
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
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
                existing.Notes = (existing.Notes ?? "") + $" | Superseded by recalc on {DateTime.UtcNow:O}";
            }
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

            try
            {
                var calc = await _calculator.CalculateAsync(emp, period, empAdjustments, cancellationToken);

                // --- Integrate external module side-effects (loans, advances, reimbursements) BEFORE final net total ---
                await IntegrateLoanRepaymentsAsync(emp, period, calc, cancellationToken);
                await IntegrateSalaryAdvancesAsync(emp, period, calc, cancellationToken);
                await IntegrateExpenseReimbursementsAsync(emp, calc, cancellationToken);

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
            }
            catch (PayrollCalculationException pex)
            {
                auditItem.Status = PayrollRunItemStatus.FailedWithError;
                auditItem.ErrorMessage = pex.Message;
                errorsAll.Add(new { employeeId = emp.Id, category = pex.Category, error = pex.Message });
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                auditItem.Status = PayrollRunItemStatus.FailedWithError;
                auditItem.ErrorMessage = ex.Message;
                errorsAll.Add(new { employeeId = emp.Id, category = "Unexpected", error = ex.Message });
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
        var dueRepayments = await Context.LoanRepayments
            .Include(r => r.LoanApplication)
            .Where(r => r.Status == LoanRepaymentStatus.Scheduled
                && r.DueDate.Month == period.StartDate.Month
                && r.DueDate.Year == period.StartDate.Year
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
        var periodMonth = period.StartDate.Year * 100 + period.StartDate.Month;
        var approvedAdvances = await Context.SalaryAdvances
            .Where(a => a.EmployeeId == emp.Id
                && a.Status == SalaryAdvanceStatus.Approved
                && a.DeductionMonth == periodMonth
                && a.PayrollRecordId == null
                && !a.IsDeleted)
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

    private async Task IntegrateExpenseReimbursementsAsync(Domain.Employees.Employee emp, TecAxle.Hrms.Application.Payroll.Models.PayrollCalculationResult calc, CancellationToken ct)
    {
        var pending = await Context.ExpenseReimbursements
            .Include(r => r.ExpenseClaim)
            .Where(r => r.Method == ReimbursementMethod.Payroll
                && r.PayrollRecordId == null
                && r.ExpenseClaim.EmployeeId == emp.Id
                && r.ExpenseClaim.Status == ExpenseClaimStatus.Approved
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

    private async Task LinkIntegrationsAsync(Domain.Employees.Employee emp, PayrollPeriod period, long payrollRecordId, CancellationToken ct)
    {
        // Link loan repayments
        var dueRepayments = await Context.LoanRepayments
            .Include(r => r.LoanApplication)
            .Where(r => r.Status == LoanRepaymentStatus.Scheduled
                && r.DueDate.Month == period.StartDate.Month
                && r.DueDate.Year == period.StartDate.Year
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

        var periodMonth = period.StartDate.Year * 100 + period.StartDate.Month;
        var approvedAdvances = await Context.SalaryAdvances
            .Where(a => a.EmployeeId == emp.Id
                && a.Status == SalaryAdvanceStatus.Approved
                && a.DeductionMonth == periodMonth
                && a.PayrollRecordId == null
                && !a.IsDeleted)
            .ToListAsync(ct);

        foreach (var advance in approvedAdvances)
        {
            advance.PayrollRecordId = payrollRecordId;
            advance.Status = SalaryAdvanceStatus.Deducted;
            advance.ModifiedAtUtc = DateTime.UtcNow;
            advance.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
        }

        var reimb = await Context.ExpenseReimbursements
            .Include(r => r.ExpenseClaim)
            .Where(r => r.Method == ReimbursementMethod.Payroll
                && r.PayrollRecordId == null
                && r.ExpenseClaim.EmployeeId == emp.Id
                && r.ExpenseClaim.Status == ExpenseClaimStatus.Approved
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
