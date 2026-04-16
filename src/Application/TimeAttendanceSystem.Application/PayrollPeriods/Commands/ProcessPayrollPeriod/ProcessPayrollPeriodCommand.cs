using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.ProcessPayrollPeriod;

public record ProcessPayrollPeriodCommand(long PayrollPeriodId, bool IsRecalculation = false) : ICommand<Result<long>>;
