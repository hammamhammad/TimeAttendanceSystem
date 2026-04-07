using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PerformanceReviewCycleConfiguration : IEntityTypeConfiguration<PerformanceReviewCycle>
{
    public void Configure(EntityTypeBuilder<PerformanceReviewCycle> builder)
    {
        builder.ToTable("PerformanceReviewCycles");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.CycleType)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.CompetencyFramework)
            .WithMany()
            .HasForeignKey(x => x.CompetencyFrameworkId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_PerformanceReviewCycles_BranchId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_PerformanceReviewCycles_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
