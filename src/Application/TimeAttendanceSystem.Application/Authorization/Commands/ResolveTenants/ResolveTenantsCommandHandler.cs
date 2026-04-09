using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.ResolveTenants;

/// <summary>
/// Handles email-based tenant resolution by querying the master database's TenantUserEmail table.
/// Returns the list of tenants associated with the given email address.
/// </summary>
public class ResolveTenantsCommandHandler : IRequestHandler<ResolveTenantsCommand, Result<ResolveTenantsResponse>>
{
    private readonly IMasterDbContext _masterContext;

    public ResolveTenantsCommandHandler(IMasterDbContext masterContext)
    {
        _masterContext = masterContext;
    }

    public async Task<Result<ResolveTenantsResponse>> Handle(ResolveTenantsCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var tenantMappings = await _masterContext.TenantUserEmails
            .AsNoTracking()
            .Where(tue => tue.Email == normalizedEmail)
            .Include(tue => tue.Tenant)
            .Where(tue => tue.Tenant.IsActive && !tue.Tenant.IsDeleted)
            .Select(tue => new TenantOption(
                tue.TenantId,
                tue.Tenant.Name,
                tue.Tenant.NameAr,
                tue.Tenant.LogoUrl
            ))
            .ToListAsync(cancellationToken);

        if (tenantMappings.Count == 0)
        {
            // Don't reveal that the email doesn't exist
            return Result.Failure<ResolveTenantsResponse>("Invalid credentials.");
        }

        var response = new ResolveTenantsResponse(
            RequiresTenantSelection: tenantMappings.Count > 1,
            Tenants: tenantMappings
        );

        return Result.Success(response);
    }
}
