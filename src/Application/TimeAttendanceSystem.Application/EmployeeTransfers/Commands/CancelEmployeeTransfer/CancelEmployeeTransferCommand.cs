using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CancelEmployeeTransfer;

public record CancelEmployeeTransferCommand(long Id) : ICommand<Result>;
