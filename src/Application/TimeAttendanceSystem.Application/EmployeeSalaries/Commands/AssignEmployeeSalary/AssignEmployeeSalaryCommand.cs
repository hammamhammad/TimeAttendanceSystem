using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeSalaries.Commands.AssignEmployeeSalary;

[RequiresModule(SystemModule.EmployeeLifecycle)]
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
