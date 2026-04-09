using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Npgsql;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.MultiTenancy;

public class TenantProvisioningService : ITenantProvisioningService
{
    // Standard tenant admin — same username and password across all tenants.
    // Email is dynamic: tecaxleadmin@{company_domain}
    private const string TenantAdminUsername = "tecaxleadmin";
    private const string TenantAdminPassword = "TecAxle@Sys2026!";

    private readonly IApplicationDbContext _context;
    private readonly IConnectionStringEncryption _encryption;
    private readonly MultiTenancyOptions _options;
    private readonly ILogger<TenantProvisioningService> _logger;

    public TenantProvisioningService(
        IApplicationDbContext context,
        IConnectionStringEncryption encryption,
        IOptions<MultiTenancyOptions> options,
        ILogger<TenantProvisioningService> logger)
    {
        _context = context;
        _encryption = encryption;
        _options = options.Value;
        _logger = logger;
    }

    public async Task<ProvisioningResult> ProvisionTenantAsync(long tenantId, CancellationToken ct = default)
    {
        var tenant = await _context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId, ct);
        if (tenant == null)
            return new ProvisioningResult(false, null, $"Tenant {tenantId} not found.");

        // Derive DB name from company email domain (unique per tenant)
        // e.g., info@nadek.com → ta_nadek_com
        var domainForDb = !string.IsNullOrEmpty(tenant.Email) && tenant.Email.Contains('@')
            ? tenant.Email.Split('@')[1].ToLower()
            : tenant.Subdomain.ToLower();
        var baseName = "ta_" + Regex.Replace(domainForDb, @"[^a-z0-9]", "_");
        var databaseName = baseName;

        // Validate database name contains only safe characters
        if (!Regex.IsMatch(databaseName, @"^[a-z0-9_]+$"))
            return new ProvisioningResult(false, null, "Invalid database name generated.");

