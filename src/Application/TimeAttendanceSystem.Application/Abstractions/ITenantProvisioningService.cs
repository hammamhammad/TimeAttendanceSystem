namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Orchestrates the creation and setup of dedicated databases for new tenants.
/// Each tenant gets a SystemAdmin user (tecaxleadmin@company.com) with a standard password.
/// </summary>
public interface ITenantProvisioningService
{
    /// <summary>
    /// Provisions a new dedicated database for the given tenant.
    /// Creates the database, applies migrations, seeds base data and tenant SystemAdmin user.
    /// </summary>
    Task<ProvisioningResult> ProvisionTenantAsync(long tenantId, CancellationToken ct = default);

    Task<bool> ApplyMigrationsAsync(long tenantId, CancellationToken ct = default);

    Task<bool> ValidateTenantDatabaseAsync(long tenantId, CancellationToken ct = default);
}

public record ProvisioningResult(
    bool Success,
    string? DatabaseName,
    string? ErrorMessage
);
