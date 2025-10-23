using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer.Configurations;

public class UserSessionConfiguration : IEntityTypeConfiguration<UserSession>
{
    public void Configure(EntityTypeBuilder<UserSession> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.UserId)
            .IsRequired();

        builder.Property(x => x.SessionId)
            .IsRequired()
            .HasMaxLength(128);

        builder.Property(x => x.DeviceFingerprint)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(x => x.DeviceName)
            .HasMaxLength(200);

        builder.Property(x => x.IpAddress)
            .IsRequired()
            .HasMaxLength(45); // IPv6 support

        builder.Property(x => x.UserAgent)
            .HasMaxLength(1000);

        builder.Property(x => x.Platform)
            .HasMaxLength(100);

        builder.Property(x => x.Browser)
            .HasMaxLength(100);

        builder.Property(x => x.Location)
            .HasMaxLength(200);

        builder.Property(x => x.LastAccessedAtUtc)
            .IsRequired();

        builder.Property(x => x.ExpiresAtUtc)
            .IsRequired();

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(x => x.IsCurrentSession)
            .IsRequired()
            .HasDefaultValue(false);

        builder.HasOne(x => x.User)
            .WithMany(u => u.UserSessions)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.SessionId)
            .IsUnique();

        builder.HasIndex(x => new { x.UserId, x.IsActive });

        builder.HasIndex(x => x.ExpiresAtUtc);

        builder.ToTable("UserSessions");
    }
}