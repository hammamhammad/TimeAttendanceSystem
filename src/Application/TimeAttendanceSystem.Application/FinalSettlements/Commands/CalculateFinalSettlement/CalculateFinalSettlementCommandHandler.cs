using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.CalculateFinalSettlement;

public class CalculateFinalSettlementCommandHandler : BaseHandler<CalculateFinalSettlementCommand, Result<long>>
{
    public CalculateFinalSettlementCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CalculateFinalSettlementCommand request, CancellationToken cancellationToken)
    {
        var termination = await Context.TerminationRecords
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.TerminationRecordId && !t.IsDeleted, cancellationToken);

        if (termination == null)
            return Result.Failure<long>("Termination record not found.");

        var employee = termination.Employee;

        // Get current salary
        var salary = await Context.EmployeeSalaries
            .Where(s => s.EmployeeId == employee.Id && s.IsCurrent && !s.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (salary == null)
            return Result.Failure<long>("No current salary record found for this employee.");

        // Prorate salary for remaining days in the month
        var lastWorkingDate = termination.LastWorkingDate;
        var daysInMonth = DateTime.DaysInMonth(lastWorkingDate.Year, lastWorkingDate.Month);
        var workedDays = lastWorkingDate.Day;
        var basicSalaryDue = (salary.BaseSalary / daysInMonth) * workedDays;

        // Total allowances prorated
        var totalAllowances = await Context.EmployeeSalaryComponents
            .Where(c => c.EmployeeSalaryId == salary.Id && !c.IsDeleted)
            .SumAsync(c => c.Amount, cancellationToken);
        var allowancesDue = (totalAllowances / daysInMonth) * workedDays;

        // Leave encashment from leave balances
        var leaveBalances = await Context.LeaveBalances
            .Where(lb => lb.EmployeeId == employee.Id)
            .ToListAsync(cancellationToken);

        var totalLeaveDays = leaveBalances.Sum(lb => lb.AccruedDays - lb.UsedDays);
        if (totalLeaveDays < 0) totalLeaveDays = 0;
        var dailySalary = (salary.BaseSalary + totalAllowances) / 30m;
        var leaveEncashmentAmount = totalLeaveDays * dailySalary;

        // Get EOS amount
        var eos = await Context.EndOfServiceBenefits
            .FirstOrDefaultAsync(e => e.TerminationRecordId == request.TerminationRecordId && !e.IsDeleted, cancellationToken);
        var eosAmount = eos?.NetAmount ?? 0;

        var grossSettlement = basicSalaryDue + allowancesDue + leaveEncashmentAmount + eosAmount;

        // Calculate outstanding loan balances
        var outstandingLoans = await Context.LoanApplications
            .Where(l => l.EmployeeId == employee.Id
                && (l.Status == LoanApplicationStatus.Active || l.Status == LoanApplicationStatus.Approved)
                && l.OutstandingBalance > 0
                && !l.IsDeleted)
            .SumAsync(l => l.OutstandingBalance ?? 0, cancellationToken);

        // Calculate approved but undeducted salary advances
        var outstandingAdvances = await Context.SalaryAdvances
            .Where(a => a.EmployeeId == employee.Id
                && a.Status == SalaryAdvanceStatus.Approved
                && !a.IsDeleted)
            .SumAsync(a => a.Amount, cancellationToken);

        var totalDeductions = outstandingLoans + outstandingAdvances;
        var netSettlement = grossSettlement - totalDeductions;

        // Create or update
        var existing = await Context.FinalSettlements
            .FirstOrDefaultAsync(f => f.TerminationRecordId == request.TerminationRecordId && !f.IsDeleted, cancellationToken);

        var calcDetails = $"Salary: {basicSalaryDue:N2} | Allowances: {allowancesDue:N2} | Leave({(int)totalLeaveDays}d): {leaveEncashmentAmount:N2} | EOS: {eosAmount:N2} | Loans: -{outstandingLoans:N2} | Advances: -{outstandingAdvances:N2}";

        if (existing != null)
        {
            existing.BasicSalaryDue = basicSalaryDue;
            existing.AllowancesDue = allowancesDue;
            existing.LeaveEncashmentAmount = leaveEncashmentAmount;
            existing.LeaveEncashmentDays = (int)totalLeaveDays;
            existing.EndOfServiceAmount = eosAmount;
            existing.LoanOutstanding = outstandingLoans;
            existing.AdvanceOutstanding = outstandingAdvances;
            existing.GrossSettlement = grossSettlement;
            existing.TotalDeductions = totalDeductions;
            existing.NetSettlement = netSettlement;
            existing.Status = SettlementStatus.Draft;
            existing.CalculationDetails = calcDetails;
            existing.ModifiedAtUtc = DateTime.UtcNow;
            existing.ModifiedBy = CurrentUser.Username;

            await Context.SaveChangesAsync(cancellationToken);
            return Result.Success(existing.Id);
        }

        var settlement = new FinalSettlement
        {
            TerminationRecordId = request.TerminationRecordId,
            EmployeeId = employee.Id,
            BasicSalaryDue = basicSalaryDue,
            AllowancesDue = allowancesDue,
            LeaveEncashmentAmount = leaveEncashmentAmount,
            LeaveEncashmentDays = (int)totalLeaveDays,
            EndOfServiceAmount = eosAmount,
            LoanOutstanding = outstandingLoans,
            AdvanceOutstanding = outstandingAdvances,
            GrossSettlement = grossSettlement,
            TotalDeductions = totalDeductions,
            NetSettlement = netSettlement,
            Status = SettlementStatus.Draft,
            CalculationDetails = calcDetails,
            SubmittedByUserId = CurrentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.FinalSettlements.Add(settlement);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(settlement.Id);
    }
}
