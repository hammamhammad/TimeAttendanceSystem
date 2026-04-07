using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the EmployeeInsurance entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class EmployeeInsuranceConfiguration : IEntityTypeConfiguration<EmployeeInsurance>
{
    public void Configure(EntityTypeBuilder<EmployeeInsurance> builder)
    {
        // Table mapping
        builder.ToTable("EmployeeInsurances");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.InsuranceProviderId)
            .IsRequired()
            .HasComment("Insurance provider identifier");

        builder.Property(x => x.MembershipNumber)
            .HasMaxLength(100)
            .HasComment("Insurance membership number");

        builder.Property(x => x.InsuranceClass)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Insurance class/tier");

        builder.Property(x => x.StartDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Insurance coverage start date");

        builder.Property(x => x.EndDate)
            .HasColumnType("timestamp with time zone")
            .HasComment("Insurance coverage end date (null = ongoing)");

        builder.Property(x => x.MonthlyPremium)
            .HasColumnType("decimal(18,2)")
            .HasComment("Monthly premium amount");

        builder.Property(x => x.EmployeeContribution)
            .HasColumnType("decimal(18,2)")
            .HasComment("Employee contribution amount");

        builder.Property(x => x.EmployerContribution)
            .HasColumnType("decimal(18,2)")
            .HasComment("Employer contribution amount");

        builder.Property(x => x.IncludesDependents)
            .IsRequired()
            .HasComment("Whether coverage includes dependents");

        builder.Property(x => x.CoveredDependentsCount)
            .HasComment("Number of covered dependents");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this insurance is active");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeInsurances_Employees");

        builder.HasOne(x => x.InsuranceProvider)
            .WithMany(x => x.EmployeeInsurances)
            .HasForeignKey(x => x.InsuranceProviderId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeInsurances_InsuranceProviders");

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeInsurances_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.InsuranceProviderId)
            .HasDatabaseName("IX_EmployeeInsurances_InsuranceProviderId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_EmployeeInsurances_IsActive")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<EmployeeInsurance> builder)
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
