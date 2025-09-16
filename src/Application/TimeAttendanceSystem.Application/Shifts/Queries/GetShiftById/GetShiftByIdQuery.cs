using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;

namespace TimeAttendanceSystem.Application.Shifts.Queries.GetShiftById;

/// <summary>
/// Query for retrieving a specific shift by its identifier.
/// Returns comprehensive shift information including periods and branch details.
/// </summary>
public record GetShiftByIdQuery(long Id) : IRequest<Result<ShiftDto?>>;