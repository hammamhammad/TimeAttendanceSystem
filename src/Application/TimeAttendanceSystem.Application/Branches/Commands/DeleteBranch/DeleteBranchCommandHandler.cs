using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Commands.DeleteBranch;

public class DeleteBranchCommandHandler : BaseHandler<DeleteBranchCommand, Result>
{
    public DeleteBranchCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(DeleteBranchCommand request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);
        
        if (branch == null)
        {
            return Result.Failure("Branch not found");
        }

        // Check if branch has employees
        var hasEmployees = await Context.Employees
            .AnyAsync(e => e.BranchId == request.Id, cancellationToken);

        if (hasEmployees)
        {
            return Result.Failure("Cannot delete branch with employees. Please reassign or remove employees first.");
        }

        // Check if branch has departments
        var hasDepartments = await Context.Departments
            .AnyAsync(d => d.BranchId == request.Id, cancellationToken);

        if (hasDepartments)
        {
            return Result.Failure("Cannot delete branch with departments. Please remove departments first.");
        }

        // Soft delete
        branch.IsDeleted = true;
        branch.ModifiedAtUtc = DateTime.UtcNow;
        branch.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}