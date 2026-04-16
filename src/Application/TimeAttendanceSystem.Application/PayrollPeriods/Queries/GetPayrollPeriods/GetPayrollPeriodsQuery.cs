using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;

namespace TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriods;

public record GetPayrollPeriodsQuery(
    long? BranchId = null,
    int? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<PagedResult<PayrollPeriodDto>>>;
