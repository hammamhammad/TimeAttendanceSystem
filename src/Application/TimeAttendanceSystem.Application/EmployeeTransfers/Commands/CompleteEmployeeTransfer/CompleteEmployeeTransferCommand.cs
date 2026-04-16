using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CompleteEmployeeTransfer;

public record CompleteEmployeeTransferCommand(long Id) : ICommand<Result>;
