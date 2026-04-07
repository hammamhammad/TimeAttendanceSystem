using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TenantSettingsConfiguration : IEntityTypeConfiguration<TenantSettings>
{
    public void Configure(EntityTypeBuilder<TenantSettings> builder)
    {
        builder.ToTable("TenantSettings");
        builder.HasKey(e => e.Id);

        // One-to-one with Tenant
        builder.HasOne(e => e.Tenant)
            .WithOne()
            .HasForeignKey<TenantSettings>(e => e.TenantId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Unique constraint on TenantId
        builder.HasIndex(e => e.TenantId)
            .IsUnique()
            .HasDatabaseName("IX_TenantSettings_TenantId");

        // General settings
        builder.Property(e => e.FiscalYearStartMonth).HasMaxLength(2).HasDefaultValue("01");
        builder.Property(e => e.WeekStartDay).HasMaxLength(20).HasDefaultValue("Sunday");
        builder.Property(e => e.DateFormat).HasMaxLength(20).HasDefaultValue("dd/MM/yyyy");
        builder.Property(e => e.TimeFormat).HasMaxLength(20).HasDefaultValue("HH:mm");
        builder.Property(e => e.NumberFormat).HasMaxLength(10).HasDefaultValue("en-US");

        // Leave settings
        builder.Property(e => e.LeaveYearStart).HasMaxLength(5);

        // Payroll settings
        builder.Property(e => e.PayrollCurrency).HasMaxLength(3);
        builder.Property(e => e.SalaryCalculationBasis).HasMaxLength(20).HasDefaultValue("Calendar");

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
