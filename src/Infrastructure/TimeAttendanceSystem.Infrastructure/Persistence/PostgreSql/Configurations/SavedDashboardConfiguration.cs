using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Analytics;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SavedDashboardConfiguration : IEntityTypeConfiguration<SavedDashboard>
{
    public void Configure(EntityTypeBuilder<SavedDashboard> builder)
    {
        builder.ToTable("SavedDashboards");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.NameAr).HasMaxLength(200);
        builder.Property(x => x.LayoutJson).IsRequired();

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.UserId).HasDatabaseName("IX_SavedDashboards_UserId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
