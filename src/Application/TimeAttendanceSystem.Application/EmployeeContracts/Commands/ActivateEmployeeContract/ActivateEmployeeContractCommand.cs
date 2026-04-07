using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.ActivateEmployeeContract;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record ActivateEmployeeContractCommand(long Id) : ICommand<Result>;
