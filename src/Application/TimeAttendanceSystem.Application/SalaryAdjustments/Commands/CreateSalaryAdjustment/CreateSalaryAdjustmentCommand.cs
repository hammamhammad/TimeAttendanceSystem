using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.CreateSalaryAdjustment;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record CreateSalaryAdjustmentCommand(
    long EmployeeId,
    SalaryAdjustmentType AdjustmentType,
    decimal NewBaseSalary,
    DateTime EffectiveDate,
    string? Reason,
    string? ReasonAr,
    string? Justification,
    string? DocumentUrl
) : ICommand<Result<long>>;
