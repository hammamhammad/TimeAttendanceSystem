using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Resolves company settings by applying the inheritance chain:
/// TenantSettings → BranchSettingsOverride → DepartmentSettingsOverride.
/// </summary>
public interface ITenantSettingsResolver
{
    Task<ResolvedSettingsDto> GetSettingsAsync(long? branchId = null, long? departmentId = null, CancellationToken ct = default);
    void InvalidateCache();
}
