using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TenantFeatureOverrideConfiguration : IEntityTypeConfiguration<TenantFeatureOverride>
{
    public void Configure(EntityTypeBuilder<TenantFeatureOverride> builder)
    {
        builder.ToTable("TenantFeatureOverrides");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.FeatureKey).IsRequired().HasMaxLength(200);
        builder.Property(x => x.IsEnabled).IsRequired();
        builder.Property(x => x.Reason).HasMaxLength(500);

        builder.Property(x => x.CreatedBy).HasMaxLength(100);
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Subscription)
            .WithMany(s => s.FeatureOverrides)
            .HasForeignKey(x => x.TenantSubscriptionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.TenantSubscriptionId, x.FeatureKey })
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
