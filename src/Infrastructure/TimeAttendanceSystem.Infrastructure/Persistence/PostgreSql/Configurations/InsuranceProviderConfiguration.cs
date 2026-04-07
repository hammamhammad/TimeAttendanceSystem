using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the InsuranceProvider entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class InsuranceProviderConfiguration : IEntityTypeConfiguration<InsuranceProvider>
{
    public void Configure(EntityTypeBuilder<InsuranceProvider> builder)
    {
        // Table mapping
        builder.ToTable("InsuranceProviders");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Insurance provider name");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Insurance provider name in Arabic");

        builder.Property(x => x.ContactPerson)
            .HasMaxLength(200)
            .HasComment("Contact person name");

        builder.Property(x => x.Phone)
            .HasMaxLength(20)
            .HasComment("Contact phone number");

        builder.Property(x => x.Email)
            .HasMaxLength(200)
            .HasComment("Contact email address");

        builder.Property(x => x.PolicyNumber)
            .HasMaxLength(100)
            .HasComment("Insurance policy number");

        builder.Property(x => x.InsuranceType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of insurance (Health, Life, Dental, etc.)");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this provider is active");

        // Relationships
        builder.HasMany(x => x.EmployeeInsurances)
            .WithOne(x => x.InsuranceProvider)
            .HasForeignKey(x => x.InsuranceProviderId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeInsurances_InsuranceProviders");

        // Indexes
        builder.HasIndex(x => x.InsuranceType)
            .HasDatabaseName("IX_InsuranceProviders_InsuranceType")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_InsuranceProviders_IsActive")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<InsuranceProvider> builder)
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
