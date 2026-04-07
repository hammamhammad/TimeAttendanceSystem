using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the PayrollAdjustment entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class PayrollAdjustmentConfiguration : IEntityTypeConfiguration<PayrollAdjustment>
{
    public void Configure(EntityTypeBuilder<PayrollAdjustment> builder)
    {
        // Table mapping
        builder.ToTable("PayrollAdjustments");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.PayrollPeriodId)
            .IsRequired()
            .HasComment("Payroll period identifier");

        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.AdjustmentType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of payroll adjustment");

        builder.Property(x => x.Description)
            .IsRequired()
            .HasMaxLength(500)
            .HasComment("Adjustment description");

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(500)
            .HasComment("Adjustment description in Arabic");

        builder.Property(x => x.Amount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Adjustment amount");

        builder.Property(x => x.IsRecurring)
            .IsRequired()
            .HasComment("Whether this adjustment recurs");

        builder.Property(x => x.RecurringMonths)
            .HasComment("Number of months for recurring adjustment");

        builder.Property(x => x.Reason)
            .HasMaxLength(500)
            .HasComment("Reason for the adjustment");

        builder.Property(x => x.ApprovedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When the adjustment was approved");

        // Relationships
        builder.HasOne(x => x.PayrollPeriod)
            .WithMany(x => x.Adjustments)
            .HasForeignKey(x => x.PayrollPeriodId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PayrollAdjustments_PayrollPeriods");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_PayrollAdjustments_Employees");

        // Indexes
        builder.HasIndex(x => x.PayrollPeriodId)
            .HasDatabaseName("IX_PayrollAdjustments_PayrollPeriodId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_PayrollAdjustments_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.AdjustmentType)
            .HasDatabaseName("IX_PayrollAdjustments_AdjustmentType")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<PayrollAdjustment> builder)
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
