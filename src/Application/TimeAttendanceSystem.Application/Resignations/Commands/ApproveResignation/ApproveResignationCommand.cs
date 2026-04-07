using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Resignations.Commands.ApproveResignation;

[RequiresModule(SystemModule.Offboarding)]
public record ApproveResignationCommand(
    long Id,
    string? Comments
) : ICommand<Result>;
