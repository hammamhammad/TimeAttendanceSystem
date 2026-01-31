using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the NotificationBroadcast entity.
/// Defines database mapping, relationships, and indexes for admin broadcast notifications.
/// </summary>
public class NotificationBroadcastConfiguration : IEntityTypeConfiguration<NotificationBroadcast>
{
    public void Configure(EntityTypeBuilder<NotificationBroadcast> builder)
    {
        // Table mapping
        builder.ToTable("NotificationBroadcasts");

        // Primary key
        builder.HasKey(b => b.Id);

        // Properties configuration
        builder.Property(b => b.Title)
            .IsRequired()
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Broadcast title in English");

        builder.Property(b => b.TitleAr)
            .IsRequired()
            .HasMaxLength(200)
            .IsUnicode(true)
            .HasComment("Broadcast title in Arabic");

        builder.Property(b => b.Message)
            .IsRequired()
            .HasMaxLength(2000)
            .IsUnicode(true)
            .HasComment("Broadcast message in English");

        builder.Property(b => b.MessageAr)
            .IsRequired()
            .HasMaxLength(2000)
            .IsUnicode(true)
            .HasComment("Broadcast message in Arabic");

        builder.Property(b => b.TargetType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Target type: All, Branch, Department, Employees");

        builder.Property(b => b.TargetIds)
            .HasMaxLength(4000)
            .HasComment("JSON array of target IDs based on TargetType");

        builder.Property(b => b.Channel)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Delivery channel: InApp, Push, Both");

        builder.Property(b => b.SentByUserId)
            .IsRequired()
            .HasComment("Admin user who initiated the broadcast");

        builder.Property(b => b.SentAt)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("When broadcast was initiated");

        builder.Property(b => b.TotalRecipients)
            .IsRequired()
            .HasDefaultValue(0)
            .HasComment("Total number of intended recipients");

        builder.Property(b => b.DeliveredCount)
            .IsRequired()
            .HasDefaultValue(0)
            .HasComment("Number of successfully delivered notifications");

        builder.Property(b => b.ActionUrl)
            .HasMaxLength(500)
            .HasComment("Optional URL to navigate on notification tap");

        // Relationships
        builder.HasOne(b => b.SentByUser)
            .WithMany()
            .HasForeignKey(b => b.SentByUserId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_NotificationBroadcasts_Users");

        builder.HasMany(b => b.Notifications)
            .WithOne(n => n.Broadcast)
            .HasForeignKey(n => n.BroadcastId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_Notifications_NotificationBroadcasts");

        // Indexes
        builder.HasIndex(b => b.SentByUserId)
            .HasDatabaseName("IX_NotificationBroadcasts_SentByUserId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(b => b.SentAt)
            .HasDatabaseName("IX_NotificationBroadcasts_SentAt")
            .HasFilter("\"IsDeleted\" = false")
            .IsDescending();

        builder.HasIndex(b => b.TargetType)
            .HasDatabaseName("IX_NotificationBroadcasts_TargetType")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(b => !b.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<NotificationBroadcast> builder)
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
