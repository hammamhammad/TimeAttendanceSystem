using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework Core configuration for the AuditChange entity.
/// Defines database schema, constraints, relationships, and indexes for field-level change tracking.
/// </summary>
/// <remarks>
/// Configuration Features:
/// - Foreign key relationship to parent AuditLog with cascade delete
/// - String length constraints for field names and values
/// - Indexing for efficient query performance
/// - Soft delete query filter for data retention
/// - Base entity properties configuration
///
/// Database Schema:
/// - Table: AuditChanges
/// - Primary Key: Id (long)
/// - Foreign Key: AuditLogId references AuditLogs.Id
/// - Indexes: AuditLogId for relationship queries, FieldName for searching specific field changes
///
/// Performance Optimizations:
/// - Index on AuditLogId for efficient join operations
/// - Index on FieldName for field-specific audit queries
/// - Cascade delete for automatic cleanup with parent audit log
/// - Query filter excluding soft-deleted records
/// </remarks>
public class AuditChangeConfiguration : IEntityTypeConfiguration<AuditChange>
{
    public void Configure(EntityTypeBuilder<AuditChange> builder)
    {
        builder.ToTable("AuditChanges");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.FieldName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.OldValue)
            .HasMaxLength(1000);

        builder.Property(x => x.NewValue)
            .HasMaxLength(1000);

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Foreign key relationship is configured in AuditLogConfiguration
        // Index for efficient queries
        builder.HasIndex(x => x.AuditLogId);
        builder.HasIndex(x => x.FieldName);

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
