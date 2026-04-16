using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.LeaveEncashments.Queries.Common;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetLeaveEncashmentById;

public record GetLeaveEncashmentByIdQuery(long Id) : IRequest<Result<LeaveEncashmentDto>>;
