using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.ProcessPayrollPeriod;

[RequiresModule(SystemModule.Payroll)]
public record ProcessPayrollPeriodCommand(long PayrollPeriodId, bool IsRecalculation = false) : ICommand<Result<long>>;
