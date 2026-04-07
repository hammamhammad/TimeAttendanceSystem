using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.SubmitSalaryAdjustment;

public class SubmitSalaryAdjustmentCommandHandler : BaseHandler<SubmitSalaryAdjustmentCommand, Result>
{
    public SubmitSalaryAdjustmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(SubmitSalaryAdjustmentCommand request, CancellationToken cancellationToken)
    {
        var entity = await Context.SalaryAdjustments
            .Include(s => s.Employee)
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (entity == null)
            return Result.Failure("Salary adjustment not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(entity.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (entity.Status != SalaryAdjustmentStatus.Draft)
            return Result.Failure("Only draft salary adjustments can be submitted.");

        entity.Status = SalaryAdjustmentStatus.Pending;
        entity.SubmittedByUserId = CurrentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
