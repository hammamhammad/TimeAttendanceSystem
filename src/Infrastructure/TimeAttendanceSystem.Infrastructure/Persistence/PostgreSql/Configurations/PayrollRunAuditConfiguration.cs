using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PayrollRunAuditConfiguration : IEntityTypeConfiguration<PayrollRunAudit>
{
    public void Configure(EntityTypeBuilder<PayrollRunAudit> builder)
    {
        builder.ToTable("PayrollRunAudits");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.PayrollPeriodId).IsRequired();
        builder.Property(x => x.RunType).IsRequired().HasConversion<int>();
        builder.Property(x => x.Status).IsRequired().HasConversion<int>();
        builder.Property(x => x.StartedAtUtc).IsRequired().HasColumnType("timestamp with time zone");
        builder.Property(x => x.CompletedAtUtc).HasColumnType("timestamp with time zone");
        builder.Property(x => x.TriggeredByUsername).HasMaxLength(200);
        builder.Property(x => x.ConfigSnapshotJson).HasColumnType("jsonb");
        builder.Property(x => x.WarningsJson).HasColumnType("jsonb");
        builder.Property(x => x.ErrorsJson).HasColumnType("jsonb");

        builder.HasOne(x => x.PayrollPeriod)
            .WithMany()
            .HasForeignKey(x => x.PayrollPeriodId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Items)
            .WithOne(x => x.PayrollRunAudit)
            .HasForeignKey(x => x.PayrollRunAuditId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.PayrollPeriodId)
            .HasDatabaseName("IX_PayrollRunAudits_PayrollPeriodId")
            .HasFilter("\"IsDeleted\" = false");
        builder.HasIndex(x => new { x.PayrollPeriodId, x.StartedAtUtc })
            .HasDatabaseName("IX_PayrollRunAudits_PayrollPeriod_StartedAt")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity(EntityTypeBuilder<PayrollRunAudit> b)
    {
        b.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        b.Property(e => e.CreatedBy).HasMaxLength(100);
        b.Property(e => e.ModifiedBy).HasMaxLength(100);
        b.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        b.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}

public class PayrollRunAuditItemConfiguration : IEntityTypeConfiguration<PayrollRunAuditItem>
{
    public void Configure(EntityTypeBuilder<PayrollRunAuditItem> builder)
    {
        builder.ToTable("PayrollRunAuditItems");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.PayrollRunAuditId).IsRequired();
        builder.Property(x => x.EmployeeId).IsRequired();
        builder.Property(x => x.Status).IsRequired().HasConversion<int>();
        builder.Property(x => x.GrossEarnings).HasColumnType("decimal(18,2)");
        builder.Property(x => x.NetSalary).HasColumnType("decimal(18,2)");
        builder.Property(x => x.TaxAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.SocialInsuranceEmployee).HasColumnType("decimal(18,2)");
        builder.Property(x => x.OvertimePay).HasColumnType("decimal(18,2)");
        builder.Property(x => x.AbsenceDeduction).HasColumnType("decimal(18,2)");
        builder.Property(x => x.WarningsJson).HasColumnType("jsonb");
        builder.Property(x => x.ErrorMessage).HasMaxLength(2000);

        builder.HasIndex(x => new { x.PayrollRunAuditId, x.EmployeeId })
            .HasDatabaseName("IX_PayrollRunAuditItems_Audit_Employee")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity(EntityTypeBuilder<PayrollRunAuditItem> b)
    {
        b.Property(e => e.CreatedAtUtc).IsRequired().HasDefaultValueSql("NOW()");
        b.Property(e => e.CreatedBy).HasMaxLength(100);
        b.Property(e => e.ModifiedBy).HasMaxLength(100);
        b.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);
        b.Property(e => e.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
