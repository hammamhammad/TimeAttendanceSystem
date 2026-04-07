using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriods;

[RequiresModule(SystemModule.Payroll, AllowReadWhenDisabled = true)]
public record GetPayrollPeriodsQuery(
    long? BranchId = null,
    int? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<PagedResult<PayrollPeriodDto>>>;
