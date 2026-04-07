using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Shifts.Commands.SetDefaultShift;

[RequiresModule(SystemModule.TimeAttendance)]
public class SetDefaultShiftCommand : IRequest<Result>
{
    public int ShiftId { get; set; }
    public bool ForceReplace { get; set; } = false;
}