using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Assets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AssetConfiguration : IEntityTypeConfiguration<Asset>
{
    public void Configure(EntityTypeBuilder<Asset> builder)
    {
        builder.ToTable("Assets");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.AssetTag)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.SerialNumber)
            .HasMaxLength(200);

        builder.Property(x => x.Model)
            .HasMaxLength(200);

        builder.Property(x => x.Manufacturer)
            .HasMaxLength(200);

        builder.Property(x => x.PurchasePrice)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10);

        builder.Property(x => x.LocationDescription)
            .HasMaxLength(500);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Condition)
            .HasConversion<int>();

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Category)
            .WithMany(x => x.Assets)
            .HasForeignKey(x => x.AssetCategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Assignments)
            .WithOne(x => x.Asset)
            .HasForeignKey(x => x.AssetId);

        builder.HasMany(x => x.MaintenanceRecords)
            .WithOne(x => x.Asset)
            .HasForeignKey(x => x.AssetId);

        // Indexes
        builder.HasIndex(x => x.AssetTag)
            .IsUnique()
            .HasDatabaseName("IX_Assets_AssetTag_Unique")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.AssetCategoryId)
            .HasDatabaseName("IX_Assets_AssetCategoryId");

        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_Assets_BranchId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_Assets_Status");

        builder.HasIndex(x => x.SerialNumber)
            .HasDatabaseName("IX_Assets_SerialNumber");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
