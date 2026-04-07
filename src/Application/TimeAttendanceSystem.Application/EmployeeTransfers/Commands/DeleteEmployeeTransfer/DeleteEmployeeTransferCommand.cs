using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.DeleteEmployeeTransfer;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record DeleteEmployeeTransferCommand(long Id) : ICommand<Result>;
