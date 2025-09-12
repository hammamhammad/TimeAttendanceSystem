using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Commands.UpdateBranch;

public class UpdateBranchCommandHandler : BaseHandler<UpdateBranchCommand, Result>
{
    public UpdateBranchCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateBranchCommand request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);
        
        if (branch == null)
        {
            return Result.Failure("Branch not found");
        }

        // Check if the new code conflicts with another branch
        if (branch.Code != request.Code)
        {
            var existingBranch = await Context.Branches
                .FirstOrDefaultAsync(b => b.Code == request.Code && b.Id != request.Id, cancellationToken);
            
            if (existingBranch != null)
            {
                return Result.Failure("Branch code already exists");
            }
        }

        branch.Code = request.Code;
        branch.Name = request.Name;
        branch.TimeZone = request.TimeZone;
        branch.IsActive = request.IsActive;
        branch.ModifiedAtUtc = DateTime.UtcNow;
        branch.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}