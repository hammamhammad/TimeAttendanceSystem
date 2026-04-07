using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Branches.Commands.DeleteBranch;

public record DeleteBranchCommand(long Id) : ICommand<Result>;