using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.RenewEmployeeContract;

public record RenewEmployeeContractCommand(
    long Id,
    string ContractNumber,
    DateTime StartDate,
    DateTime? EndDate,
    decimal? BasicSalary,
    ContractType? ContractType,
    string? Notes
) : ICommand<Result<long>>;
