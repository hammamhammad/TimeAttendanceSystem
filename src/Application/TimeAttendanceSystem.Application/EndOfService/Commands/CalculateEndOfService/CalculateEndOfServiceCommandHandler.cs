using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.EndOfService.Commands.CalculateEndOfService;

public class CalculateEndOfServiceCommandHandler : BaseHandler<CalculateEndOfServiceCommand, Result<long>>
{
    public CalculateEndOfServiceCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CalculateEndOfServiceCommand request, CancellationToken cancellationToken)
    {
        var termination = await Context.TerminationRecords
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.TerminationRecordId && !t.IsDeleted, cancellationToken);

        if (termination == null)
            return Result.Failure<long>("Termination record not found.");

        var employee = termination.Employee;

        // Calculate service duration
        var hireDate = employee.HireDate;
        var endDate = termination.TerminationDate;
        var totalDays = (endDate - hireDate).Days;
        var serviceYears = totalDays / 365;
        var remainingDaysAfterYears = totalDays % 365;
        var serviceMonths = remainingDaysAfterYears / 30;
        var serviceDays = remainingDaysAfterYears % 30;

        // Get last salary
        var salary = await Context.EmployeeSalaries
            .Where(s => s.EmployeeId == employee.Id && s.IsCurrent && !s.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (salary == null)
            return Result.Failure<long>("No current salary record found for this employee.");

        var baseSalary = salary.BaseSalary;

        // Get total allowances from salary components
        var totalAllowances = await Context.EmployeeSalaryComponents
            .Where(c => c.EmployeeSalaryId == salary.Id && !c.IsDeleted)
            .SumAsync(c => c.Amount, cancellationToken);

        var calculationBasis = baseSalary + totalAllowances;

        // Saudi labor law EOS calculation
        // First 5 years: 0.5 month per year
        // After 5 years: 1 month per year
        decimal totalAmount;
        var totalServiceYears = totalDays / 365.0m;

        if (totalServiceYears <= 5)
        {
            totalAmount = (calculationBasis / 2m) * totalServiceYears;
        }
        else
        {
            var first5 = (calculationBasis / 2m) * 5m;
            var remaining = calculationBasis * (totalServiceYears - 5m);
            totalAmount = first5 + remaining;
        }

        // Resignation deductions
        decimal deductionAmount = 0;
        if (termination.TerminationType == TerminationType.Resignation)
        {
            if (totalServiceYears < 2)
            {
                deductionAmount = totalAmount; // No entitlement
            }
            else if (totalServiceYears < 5)
            {
                deductionAmount = totalAmount * (2m / 3m); // Gets 1/3
            }
            else if (totalServiceYears < 10)
            {
                deductionAmount = totalAmount * (1m / 3m); // Gets 2/3
            }
            // 10+ years: full entitlement, no deduction
        }

        var netAmount = totalAmount - deductionAmount;

        var calculationDetails = $"Service: {serviceYears}y {serviceMonths}m {serviceDays}d | " +
            $"Basis: {calculationBasis:N2} | Total: {totalAmount:N2} | " +
            $"Deduction: {deductionAmount:N2} | Net: {netAmount:N2}";

        // Create or update
        var existing = await Context.EndOfServiceBenefits
            .FirstOrDefaultAsync(e => e.TerminationRecordId == request.TerminationRecordId && !e.IsDeleted, cancellationToken);

        if (existing != null)
        {
            existing.ServiceYears = serviceYears;
            existing.ServiceMonths = serviceMonths;
            existing.ServiceDays = serviceDays;
            existing.BasicSalary = baseSalary;
            existing.TotalAllowances = totalAllowances;
            existing.CalculationBasis = calculationBasis;
            existing.TotalAmount = totalAmount;
            existing.DeductionAmount = deductionAmount;
            existing.NetAmount = netAmount;
            existing.CalculationDetails = calculationDetails;
            existing.ModifiedAtUtc = DateTime.UtcNow;
            existing.ModifiedBy = CurrentUser.Username;

            await Context.SaveChangesAsync(cancellationToken);
            return Result.Success(existing.Id);
        }

        var eos = new EndOfServiceBenefit
        {
            TerminationRecordId = request.TerminationRecordId,
            EmployeeId = employee.Id,
            ServiceYears = serviceYears,
            ServiceMonths = serviceMonths,
            ServiceDays = serviceDays,
            BasicSalary = baseSalary,
            TotalAllowances = totalAllowances,
            CalculationBasis = calculationBasis,
            TotalAmount = totalAmount,
            DeductionAmount = deductionAmount,
            NetAmount = netAmount,
            CalculationDetails = calculationDetails,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.EndOfServiceBenefits.Add(eos);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(eos.Id);
    }
}
