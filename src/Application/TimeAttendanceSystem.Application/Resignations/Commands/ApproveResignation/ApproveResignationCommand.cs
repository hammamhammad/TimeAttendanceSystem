using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.ApproveResignation;

public record ApproveResignationCommand(
    long Id,
    string? Comments
) : ICommand<Result>;
