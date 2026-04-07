using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.CancelEmployeePromotion;

public class CancelEmployeePromotionCommandHandler : BaseHandler<CancelEmployeePromotionCommand, Result>
{
    public CancelEmployeePromotionCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(CancelEmployeePromotionCommand request, CancellationToken cancellationToken)
    {
        var promotion = await Context.EmployeePromotions
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);

        if (promotion == null)
            return Result.Failure("Promotion not found.");

        if (promotion.Status != PromotionStatus.Pending)
            return Result.Failure("Only pending promotions can be cancelled.");

        promotion.Status = PromotionStatus.Cancelled;
        promotion.ModifiedAtUtc = DateTime.UtcNow;
        promotion.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