        try
        {
            var baseConnectionString = _options.DefaultTenantConnectionString
                ?? throw new InvalidOperationException("DefaultTenantConnectionString is required.");

            // 1. Create database (if name collides with orphaned DB, append suffix)
            var adminBuilder = new NpgsqlConnectionStringBuilder(baseConnectionString) { Database = "postgres" };
            await using (var adminConn = new NpgsqlConnection(adminBuilder.ConnectionString))
            {
                await adminConn.OpenAsync(ct);
                int suffix = 2;
                while (await DatabaseExistsAsync(adminConn, databaseName, ct))
                {
                    databaseName = $"{baseName}_{suffix}";
                    suffix++;
                }

                await using var createCmd = adminConn.CreateCommand();
                createCmd.CommandText = $"CREATE DATABASE \"{databaseName}\"";
                await createCmd.ExecuteNonQueryAsync(ct);
                _logger.LogInformation("Created database {DatabaseName}", databaseName);
            }

            tenant.DatabaseName = databaseName;

            var tenantConnectionString = new NpgsqlConnectionStringBuilder(baseConnectionString)
            {
                Database = databaseName
            }.ConnectionString;

            // 2. Apply migrations + seed
            var tenantOptions = new DbContextOptionsBuilder<Persistence.TecAxleDbContext>()
                .UseNpgsql(tenantConnectionString, npgsql => npgsql.MigrationsAssembly(typeof(Persistence.TecAxleDbContext).Assembly.FullName))
                .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning))
                .Options;

            await using (var tenantDb = new Persistence.TecAxleDbContext(tenantOptions))
            {
                await tenantDb.Database.MigrateAsync(ct);
                await Persistence.SeedData.SeedAsync(tenantDb);
                _logger.LogInformation("Migrated and seeded {DatabaseName}", databaseName);

                // 2b. Ensure a Tenant record exists in tenant DB (needed for FK on TenantSettings/SetupSteps)
                // Use the first existing tenant or create one — in per-tenant DB there's typically one
                var localTenant = await tenantDb.Tenants.IgnoreQueryFilters().FirstOrDefaultAsync(ct);
                if (localTenant == null)
                {
                    localTenant = new Domain.Tenants.Tenant
                    {
                        Subdomain = tenant.Subdomain,
                        Name = tenant.Name,
                        NameAr = tenant.NameAr,
                        Email = tenant.Email ?? "",
                        ApiBaseUrl = tenant.ApiBaseUrl ?? "",
                        IsActive = true,
                        Country = tenant.Country ?? "SA",
                        DefaultTimezone = tenant.DefaultTimezone ?? "Asia/Riyadh",
                        DefaultLanguage = tenant.DefaultLanguage ?? "en",
                        DefaultCurrency = tenant.DefaultCurrency ?? "SAR",
                        Status = Domain.Tenants.TenantStatus.Active,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    tenantDb.Tenants.Add(localTenant);
                    await tenantDb.SaveChangesAsync(ct);
                }
                var localTenantId = localTenant.Id;

                // 2c. Create TenantSettings + SetupSteps in tenant DB
                if (!await tenantDb.TenantSettings.AnyAsync(s => s.TenantId == localTenantId, ct))
                {
                    tenantDb.TenantSettings.Add(new Domain.Tenants.TenantSettings
                    {
                        TenantId = localTenantId,
                        CreatedBy = "SYSTEM"
                    });
                }
                if (!await tenantDb.SetupSteps.AnyAsync(s => s.TenantId == localTenantId, ct))
                {
                    var steps = new[]
                    {
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "company_info", Category = "Organization", IsRequired = true, SortOrder = 1, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "branches", Category = "Organization", IsRequired = true, SortOrder = 2, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "departments", Category = "Organization", IsRequired = true, SortOrder = 3, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "shifts", Category = "TimeAttendance", IsRequired = true, SortOrder = 4, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "vacation_types", Category = "Leave", IsRequired = true, SortOrder = 5, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "excuse_policies", Category = "Leave", IsRequired = false, SortOrder = 6, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "workflows", Category = "TimeAttendance", IsRequired = true, SortOrder = 7, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "employees", Category = "Organization", IsRequired = true, SortOrder = 8, CreatedBy = "SYSTEM" },
                        new Domain.Configuration.SetupStep { TenantId = localTenantId, StepKey = "payroll", Category = "Payroll", IsRequired = false, SortOrder = 9, CreatedBy = "SYSTEM" },
                    };
                    tenantDb.SetupSteps.AddRange(steps);
                }
                await tenantDb.SaveChangesAsync(ct);

                // 3. Create tenant SystemAdmin using company email domain
                // e.g., tenant email = info@nadek.com → admin = systemadmin@nadek.com
                var emailDomain = !string.IsNullOrEmpty(tenant.Email) && tenant.Email.Contains('@')
                    ? tenant.Email.Split('@')[1]
                    : $"{tenant.Subdomain}.clockn.net"; // fallback if no company email
                var tenantAdminEmail = $"tecaxleadmin@{emailDomain}";
                var existing = await tenantDb.Users.FirstOrDefaultAsync(u => u.Username == TenantAdminUsername, ct);
                if (existing != null)
                {
                    // Update email and password to match tenant provisioning credentials
                    var (existingHash, existingSalt) = HashPassword(TenantAdminPassword);
                    existing.Email = tenantAdminEmail;
                    existing.PasswordHash = existingHash;
                    existing.PasswordSalt = existingSalt;
                    existing.IsActive = true;
                    existing.IsSystemUser = true;
                    existing.ModifiedAtUtc = DateTime.UtcNow;
                    await tenantDb.SaveChangesAsync(ct);
                    _logger.LogInformation("Updated existing SystemAdmin email/password to {Email} in {DatabaseName}", tenantAdminEmail, databaseName);
                }
                else
                {
                    var (hash, salt) = HashPassword(TenantAdminPassword);
                    var adminUser = new Domain.Users.User
                    {
                        Username = TenantAdminUsername,
                        Email = tenantAdminEmail,
                        PasswordHash = hash,
                        PasswordSalt = salt,
                        IsActive = true,
                        IsSystemUser = true,
                        TwoFactorEnabled = false,
                        EmailConfirmed = true,
                        MustChangePassword = false,
                        PreferredLanguage = "en",
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = "SYSTEM"
                    };
                    tenantDb.Users.Add(adminUser);
                    await tenantDb.SaveChangesAsync(ct);

                    // Assign SystemAdmin role
                    var role = await tenantDb.Roles.FirstOrDefaultAsync(r => r.Name == "SystemAdmin", ct);
                    if (role != null)
                        tenantDb.UserRoles.Add(new Domain.Users.UserRole { UserId = adminUser.Id, RoleId = role.Id });

                    // Assign to all branches
                    var branchIds = await tenantDb.Branches.Where(b => !b.IsDeleted).Select(b => b.Id).ToListAsync(ct);
                    foreach (var bid in branchIds)
                        tenantDb.UserBranchScopes.Add(new Domain.Users.UserBranchScope { UserId = adminUser.Id, BranchId = bid });

                    await tenantDb.SaveChangesAsync(ct);
                    _logger.LogInformation("Created tenant SystemAdmin ({Email}) in {DatabaseName}", tenantAdminEmail, databaseName);
                }
            }

            // 4. Store encrypted connection string
            tenant.EncryptedConnectionString = _encryption.Encrypt(tenantConnectionString);
            tenant.DatabaseCreatedAt = DateTime.UtcNow;
            tenant.DatabaseMigrationVersion = "latest";
            tenant.ModifiedAtUtc = DateTime.UtcNow;

            // 5. Map tenant admin email in master TenantUserEmails
            var mappingDomain = !string.IsNullOrEmpty(tenant.Email) && tenant.Email.Contains('@')
                ? tenant.Email.Split('@')[1]
                : $"{tenant.Subdomain}.clockn.net";
            var tenantAdminEmailForMapping = $"tecaxleadmin@{mappingDomain}";
            var emailExists = await _context.TenantUserEmails.AnyAsync(
                tue => tue.Email == tenantAdminEmailForMapping && tue.TenantId == tenantId, ct);
            if (!emailExists)
            {
                _context.TenantUserEmails.Add(new Domain.Tenants.TenantUserEmail
                {
                    Email = tenantAdminEmailForMapping,
                    TenantId = tenantId,
                    IsPrimary = true,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "SYSTEM"
                });
            }

            await _context.SaveChangesAsync(ct);
            _logger.LogInformation("Provisioning complete: tenant {TenantId} → {DatabaseName}", tenantId, databaseName);
            return new ProvisioningResult(true, databaseName, null);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to provision tenant {TenantId}", tenantId);
            // Include inner exception details for actionable error messages
            var errorMessage = ex.InnerException != null
                ? $"{ex.Message} → {ex.InnerException.Message}"
                : ex.Message;
            return new ProvisioningResult(false, databaseName, errorMessage);
        }
    }

    public async Task<bool> ApplyMigrationsAsync(long tenantId, CancellationToken ct = default)
    {
        var tenant = await _context.Tenants.AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId && !t.IsDeleted, ct);
        if (tenant?.EncryptedConnectionString == null) return false;

        var connStr = _encryption.Decrypt(tenant.EncryptedConnectionString);
        var options = new DbContextOptionsBuilder<Persistence.TecAxleDbContext>()
            .UseNpgsql(connStr, n => n.MigrationsAssembly(typeof(Persistence.TecAxleDbContext).Assembly.FullName))
            .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning))
            .Options;
        await using var db = new Persistence.TecAxleDbContext(options);
        await db.Database.MigrateAsync(ct);
        return true;
    }

    public async Task<bool> ValidateTenantDatabaseAsync(long tenantId, CancellationToken ct = default)
    {
        var tenant = await _context.Tenants.AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId && !t.IsDeleted, ct);
        if (tenant?.EncryptedConnectionString == null) return false;
        try
        {
            var connStr = _encryption.Decrypt(tenant.EncryptedConnectionString);
            var options = new DbContextOptionsBuilder<Persistence.TecAxleDbContext>().UseNpgsql(connStr).Options;
            await using var db = new Persistence.TecAxleDbContext(options);
            return await db.Database.CanConnectAsync(ct);
        }
        catch { return false; }
    }

    private static async Task<bool> DatabaseExistsAsync(NpgsqlConnection conn, string dbName, CancellationToken ct)
    {
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = $"SELECT 1 FROM pg_database WHERE datname = '{dbName}'";
        return await cmd.ExecuteScalarAsync(ct) != null;
    }

    private static (string hash, string salt) HashPassword(string password)
    {
        var saltBytes = new byte[16];
        using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
        rng.GetBytes(saltBytes);
        var salt = Convert.ToBase64String(saltBytes);
        using var pbkdf2 = new System.Security.Cryptography.Rfc2898DeriveBytes(
            password, saltBytes, 10000, System.Security.Cryptography.HashAlgorithmName.SHA256);
        return (Convert.ToBase64String(pbkdf2.GetBytes(32)), salt);
    }
}
