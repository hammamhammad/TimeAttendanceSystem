using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the PayrollPeriod entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class PayrollPeriodConfiguration : IEntityTypeConfiguration<PayrollPeriod>
{
    public void Configure(EntityTypeBuilder<PayrollPeriod> builder)
    {
        // Table mapping
        builder.ToTable("PayrollPeriods");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.BranchId)
            .IsRequired()
            .HasComment("Branch identifier");

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Payroll period name");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Payroll period name in Arabic");

        builder.Property(x => x.PeriodType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Payroll period type (Monthly, Bi-Weekly, etc.)");

        builder.Property(x => x.StartDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Period start date");

        builder.Property(x => x.EndDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Period end date");

        builder.Property(x => x.Status)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Payroll period status (Draft, Processing, etc.)");

        builder.Property(x => x.TotalGross)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total gross earnings for the period");

        builder.Property(x => x.TotalDeductions)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total deductions for the period");

        builder.Property(x => x.TotalNet)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total net salary for the period");

        builder.Property(x => x.EmployeeCount)
            .IsRequired()
            .HasComment("Number of employees in this payroll period");

        builder.Property(x => x.ProcessedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When the payroll was processed");

        builder.Property(x => x.ApprovedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When the payroll was approved");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        // Workflow integration
        builder.Property(x => x.WorkflowInstanceId)
            .IsRequired(false)
            .HasComment("Workflow instance ID for approval tracking");

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_PayrollPeriods_Branches");

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .HasConstraintName("FK_PayrollPeriods_WorkflowInstances");

        builder.HasMany(x => x.Records)
            .WithOne(x => x.PayrollPeriod)
            .HasForeignKey(x => x.PayrollPeriodId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PayrollRecords_PayrollPeriods");

        builder.HasMany(x => x.Adjustments)
            .WithOne(x => x.PayrollPeriod)
            .HasForeignKey(x => x.PayrollPeriodId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PayrollAdjustments_PayrollPeriods");

        builder.HasMany(x => x.BankTransferFiles)
            .WithOne(x => x.PayrollPeriod)
            .HasForeignKey(x => x.PayrollPeriodId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_BankTransferFiles_PayrollPeriods");

        // Indexes
        builder.HasIndex(x => new { x.BranchId, x.StartDate, x.EndDate })
            .HasDatabaseName("IX_PayrollPeriods_BranchId_StartDate_EndDate")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_PayrollPeriods_Status")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_PayrollPeriods_BranchId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<PayrollPeriod> builder)
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
