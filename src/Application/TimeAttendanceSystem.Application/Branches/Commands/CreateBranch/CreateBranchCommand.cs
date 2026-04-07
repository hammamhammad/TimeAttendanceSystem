using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Branches.Commands.CreateBranch;

public record CreateBranchCommand(
    string Code,
    string Name,
    string TimeZone,
    bool IsActive = true
) : ICommand<Result<long>>;