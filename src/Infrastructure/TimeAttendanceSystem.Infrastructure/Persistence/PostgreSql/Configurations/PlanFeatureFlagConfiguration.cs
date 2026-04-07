using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PlanFeatureFlagConfiguration : IEntityTypeConfiguration<PlanFeatureFlag>
{
    public void Configure(EntityTypeBuilder<PlanFeatureFlag> builder)
    {
        builder.ToTable("PlanFeatureFlags");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.FeatureKey).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.Property(x => x.NameAr).HasMaxLength(200);
        builder.Property(x => x.IsEnabled).IsRequired().HasDefaultValue(true);

        builder.Property(x => x.CreatedBy).HasMaxLength(100);
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.PlanModuleEntitlement)
            .WithMany(m => m.FeatureFlags)
            .HasForeignKey(x => x.PlanModuleEntitlementId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.PlanModuleEntitlementId, x.FeatureKey })
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
