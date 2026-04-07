using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.UpdateOnCallSchedule;

[RequiresModule(SystemModule.ShiftSwaps)]
public record UpdateOnCallScheduleCommand(
    long Id,
    long EmployeeId,
    DateTime StartDate,
    DateTime EndDate,
    OnCallType OnCallType,
    long? ShiftId,
    string? Notes,
    string? NotesAr,
    bool IsActive
) : ICommand<Result>;
