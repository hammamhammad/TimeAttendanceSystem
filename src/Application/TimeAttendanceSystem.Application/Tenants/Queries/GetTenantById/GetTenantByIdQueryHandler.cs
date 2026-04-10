using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Dtos;
using TecAxle.Hrms.Application.Tenants.Dtos;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Tenants.Queries.GetTenantById;

public class GetTenantByIdQueryHandler : BaseHandler<GetTenantByIdQuery, Result<TenantDetailDto>>
{
    private readonly IMasterDbContext _masterContext;

    public GetTenantByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser, IMasterDbContext masterContext)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
    }

    public override async Task<Result<TenantDetailDto>> Handle(GetTenantByIdQuery request, CancellationToken cancellationToken)
    {
        var tenant = await _masterContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == request.Id && !t.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (tenant == null)
        {
            return Result.Failure<TenantDetailDto>("Tenant not found");
        }

        // Cross-tenant DB counts require connecting to each tenant's DB — not available in master context
        var branchCount = 0;
        var employeeCount = 0;

        // Load active subscription with plan, add-ons, and module entitlements
        var subscription = await _masterContext.TenantSubscriptions
            .AsNoTracking()
            .Include(s => s.Plan)
                .ThenInclude(p => p.ModuleEntitlements)
            .Include(s => s.Plan)
                .ThenInclude(p => p.Limits)
            .Include(s => s.AddOns)
            .Where(s => s.TenantId == tenant.Id && (s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Trial))
            .FirstOrDefaultAsync(cancellationToken);

        TenantSubscriptionDto? subscriptionDto = null;
        if (subscription != null)
        {
            subscriptionDto = MapSubscription(subscription);
        }

        var dto = new TenantDetailDto
        {
            Id = tenant.Id,
            Subdomain = tenant.Subdomain,
            Name = tenant.Name,
            NameAr = tenant.NameAr,
            LogoUrl = tenant.LogoUrl,
            ApiBaseUrl = tenant.ApiBaseUrl,
            CustomDomain = tenant.CustomDomain,
            IsActive = tenant.IsActive,
            Status = tenant.Status.ToString(),
            CompanyRegistrationNumber = tenant.CompanyRegistrationNumber,
            TaxIdentificationNumber = tenant.TaxIdentificationNumber,
            Industry = tenant.Industry,
            Country = tenant.Country,
            City = tenant.City,
            Address = tenant.Address,
            Phone = tenant.Phone,
            Email = tenant.Email,
            Website = tenant.Website,
            DefaultTimezone = tenant.DefaultTimezone,
            DefaultLanguage = tenant.DefaultLanguage,
            DefaultCurrency = tenant.DefaultCurrency,
            TrialStartDate = tenant.TrialStartDate,
            TrialEndDate = tenant.TrialEndDate,
            CreatedAtUtc = tenant.CreatedAtUtc,
            BranchCount = branchCount,
            EmployeeCount = employeeCount,
            DatabaseName = tenant.DatabaseName,
            DatabaseCreatedAt = tenant.DatabaseCreatedAt,
            Subscription = subscriptionDto
        };

        return Result.Success(dto);
    }

    private static TenantSubscriptionDto MapSubscription(TenantSubscription subscription)
    {
        var enabledModules = subscription.Plan.ModuleEntitlements
            .Where(me => me.IsIncluded)
            .Select(me => me.Module.ToString())
            .ToList();

        var limits = subscription.Plan.Limits
            .ToDictionary(l => l.LimitType.ToString(), l => l.LimitValue);

        var addOns = subscription.AddOns
            .Select(a => new TenantAddOnDto
            {
                Id = a.Id,
                Module = a.Module.ToString(),
                MonthlyPrice = a.MonthlyPrice,
                ActivatedAt = a.ActivatedAt,
                DeactivatedAt = a.DeactivatedAt,
                IsActive = a.IsActive
            })
            .ToList();

        return new TenantSubscriptionDto
        {
            Id = subscription.Id,
            PlanId = subscription.PlanId,
            PlanCode = subscription.Plan.Code,
            PlanName = subscription.Plan.Name,
            PlanTier = subscription.Plan.Tier.ToString(),
            Status = subscription.Status.ToString(),
            BillingCycle = subscription.BillingCycle.ToString(),
            StartDate = subscription.StartDate,
            CurrentPeriodStart = subscription.CurrentPeriodStart,
            CurrentPeriodEnd = subscription.CurrentPeriodEnd,
            CancelledAt = subscription.CancelledAt,
            CancellationEffectiveDate = subscription.CancellationEffectiveDate,
            ExternalSubscriptionId = subscription.ExternalSubscriptionId,
            Notes = subscription.Notes,
            EnabledModules = enabledModules,
            Limits = limits,
            AddOns = addOns
        };
    }
}
