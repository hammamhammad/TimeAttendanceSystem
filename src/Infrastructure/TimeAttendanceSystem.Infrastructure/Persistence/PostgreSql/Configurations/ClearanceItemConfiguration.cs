using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the ClearanceItem entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class ClearanceItemConfiguration : IEntityTypeConfiguration<ClearanceItem>
{
    public void Configure(EntityTypeBuilder<ClearanceItem> builder)
    {
        // Table mapping
        builder.ToTable("ClearanceItems");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.ClearanceChecklistId)
            .IsRequired()
            .HasComment("Clearance checklist identifier");

        builder.Property(x => x.Department)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Department responsible for this clearance item");

        builder.Property(x => x.ItemName)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Clearance item name");

        builder.Property(x => x.ItemNameAr)
            .HasMaxLength(200)
            .HasComment("Clearance item name in Arabic");

        builder.Property(x => x.Description)
            .HasMaxLength(500)
            .HasComment("Item description");

        builder.Property(x => x.IsCompleted)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Whether this item is completed");

        builder.Property(x => x.CompletedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When this item was completed");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        builder.Property(x => x.DisplayOrder)
            .IsRequired()
            .HasComment("Display order for UI rendering");

        // Relationships
        builder.HasOne(x => x.ClearanceChecklist)
            .WithMany(x => x.Items)
            .HasForeignKey(x => x.ClearanceChecklistId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ClearanceItems_ClearanceChecklists");

        // Indexes
        builder.HasIndex(x => x.ClearanceChecklistId)
            .HasDatabaseName("IX_ClearanceItems_ClearanceChecklistId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.Department)
            .HasDatabaseName("IX_ClearanceItems_Department")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<ClearanceItem> builder)
    {
        builder.Property(e => e.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()")
            .HasComment("UTC timestamp when record was created");

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(100)
            .HasComment("User who created the record");

        builder.Property(e => e.ModifiedAtUtc)
            .HasComment("UTC timestamp when record was last modified");

        builder.Property(e => e.ModifiedBy)
            .HasMaxLength(100)
            .HasComment("User who last modified the record");

        builder.Property(e => e.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Soft delete flag");

        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 })
            .HasComment("Concurrency control timestamp");
    }
}
