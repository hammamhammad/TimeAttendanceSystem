using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.RejectResignation;

public record RejectResignationCommand(
    long Id,
    string RejectionReason
) : ICommand<Result>;
