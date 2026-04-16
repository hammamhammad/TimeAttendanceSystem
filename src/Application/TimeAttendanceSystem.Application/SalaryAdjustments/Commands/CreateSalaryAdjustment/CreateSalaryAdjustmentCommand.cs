using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.CreateSalaryAdjustment;

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
