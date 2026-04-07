using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Dtos;

namespace TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlans;

public class GetSubscriptionPlansQueryHandler : BaseHandler<GetSubscriptionPlansQuery, Result<List<SubscriptionPlanDto>>>
{
    public GetSubscriptionPlansQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<List<SubscriptionPlanDto>>> Handle(GetSubscriptionPlansQuery request, CancellationToken cancellationToken)
    {
        var plans = await Context.SubscriptionPlans
            .AsNoTracking()
            .Where(p => !p.IsDeleted)
            .Include(p => p.ModuleEntitlements)
            .Include(p => p.Limits)
            .OrderBy(p => p.SortOrder)
            .ThenBy(p => p.Tier)
            .ToListAsync(cancellationToken);

        var dtos = plans.Select(p => new SubscriptionPlanDto
        {
            Id = p.Id,
            Code = p.Code,
            Name = p.Name,
            NameAr = p.NameAr,
            Description = p.Description,
            DescriptionAr = p.DescriptionAr,
            Tier = p.Tier.ToString(),
            MonthlyPriceUsd = p.MonthlyPriceUsd,
            AnnualPriceUsd = p.AnnualPriceUsd,
            Currency = p.Currency,
            IsPublic = p.IsPublic,
            IsActive = p.IsActive,
            SortOrder = p.SortOrder,
            Modules = p.ModuleEntitlements
                .Where(me => me.IsIncluded)
                .Select(me => me.Module.ToString())
                .ToList(),
            Limits = p.Limits
                .ToDictionary(l => l.LimitType.ToString(), l => l.LimitValue)
        }).ToList();

        return Result.Success(dtos);
    }
}
