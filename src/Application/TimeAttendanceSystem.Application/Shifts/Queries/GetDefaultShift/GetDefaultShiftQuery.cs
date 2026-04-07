using MediatR;
using TecAxle.Hrms.Application.Shifts.Queries.GetShifts;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Shifts.Queries.GetDefaultShift;

[RequiresModule(SystemModule.TimeAttendance, AllowReadWhenDisabled = true)]
public class GetDefaultShiftQuery : IRequest<Result<ShiftDto?>>
{
}