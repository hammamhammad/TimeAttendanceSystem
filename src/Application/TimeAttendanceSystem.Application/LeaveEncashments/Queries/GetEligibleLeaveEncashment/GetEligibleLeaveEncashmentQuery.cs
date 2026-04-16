using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetEligibleLeaveEncashment;

public record GetEligibleLeaveEncashmentQuery(long EmployeeId) : IRequest<Result<object>>;
