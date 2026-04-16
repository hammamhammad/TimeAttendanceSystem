using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.CreateEmployeePromotion;

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
