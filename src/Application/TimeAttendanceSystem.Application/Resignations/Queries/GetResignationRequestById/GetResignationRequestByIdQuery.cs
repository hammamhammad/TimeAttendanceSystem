using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Resignations.Queries.Common;

namespace TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequestById;

public record GetResignationRequestByIdQuery(long Id) : IRequest<Result<ResignationRequestDto>>;
