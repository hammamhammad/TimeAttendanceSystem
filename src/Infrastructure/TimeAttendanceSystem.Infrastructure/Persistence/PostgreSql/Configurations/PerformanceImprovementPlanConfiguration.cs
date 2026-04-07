using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PerformanceImprovementPlanConfiguration : IEntityTypeConfiguration<PerformanceImprovementPlan>
{
    public void Configure(EntityTypeBuilder<PerformanceImprovementPlan> builder)
    {
        builder.ToTable("PerformanceImprovementPlans");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Reason)
            .HasMaxLength(2000);

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(2000);

        builder.Property(x => x.Goals)
            .HasMaxLength(4000);

        builder.Property(x => x.Milestones)
            .HasMaxLength(4000);

        builder.Property(x => x.OutcomeNotes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ManagerEmployee)
            .WithMany()
            .HasForeignKey(x => x.ManagerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.PerformanceReview)
            .WithMany()
            .HasForeignKey(x => x.PerformanceReviewId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_PerformanceImprovementPlans_EmployeeId");
        builder.HasIndex(x => x.ManagerEmployeeId).HasDatabaseName("IX_PerformanceImprovementPlans_ManagerId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_PerformanceImprovementPlans_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
