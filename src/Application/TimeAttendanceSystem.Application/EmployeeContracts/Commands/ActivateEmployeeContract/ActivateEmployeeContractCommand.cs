using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.ActivateEmployeeContract;

public record ActivateEmployeeContractCommand(long Id) : ICommand<Result>;
