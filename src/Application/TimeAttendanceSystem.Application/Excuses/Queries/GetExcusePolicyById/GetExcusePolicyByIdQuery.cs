using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Excuses.Queries.GetExcusePolicies;

namespace TecAxle.Hrms.Application.Excuses.Queries.GetExcusePolicyById;

public record GetExcusePolicyByIdQuery(long Id) : IRequest<Result<ExcusePolicyDto>>;
