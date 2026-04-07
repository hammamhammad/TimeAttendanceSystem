using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetEligibleLeaveEncashment;

[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetEligibleLeaveEncashmentQuery(long EmployeeId) : IRequest<Result<object>>;
