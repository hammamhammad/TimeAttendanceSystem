using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.DeleteEmployeePromotion;

public class DeleteEmployeePromotionCommandHandler : BaseHandler<DeleteEmployeePromotionCommand, Result>
{
    public DeleteEmployeePromotionCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteEmployeePromotionCommand request, CancellationToken cancellationToken)
    {
        var promotion = await Context.EmployeePromotions
            .Include(p => p.Employee)
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);

        if (promotion == null)
            return Result.Failure("Promotion not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(promotion.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (promotion.Status != PromotionStatus.Pending)
            return Result.Failure("Only pending promotions can be deleted.");

        promotion.IsDeleted = true;
        promotion.ModifiedAtUtc = DateTime.UtcNow;
        promotion.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
