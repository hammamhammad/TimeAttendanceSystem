using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.ApproveEmployeePromotion;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record ApproveEmployeePromotionCommand(
    long Id,
    string? Comments
) : ICommand<Result>;
