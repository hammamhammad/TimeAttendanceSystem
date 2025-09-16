using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;

/// <summary>
/// Query for retrieving shifts with pagination and search capabilities.
/// Supports comprehensive shift information retrieval.
/// </summary>
public record GetShiftsQuery(
    int Page = 1,
    int PageSize = 10,
    string? Search = null
) : IRequest<Result<PagedResult<ShiftDto>>>;