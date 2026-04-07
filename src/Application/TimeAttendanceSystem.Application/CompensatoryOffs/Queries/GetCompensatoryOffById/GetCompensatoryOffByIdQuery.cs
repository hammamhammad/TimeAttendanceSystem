using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompensatoryOffs.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetCompensatoryOffById;

[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetCompensatoryOffByIdQuery(long Id) : IRequest<Result<CompensatoryOffDto>>;
