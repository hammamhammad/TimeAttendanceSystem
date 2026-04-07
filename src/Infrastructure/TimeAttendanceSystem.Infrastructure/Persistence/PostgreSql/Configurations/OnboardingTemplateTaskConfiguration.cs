using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class OnboardingTemplateTaskConfiguration : IEntityTypeConfiguration<OnboardingTemplateTask>
{
    public void Configure(EntityTypeBuilder<OnboardingTemplateTask> builder)
    {
        builder.ToTable("OnboardingTemplateTasks");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.TaskName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.TaskNameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.Category)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.OnboardingTemplate)
            .WithMany(x => x.Tasks)
            .HasForeignKey(x => x.OnboardingTemplateId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.OnboardingTemplateId).HasDatabaseName("IX_OnboardingTemplateTasks_TemplateId");
        builder.HasIndex(x => new { x.OnboardingTemplateId, x.DisplayOrder }).HasDatabaseName("IX_OnboardingTemplateTasks_Template_Order");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
