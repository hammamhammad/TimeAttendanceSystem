using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallScheduleById;

public record GetOnCallScheduleByIdQuery(long Id) : IRequest<Result<OnCallScheduleDto>>;
