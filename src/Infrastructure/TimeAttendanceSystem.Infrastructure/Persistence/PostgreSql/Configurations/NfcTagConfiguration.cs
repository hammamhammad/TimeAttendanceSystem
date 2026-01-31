using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the NfcTag entity.
/// Defines database mapping, relationships, constraints, and indexes for NFC tag management.
/// </summary>
public class NfcTagConfiguration : IEntityTypeConfiguration<NfcTag>
{
    public void Configure(EntityTypeBuilder<NfcTag> builder)
    {
        // Table mapping
        builder.ToTable("NfcTags");

        // Primary key
        builder.HasKey(t => t.Id);

        // Properties configuration
        builder.Property(t => t.TagUid)
            .IsRequired()
            .HasMaxLength(100)
            .HasComment("Unique hardware identifier of the NFC tag");

        builder.Property(t => t.BranchId)
            .IsRequired()
            .HasComment("Branch this tag is registered to");

        builder.Property(t => t.Description)
            .HasMaxLength(200)
            .HasComment("Descriptive name for tag location (e.g., Main Entrance)");

        builder.Property(t => t.IsWriteProtected)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Whether tag has been permanently write-protected");

        builder.Property(t => t.LockedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("Timestamp when tag was write-protected");

        builder.Property(t => t.LockedByUserId)
            .HasComment("User who applied write protection");

        builder.Property(t => t.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether tag is active for verification");

        // Relationships
        builder.HasOne(t => t.Branch)
            .WithMany()
            .HasForeignKey(t => t.BranchId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_NfcTags_Branches");

        // Indexes
        builder.HasIndex(t => t.TagUid)
            .IsUnique()
            .HasDatabaseName("IX_NfcTags_TagUid")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(t => t.BranchId)
            .HasDatabaseName("IX_NfcTags_BranchId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(t => new { t.BranchId, t.IsActive })
            .HasDatabaseName("IX_NfcTags_BranchId_IsActive")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        // Query filter for soft delete
        builder.HasQueryFilter(t => !t.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<NfcTag> builder)
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
