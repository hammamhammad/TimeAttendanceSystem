using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SurveyResponseConfiguration : IEntityTypeConfiguration<SurveyResponse>
{
    public void Configure(EntityTypeBuilder<SurveyResponse> builder)
    {
        builder.ToTable("SurveyResponses");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.ParticipantToken).HasMaxLength(100);
        builder.Property(x => x.ResponseText).HasMaxLength(4000);
        builder.Property(x => x.SelectedOptions).HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships - FK to Distribution and Question, NO FK to Employee (anonymous)
        builder.HasOne(x => x.Distribution)
            .WithMany(d => d.Responses)
            .HasForeignKey(x => x.SurveyDistributionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Question)
            .WithMany(q => q.Responses)
            .HasForeignKey(x => x.SurveyQuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.SurveyDistributionId).HasDatabaseName("IX_SurveyResponses_SurveyDistributionId");
        builder.HasIndex(x => x.SurveyQuestionId).HasDatabaseName("IX_SurveyResponses_SurveyQuestionId");
        builder.HasIndex(x => x.ParticipantToken).HasDatabaseName("IX_SurveyResponses_ParticipantToken");
        builder.HasIndex(x => new { x.SurveyDistributionId, x.ParticipantToken }).HasDatabaseName("IX_SurveyResponses_Distribution_Token");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
