using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Analytics;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AnalyticsSnapshotConfiguration : IEntityTypeConfiguration<AnalyticsSnapshot>
{
    public void Configure(EntityTypeBuilder<AnalyticsSnapshot> builder)
    {
        builder.ToTable("AnalyticsSnapshots");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.SnapshotDate).IsRequired();
        builder.Property(x => x.MetricType).HasConversion<int>().IsRequired();
        builder.Property(x => x.PeriodType).HasConversion<int>().IsRequired();
        builder.Property(x => x.Value).HasPrecision(18, 4).IsRequired();
        builder.Property(x => x.AdditionalDataJson).HasMaxLength(4000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Department)
            .WithMany()
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Composite index for efficient querying
        builder.HasIndex(x => new { x.SnapshotDate, x.MetricType, x.BranchId, x.DepartmentId, x.PeriodType })
            .HasDatabaseName("IX_AnalyticsSnapshots_Date_Metric_Branch_Dept_Period");

        builder.HasIndex(x => x.MetricType).HasDatabaseName("IX_AnalyticsSnapshots_MetricType");
        builder.HasIndex(x => x.PeriodType).HasDatabaseName("IX_AnalyticsSnapshots_PeriodType");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
