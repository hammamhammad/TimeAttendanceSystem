using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.DeleteEmployeeTransfer;

public record DeleteEmployeeTransferCommand(long Id) : ICommand<Result>;
