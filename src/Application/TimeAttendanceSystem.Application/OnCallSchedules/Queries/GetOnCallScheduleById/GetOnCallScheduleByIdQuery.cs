using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallScheduleById;

[RequiresModule(SystemModule.ShiftSwaps, AllowReadWhenDisabled = true)]
public record GetOnCallScheduleByIdQuery(long Id) : IRequest<Result<OnCallScheduleDto>>;
