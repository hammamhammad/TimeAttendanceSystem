using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeSalaries.Commands.AssignEmployeeSalary;

public record AssignEmployeeSalaryCommand(
    long EmployeeId,
    long SalaryStructureId,
    decimal BaseSalary,
    string? Currency,
    DateTime EffectiveDate,
    string? Reason,
    List<ComponentOverrideRequest>? ComponentOverrides
) : ICommand<Result<long>>;

public record ComponentOverrideRequest(
    long SalaryComponentId,
    decimal? OverrideAmount
);
