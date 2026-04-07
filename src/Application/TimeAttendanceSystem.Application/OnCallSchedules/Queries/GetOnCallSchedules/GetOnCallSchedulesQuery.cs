using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallSchedules;

[RequiresModule(SystemModule.ShiftSwaps, AllowReadWhenDisabled = true)]
public record GetOnCallSchedulesQuery(
    long? BranchId = null,
    long? EmployeeId = null,
    OnCallType? OnCallType = null,
    bool? IsActive = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
