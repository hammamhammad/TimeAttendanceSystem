using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Commands.UpdateBranch;

public record UpdateBranchCommand(
    long Id,
    string Code,
    string Name,
    string TimeZone,
    bool IsActive
) : ICommand<Result>;