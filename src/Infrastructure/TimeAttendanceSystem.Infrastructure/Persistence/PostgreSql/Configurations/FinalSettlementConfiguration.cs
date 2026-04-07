using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the FinalSettlement entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class FinalSettlementConfiguration : IEntityTypeConfiguration<FinalSettlement>
{
    public void Configure(EntityTypeBuilder<FinalSettlement> builder)
    {
        // Table mapping
        builder.ToTable("FinalSettlements");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.TerminationRecordId)
            .IsRequired()
            .HasComment("Termination record identifier");

        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.BasicSalaryDue)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Basic salary due for remaining period");

        builder.Property(x => x.AllowancesDue)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Allowances due for remaining period");

        builder.Property(x => x.LeaveEncashmentAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Leave encashment amount");

        builder.Property(x => x.LeaveEncashmentDays)
            .IsRequired()
            .HasComment("Number of leave days encashed");

        builder.Property(x => x.EndOfServiceAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("End of service benefit amount");

        builder.Property(x => x.OvertimeDue)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Overtime pay due");

        builder.Property(x => x.LoanOutstanding)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Outstanding loan balance to deduct");

        builder.Property(x => x.AdvanceOutstanding)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Outstanding advance balance to deduct");

        builder.Property(x => x.OtherDeductions)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Other deductions");

        builder.Property(x => x.OtherAdditions)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Other additions");

        builder.Property(x => x.GrossSettlement)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Gross settlement amount before deductions");

        builder.Property(x => x.TotalDeductions)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total deductions from settlement");

        builder.Property(x => x.NetSettlement)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Net settlement amount to pay");

        builder.Property(x => x.Status)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Settlement status (Draft, Pending, Approved, Paid)");

        builder.Property(x => x.ApprovedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When the settlement was approved");

        builder.Property(x => x.PaidAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When the settlement was paid");

        builder.Property(x => x.CalculationDetails)
            .HasComment("JSON details of the calculation breakdown");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        // Workflow integration
        builder.Property(x => x.WorkflowInstanceId)
            .IsRequired(false)
            .HasComment("Workflow instance ID for approval tracking");

        // Relationships
        builder.HasOne(x => x.TerminationRecord)
            .WithOne(x => x.FinalSettlement)
            .HasForeignKey<FinalSettlement>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_FinalSettlements_TerminationRecords");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_FinalSettlements_Employees");

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .HasConstraintName("FK_FinalSettlements_WorkflowInstances");

        // Indexes
        builder.HasIndex(x => x.TerminationRecordId)
            .IsUnique()
            .HasDatabaseName("IX_FinalSettlements_TerminationRecordId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_FinalSettlements_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_FinalSettlements_Status")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<FinalSettlement> builder)
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
