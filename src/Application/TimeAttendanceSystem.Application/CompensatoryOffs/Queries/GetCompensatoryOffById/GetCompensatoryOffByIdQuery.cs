using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompensatoryOffs.Queries.Common;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetCompensatoryOffById;

public record GetCompensatoryOffByIdQuery(long Id) : IRequest<Result<CompensatoryOffDto>>;
