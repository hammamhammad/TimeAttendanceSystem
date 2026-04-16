using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Shifts.Queries.GetShifts;

namespace TecAxle.Hrms.Application.Shifts.Queries.GetShiftById;

/// <summary>
/// Query for retrieving a specific shift by its identifier.
/// Returns comprehensive shift information including periods and branch details.
/// </summary>
public record GetShiftByIdQuery(long Id) : IRequest<Result<ShiftDto?>>;