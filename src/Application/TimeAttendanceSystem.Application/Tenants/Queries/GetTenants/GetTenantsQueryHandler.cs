using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Tenants.Dtos;
using TecAxle.Hrms.Domain.Subscriptions;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Application.Tenants.Queries.GetTenants;

public class GetTenantsQueryHandler : BaseHandler<GetTenantsQuery, Result<PagedResult<TenantDto>>>
{
    private readonly IMasterDbContext _masterContext;

    public GetTenantsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser, IMasterDbContext masterContext)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
    }

    public override async Task<Result<PagedResult<TenantDto>>> Handle(GetTenantsQuery request, CancellationToken cancellationToken)
    {
        var query = _masterContext.Tenants.AsNoTracking().Where(t => !t.IsDeleted);

        // Apply search filter
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.ToLower();
            query = query.Where(t =>
                t.Name.ToLower().Contains(search) ||
                t.Subdomain.ToLower().Contains(search) ||
                (t.Email != null && t.Email.ToLower().Contains(search)));
        }

        // Apply status filter
        if (!string.IsNullOrWhiteSpace(request.Status) && Enum.TryParse<TenantStatus>(request.Status, true, out var status))
        {
            query = query.Where(t => t.Status == status);
        }

        // Apply isActive filter
        if (request.IsActive.HasValue)
        {
            query = query.Where(t => t.IsActive == request.IsActive.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        // Project to an intermediate anonymous type to avoid ToString() in SQL
        var rawTenants = await query
            .OrderByDescending(t => t.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(t => new
            {
                t.Id,
                t.Subdomain,
                t.Name,
                t.NameAr,
                t.LogoUrl,
                t.ApiBaseUrl,
                t.CustomDomain,
                t.IsActive,
                t.Status,
                t.Country,
                t.City,
                t.Industry,
                t.Phone,
                t.Email,
                t.DefaultTimezone,
                t.DefaultLanguage,
                t.DefaultCurrency,
                t.CreatedAtUtc,
                // Cross-tenant DB counts require connecting to each tenant's DB — not available in master context
                BranchCount = 0,
                EmployeeCount = 0,
                ActiveSubscription = _masterContext.TenantSubscriptions
                    .Where(s => s.TenantId == t.Id && (s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Trial))
                    .Select(s => new { s.Plan.Name, s.Status })
                    .FirstOrDefault()
            })
            .ToListAsync(cancellationToken);

        var tenants = rawTenants.Select(t => new TenantDto
        {
            Id = t.Id,
            Subdomain = t.Subdomain,
            Name = t.Name,
            NameAr = t.NameAr,
            LogoUrl = t.LogoUrl,
            ApiBaseUrl = t.ApiBaseUrl,
            CustomDomain = t.CustomDomain,
            IsActive = t.IsActive,
            Status = t.Status.ToString(),
            Country = t.Country,
            City = t.City,
            Industry = t.Industry,
            Phone = t.Phone,
            Email = t.Email,
            DefaultTimezone = t.DefaultTimezone,
            DefaultLanguage = t.DefaultLanguage,
            DefaultCurrency = t.DefaultCurrency,
            CreatedAtUtc = t.CreatedAtUtc,
            BranchCount = t.BranchCount,
            EmployeeCount = t.EmployeeCount,
            SubscriptionPlanName = t.ActiveSubscription?.Name,
            SubscriptionStatus = t.ActiveSubscription?.Status.ToString()
        }).ToList();

        return Result.Success(new PagedResult<TenantDto>(tenants, totalCount, request.Page, request.PageSize));
    }
}
