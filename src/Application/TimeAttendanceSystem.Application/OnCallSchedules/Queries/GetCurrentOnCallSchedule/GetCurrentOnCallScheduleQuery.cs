using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetCurrentOnCallSchedule;

[RequiresModule(SystemModule.ShiftSwaps, AllowReadWhenDisabled = true)]
public record GetCurrentOnCallScheduleQuery(
    long? BranchId = null
) : IRequest<Result<object>>;
