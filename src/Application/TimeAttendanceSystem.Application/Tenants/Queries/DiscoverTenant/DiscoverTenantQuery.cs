using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Tenants.Queries.DiscoverTenant;

/// <summary>
/// Query to discover tenant configuration by subdomain or custom domain.
/// Used by mobile app for initial tenant discovery.
/// </summary>
public record DiscoverTenantQuery(string Domain) : IRequest<Result<TenantDiscoveryResult>>;

public record TenantDiscoveryResult(
    long TenantId,
    string Subdomain,
    string Name,
    string? NameAr,
    string? LogoUrl,
    string ApiBaseUrl,
    bool IsActive
);
