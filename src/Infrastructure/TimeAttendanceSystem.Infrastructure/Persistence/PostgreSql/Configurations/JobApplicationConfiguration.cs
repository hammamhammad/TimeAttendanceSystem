using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class JobApplicationConfiguration : IEntityTypeConfiguration<JobApplication>
{
    public void Configure(EntityTypeBuilder<JobApplication> builder)
    {
        builder.ToTable("JobApplications");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.CoverLetterUrl)
            .HasMaxLength(500);

        builder.Property(x => x.ScreeningNotes)
            .HasMaxLength(2000);

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(500);

        builder.Property(x => x.RejectionReasonAr)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Candidate)
            .WithMany(x => x.Applications)
            .HasForeignKey(x => x.CandidateId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.JobPosting)
            .WithMany(x => x.Applications)
            .HasForeignKey(x => x.JobPostingId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.CandidateId).HasDatabaseName("IX_JobApplications_CandidateId");
        builder.HasIndex(x => x.JobPostingId).HasDatabaseName("IX_JobApplications_JobPostingId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_JobApplications_Status");
        builder.HasIndex(x => new { x.CandidateId, x.JobPostingId }).IsUnique().HasDatabaseName("IX_JobApplications_Candidate_Posting");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
