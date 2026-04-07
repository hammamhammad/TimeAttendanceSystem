using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class GoalDefinitionConfiguration : IEntityTypeConfiguration<GoalDefinition>
{
    public void Configure(EntityTypeBuilder<GoalDefinition> builder)
    {
        builder.ToTable("GoalDefinitions");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.TitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.GoalType)
            .HasConversion<int>();

        builder.Property(x => x.Priority)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.SelfRating)
            .HasConversion<int>();

        builder.Property(x => x.ManagerRating)
            .HasConversion<int>();

        builder.Property(x => x.TargetValue)
            .HasMaxLength(200);

        builder.Property(x => x.CurrentValue)
            .HasMaxLength(200);

        builder.Property(x => x.Unit)
            .HasMaxLength(50);

        builder.Property(x => x.Weight)
            .HasColumnType("decimal(8,4)");

        builder.Property(x => x.SelfComments)
            .HasMaxLength(2000);

        builder.Property(x => x.ManagerComments)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.PerformanceReview)
            .WithMany(x => x.Goals)
            .HasForeignKey(x => x.PerformanceReviewId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.PerformanceReviewId).HasDatabaseName("IX_GoalDefinitions_PerformanceReviewId");
        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_GoalDefinitions_EmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_GoalDefinitions_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
