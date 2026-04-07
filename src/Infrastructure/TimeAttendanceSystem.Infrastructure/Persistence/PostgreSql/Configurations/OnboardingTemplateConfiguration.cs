using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class OnboardingTemplateConfiguration : IEntityTypeConfiguration<OnboardingTemplate>
{
    public void Configure(EntityTypeBuilder<OnboardingTemplate> builder)
    {
        builder.ToTable("OnboardingTemplates");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Department)
            .WithMany()
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_OnboardingTemplates_BranchId");
        builder.HasIndex(x => x.DepartmentId).HasDatabaseName("IX_OnboardingTemplates_DepartmentId");
        builder.HasIndex(x => x.IsActive).HasDatabaseName("IX_OnboardingTemplates_IsActive");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
