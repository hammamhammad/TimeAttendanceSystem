using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Resignations.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequestById;

[RequiresModule(SystemModule.Offboarding, AllowReadWhenDisabled = true)]
public record GetResignationRequestByIdQuery(long Id) : IRequest<Result<ResignationRequestDto>>;
