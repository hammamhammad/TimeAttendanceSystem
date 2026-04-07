using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SurveyQuestionConfiguration : IEntityTypeConfiguration<SurveyQuestion>
{
    public void Configure(EntityTypeBuilder<SurveyQuestion> builder)
    {
        builder.ToTable("SurveyQuestions");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.QuestionText).HasMaxLength(2000).IsRequired();
        builder.Property(x => x.QuestionTextAr).HasMaxLength(2000);
        builder.Property(x => x.QuestionType).HasConversion<int>();
        builder.Property(x => x.SectionName).HasMaxLength(500);
        builder.Property(x => x.SectionNameAr).HasMaxLength(500);
        builder.Property(x => x.OptionsJson).HasMaxLength(4000);
        builder.Property(x => x.MinLabel).HasMaxLength(200);
        builder.Property(x => x.MaxLabel).HasMaxLength(200);
        builder.Property(x => x.MinLabelAr).HasMaxLength(200);
        builder.Property(x => x.MaxLabelAr).HasMaxLength(200);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Template)
            .WithMany(t => t.Questions)
            .HasForeignKey(x => x.SurveyTemplateId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.SurveyTemplateId).HasDatabaseName("IX_SurveyQuestions_SurveyTemplateId");
        builder.HasIndex(x => new { x.SurveyTemplateId, x.DisplayOrder }).HasDatabaseName("IX_SurveyQuestions_Template_Order");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
