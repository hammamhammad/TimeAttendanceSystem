using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Terminations.Commands.UpdateTerminationRecord;

public class UpdateTerminationRecordCommandHandler : BaseHandler<UpdateTerminationRecordCommand, Result>
{
    public UpdateTerminationRecordCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateTerminationRecordCommand request, CancellationToken cancellationToken)
    {
        var termination = await Context.TerminationRecords
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (termination == null)
            return Result.Failure("Termination record not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(termination.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        // Check if final settlement is already approved/paid
        var hasApprovedSettlement = await Context.FinalSettlements
            .AnyAsync(f => f.TerminationRecordId == request.Id && !f.IsDeleted
                && (f.Status == SettlementStatus.Approved || f.Status == SettlementStatus.Paid), cancellationToken);

        if (hasApprovedSettlement)
            return Result.Failure("Cannot update termination record with an approved or paid final settlement.");

        termination.TerminationType = request.TerminationType;
        termination.TerminationDate = request.TerminationDate;
        termination.LastWorkingDate = request.LastWorkingDate;
        termination.Reason = request.Reason;
        termination.ReasonAr = request.ReasonAr;
        termination.Notes = request.Notes;
        termination.ModifiedAtUtc = DateTime.UtcNow;
        termination.ModifiedBy = CurrentUser.Username;

        // Update employee dates
        termination.Employee.TerminationDate = request.TerminationDate;
        termination.Employee.LastWorkingDate = request.LastWorkingDate;
        termination.Employee.ModifiedAtUtc = DateTime.UtcNow;
        termination.Employee.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
