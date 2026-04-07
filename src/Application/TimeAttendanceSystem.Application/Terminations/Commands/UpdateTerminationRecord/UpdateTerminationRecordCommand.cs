using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Terminations.Commands.UpdateTerminationRecord;

[RequiresModule(SystemModule.Offboarding)]
public record UpdateTerminationRecordCommand(
    long Id,
    TerminationType TerminationType,
    DateTime TerminationDate,
    DateTime LastWorkingDate,
    string? Reason,
    string? ReasonAr,
    string? Notes
) : ICommand<Result>;
