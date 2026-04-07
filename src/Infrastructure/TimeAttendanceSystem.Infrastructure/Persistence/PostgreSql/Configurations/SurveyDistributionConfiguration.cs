using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SurveyDistributionConfiguration : IEntityTypeConfiguration<SurveyDistribution>
{
    public void Configure(EntityTypeBuilder<SurveyDistribution> builder)
    {
        builder.ToTable("SurveyDistributions");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).HasMaxLength(500).IsRequired();
        builder.Property(x => x.TitleAr).HasMaxLength(500);
        builder.Property(x => x.TargetAudience).HasConversion<int>();
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.TargetIds).HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Template)
            .WithMany(t => t.Distributions)
            .HasForeignKey(x => x.SurveyTemplateId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.SurveyTemplateId).HasDatabaseName("IX_SurveyDistributions_SurveyTemplateId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_SurveyDistributions_Status");
        builder.HasIndex(x => new { x.Status, x.StartDate }).HasDatabaseName("IX_SurveyDistributions_Status_StartDate");
        builder.HasIndex(x => new { x.Status, x.EndDate }).HasDatabaseName("IX_SurveyDistributions_Status_EndDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
