using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.CreatePayrollPeriod;

public record CreatePayrollPeriodCommand(
    long BranchId,
    string Name,
    string? NameAr,
    int PeriodType,
    DateTime StartDate,
    DateTime EndDate,
    string? Notes
) : ICommand<Result<long>>;
