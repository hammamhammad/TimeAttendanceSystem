using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuseById;

public record GetEmployeeExcuseByIdQuery(long Id) : IRequest<Result<EmployeeExcuseDetailDto>>;