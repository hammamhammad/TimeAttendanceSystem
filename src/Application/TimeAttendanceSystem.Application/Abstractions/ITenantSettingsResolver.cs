using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Resolves tenant settings by applying the inheritance chain:
/// TenantSettings → BranchSettingsOverride → DepartmentSettingsOverride.
/// Results are cached per tenant with 5-minute TTL.
/// </summary>
public interface ITenantSettingsResolver
{
    Task<ResolvedSettingsDto> GetSettingsAsync(long tenantId, long? branchId = null, long? departmentId = null, CancellationToken ct = default);
    void InvalidateCache(long tenantId);
}
