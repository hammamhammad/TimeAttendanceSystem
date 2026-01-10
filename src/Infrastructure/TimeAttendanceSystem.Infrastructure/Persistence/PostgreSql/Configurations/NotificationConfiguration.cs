using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the Notification entity.
/// Defines database mapping, relationships, constraints, and indexes for in-app notifications.
/// </summary>
public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        // Table mapping
        builder.ToTable("Notifications");

        // Primary key
        builder.HasKey(n => n.Id);

        // Properties configuration
        builder.Property(n => n.UserId)
            .IsRequired()
            .HasComment("User who receives this notification");

        builder.Property(n => n.Type)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of notification");

        builder.Property(n => n.TitleEn)
            .IsRequired()
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Notification title in English");

        builder.Property(n => n.TitleAr)
            .IsRequired()
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Notification title in Arabic");

        builder.Property(n => n.MessageEn)
            .IsRequired()
            .HasMaxLength(1000)
            .IsUnicode(true)
            .HasComment("Notification message in English");

        builder.Property(n => n.MessageAr)
            .IsRequired()
            .HasMaxLength(1000)
            .IsUnicode(true)
            .HasComment("Notification message in Arabic");

        builder.Property(n => n.IsRead)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Whether notification has been read");

        builder.Property(n => n.ReadAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When notification was read");

        builder.Property(n => n.EntityType)
            .HasMaxLength(50)
            .HasComment("Type of related entity (e.g., Vacation, Excuse)");

        builder.Property(n => n.EntityId)
            .HasComment("ID of the related entity");

        builder.Property(n => n.ActionUrl)
            .HasMaxLength(500)
            .HasComment("URL to navigate when notification is clicked");

        // Relationships
        builder.HasOne(n => n.User)
            .WithMany()
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_Notifications_Users");

        // Indexes
        builder.HasIndex(n => n.UserId)
            .HasDatabaseName("IX_Notifications_UserId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(n => new { n.UserId, n.IsRead })
            .HasDatabaseName("IX_Notifications_UserId_IsRead")
            .HasFilter("\"IsDeleted\" = false AND \"IsRead\" = false");

        builder.HasIndex(n => n.CreatedAtUtc)
            .HasDatabaseName("IX_Notifications_CreatedAtUtc")
            .HasFilter("\"IsDeleted\" = false")
            .IsDescending();

        builder.HasIndex(n => n.Type)
            .HasDatabaseName("IX_Notifications_Type")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(n => new { n.EntityType, n.EntityId })
            .HasDatabaseName("IX_Notifications_EntityType_EntityId")
            .HasFilter("\"IsDeleted\" = false AND \"EntityType\" IS NOT NULL");

        // Query filter for soft delete
        builder.HasQueryFilter(n => !n.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<Notification> builder)
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
