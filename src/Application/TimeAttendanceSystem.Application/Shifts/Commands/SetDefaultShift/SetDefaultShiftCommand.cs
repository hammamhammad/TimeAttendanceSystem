using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Shifts.Commands.SetDefaultShift;

public class SetDefaultShiftCommand : IRequest<Result>
{
    public int ShiftId { get; set; }
    public bool ForceReplace { get; set; } = false;
}