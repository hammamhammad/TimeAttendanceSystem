using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Commands.CreateBranch;

public record CreateBranchCommand(
    string Code,
    string Name,
    string TimeZone,
    bool IsActive = true
) : ICommand<Result<long>>;