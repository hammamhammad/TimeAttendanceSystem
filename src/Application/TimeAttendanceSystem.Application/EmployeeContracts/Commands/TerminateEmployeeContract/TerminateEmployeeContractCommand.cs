using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.TerminateEmployeeContract;

public record TerminateEmployeeContractCommand(long Id, string? Reason = null) : ICommand<Result>;
