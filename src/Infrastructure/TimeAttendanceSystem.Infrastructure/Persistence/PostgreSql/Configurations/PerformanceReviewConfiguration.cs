using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PerformanceReviewConfiguration : IEntityTypeConfiguration<PerformanceReview>
{
    public void Configure(EntityTypeBuilder<PerformanceReview> builder)
    {
        builder.ToTable("PerformanceReviews");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.SelfRating)
            .HasConversion<int>();

        builder.Property(x => x.ManagerRating)
            .HasConversion<int>();

        builder.Property(x => x.FinalRating)
            .HasConversion<int>();

        builder.Property(x => x.SelfAssessmentComments)
            .HasMaxLength(4000);

        builder.Property(x => x.ManagerComments)
            .HasMaxLength(4000);

        builder.Property(x => x.OverallComments)
            .HasMaxLength(4000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.ReviewCycle)
            .WithMany(x => x.Reviews)
            .HasForeignKey(x => x.PerformanceReviewCycleId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ReviewerEmployee)
            .WithMany()
            .HasForeignKey(x => x.ReviewerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.RelatedPromotion)
            .WithMany()
            .HasForeignKey(x => x.RelatedPromotionId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.RelatedSalaryAdjustment)
            .WithMany()
            .HasForeignKey(x => x.RelatedSalaryAdjustmentId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.PerformanceReviewCycleId).HasDatabaseName("IX_PerformanceReviews_CycleId");
        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_PerformanceReviews_EmployeeId");
        builder.HasIndex(x => x.ReviewerEmployeeId).HasDatabaseName("IX_PerformanceReviews_ReviewerEmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_PerformanceReviews_Status");
        builder.HasIndex(x => new { x.PerformanceReviewCycleId, x.EmployeeId }).IsUnique().HasDatabaseName("IX_PerformanceReviews_Cycle_Employee");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
