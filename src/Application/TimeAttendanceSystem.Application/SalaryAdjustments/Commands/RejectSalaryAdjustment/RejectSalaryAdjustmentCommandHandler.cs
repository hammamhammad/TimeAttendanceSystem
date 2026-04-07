using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.RejectSalaryAdjustment;

public class RejectSalaryAdjustmentCommandHandler : BaseHandler<RejectSalaryAdjustmentCommand, Result>
{
    public RejectSalaryAdjustmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(RejectSalaryAdjustmentCommand request, CancellationToken cancellationToken)
    {
        var entity = await Context.SalaryAdjustments
            .Include(s => s.Employee)
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (entity == null)
            return Result.Failure("Salary adjustment not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(entity.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (entity.Status != SalaryAdjustmentStatus.Pending)
            return Result.Failure("Only pending salary adjustments can be rejected.");

        entity.Status = SalaryAdjustmentStatus.Rejected;
        entity.RejectionReason = request.RejectionReason;
        entity.ApprovedByUserId = CurrentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
