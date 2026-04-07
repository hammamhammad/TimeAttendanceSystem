using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.CancelCompensatoryOff;

[RequiresModule(SystemModule.LeaveManagement)]
public record CancelCompensatoryOffCommand(long Id) : ICommand<Result>;
