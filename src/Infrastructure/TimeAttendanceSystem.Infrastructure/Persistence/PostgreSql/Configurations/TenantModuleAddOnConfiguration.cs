using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TenantModuleAddOnConfiguration : IEntityTypeConfiguration<TenantModuleAddOn>
{
    public void Configure(EntityTypeBuilder<TenantModuleAddOn> builder)
    {
        builder.ToTable("TenantModuleAddOns");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Module).IsRequired().HasConversion<string>().HasMaxLength(100);
        builder.Property(x => x.MonthlyPrice).HasPrecision(18, 2);
        builder.Property(x => x.ActivatedAt).IsRequired();
        builder.Property(x => x.IsActive).IsRequired().HasDefaultValue(true);

        builder.Property(x => x.CreatedBy).HasMaxLength(100);
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Subscription)
            .WithMany(s => s.AddOns)
            .HasForeignKey(x => x.TenantSubscriptionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.TenantSubscriptionId, x.Module })
            .IsUnique()
            .HasDatabaseName("IX_TenantModuleAddOns_Subscription_Module")
            .HasFilter("\"IsDeleted\" = false AND \"IsActive\" = true");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
