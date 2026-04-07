using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.EmployeeSalaries.Commands.AssignEmployeeSalary;

public class AssignEmployeeSalaryCommandHandler : BaseHandler<AssignEmployeeSalaryCommand, Result<long>>
{
    public AssignEmployeeSalaryCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(AssignEmployeeSalaryCommand request, CancellationToken cancellationToken)
    {
        // Validate employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);
        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        // Validate salary structure exists and load components
        var structure = await Context.SalaryStructures
            .Include(s => s.Components.Where(c => !c.IsDeleted))
            .FirstOrDefaultAsync(s => s.Id == request.SalaryStructureId && !s.IsDeleted, cancellationToken);
        if (structure == null)
            return Result.Failure<long>("Salary structure not found.");

        // Deactivate current salary
        var currentSalary = await Context.EmployeeSalaries
            .FirstOrDefaultAsync(es => es.EmployeeId == request.EmployeeId && es.IsCurrent && !es.IsDeleted, cancellationToken);
        if (currentSalary != null)
        {
            currentSalary.IsCurrent = false;
            currentSalary.EndDate = request.EffectiveDate;
            currentSalary.ModifiedAtUtc = DateTime.UtcNow;
            currentSalary.ModifiedBy = CurrentUser.Username;
        }

        // Create new employee salary
        var salary = new EmployeeSalary
        {
            EmployeeId = request.EmployeeId,
            SalaryStructureId = request.SalaryStructureId,
            BaseSalary = request.BaseSalary,
            Currency = request.Currency ?? "SAR",
            EffectiveDate = request.EffectiveDate,
            Reason = request.Reason,
            IsCurrent = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        Context.EmployeeSalaries.Add(salary);
        await Context.SaveChangesAsync(cancellationToken);

        // Build override lookup
        var overrides = request.ComponentOverrides?
            .ToDictionary(o => o.SalaryComponentId, o => o.OverrideAmount) ?? new();

        // Create salary components for the employee
        foreach (var comp in structure.Components)
        {
            decimal amount = CalculateComponentAmount(comp, request.BaseSalary);
            overrides.TryGetValue(comp.Id, out var overrideAmount);

            var empComp = new EmployeeSalaryComponent
            {
                EmployeeSalaryId = salary.Id,
                SalaryComponentId = comp.Id,
                Amount = amount,
                OverrideAmount = overrideAmount,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "SYSTEM"
            };
            Context.EmployeeSalaryComponents.Add(empComp);
        }

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success(salary.Id);
    }

    private static decimal CalculateComponentAmount(SalaryComponent comp, decimal baseSalary)
    {
        return comp.CalculationType switch
        {
            CalculationType.Fixed => comp.Amount ?? 0m,
            CalculationType.PercentageOfBasic => baseSalary * (comp.Percentage ?? 0m) / 100m,
            CalculationType.PercentageOfGross => baseSalary * (comp.Percentage ?? 0m) / 100m, // Approximation; gross not yet known
            _ => comp.Amount ?? 0m
        };
    }
}
