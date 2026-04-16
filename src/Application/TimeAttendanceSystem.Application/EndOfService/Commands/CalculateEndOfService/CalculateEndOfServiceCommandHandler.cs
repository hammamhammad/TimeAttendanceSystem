using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EndOfService.Services;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.EndOfService.Commands.CalculateEndOfService;

public class CalculateEndOfServiceCommandHandler : BaseHandler<CalculateEndOfServiceCommand, Result<long>>
{
    private readonly IEndOfServiceCalculator _calculator;

    public CalculateEndOfServiceCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IEndOfServiceCalculator calculator)
        : base(context, currentUser)
    {
        _calculator = calculator;
    }

    public override async Task<Result<long>> Handle(CalculateEndOfServiceCommand request, CancellationToken cancellationToken)
    {
        var termination = await Context.TerminationRecords
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.TerminationRecordId && !t.IsDeleted, cancellationToken);

        if (termination == null)
            return Result.Failure<long>("Termination record not found.");

        var employee = termination.Employee;

        var salary = await Context.EmployeeSalaries
            .Where(s => s.EmployeeId == employee.Id && s.IsCurrent && !s.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (salary == null)
            return Result.Failure<long>("No current salary record found for this employee.");

        var totalAllowances = await Context.EmployeeSalaryComponents
            .Where(c => c.EmployeeSalaryId == salary.Id && !c.IsDeleted)
            .SumAsync(c => c.Amount, cancellationToken);

        // CountryCode resolution: prefer employee.Nationality (ISO alpha-2) if set, else leave null
        // so the resolver picks any active policy matching the effective date.
        var countryCode = !string.IsNullOrWhiteSpace(employee.Nationality) && employee.Nationality.Length <= 3
            ? employee.Nationality
            : null;

        var computation = await _calculator.CalculateAsync(
            hireDate: employee.HireDate,
            terminationDate: termination.TerminationDate,
            terminationType: termination.TerminationType,
            baseSalary: salary.BaseSalary,
            totalAllowances: totalAllowances,
            countryCode: countryCode,
            ct: cancellationToken);

        var existing = await Context.EndOfServiceBenefits
            .FirstOrDefaultAsync(e => e.TerminationRecordId == request.TerminationRecordId && !e.IsDeleted, cancellationToken);

        if (existing != null)
        {
            existing.ServiceYears = computation.ServiceYears;
            existing.ServiceMonths = computation.ServiceMonths;
            existing.ServiceDays = computation.ServiceDays;
            existing.BasicSalary = salary.BaseSalary;
            existing.TotalAllowances = totalAllowances;
            existing.CalculationBasis = computation.CalculationBasis;
            existing.TotalAmount = computation.TotalAmountBeforeDeduction;
            existing.DeductionAmount = computation.DeductionAmount;
            existing.NetAmount = computation.NetAmount;
            existing.CalculationDetails = computation.CalculationDetails;
            existing.EndOfServicePolicyId = computation.AppliedPolicyId;
            existing.AppliedPolicySnapshotJson = computation.AppliedPolicySnapshotJson;
            existing.ModifiedAtUtc = DateTime.UtcNow;
            existing.ModifiedBy = CurrentUser.Username;

            await Context.SaveChangesAsync(cancellationToken);
            return Result.Success(existing.Id);
        }

        var eos = new EndOfServiceBenefit
        {
            TerminationRecordId = request.TerminationRecordId,
            EmployeeId = employee.Id,
            ServiceYears = computation.ServiceYears,
            ServiceMonths = computation.ServiceMonths,
            ServiceDays = computation.ServiceDays,
            BasicSalary = salary.BaseSalary,
            TotalAllowances = totalAllowances,
            CalculationBasis = computation.CalculationBasis,
            TotalAmount = computation.TotalAmountBeforeDeduction,
            DeductionAmount = computation.DeductionAmount,
            NetAmount = computation.NetAmount,
            CalculationDetails = computation.CalculationDetails,
            EndOfServicePolicyId = computation.AppliedPolicyId,
            AppliedPolicySnapshotJson = computation.AppliedPolicySnapshotJson,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.EndOfServiceBenefits.Add(eos);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(eos.Id);
    }
}
