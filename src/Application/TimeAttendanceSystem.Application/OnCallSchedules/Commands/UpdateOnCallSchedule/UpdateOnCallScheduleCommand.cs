using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.UpdateOnCallSchedule;

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
