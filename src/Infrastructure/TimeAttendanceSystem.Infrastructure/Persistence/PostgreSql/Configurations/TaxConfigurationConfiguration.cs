using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the TaxConfiguration entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class TaxConfigurationConfiguration : IEntityTypeConfiguration<TaxConfiguration>
{
    public void Configure(EntityTypeBuilder<TaxConfiguration> builder)
    {
        // Table mapping
        builder.ToTable("TaxConfigurations");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Tax configuration name");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Tax configuration name in Arabic");

        builder.Property(x => x.EffectiveDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Date when this tax configuration becomes effective");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this tax configuration is active");

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false)
            .HasConstraintName("FK_TaxConfigurations_Branches");

        builder.HasMany(x => x.Brackets)
            .WithOne(x => x.TaxConfiguration)
            .HasForeignKey(x => x.TaxConfigurationId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_TaxBrackets_TaxConfigurations");

        // Indexes
        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_TaxConfigurations_BranchId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_TaxConfigurations_IsActive")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<TaxConfiguration> builder)
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
