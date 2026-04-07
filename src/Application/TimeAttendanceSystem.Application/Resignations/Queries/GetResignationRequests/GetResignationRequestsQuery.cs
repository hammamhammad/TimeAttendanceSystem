using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequests;

[RequiresModule(SystemModule.Offboarding, AllowReadWhenDisabled = true)]
public record GetResignationRequestsQuery(
    long? EmployeeId = null,
    long? BranchId = null,
    ResignationStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
