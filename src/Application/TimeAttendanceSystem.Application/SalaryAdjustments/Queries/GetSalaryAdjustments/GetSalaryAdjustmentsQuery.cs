using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustments;

public record GetSalaryAdjustmentsQuery(
    long? EmployeeId = null,
    SalaryAdjustmentStatus? Status = null,
    SalaryAdjustmentType? AdjustmentType = null,
    long? BranchId = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
