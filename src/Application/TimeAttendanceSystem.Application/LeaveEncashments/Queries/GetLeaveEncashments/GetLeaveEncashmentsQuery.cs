using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetLeaveEncashments;

[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetLeaveEncashmentsQuery(
    long? BranchId = null,
    long? EmployeeId = null,
    int? Year = null,
    LeaveEncashmentStatus? Status = null,
    long? VacationTypeId = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
