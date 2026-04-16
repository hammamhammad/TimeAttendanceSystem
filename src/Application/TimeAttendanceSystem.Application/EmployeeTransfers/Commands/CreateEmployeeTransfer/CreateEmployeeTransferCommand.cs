using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CreateEmployeeTransfer;

public record CreateEmployeeTransferCommand(
    long EmployeeId,
    long ToBranchId,
    long? ToDepartmentId,
    string? ToJobTitle,
    string? ToJobTitleAr,
    DateTime EffectiveDate,
    string? Reason,
    string? ReasonAr,
    string? Notes
) : ICommand<Result<long>>;
