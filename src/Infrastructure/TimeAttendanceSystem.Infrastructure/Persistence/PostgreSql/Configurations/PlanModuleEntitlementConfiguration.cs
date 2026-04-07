using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PlanModuleEntitlementConfiguration : IEntityTypeConfiguration<PlanModuleEntitlement>
{
    public void Configure(EntityTypeBuilder<PlanModuleEntitlement> builder)
    {
        builder.ToTable("PlanModuleEntitlements");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Module).IsRequired().HasConversion<string>().HasMaxLength(100);
        builder.Property(x => x.IsIncluded).IsRequired().HasDefaultValue(true);

        builder.Property(x => x.CreatedBy).HasMaxLength(100);
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Plan)
            .WithMany(p => p.ModuleEntitlements)
            .HasForeignKey(x => x.PlanId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.PlanId, x.Module })
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
