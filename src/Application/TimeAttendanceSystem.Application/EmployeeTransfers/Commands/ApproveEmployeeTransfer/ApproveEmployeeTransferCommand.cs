using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.ApproveEmployeeTransfer;

public record ApproveEmployeeTransferCommand(
    long Id,
    string? Comments
) : ICommand<Result>;
