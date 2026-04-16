using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Terminations.Commands.CreateTerminationRecord;

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
