using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeePromotions.Queries.GetEmployeePromotions;

[RequiresModule(SystemModule.EmployeeLifecycle, AllowReadWhenDisabled = true)]
public record GetEmployeePromotionsQuery(
    long? EmployeeId = null,
    long? BranchId = null,
    PromotionStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
