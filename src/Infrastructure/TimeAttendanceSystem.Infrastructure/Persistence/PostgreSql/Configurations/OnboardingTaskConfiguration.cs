using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class OnboardingTaskConfiguration : IEntityTypeConfiguration<OnboardingTask>
{
    public void Configure(EntityTypeBuilder<OnboardingTask> builder)
    {
        builder.ToTable("OnboardingTasks");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.TaskName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.TaskNameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.Category)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.OnboardingProcess)
            .WithMany(x => x.Tasks)
            .HasForeignKey(x => x.OnboardingProcessId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.TemplateTask)
            .WithMany()
            .HasForeignKey(x => x.OnboardingTemplateTaskId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.AssignedToEmployee)
            .WithMany()
            .HasForeignKey(x => x.AssignedToEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.OnboardingProcessId).HasDatabaseName("IX_OnboardingTasks_ProcessId");
        builder.HasIndex(x => x.AssignedToEmployeeId).HasDatabaseName("IX_OnboardingTasks_AssignedToEmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_OnboardingTasks_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
