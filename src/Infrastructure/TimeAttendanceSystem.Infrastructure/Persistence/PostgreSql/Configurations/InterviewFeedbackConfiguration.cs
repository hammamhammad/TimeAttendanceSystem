using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class InterviewFeedbackConfiguration : IEntityTypeConfiguration<InterviewFeedback>
{
    public void Configure(EntityTypeBuilder<InterviewFeedback> builder)
    {
        builder.ToTable("InterviewFeedbacks");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Recommendation)
            .HasConversion<int>();

        builder.Property(x => x.Strengths)
            .HasMaxLength(2000);

        builder.Property(x => x.Weaknesses)
            .HasMaxLength(2000);

        builder.Property(x => x.Comments)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.InterviewSchedule)
            .WithOne(x => x.Feedback)
            .HasForeignKey<InterviewFeedback>(x => x.InterviewScheduleId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.InterviewerEmployee)
            .WithMany()
            .HasForeignKey(x => x.InterviewerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.InterviewScheduleId).IsUnique().HasDatabaseName("IX_InterviewFeedbacks_InterviewScheduleId");
        builder.HasIndex(x => x.InterviewerEmployeeId).HasDatabaseName("IX_InterviewFeedbacks_InterviewerEmployeeId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
