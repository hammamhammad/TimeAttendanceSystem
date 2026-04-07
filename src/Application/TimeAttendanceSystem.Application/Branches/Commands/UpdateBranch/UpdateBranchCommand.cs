using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Branches.Commands.UpdateBranch;

public record UpdateBranchCommand(
    long Id,
    string Code,
    string Name,
    string TimeZone,
    bool IsActive
) : ICommand<Result>;