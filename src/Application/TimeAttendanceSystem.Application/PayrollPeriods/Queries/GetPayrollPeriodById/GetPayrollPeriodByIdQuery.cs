using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriodById;

[RequiresModule(SystemModule.Payroll, AllowReadWhenDisabled = true)]
public record GetPayrollPeriodByIdQuery(long Id) : IRequest<Result<PayrollPeriodDto>>;
