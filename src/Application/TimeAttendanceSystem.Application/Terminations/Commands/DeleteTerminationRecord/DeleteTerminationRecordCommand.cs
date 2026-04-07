using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Terminations.Commands.DeleteTerminationRecord;

[RequiresModule(SystemModule.Offboarding)]
public record DeleteTerminationRecordCommand(long Id) : ICommand<Result>;
