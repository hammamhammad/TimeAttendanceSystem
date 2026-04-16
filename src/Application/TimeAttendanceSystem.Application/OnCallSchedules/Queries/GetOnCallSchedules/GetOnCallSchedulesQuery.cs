using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallSchedules;

public record GetOnCallSchedulesQuery(
    long? BranchId = null,
    long? EmployeeId = null,
    OnCallType? OnCallType = null,
    bool? IsActive = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
