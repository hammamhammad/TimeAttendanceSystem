using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Queries.GetEmployeePromotions;

public record GetEmployeePromotionsQuery(
    long? EmployeeId = null,
    long? BranchId = null,
    PromotionStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
