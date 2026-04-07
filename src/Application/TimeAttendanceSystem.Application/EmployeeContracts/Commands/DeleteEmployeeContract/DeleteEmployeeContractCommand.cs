using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.DeleteEmployeeContract;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record DeleteEmployeeContractCommand(long Id) : ICommand<Result>;
