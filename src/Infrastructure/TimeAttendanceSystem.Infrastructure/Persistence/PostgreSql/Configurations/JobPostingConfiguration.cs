using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class JobPostingConfiguration : IEntityTypeConfiguration<JobPosting>
{
    public void Configure(EntityTypeBuilder<JobPosting> builder)
    {
        builder.ToTable("JobPostings");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.PostingTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.PostingTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.ExternalDescription)
            .HasMaxLength(4000);

        builder.Property(x => x.ExternalDescriptionAr)
            .HasMaxLength(4000);

        builder.Property(x => x.Responsibilities)
            .HasMaxLength(4000);

        builder.Property(x => x.ResponsibilitiesAr)
            .HasMaxLength(4000);

        builder.Property(x => x.Benefits)
            .HasMaxLength(2000);

        builder.Property(x => x.BenefitsAr)
            .HasMaxLength(2000);

        builder.Property(x => x.Location)
            .HasMaxLength(200);

        builder.Property(x => x.LocationAr)
            .HasMaxLength(200);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.JobRequisition)
            .WithMany(x => x.Postings)
            .HasForeignKey(x => x.JobRequisitionId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.JobRequisitionId).HasDatabaseName("IX_JobPostings_JobRequisitionId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_JobPostings_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
