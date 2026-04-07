using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the SocialInsuranceConfig entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class SocialInsuranceConfigConfiguration : IEntityTypeConfiguration<SocialInsuranceConfig>
{
    public void Configure(EntityTypeBuilder<SocialInsuranceConfig> builder)
    {
        // Table mapping
        builder.ToTable("SocialInsuranceConfigs");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Social insurance configuration name");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Name in Arabic");

        builder.Property(x => x.EmployeeContributionRate)
            .IsRequired()
            .HasColumnType("decimal(8,4)")
            .HasComment("Employee contribution rate (e.g., 0.0975 for 9.75%)");

        builder.Property(x => x.EmployerContributionRate)
            .IsRequired()
            .HasColumnType("decimal(8,4)")
            .HasComment("Employer contribution rate (e.g., 0.1175 for 11.75%)");

        builder.Property(x => x.MaxInsurableSalary)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Maximum salary subject to social insurance");

        builder.Property(x => x.EffectiveDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Date when this configuration becomes effective");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this configuration is active");

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false)
            .HasConstraintName("FK_SocialInsuranceConfigs_Branches");

        // Indexes
        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_SocialInsuranceConfigs_BranchId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_SocialInsuranceConfigs_IsActive")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<SocialInsuranceConfig> builder)
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
