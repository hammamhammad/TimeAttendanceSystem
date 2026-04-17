using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Resolves company settings by applying the inheritance chain:
/// CompanySettings → BranchSettingsOverride → DepartmentSettingsOverride.
/// </summary>
public interface ICompanySettingsResolver
{
    Task<ResolvedSettingsDto> GetSettingsAsync(long? branchId = null, long? departmentId = null, CancellationToken ct = default);
    void InvalidateCache();
}
