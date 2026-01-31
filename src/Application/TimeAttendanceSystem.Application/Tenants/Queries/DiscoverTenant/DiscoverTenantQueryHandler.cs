using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Tenants.Queries.DiscoverTenant;

/// <summary>
/// Handler for tenant discovery.
/// Finds tenant by subdomain or custom domain.
/// </summary>
public class DiscoverTenantQueryHandler : BaseHandler<DiscoverTenantQuery, Result<TenantDiscoveryResult>>
{
    public DiscoverTenantQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<TenantDiscoveryResult>> Handle(DiscoverTenantQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Domain))
        {
            return Result.Failure<TenantDiscoveryResult>("Domain is required");
        }

        var domain = request.Domain.ToLowerInvariant().Trim();

        // Extract subdomain if full domain is provided
        var subdomain = ExtractSubdomain(domain);

        // First, check by subdomain
        var tenant = await Context.Tenants
            .FirstOrDefaultAsync(t => 
                t.Subdomain.ToLower() == subdomain && t.IsActive, 
                cancellationToken);

        // If not found, check by custom domain
        if (tenant == null)
        {
            tenant = await Context.Tenants
                .FirstOrDefaultAsync(t => 
                    t.CustomDomain != null && 
                    t.CustomDomain.ToLower() == domain && 
                    t.IsActive, 
                    cancellationToken);
        }

        if (tenant == null)
        {
            return Result.Failure<TenantDiscoveryResult>("Tenant not found. Please check your company URL.");
        }

        return Result.Success(new TenantDiscoveryResult(
            TenantId: tenant.Id,
            Subdomain: tenant.Subdomain,
            Name: tenant.Name,
            NameAr: tenant.NameAr,
            LogoUrl: tenant.LogoUrl,
            ApiBaseUrl: tenant.ApiBaseUrl,
            IsActive: tenant.IsActive
        ));
    }

    private static string ExtractSubdomain(string domain)
    {
        // Remove protocol if present
        if (domain.StartsWith("http://"))
            domain = domain[7..];
        if (domain.StartsWith("https://"))
            domain = domain[8..];

        // Remove trailing slash
        domain = domain.TrimEnd('/');

        // Extract subdomain from full domain (e.g., "acme.timeattendance.com" -> "acme")
        var parts = domain.Split('.');
        if (parts.Length >= 3)
        {
            return parts[0];
        }

        // If only subdomain is provided
        return domain;
    }
}
