using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.RejectEmployeePromotion;

public class RejectEmployeePromotionCommandHandler : BaseHandler<RejectEmployeePromotionCommand, Result>
{
    public RejectEmployeePromotionCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(RejectEmployeePromotionCommand request, CancellationToken cancellationToken)
    {
        var promotion = await Context.EmployeePromotions
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);

        if (promotion == null)
            return Result.Failure("Promotion not found.");

        if (promotion.Status != PromotionStatus.Pending)
            return Result.Failure("Only pending promotions can be rejected.");

        if (string.IsNullOrWhiteSpace(request.RejectionReason))
            return Result.Failure("Rejection reason is required.");

        promotion.Status = PromotionStatus.Rejected;
        promotion.RejectionReason = request.RejectionReason;
        promotion.ApprovedByUserId = CurrentUser.UserId;
        promotion.ApprovedAt = DateTime.UtcNow;
        promotion.ModifiedAtUtc = DateTime.UtcNow;
        promotion.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
