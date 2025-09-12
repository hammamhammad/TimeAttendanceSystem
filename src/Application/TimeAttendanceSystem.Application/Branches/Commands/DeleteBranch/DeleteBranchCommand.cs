using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Commands.DeleteBranch;

public record DeleteBranchCommand(long Id) : ICommand<Result>;