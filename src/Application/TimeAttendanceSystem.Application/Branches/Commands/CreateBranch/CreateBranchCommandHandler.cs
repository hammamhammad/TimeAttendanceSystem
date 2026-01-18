using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

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

        // Auto-assign the default shift to the new branch
        await AssignDefaultShiftToBranchAsync(branch.Id, cancellationToken);

        return Result.Success(branch.Id);
    }

    private async Task AssignDefaultShiftToBranchAsync(long branchId, CancellationToken cancellationToken)
    {
        // Find the default shift
        var defaultShift = await Context.Shifts
            .FirstOrDefaultAsync(s => s.IsDefault && !s.IsDeleted, cancellationToken);

        if (defaultShift == null)
        {
            // No default shift configured, skip assignment
            return;
        }

        // Check if there's already a shift assignment for this branch
        var existingAssignment = await Context.ShiftAssignments
            .AnyAsync(sa => sa.BranchId == branchId &&
                           sa.AssignmentType == ShiftAssignmentType.Branch &&
                           !sa.IsDeleted,
                      cancellationToken);

        if (existingAssignment)
        {
            // Branch already has a shift assignment, skip
            return;
        }

        // Create branch-level shift assignment
        var shiftAssignment = new ShiftAssignment
        {
            ShiftId = defaultShift.Id,
            AssignmentType = ShiftAssignmentType.Branch,
            BranchId = branchId,
            EffectiveFromDate = DateTime.UtcNow.Date,
            Status = ShiftAssignmentStatus.Active,
            Priority = 10, // Default priority for branch-level assignments
            Notes = "Auto-assigned default shift on branch creation",
            AssignedByUserId = CurrentUser.UserId ?? 1, // Fallback to system user ID 1
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        Context.ShiftAssignments.Add(shiftAssignment);
        await Context.SaveChangesAsync(cancellationToken);
    }
}