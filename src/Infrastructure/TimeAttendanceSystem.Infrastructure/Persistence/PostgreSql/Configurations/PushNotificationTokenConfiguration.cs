using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the PushNotificationToken entity.
/// Defines database mapping, relationships, and indexes for FCM device token management.
/// </summary>
public class PushNotificationTokenConfiguration : IEntityTypeConfiguration<PushNotificationToken>
{
    public void Configure(EntityTypeBuilder<PushNotificationToken> builder)
    {
        // Table mapping
        builder.ToTable("PushNotificationTokens");

        // Primary key
        builder.HasKey(t => t.Id);

        // Properties configuration
        builder.Property(t => t.UserId)
            .IsRequired()
            .HasComment("User who owns this device");

        builder.Property(t => t.DeviceToken)
            .IsRequired()
            .HasMaxLength(500)
            .HasComment("Firebase Cloud Messaging device token");

        builder.Property(t => t.DeviceId)
            .IsRequired()
            .HasMaxLength(100)
            .HasComment("Unique identifier for the device");

        builder.Property(t => t.Platform)
            .IsRequired()
            .HasMaxLength(20)
            .HasComment("Device platform: android or ios");

        builder.Property(t => t.DeviceModel)
            .HasMaxLength(100)
            .HasComment("Device model/name for admin reference");

        builder.Property(t => t.RegisteredAt)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("When token was registered");

        builder.Property(t => t.LastUsedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When token was last used for notification");

        builder.Property(t => t.AppVersion)
            .HasMaxLength(50)
            .HasComment("App version when token was registered");

        builder.Property(t => t.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether token is active for notifications");

        // Relationships
        builder.HasOne(t => t.User)
            .WithMany()
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PushNotificationTokens_Users");

        // Indexes
        builder.HasIndex(t => t.UserId)
            .HasDatabaseName("IX_PushNotificationTokens_UserId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(t => t.DeviceId)
            .IsUnique()
            .HasDatabaseName("IX_PushNotificationTokens_DeviceId")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        builder.HasIndex(t => new { t.UserId, t.IsActive })
            .HasDatabaseName("IX_PushNotificationTokens_UserId_IsActive")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        builder.HasIndex(t => t.DeviceToken)
            .HasDatabaseName("IX_PushNotificationTokens_DeviceToken")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        // Query filter for soft delete
        builder.HasQueryFilter(t => !t.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<PushNotificationToken> builder)
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
