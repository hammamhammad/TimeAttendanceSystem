using MediatR;
using TecAxle.Hrms.Application.Shifts.Queries.GetShifts;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Shifts.Queries.GetDefaultShift;

public class GetDefaultShiftQuery : IRequest<Result<ShiftDto?>>
{
}