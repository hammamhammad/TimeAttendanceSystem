using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SalaryAdjustmentConfiguration : IEntityTypeConfiguration<SalaryAdjustment>
{
    public void Configure(EntityTypeBuilder<SalaryAdjustment> builder)
    {
        builder.ToTable("SalaryAdjustments");

        builder.HasKey(x => x.Id);

        // Salary fields
        builder.Property(x => x.CurrentBaseSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.CurrentTotalPackage)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.NewBaseSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.AdjustmentAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.PercentageChange)
            .HasColumnType("decimal(8,4)");

        // ComponentAdjustments is JSON - no max length

        // Enum conversions
        builder.Property(x => x.AdjustmentType)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        // String properties
        builder.Property(x => x.Reason)
            .HasMaxLength(1000);

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(1000);

        builder.Property(x => x.Justification)
            .HasMaxLength(2000);

        builder.Property(x => x.DocumentUrl)
            .HasMaxLength(500);

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(500);

        // Audit fields
        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany(x => x.SalaryAdjustments)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.RelatedPromotion)
            .WithMany()
            .HasForeignKey(x => x.RelatedPromotionId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.RelatedContract)
            .WithMany()
            .HasForeignKey(x => x.RelatedContractId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.RelatedTransfer)
            .WithMany()
            .HasForeignKey(x => x.RelatedTransferId)
            .OnDelete(DeleteBehavior.SetNull);

        // Workflow relationship (optional)
        builder.Property(x => x.WorkflowInstanceId)
            .IsRequired(false);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_SalaryAdjustments_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_SalaryAdjustments_Status");

        builder.HasIndex(x => x.EffectiveDate)
            .HasDatabaseName("IX_SalaryAdjustments_EffectiveDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
