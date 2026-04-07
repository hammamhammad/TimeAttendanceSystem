using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BranchSettingsOverrideConfiguration : IEntityTypeConfiguration<BranchSettingsOverride>
{
    public void Configure(EntityTypeBuilder<BranchSettingsOverride> builder)
    {
        builder.ToTable("BranchSettingsOverrides");
        builder.HasKey(e => e.Id);

        // One-to-one with Branch
        builder.HasOne(e => e.Branch)
            .WithOne()
            .HasForeignKey<BranchSettingsOverride>(e => e.BranchId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Unique constraint on BranchId
        builder.HasIndex(e => e.BranchId)
            .IsUnique()
            .HasDatabaseName("IX_BranchSettingsOverrides_BranchId");

        // All override properties are nullable by design (null = inherit from tenant)

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity<T>(EntityTypeBuilder<T> builder) where T : class
    {
        builder.Property("CreatedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("ModifiedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("CreatedBy").HasMaxLength(100);
        builder.Property("ModifiedBy").HasMaxLength(100);
        builder.Property("IsDeleted").IsRequired().HasDefaultValue(false);
        builder.Property("RowVersion").IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
