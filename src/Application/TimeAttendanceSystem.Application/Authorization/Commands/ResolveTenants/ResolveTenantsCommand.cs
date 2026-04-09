using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.ResolveTenants;

/// <summary>
/// Given a user's email, resolves which tenant(s) the user belongs to.
/// Used during login to determine which tenant database to authenticate against.
/// </summary>
public record ResolveTenantsCommand(string Email) : IRequest<Result<ResolveTenantsResponse>>;

public record ResolveTenantsResponse(
    bool RequiresTenantSelection,
    List<TenantOption> Tenants
);

public record TenantOption(
    long TenantId,
    string Name,
    string? NameAr,
    string? LogoUrl
);
