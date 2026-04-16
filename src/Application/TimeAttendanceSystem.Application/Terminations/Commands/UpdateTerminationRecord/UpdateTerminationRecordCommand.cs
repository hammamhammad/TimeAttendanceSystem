using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Terminations.Commands.UpdateTerminationRecord;

public record UpdateTerminationRecordCommand(
    long Id,
    TerminationType TerminationType,
    DateTime TerminationDate,
    DateTime LastWorkingDate,
    string? Reason,
    string? ReasonAr,
    string? Notes
) : ICommand<Result>;
