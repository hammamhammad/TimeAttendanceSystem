using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Terminations.Commands.CreateTerminationRecord;

[RequiresModule(SystemModule.Offboarding)]
public record CreateTerminationRecordCommand(
    long EmployeeId,
    TerminationType TerminationType,
    DateTime TerminationDate,
    DateTime LastWorkingDate,
    string? Reason,
    string? ReasonAr,
    long? ResignationRequestId,
    string? Notes
) : ICommand<Result<long>>;
