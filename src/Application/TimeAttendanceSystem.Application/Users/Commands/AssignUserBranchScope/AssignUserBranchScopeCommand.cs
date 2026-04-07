using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Users.Commands.AssignUserBranchScope;

public record AssignUserBranchScopeCommand : IRequest<Result<Unit>>
{
    public long UserId { get; init; }
    public long BranchId { get; init; }
}