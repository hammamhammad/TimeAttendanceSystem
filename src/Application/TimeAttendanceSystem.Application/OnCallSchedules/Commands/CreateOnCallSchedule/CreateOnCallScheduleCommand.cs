using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.CreateOnCallSchedule;

public record CreateOnCallScheduleCommand(
    long EmployeeId,
    DateTime StartDate,
    DateTime EndDate,
    OnCallType OnCallType,
    long? ShiftId,
    string? Notes,
    string? NotesAr
) : ICommand<Result<long>>;
