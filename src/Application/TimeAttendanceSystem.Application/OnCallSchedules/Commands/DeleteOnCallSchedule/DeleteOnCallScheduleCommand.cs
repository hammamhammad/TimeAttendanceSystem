using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.DeleteOnCallSchedule;

[RequiresModule(SystemModule.ShiftSwaps)]
public record DeleteOnCallScheduleCommand(long Id) : ICommand<Result>;
