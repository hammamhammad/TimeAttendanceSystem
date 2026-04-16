using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.DeleteEmployeeContract;

public record DeleteEmployeeContractCommand(long Id) : ICommand<Result>;
