using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.RejectEmployeeTransfer;

public record RejectEmployeeTransferCommand(
    long Id,
    string RejectionReason
) : ICommand<Result>;
