using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
    public void Configure(EntityTypeBuilder<AuditLog> builder)
    {
        builder.ToTable("AuditLogs");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Action)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(x => x.EntityName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.EntityId)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.PayloadJson)
            .HasColumnType("text");

        builder.Property(x => x.IpAddress)
            .HasMaxLength(45);

        builder.Property(x => x.UserAgent)
            .HasMaxLength(500);

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        builder.HasIndex(x => x.ActorUserId);
        builder.HasIndex(x => x.EntityName);
        builder.HasIndex(x => x.CreatedAtUtc);

        // Configure one-to-many relationship with AuditChanges
        builder.HasMany(x => x.Changes)
            .WithOne(x => x.AuditLog)
            .HasForeignKey(x => x.AuditLogId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}