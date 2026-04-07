using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.DeleteEmployeePromotion;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record DeleteEmployeePromotionCommand(long Id) : ICommand<Result>;
