using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Excuses.Queries.GetExcusePolicies;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Excuses.Queries.GetExcusePolicyById;

[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetExcusePolicyByIdQuery(long Id) : IRequest<Result<ExcusePolicyDto>>;
