using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the EndOfServiceBenefit entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class EndOfServiceBenefitConfiguration : IEntityTypeConfiguration<EndOfServiceBenefit>
{
    public void Configure(EntityTypeBuilder<EndOfServiceBenefit> builder)
    {
        // Table mapping
        builder.ToTable("EndOfServiceBenefits");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.TerminationRecordId)
            .IsRequired()
            .HasComment("Termination record identifier");

        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.ServiceYears)
            .IsRequired()
            .HasComment("Total years of service");

        builder.Property(x => x.ServiceMonths)
            .IsRequired()
            .HasComment("Additional months of service beyond full years");

        builder.Property(x => x.ServiceDays)
            .IsRequired()
            .HasComment("Additional days of service beyond full months");

        builder.Property(x => x.BasicSalary)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Employee basic salary at time of termination");

        builder.Property(x => x.TotalAllowances)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total allowances at time of termination");

        builder.Property(x => x.CalculationBasis)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Salary basis used for EOS calculation");

        builder.Property(x => x.TotalAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total end of service benefit amount");

        builder.Property(x => x.DeductionAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Deductions from EOS benefit");

        builder.Property(x => x.NetAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Net EOS benefit after deductions");

        builder.Property(x => x.CalculationDetails)
            .HasComment("JSON details of the calculation breakdown");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        builder.Property(x => x.EndOfServicePolicyId)
            .HasComment("FK to the EOS policy used for this calculation");

        builder.Property(x => x.AppliedPolicySnapshotJson)
            .HasColumnType("jsonb")
            .HasComment("JSON snapshot of the policy + tiers at calculation time");

        builder.HasOne(x => x.EndOfServicePolicy)
            .WithMany()
            .HasForeignKey(x => x.EndOfServicePolicyId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Relationships
        builder.HasOne(x => x.TerminationRecord)
            .WithOne(x => x.EndOfServiceBenefit)
            .HasForeignKey<EndOfServiceBenefit>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_EndOfServiceBenefits_TerminationRecords");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EndOfServiceBenefits_Employees");

        // Indexes
        builder.HasIndex(x => x.TerminationRecordId)
            .IsUnique()
            .HasDatabaseName("IX_EndOfServiceBenefits_TerminationRecordId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EndOfServiceBenefits_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<EndOfServiceBenefit> builder)
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
