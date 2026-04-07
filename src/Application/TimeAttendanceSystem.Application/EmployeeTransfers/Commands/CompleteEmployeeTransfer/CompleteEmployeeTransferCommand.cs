using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CompleteEmployeeTransfer;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record CompleteEmployeeTransferCommand(long Id) : ICommand<Result>;
