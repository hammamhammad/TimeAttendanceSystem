using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.ProcessPayrollPeriod;

public class ProcessPayrollPeriodCommandHandler : BaseHandler<ProcessPayrollPeriodCommand, Result<long>>
{
    public ProcessPayrollPeriodCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(ProcessPayrollPeriodCommand request, CancellationToken cancellationToken)
    {
        var period = await Context.PayrollPeriods
            .Include(p => p.Records)
            .FirstOrDefaultAsync(p => p.Id == request.PayrollPeriodId && !p.IsDeleted, cancellationToken);

        if (period == null)
            return Result.Failure<long>("Payroll period not found.");

        if (period.Status != PayrollPeriodStatus.Draft)
            return Result.Failure<long>("Only Draft payroll periods can be processed.");

        // Mark as processing
        period.Status = PayrollPeriodStatus.Processing;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = CurrentUser.Username;
        await Context.SaveChangesAsync(cancellationToken);

        // Get active employees in this branch (exclude terminated/resigned)
        var employees = await Context.Employees
            .Where(e => e.BranchId == period.BranchId && !e.IsDeleted && e.IsActive &&
                        e.EmploymentStatus != EmploymentStatus.Terminated &&
                        e.EmploymentStatus != EmploymentStatus.Resigned)
            .ToListAsync(cancellationToken);

        // Get adjustments for this period
        var adjustments = await Context.PayrollAdjustments
            .Where(a => a.PayrollPeriodId == period.Id && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        decimal totalGross = 0, totalDeductions = 0, totalNet = 0;
        int employeeCount = 0;

        foreach (var emp in employees)
        {
            // Get current salary with components
            var salary = await Context.EmployeeSalaries
                .Include(s => s.Components.Where(c => !c.IsDeleted))
                    .ThenInclude(c => c.SalaryComponent)
                .FirstOrDefaultAsync(s => s.EmployeeId == emp.Id && s.IsCurrent && !s.IsDeleted, cancellationToken);

            if (salary == null)
                continue; // Skip employees without salary

            // Calculate component amounts
            decimal allowances = 0, deductions = 0;
            var details = new List<PayrollRecordDetail>();

            foreach (var comp in salary.Components)
            {
                var sc = comp.SalaryComponent;
                decimal amount = comp.OverrideAmount ?? comp.Amount;

                details.Add(new PayrollRecordDetail
                {
                    SalaryComponentId = sc.Id,
                    ComponentName = sc.Name,
                    ComponentNameAr = sc.NameAr,
                    ComponentType = sc.ComponentType,
                    Amount = amount,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });

                if (sc.ComponentType >= SalaryComponentType.TaxDeduction) // Deductions start at 10
                    deductions += amount;
                else
                    allowances += amount;
            }

            // After salary component processing, add allowance assignments
            var activeAssignments = await Context.AllowanceAssignments
                .Include(a => a.AllowanceType)
                .Where(a => a.EmployeeId == emp.Id
                    && a.Status == AllowanceAssignmentStatus.Active
                    && a.EffectiveFromDate <= period.EndDate
                    && (a.EffectiveToDate == null || a.EffectiveToDate >= period.StartDate)
                    && !a.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var assignment in activeAssignments)
            {
                var detail = new PayrollRecordDetail
                {
                    ComponentName = assignment.AllowanceType?.Name ?? "Allowance",
                    ComponentNameAr = assignment.AllowanceType?.NameAr,
                    ComponentType = SalaryComponentType.OtherAllowance,
                    AllowanceTypeId = assignment.AllowanceTypeId,
                    Amount = assignment.Amount,
                    Notes = $"Allowance Assignment #{assignment.Id}",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                };
                details.Add(detail);
                allowances += assignment.Amount;
            }

            // Employee-specific adjustments
            var empAdjustments = adjustments.Where(a => a.EmployeeId == emp.Id).ToList();
            foreach (var adj in empAdjustments)
            {
                bool isDeduction = adj.AdjustmentType is PayrollAdjustmentType.Penalty
                    or PayrollAdjustmentType.LoanInstallment
                    or PayrollAdjustmentType.InsuranceDeduction
                    or PayrollAdjustmentType.TaxAdjustment;

                details.Add(new PayrollRecordDetail
                {
                    ComponentName = adj.Description,
                    ComponentNameAr = adj.DescriptionAr,
                    ComponentType = isDeduction ? SalaryComponentType.OtherDeduction : SalaryComponentType.Benefit,
                    Amount = adj.Amount,
                    Notes = adj.Reason,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });

                if (isDeduction)
                    deductions += adj.Amount;
                else
                    allowances += adj.Amount;
            }

            // Attendance integration: read attendance records for this employee in this period
            var attendanceRecords = await Context.AttendanceRecords
                .Where(a => a.EmployeeId == emp.Id
                    && a.AttendanceDate >= period.StartDate
                    && a.AttendanceDate <= period.EndDate
                    && !a.IsDeleted)
                .ToListAsync(cancellationToken);

            int workingDays = attendanceRecords.Count(a => a.Status == AttendanceStatus.Present || a.Status == AttendanceStatus.Late);
            int absentDays = attendanceRecords.Count(a => a.Status == AttendanceStatus.Absent);
            decimal overtimeHours = attendanceRecords.Sum(a => a.OvertimeHours);

            // Calculate overtime pay (1.5x hourly rate for regular overtime)
            decimal dailySalary = salary.BaseSalary / 30m;
            decimal hourlySalary = dailySalary / 8m;
            decimal overtimePay = overtimeHours * hourlySalary * 1.5m;

            // Calculate absence deduction
            decimal absenceDeduction = absentDays * dailySalary;

            // Add overtime as a detail line
            if (overtimePay > 0)
            {
                details.Add(new PayrollRecordDetail
                {
                    ComponentName = "Overtime Pay",
                    ComponentNameAr = "أجر عمل إضافي",
                    ComponentType = SalaryComponentType.OtherAllowance,
                    Amount = overtimePay,
                    Notes = $"{overtimeHours:F2} hours @ {(hourlySalary * 1.5m):F2}/hr",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });
                allowances += overtimePay;
            }

            // Add absence deduction as detail line
            if (absenceDeduction > 0)
            {
                details.Add(new PayrollRecordDetail
                {
                    ComponentName = "Absence Deduction",
                    ComponentNameAr = "خصم غياب",
                    ComponentType = SalaryComponentType.OtherDeduction,
                    Amount = -absenceDeduction,
                    Notes = $"{absentDays} absent days",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });
                deductions += absenceDeduction;
            }

            // ===== Phase 3: Expense Reimbursements Integration =====
            var pendingReimbursements = await Context.ExpenseReimbursements
                .Include(r => r.ExpenseClaim)
                .Where(r => r.Method == ReimbursementMethod.Payroll
                    && r.PayrollRecordId == null
                    && r.ExpenseClaim.EmployeeId == emp.Id
                    && r.ExpenseClaim.Status == ExpenseClaimStatus.Approved
                    && !r.IsDeleted && !r.ExpenseClaim.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var reimbursement in pendingReimbursements)
            {
                details.Add(new PayrollRecordDetail
                {
                    ComponentName = "Expense Reimbursement",
                    ComponentNameAr = "تعويض مصروفات",
                    ComponentType = SalaryComponentType.Benefit,
                    Amount = reimbursement.Amount,
                    Notes = $"Claim #{reimbursement.ExpenseClaim.ClaimNumber}",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });
                allowances += reimbursement.Amount;
            }

            // ===== Phase 3: Loan Repayment Deductions Integration =====
            var dueRepayments = await Context.LoanRepayments
                .Include(r => r.LoanApplication)
                .Where(r => r.Status == LoanRepaymentStatus.Scheduled
                    && r.DueDate.Month == period.StartDate.Month
                    && r.DueDate.Year == period.StartDate.Year
                    && r.LoanApplication.EmployeeId == emp.Id
                    && r.PayrollRecordId == null
                    && !r.IsDeleted && !r.LoanApplication.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var repayment in dueRepayments)
            {
                details.Add(new PayrollRecordDetail
                {
                    ComponentName = "Loan Installment",
                    ComponentNameAr = "قسط قرض",
                    ComponentType = SalaryComponentType.LoanDeduction,
                    Amount = -repayment.Amount,
                    Notes = $"Loan #{repayment.LoanApplicationId} - Installment #{repayment.InstallmentNumber}",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });
                deductions += repayment.Amount;
            }

            // ===== Phase 3: Salary Advance Deductions Integration =====
            var periodMonth = period.StartDate.Year * 100 + period.StartDate.Month;
            var approvedAdvances = await Context.SalaryAdvances
                .Where(a => a.EmployeeId == emp.Id
                    && a.Status == SalaryAdvanceStatus.Approved
                    && a.DeductionMonth == periodMonth
                    && a.PayrollRecordId == null
                    && !a.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var advance in approvedAdvances)
            {
                details.Add(new PayrollRecordDetail
                {
                    ComponentName = "Salary Advance Deduction",
                    ComponentNameAr = "خصم سلفة راتب",
                    ComponentType = SalaryComponentType.OtherDeduction,
                    Amount = -advance.Amount,
                    Notes = $"Advance #{advance.Id}",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                });
                deductions += advance.Amount;
            }

            decimal gross = salary.BaseSalary + allowances;
            decimal net = gross - deductions;

            var record = new PayrollRecord
            {
                PayrollPeriodId = period.Id,
                EmployeeId = emp.Id,
                BaseSalary = salary.BaseSalary,
                TotalAllowances = allowances,
                GrossEarnings = gross,
                TotalDeductions = deductions,
                NetSalary = net,
                WorkingDays = workingDays,
                PaidDays = workingDays,
                OvertimeHours = overtimeHours,
                OvertimePay = overtimePay,
                AbsentDays = absentDays,
                AbsenceDeduction = absenceDeduction,
                Status = PayrollRecordStatus.Calculated,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "SYSTEM"
            };

            Context.PayrollRecords.Add(record);
            await Context.SaveChangesAsync(cancellationToken);

            // Assign record ID to details
            foreach (var d in details)
            {
                d.PayrollRecordId = record.Id;
                Context.PayrollRecordDetails.Add(d);
            }

            // Link expense reimbursements to this payroll record
            foreach (var reimbursement in pendingReimbursements)
            {
                reimbursement.PayrollRecordId = record.Id;
                reimbursement.ReimbursementDate = DateTime.UtcNow;
                reimbursement.ModifiedAtUtc = DateTime.UtcNow;
                reimbursement.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
                reimbursement.ExpenseClaim.Status = ExpenseClaimStatus.Reimbursed;
                reimbursement.ExpenseClaim.ModifiedAtUtc = DateTime.UtcNow;
                reimbursement.ExpenseClaim.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            }

            // Link loan repayments to this payroll record
            foreach (var repayment in dueRepayments)
            {
                repayment.PayrollRecordId = record.Id;
                repayment.PaidDate = DateTime.UtcNow;
                repayment.Status = LoanRepaymentStatus.Paid;
                repayment.ModifiedAtUtc = DateTime.UtcNow;
                repayment.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

                // Update outstanding balance on loan
                var loan = repayment.LoanApplication;
                if (loan.OutstandingBalance.HasValue)
                {
                    loan.OutstandingBalance -= repayment.Amount;
                    if (loan.OutstandingBalance <= 0)
                    {
                        loan.OutstandingBalance = 0;
                        loan.Status = LoanApplicationStatus.FullyPaid;
                    }
                    loan.ModifiedAtUtc = DateTime.UtcNow;
                    loan.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
                }
            }

            // Link salary advances to this payroll record
            foreach (var advance in approvedAdvances)
            {
                advance.PayrollRecordId = record.Id;
                advance.Status = SalaryAdvanceStatus.Deducted;
                advance.ModifiedAtUtc = DateTime.UtcNow;
                advance.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            }

            totalGross += gross;
            totalDeductions += deductions;
            totalNet += net;
            employeeCount++;
        }

        // Update period totals
        period.TotalGross = totalGross;
        period.TotalDeductions = totalDeductions;
        period.TotalNet = totalNet;
        period.EmployeeCount = employeeCount;
        period.Status = PayrollPeriodStatus.Processed;
        period.ProcessedAt = DateTime.UtcNow;
        period.ProcessedByUserId = CurrentUser.UserId;
        period.ModifiedAtUtc = DateTime.UtcNow;
        period.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(period.Id);
    }
}
