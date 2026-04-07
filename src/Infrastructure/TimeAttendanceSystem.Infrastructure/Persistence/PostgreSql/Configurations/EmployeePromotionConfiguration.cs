using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeePromotionConfiguration : IEntityTypeConfiguration<EmployeePromotion>
{
    public void Configure(EntityTypeBuilder<EmployeePromotion> builder)
    {
        builder.ToTable("EmployeePromotions");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.OldJobTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NewJobTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.OldJobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.NewJobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.OldGrade)
            .HasMaxLength(50);

        builder.Property(x => x.NewGrade)
            .HasMaxLength(50);

        builder.Property(x => x.OldBaseSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.NewBaseSalary)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Reason)
            .HasMaxLength(1000);

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(1000);

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        builder.Property(x => x.Status)
            .HasConversion<int>();

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
            .WithMany(x => x.Promotions)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.OldDepartment)
            .WithMany()
            .HasForeignKey(x => x.OldDepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.NewDepartment)
            .WithMany()
            .HasForeignKey(x => x.NewDepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Workflow relationship (optional)
        builder.Property(x => x.WorkflowInstanceId)
            .IsRequired(false);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeePromotions_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_EmployeePromotions_Status");

        builder.HasIndex(x => x.EffectiveDate)
            .HasDatabaseName("IX_EmployeePromotions_EffectiveDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
