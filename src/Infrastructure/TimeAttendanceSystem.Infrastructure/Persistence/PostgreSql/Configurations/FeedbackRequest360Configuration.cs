using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class FeedbackRequest360Configuration : IEntityTypeConfiguration<FeedbackRequest360>
{
    public void Configure(EntityTypeBuilder<FeedbackRequest360> builder)
    {
        builder.ToTable("FeedbackRequests360");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.PerformanceReview)
            .WithMany(x => x.FeedbackRequests)
            .HasForeignKey(x => x.PerformanceReviewId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.RequestedFromEmployee)
            .WithMany()
            .HasForeignKey(x => x.RequestedFromEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.PerformanceReviewId).HasDatabaseName("IX_FeedbackRequests360_ReviewId");
        builder.HasIndex(x => x.RequestedFromEmployeeId).HasDatabaseName("IX_FeedbackRequests360_RequestedFromId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_FeedbackRequests360_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
