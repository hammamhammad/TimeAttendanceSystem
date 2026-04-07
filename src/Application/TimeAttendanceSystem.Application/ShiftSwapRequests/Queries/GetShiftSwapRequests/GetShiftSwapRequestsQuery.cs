using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Queries.GetShiftSwapRequests;

[RequiresModule(SystemModule.ShiftSwaps, AllowReadWhenDisabled = true)]
public record GetShiftSwapRequestsQuery(
    long? BranchId = null,
    long? DepartmentId = null,
    long? EmployeeId = null,
    ShiftSwapStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
