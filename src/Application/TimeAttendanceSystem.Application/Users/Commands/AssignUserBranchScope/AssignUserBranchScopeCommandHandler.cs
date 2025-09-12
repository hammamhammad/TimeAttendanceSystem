using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Users.Commands.AssignUserBranchScope;

public class AssignUserBranchScopeCommandHandler : BaseHandler<AssignUserBranchScopeCommand, Result<Unit>>
{
    public AssignUserBranchScopeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(AssignUserBranchScopeCommand request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .Include(u => u.UserBranchScopes)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<Unit>("User not found");
        }

        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId, cancellationToken);

        if (branch == null)
        {
            return Result.Failure<Unit>("Branch not found");
        }

        if (user.UserBranchScopes.Any(ubs => ubs.BranchId == request.BranchId))
        {
            return Result.Failure<Unit>("User already has access to this branch");
        }

        var userBranchScope = new UserBranchScope
        {
            UserId = request.UserId,
            BranchId = request.BranchId
        };

        Context.UserBranchScopes.Add(userBranchScope);

        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.UserBranchScopeAssigned,
            EntityName = nameof(Domain.Users.User),
            EntityId = user.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                BranchId = request.BranchId,
                BranchName = branch.Name,
                AssignedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}