using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.RejectEmployeePromotion;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record RejectEmployeePromotionCommand(
    long Id,
    string RejectionReason
) : ICommand<Result>;
