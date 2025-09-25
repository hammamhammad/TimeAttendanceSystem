using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Shifts.Commands.SetDefaultShift;

public class SetDefaultShiftCommand : IRequest<Result>
{
    public int ShiftId { get; set; }
    public bool ForceReplace { get; set; } = false;
}