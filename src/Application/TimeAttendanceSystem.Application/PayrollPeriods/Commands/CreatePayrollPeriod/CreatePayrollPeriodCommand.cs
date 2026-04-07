using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.CreatePayrollPeriod;

[RequiresModule(SystemModule.Payroll)]
public record CreatePayrollPeriodCommand(
    long BranchId,
    string Name,
    string? NameAr,
    int PeriodType,
    DateTime StartDate,
    DateTime EndDate,
    string? Notes
) : ICommand<Result<long>>;
