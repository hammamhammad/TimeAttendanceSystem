using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Phase 1 (v14.1): EF configuration for <see cref="OperationalFailureAlert"/>.
/// Mirrors the pattern used by <c>LifecycleAutomationAuditConfiguration</c>.
///
/// Primary lookup index: unresolved alerts by (Category, SourceEntityType, SourceEntityId, FailureCode)
/// for fast dedup inside <c>FailureAlertService.RaiseAsync</c>.
/// Secondary index: HR dashboard query ordered by (IsResolved, FailedAtUtc DESC).
/// </summary>
public class OperationalFailureAlertConfiguration : IEntityTypeConfiguration<OperationalFailureAlert>
{
    public void Configure(EntityTypeBuilder<OperationalFailureAlert> builder)
    {
        builder.ToTable("OperationalFailureAlerts");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Category).IsRequired().HasConversion<int>();
        builder.Property(x => x.Severity).IsRequired().HasConversion<int>();

        builder.Property(x => x.SourceEntityType).IsRequired().HasMaxLength(100);
        builder.Property(x => x.SourceEntityId).IsRequired();
        builder.Property(x => x.FailureCode).IsRequired().HasMaxLength(100);
        builder.Property(x => x.Reason).IsRequired().HasMaxLength(2000);
        builder.Property(x => x.ErrorMessage).HasMaxLength(4000);
        builder.Property(x => x.ResolutionNotes).HasMaxLength(2000);

        builder.Property(x => x.FailedAtUtc).IsRequired().HasColumnType("timestamp with time zone");
        builder.Property(x => x.ResolvedAtUtc).HasColumnType("timestamp with time zone");
        builder.Property(x => x.LastRetryAtUtc).HasColumnType("timestamp with time zone");

        builder.Property(x => x.MetadataJson).HasColumnType("jsonb");

        // Dedup lookup for unresolved rows.
        builder.HasIndex(x => new { x.Category, x.SourceEntityType, x.SourceEntityId, x.FailureCode, x.IsResolved })
            .HasDatabaseName("IX_OperationalFailureAlerts_Dedup")
            .HasFilter("\"IsDeleted\" = false");

        // HR dashboard query.
        builder.HasIndex(x => new { x.IsResolved, x.FailedAtUtc })
            .HasDatabaseName("IX_OperationalFailureAlerts_Dashboard")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        builder.Property(e => e.CreatedBy).HasMaxLength(100);
        builder.Property(e => e.ModifiedBy).HasMaxLength(100);
        builder.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        builder.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
