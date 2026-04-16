using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetCurrentOnCallSchedule;

public record GetCurrentOnCallScheduleQuery(
    long? BranchId = null
) : IRequest<Result<object>>;
