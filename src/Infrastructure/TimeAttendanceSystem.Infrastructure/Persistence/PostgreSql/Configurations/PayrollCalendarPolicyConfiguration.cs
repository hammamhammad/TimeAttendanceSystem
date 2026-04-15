using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PayrollCalendarPolicyConfiguration : IEntityTypeConfiguration<PayrollCalendarPolicy>
{
    public void Configure(EntityTypeBuilder<PayrollCalendarPolicy> builder)
    {
        builder.ToTable("PayrollCalendarPolicies");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.BasisType).IsRequired().HasConversion<int>();
        builder.Property(x => x.FixedBasisDays);
        builder.Property(x => x.StandardHoursPerDay).IsRequired().HasColumnType("decimal(5,2)");
        builder.Property(x => x.TreatPublicHolidaysAsPaid).IsRequired();
        builder.Property(x => x.EffectiveFromDate).IsRequired().HasColumnType("timestamp with time zone");
        builder.Property(x => x.EffectiveToDate).HasColumnType("timestamp with time zone");
        builder.Property(x => x.IsActive).IsRequired();

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => new { x.BranchId, x.IsActive, x.EffectiveFromDate })
            .HasDatabaseName("IX_PayrollCalendarPolicies_Branch_Active_Effective")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity(EntityTypeBuilder<PayrollCalendarPolicy> b)
    {
        b.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        b.Property(e => e.CreatedBy).HasMaxLength(100);
        b.Property(e => e.ModifiedBy).HasMaxLength(100);
        b.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        b.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
