using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.DeleteOnCallSchedule;

public record DeleteOnCallScheduleCommand(long Id) : ICommand<Result>;
