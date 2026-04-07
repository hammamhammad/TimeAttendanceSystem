using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Dtos;

namespace TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlanById;

public class GetSubscriptionPlanByIdQueryHandler : BaseHandler<GetSubscriptionPlanByIdQuery, Result<SubscriptionPlanDto>>
{
    public GetSubscriptionPlanByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<SubscriptionPlanDto>> Handle(GetSubscriptionPlanByIdQuery request, CancellationToken cancellationToken)
    {
        var plan = await Context.SubscriptionPlans
            .AsNoTracking()
            .Include(p => p.ModuleEntitlements)
            .Include(p => p.Limits)
            .Where(p => p.Id == request.Id && !p.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (plan == null)
        {
            return Result.Failure<SubscriptionPlanDto>("Subscription plan not found");
        }

        var dto = new SubscriptionPlanDto
        {
            Id = plan.Id,
            Code = plan.Code,
            Name = plan.Name,
            NameAr = plan.NameAr,
            Description = plan.Description,
            DescriptionAr = plan.DescriptionAr,
            Tier = plan.Tier.ToString(),
            MonthlyPriceUsd = plan.MonthlyPriceUsd,
            AnnualPriceUsd = plan.AnnualPriceUsd,
            Currency = plan.Currency,
            IsPublic = plan.IsPublic,
            IsActive = plan.IsActive,
            SortOrder = plan.SortOrder,
            Modules = plan.ModuleEntitlements
                .Where(me => me.IsIncluded)
                .Select(me => me.Module.ToString())
                .ToList(),
            Limits = plan.Limits
                .ToDictionary(l => l.LimitType.ToString(), l => l.LimitValue)
        };

        return Result.Success(dto);
    }
}
