using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Tenants;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the Tenant entity.
/// Defines database mapping, constraints, and indexes for multi-tenant SaaS support.
/// </summary>
public class TenantConfiguration : IEntityTypeConfiguration<Tenant>
{
    public void Configure(EntityTypeBuilder<Tenant> builder)
    {
        // Table mapping
        builder.ToTable("Tenants");

        // Primary key
        builder.HasKey(t => t.Id);

        // Properties configuration
        builder.Property(t => t.Subdomain)
            .IsRequired()
            .HasMaxLength(100)
            .HasComment("Subdomain identifier for tenant (e.g., acme)");

        builder.Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Display name of the tenant organization");

        builder.Property(t => t.NameAr)
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Arabic display name of the tenant organization");

        builder.Property(t => t.LogoUrl)
            .HasMaxLength(500)
            .HasComment("URL to tenant's logo image");

        builder.Property(t => t.ApiBaseUrl)
            .IsRequired()
            .HasMaxLength(500)
            .HasComment("Base URL for tenant's API endpoint");

        builder.Property(t => t.CustomDomain)
            .HasMaxLength(200)
            .HasComment("Optional custom domain for enterprise tenants");

        builder.Property(t => t.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether tenant account is active");

        builder.Property(t => t.DatabaseIdentifier)
            .HasMaxLength(200)
            .HasComment("Database connection identifier for tenant isolation");

        // Indexes
        builder.HasIndex(t => t.Subdomain)
            .IsUnique()
            .HasDatabaseName("IX_Tenants_Subdomain")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(t => t.CustomDomain)
            .IsUnique()
            .HasDatabaseName("IX_Tenants_CustomDomain")
            .HasFilter("\"IsDeleted\" = false AND \"CustomDomain\" IS NOT NULL");

        builder.HasIndex(t => t.IsActive)
            .HasDatabaseName("IX_Tenants_IsActive")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        // Query filter for soft delete
        builder.HasQueryFilter(t => !t.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<Tenant> builder)
    {
        builder.Property(e => e.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()")
            .HasComment("UTC timestamp when record was created");

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(100)
            .HasComment("User who created the record");

        builder.Property(e => e.ModifiedAtUtc)
            .HasComment("UTC timestamp when record was last modified");

        builder.Property(e => e.ModifiedBy)
            .HasMaxLength(100)
            .HasComment("User who last modified the record");

        builder.Property(e => e.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Soft delete flag");

        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 })
            .HasComment("Concurrency control timestamp");
    }
}
