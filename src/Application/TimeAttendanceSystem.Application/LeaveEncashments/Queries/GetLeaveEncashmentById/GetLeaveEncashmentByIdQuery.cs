using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.LeaveEncashments.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetLeaveEncashmentById;

[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetLeaveEncashmentByIdQuery(long Id) : IRequest<Result<LeaveEncashmentDto>>;
