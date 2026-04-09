namespace TecAxle.Hrms.Infrastructure.MultiTenancy;

/// <summary>
/// Configuration options for multi-tenancy database isolation.
/// </summary>
public class MultiTenancyOptions
{
    public const string SectionName = "MultiTenancy";

    /// <summary>
    /// The tenancy mode: SharedDatabase, Hybrid, or PerTenantDatabase.
    /// </summary>
    public TenancyMode Mode { get; set; } = TenancyMode.SharedDatabase;

    /// <summary>
    /// Connection string for the master (platform) database.
    /// If not set, falls back to the main PostgreSqlConnection.
    /// </summary>
    public string? MasterConnectionString { get; set; }

    /// <summary>
    /// Default connection string used as fallback for tenants without a dedicated database.
    /// In SharedDatabase and Hybrid modes, tenants without EncryptedConnectionString use this.
    /// </summary>
    public string? DefaultTenantConnectionString { get; set; }

    /// <summary>
    /// AES-256 encryption key for encrypting/decrypting tenant connection strings.
    /// Should be loaded from environment variable or key vault in production.
    /// </summary>
    public string? EncryptionKey { get; set; }
}

public enum TenancyMode
{
    /// <summary>
    /// All tenants share a single database (current behavior). No per-tenant DB resolution.
    /// </summary>
    SharedDatabase = 0,

    /// <summary>
    /// Tenants with EncryptedConnectionString use their own database.
    /// Tenants without it fall back to the shared/default database.
    /// </summary>
    Hybrid = 1,

    /// <summary>
    /// All tenants must have their own dedicated database.
    /// Requests for tenants without a connection string will fail.
    /// </summary>
    PerTenantDatabase = 2
}
