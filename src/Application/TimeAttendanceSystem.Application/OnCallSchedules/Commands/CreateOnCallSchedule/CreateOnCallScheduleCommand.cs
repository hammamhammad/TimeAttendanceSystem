using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.CreateOnCallSchedule;

[RequiresModule(SystemModule.ShiftSwaps)]
public record CreateOnCallScheduleCommand(
    long EmployeeId,
    DateTime StartDate,
    DateTime EndDate,
    OnCallType OnCallType,
    long? ShiftId,
    string? Notes,
    string? NotesAr
) : ICommand<Result<long>>;
