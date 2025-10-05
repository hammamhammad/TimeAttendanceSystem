using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicies;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicyById;

public record GetExcusePolicyByIdQuery(long Id) : IRequest<Result<ExcusePolicyDto>>;
