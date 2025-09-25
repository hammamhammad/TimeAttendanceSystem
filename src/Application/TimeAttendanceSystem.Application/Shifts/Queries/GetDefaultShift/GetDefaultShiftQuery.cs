using MediatR;
using TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Shifts.Queries.GetDefaultShift;

public class GetDefaultShiftQuery : IRequest<Result<ShiftDto?>>
{
}