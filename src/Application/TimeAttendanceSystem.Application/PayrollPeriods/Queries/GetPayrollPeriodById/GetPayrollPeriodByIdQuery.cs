using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;

namespace TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriodById;

public record GetPayrollPeriodByIdQuery(long Id) : IRequest<Result<PayrollPeriodDto>>;
