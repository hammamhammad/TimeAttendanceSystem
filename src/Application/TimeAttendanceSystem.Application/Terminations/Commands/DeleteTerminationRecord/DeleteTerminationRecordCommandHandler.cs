using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Terminations.Commands.DeleteTerminationRecord;

public class DeleteTerminationRecordCommandHandler : BaseHandler<DeleteTerminationRecordCommand, Result>
{
    public DeleteTerminationRecordCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteTerminationRecordCommand request, CancellationToken cancellationToken)
    {
        var termination = await Context.TerminationRecords
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (termination == null)
            return Result.Failure("Termination record not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(termination.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        // Check if there are linked clearance/EOS/settlement records that are not draft
        var hasApprovedSettlement = await Context.FinalSettlements
            .AnyAsync(f => f.TerminationRecordId == request.Id && !f.IsDeleted
                && (f.Status == SettlementStatus.Approved || f.Status == SettlementStatus.Paid), cancellationToken);

        if (hasApprovedSettlement)
            return Result.Failure("Cannot delete termination record with an approved or paid final settlement.");

        // Soft delete the termination record
        termination.IsDeleted = true;
        termination.ModifiedAtUtc = DateTime.UtcNow;
        termination.ModifiedBy = CurrentUser.Username;

        // Restore employee status
        termination.Employee.EmploymentStatus = EmploymentStatus.Active;
        termination.Employee.TerminationDate = null;
        termination.Employee.LastWorkingDate = null;
        termination.Employee.IsActive = true;
        termination.Employee.ModifiedAtUtc = DateTime.UtcNow;
        termination.Employee.ModifiedBy = CurrentUser.Username;

        // Soft delete related records
        var relatedSettlements = await Context.FinalSettlements
            .Where(f => f.TerminationRecordId == request.Id && !f.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var settlement in relatedSettlements)
        {
            settlement.IsDeleted = true;
            settlement.ModifiedAtUtc = DateTime.UtcNow;
            settlement.ModifiedBy = CurrentUser.Username;
        }

        var relatedChecklists = await Context.ClearanceChecklists
            .Where(c => c.TerminationRecordId == request.Id && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var checklist in relatedChecklists)
        {
            checklist.IsDeleted = true;
            checklist.ModifiedAtUtc = DateTime.UtcNow;
            checklist.ModifiedBy = CurrentUser.Username;
        }

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
