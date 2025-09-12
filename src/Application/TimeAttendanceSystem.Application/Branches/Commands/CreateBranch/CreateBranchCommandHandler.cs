using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Application.Branches.Commands.CreateBranch;

public class CreateBranchCommandHandler : BaseHandler<CreateBranchCommand, Result<long>>
{
    public CreateBranchCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateBranchCommand request, CancellationToken cancellationToken)
    {
        // Check if branch code already exists
        var existingBranch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Code == request.Code, cancellationToken);
        
        if (existingBranch != null)
        {
            return Result.Failure<long>("Branch code already exists");
        }

        var branch = new Branch
        {
            Code = request.Code,
            Name = request.Name,
            TimeZone = request.TimeZone,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username
        };

        Context.Branches.Add(branch);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(branch.Id);
    }
}