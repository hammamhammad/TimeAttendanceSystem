using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.AssignUserBranchScope;

public record AssignUserBranchScopeCommand : IRequest<Result<Unit>>
{
    public long UserId { get; init; }
    public long BranchId { get; init; }
}