using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class OnboardingProcessConfiguration : IEntityTypeConfiguration<OnboardingProcess>
{
    public void Configure(EntityTypeBuilder<OnboardingProcess> builder)
    {
        builder.ToTable("OnboardingProcesses");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.OnboardingTemplate)
            .WithMany()
            .HasForeignKey(x => x.OnboardingTemplateId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BuddyEmployee)
            .WithMany()
            .HasForeignKey(x => x.BuddyEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.MentorEmployee)
            .WithMany()
            .HasForeignKey(x => x.MentorEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_OnboardingProcesses_EmployeeId");
        builder.HasIndex(x => x.OnboardingTemplateId).HasDatabaseName("IX_OnboardingProcesses_TemplateId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_OnboardingProcesses_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
