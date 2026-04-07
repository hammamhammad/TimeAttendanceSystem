using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CancelEmployeeTransfer;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record CancelEmployeeTransferCommand(long Id) : ICommand<Result>;
