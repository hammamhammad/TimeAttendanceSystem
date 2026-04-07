using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.RenewEmployeeContract;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record RenewEmployeeContractCommand(
    long Id,
    string ContractNumber,
    DateTime StartDate,
    DateTime? EndDate,
    decimal? BasicSalary,
    ContractType? ContractType,
    string? Notes
) : ICommand<Result<long>>;
