using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class JobRequisitionConfiguration : IEntityTypeConfiguration<JobRequisition>
{
    public void Configure(EntityTypeBuilder<JobRequisition> builder)
    {
        builder.ToTable("JobRequisitions");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.RequisitionNumber)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.JobTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.JobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(4000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(4000);

        builder.Property(x => x.EmploymentType)
            .HasConversion<int>();

        builder.Property(x => x.Priority)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.BudgetedSalaryMin)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.BudgetedSalaryMax)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10);

        builder.Property(x => x.RequiredSkills)
            .HasMaxLength(2000);

        builder.Property(x => x.RequiredQualifications)
            .HasMaxLength(2000);

        builder.Property(x => x.RequiredQualificationsAr)
            .HasMaxLength(2000);

        builder.Property(x => x.Justification)
            .HasMaxLength(2000);

        builder.Property(x => x.JustificationAr)
            .HasMaxLength(2000);

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Department)
            .WithMany()
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.JobGrade)
            .WithMany()
            .HasForeignKey(x => x.JobGradeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.ReplacingEmployee)
            .WithMany()
            .HasForeignKey(x => x.ReplacingEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.RequestedByEmployee)
            .WithMany()
            .HasForeignKey(x => x.RequestedByEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_JobRequisitions_BranchId");
        builder.HasIndex(x => x.DepartmentId).HasDatabaseName("IX_JobRequisitions_DepartmentId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_JobRequisitions_Status");
        builder.HasIndex(x => x.RequisitionNumber).IsUnique().HasDatabaseName("IX_JobRequisitions_RequisitionNumber");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
