using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.CreateEmployeePromotion;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record CreateEmployeePromotionCommand(
    long EmployeeId,
    string NewJobTitle,
    string? NewJobTitleAr,
    string? NewGrade,
    long? NewDepartmentId,
    decimal? NewBaseSalary,
    DateTime EffectiveDate,
    string? Reason,
    string? ReasonAr,
    string? Notes
) : ICommand<Result<long>>;
