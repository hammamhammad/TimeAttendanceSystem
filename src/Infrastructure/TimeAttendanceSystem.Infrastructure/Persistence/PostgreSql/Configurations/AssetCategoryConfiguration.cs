using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Assets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AssetCategoryConfiguration : IEntityTypeConfiguration<AssetCategory>
{
    public void Configure(EntityTypeBuilder<AssetCategory> builder)
    {
        builder.ToTable("AssetCategories");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(1000);

        builder.Property(x => x.DepreciationRatePercent)
            .HasColumnType("decimal(8,4)");

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Self-referencing relationship
        builder.HasOne(x => x.ParentCategory)
            .WithMany(x => x.ChildCategories)
            .HasForeignKey(x => x.ParentCategoryId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false);

        builder.HasMany(x => x.Assets)
            .WithOne(x => x.Category)
            .HasForeignKey(x => x.AssetCategoryId);

        // Indexes
        builder.HasIndex(x => x.Code)
            .IsUnique()
            .HasDatabaseName("IX_AssetCategories_Code_Unique")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.ParentCategoryId)
            .HasDatabaseName("IX_AssetCategories_ParentCategoryId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
