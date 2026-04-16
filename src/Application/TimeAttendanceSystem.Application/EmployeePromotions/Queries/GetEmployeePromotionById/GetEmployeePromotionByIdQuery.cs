using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeePromotions.Queries.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Queries.GetEmployeePromotionById;

public record GetEmployeePromotionByIdQuery(long Id) : IRequest<Result<EmployeePromotionDto>>;
