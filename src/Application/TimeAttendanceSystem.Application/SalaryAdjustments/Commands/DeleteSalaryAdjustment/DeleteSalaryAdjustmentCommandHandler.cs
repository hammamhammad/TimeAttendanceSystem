using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.DeleteSalaryAdjustment;

public class DeleteSalaryAdjustmentCommandHandler : BaseHandler<DeleteSalaryAdjustmentCommand, Result>
{
    public DeleteSalaryAdjustmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteSalaryAdjustmentCommand request, CancellationToken cancellationToken)
    {
        var entity = await Context.SalaryAdjustments
            .Include(s => s.Employee)
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (entity == null)
            return Result.Failure("Salary adjustment not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(entity.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (entity.Status != SalaryAdjustmentStatus.Draft)
            return Result.Failure("Only draft salary adjustments can be deleted.");

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
