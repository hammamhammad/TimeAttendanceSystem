using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Resignations.Commands.RejectResignation;

[RequiresModule(SystemModule.Offboarding)]
public record RejectResignationCommand(
    long Id,
    string RejectionReason
) : ICommand<Result>;
