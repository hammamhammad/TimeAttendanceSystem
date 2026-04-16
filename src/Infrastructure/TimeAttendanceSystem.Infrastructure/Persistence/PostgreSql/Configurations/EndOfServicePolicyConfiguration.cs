using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EndOfServicePolicyConfiguration : IEntityTypeConfiguration<EndOfServicePolicy>
{
    public void Configure(EntityTypeBuilder<EndOfServicePolicy> builder)
    {
        builder.ToTable("EndOfServicePolicies");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Description).HasMaxLength(1000);
        builder.Property(x => x.CountryCode).HasMaxLength(2);
        builder.Property(x => x.IsActive).IsRequired();
        builder.Property(x => x.EffectiveFromDate).IsRequired().HasColumnType("timestamp with time zone");
        builder.Property(x => x.EffectiveToDate).HasColumnType("timestamp with time zone");
        builder.Property(x => x.MinimumServiceYearsForEligibility)
            .IsRequired()
            .HasColumnType("decimal(5,2)")
            .HasDefaultValue(0m);

        builder.HasMany(x => x.Tiers)
            .WithOne(t => t.EndOfServicePolicy)
            .HasForeignKey(t => t.EndOfServicePolicyId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.ResignationDeductions)
            .WithOne(t => t.EndOfServicePolicy)
            .HasForeignKey(t => t.EndOfServicePolicyId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.IsActive, x.EffectiveFromDate, x.CountryCode })
            .HasDatabaseName("IX_EndOfServicePolicies_Active_Effective_Country")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity(EntityTypeBuilder<EndOfServicePolicy> b)
    {
        b.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        b.Property(e => e.CreatedBy).HasMaxLength(100);
        b.Property(e => e.ModifiedBy).HasMaxLength(100);
        b.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        b.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}

public class EndOfServicePolicyTierConfiguration : IEntityTypeConfiguration<EndOfServicePolicyTier>
{
    public void Configure(EntityTypeBuilder<EndOfServicePolicyTier> builder)
    {
        builder.ToTable("EndOfServicePolicyTiers");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.EndOfServicePolicyId).IsRequired();
        builder.Property(x => x.MinYearsInclusive).IsRequired().HasColumnType("decimal(6,2)");
        builder.Property(x => x.MaxYearsExclusive).HasColumnType("decimal(6,2)");
        builder.Property(x => x.MonthsPerYearMultiplier).IsRequired().HasColumnType("decimal(6,3)");
        builder.Property(x => x.SortOrder).IsRequired().HasDefaultValue(0);

        builder.HasIndex(x => new { x.EndOfServicePolicyId, x.SortOrder })
            .HasDatabaseName("IX_EndOfServicePolicyTiers_Policy_Sort")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity(EntityTypeBuilder<EndOfServicePolicyTier> b)
    {
        b.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        b.Property(e => e.CreatedBy).HasMaxLength(100);
        b.Property(e => e.ModifiedBy).HasMaxLength(100);
        b.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        b.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}

public class EndOfServiceResignationDeductionTierConfiguration : IEntityTypeConfiguration<EndOfServiceResignationDeductionTier>
{
    public void Configure(EntityTypeBuilder<EndOfServiceResignationDeductionTier> builder)
    {
        builder.ToTable("EndOfServiceResignationDeductionTiers");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.EndOfServicePolicyId).IsRequired();
        builder.Property(x => x.MinYearsInclusive).IsRequired().HasColumnType("decimal(6,2)");
        builder.Property(x => x.MaxYearsExclusive).HasColumnType("decimal(6,2)");
        builder.Property(x => x.DeductionFraction).IsRequired().HasColumnType("decimal(6,4)");
        builder.Property(x => x.SortOrder).IsRequired().HasDefaultValue(0);

        builder.HasIndex(x => new { x.EndOfServicePolicyId, x.SortOrder })
            .HasDatabaseName("IX_EndOfServiceResignationDeductionTiers_Policy_Sort")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity(EntityTypeBuilder<EndOfServiceResignationDeductionTier> b)
    {
        b.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        b.Property(e => e.CreatedBy).HasMaxLength(100);
        b.Property(e => e.ModifiedBy).HasMaxLength(100);
        b.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        b.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
