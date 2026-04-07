using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class CompetencyAssessmentConfiguration : IEntityTypeConfiguration<CompetencyAssessment>
{
    public void Configure(EntityTypeBuilder<CompetencyAssessment> builder)
    {
        builder.ToTable("CompetencyAssessments");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.SelfRating)
            .HasConversion<int>();

        builder.Property(x => x.ManagerRating)
            .HasConversion<int>();

        builder.Property(x => x.FinalRating)
            .HasConversion<int>();

        builder.Property(x => x.SelfComments)
            .HasMaxLength(2000);

        builder.Property(x => x.ManagerComments)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.PerformanceReview)
            .WithMany(x => x.CompetencyAssessments)
            .HasForeignKey(x => x.PerformanceReviewId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Competency)
            .WithMany()
            .HasForeignKey(x => x.CompetencyId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.PerformanceReviewId).HasDatabaseName("IX_CompetencyAssessments_ReviewId");
        builder.HasIndex(x => x.CompetencyId).HasDatabaseName("IX_CompetencyAssessments_CompetencyId");
        builder.HasIndex(x => new { x.PerformanceReviewId, x.CompetencyId }).IsUnique().HasDatabaseName("IX_CompetencyAssessments_Review_Competency");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
