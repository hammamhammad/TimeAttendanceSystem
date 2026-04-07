using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SurveyTemplateConfiguration : IEntityTypeConfiguration<SurveyTemplate>
{
    public void Configure(EntityTypeBuilder<SurveyTemplate> builder)
    {
        builder.ToTable("SurveyTemplates");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).HasMaxLength(500).IsRequired();
        builder.Property(x => x.TitleAr).HasMaxLength(500);
        builder.Property(x => x.Description).HasMaxLength(2000);
        builder.Property(x => x.DescriptionAr).HasMaxLength(2000);
        builder.Property(x => x.SurveyType).HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Indexes
        builder.HasIndex(x => x.SurveyType).HasDatabaseName("IX_SurveyTemplates_SurveyType");
        builder.HasIndex(x => x.IsActive).HasDatabaseName("IX_SurveyTemplates_IsActive");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
