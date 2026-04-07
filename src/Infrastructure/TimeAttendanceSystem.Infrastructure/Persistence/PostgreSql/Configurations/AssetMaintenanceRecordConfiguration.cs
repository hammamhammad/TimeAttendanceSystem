using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Assets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AssetMaintenanceRecordConfiguration : IEntityTypeConfiguration<AssetMaintenanceRecord>
{
    public void Configure(EntityTypeBuilder<AssetMaintenanceRecord> builder)
    {
        builder.ToTable("AssetMaintenanceRecords");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.MaintenanceType)
            .HasConversion<int>();

        builder.Property(x => x.Description)
            .HasMaxLength(2000)
            .IsRequired();

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.Cost)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10);

        builder.Property(x => x.Vendor)
            .HasMaxLength(200);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Asset)
            .WithMany(x => x.MaintenanceRecords)
            .HasForeignKey(x => x.AssetId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.AssetId)
            .HasDatabaseName("IX_AssetMaintenanceRecords_AssetId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_AssetMaintenanceRecords_Status");

        builder.HasIndex(x => x.MaintenanceType)
            .HasDatabaseName("IX_AssetMaintenanceRecords_MaintenanceType");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
