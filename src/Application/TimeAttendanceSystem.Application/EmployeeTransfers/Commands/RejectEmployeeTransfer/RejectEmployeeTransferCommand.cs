using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.RejectEmployeeTransfer;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record RejectEmployeeTransferCommand(
    long Id,
    string RejectionReason
) : ICommand<Result>;
