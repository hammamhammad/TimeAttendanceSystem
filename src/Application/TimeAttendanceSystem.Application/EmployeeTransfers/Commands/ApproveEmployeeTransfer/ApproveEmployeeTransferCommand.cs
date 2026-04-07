using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.ApproveEmployeeTransfer;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record ApproveEmployeeTransferCommand(
    long Id,
    string? Comments
) : ICommand<Result>;
