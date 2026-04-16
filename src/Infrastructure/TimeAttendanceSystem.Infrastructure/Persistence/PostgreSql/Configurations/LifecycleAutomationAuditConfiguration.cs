using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Lifecycle;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class LifecycleAutomationAuditConfiguration : IEntityTypeConfiguration<LifecycleAutomationAudit>
{
    public void Configure(EntityTypeBuilder<LifecycleAutomationAudit> builder)
    {
        builder.ToTable("LifecycleAutomationAudits");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.AutomationType).IsRequired().HasConversion<int>();
        builder.Property(x => x.Status).IsRequired().HasConversion<int>();

        builder.Property(x => x.SourceEntityType).IsRequired().HasMaxLength(100);
        builder.Property(x => x.SourceEntityId).IsRequired();
        builder.Property(x => x.TargetEntityType).HasMaxLength(100);

        builder.Property(x => x.Reason).HasMaxLength(1000);
        builder.Property(x => x.ErrorMessage).HasMaxLength(2000);

        builder.Property(x => x.TriggeredAtUtc).IsRequired().HasColumnType("timestamp with time zone");
        builder.Property(x => x.CompletedAtUtc).HasColumnType("timestamp with time zone");

        builder.Property(x => x.ContextJson).HasColumnType("jsonb");

        // Idempotency lookup: "has this (source, type, succeeded) combination already fired?"
        builder.HasIndex(x => new { x.SourceEntityType, x.SourceEntityId, x.AutomationType, x.Status })
            .HasDatabaseName("IX_LifecycleAutomationAudits_Source_Type_Status")
            .HasFilter("\"IsDeleted\" = false");

        // Detail-page filter: "show all audits for this entity".
        builder.HasIndex(x => new { x.SourceEntityType, x.SourceEntityId })
            .HasDatabaseName("IX_LifecycleAutomationAudits_Source")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity(EntityTypeBuilder<LifecycleAutomationAudit> b)
    {
        b.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        b.Property(e => e.CreatedBy).HasMaxLength(100);
        b.Property(e => e.ModifiedBy).HasMaxLength(100);
        b.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        b.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
