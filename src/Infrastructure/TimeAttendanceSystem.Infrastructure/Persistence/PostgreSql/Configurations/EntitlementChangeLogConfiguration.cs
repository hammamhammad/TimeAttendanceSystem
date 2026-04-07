using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EntitlementChangeLogConfiguration : IEntityTypeConfiguration<EntitlementChangeLog>
{
    public void Configure(EntityTypeBuilder<EntitlementChangeLog> builder)
    {
        builder.ToTable("EntitlementChangeLogs");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.TenantId).IsRequired();
        builder.Property(x => x.ChangeType).IsRequired();
        builder.Property(x => x.PreviousValue).HasColumnType("text");
        builder.Property(x => x.NewValue).HasColumnType("text");
        builder.Property(x => x.AffectedModule);
        builder.Property(x => x.Reason).HasMaxLength(1000);
        builder.Property(x => x.PerformedByUserId);

        builder.Property(x => x.CreatedBy).HasMaxLength(100);
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasIndex(x => x.TenantId);
        builder.HasIndex(x => x.CreatedAtUtc);
        builder.HasIndex(x => new { x.TenantId, x.ChangeType });

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
