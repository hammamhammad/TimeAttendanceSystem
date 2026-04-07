using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CreateEmployeeTransfer;

[RequiresModule(SystemModule.EmployeeLifecycle)]
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
