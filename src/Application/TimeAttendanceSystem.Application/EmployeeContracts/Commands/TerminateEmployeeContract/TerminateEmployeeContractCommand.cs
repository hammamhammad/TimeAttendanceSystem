using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.TerminateEmployeeContract;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record TerminateEmployeeContractCommand(long Id, string? Reason = null) : ICommand<Result>;
