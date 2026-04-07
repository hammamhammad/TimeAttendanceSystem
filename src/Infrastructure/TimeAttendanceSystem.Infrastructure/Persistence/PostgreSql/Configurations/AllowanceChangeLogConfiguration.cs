using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AllowanceChangeLogConfiguration : IEntityTypeConfiguration<AllowanceChangeLog>
{
    public void Configure(EntityTypeBuilder<AllowanceChangeLog> builder)
    {
        builder.ToTable("AllowanceChangeLogs");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.PreviousAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.NewAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.PreviousPercentage)
            .HasColumnType("decimal(8,4)");

        builder.Property(x => x.NewPercentage)
            .HasColumnType("decimal(8,4)");

        builder.Property(x => x.Reason)
            .HasMaxLength(1000);

        builder.Property(x => x.RelatedEntityType)
            .HasMaxLength(100);

        builder.Property(x => x.ChangeType)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.AllowanceType)
            .WithMany()
            .HasForeignKey(x => x.AllowanceTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.AllowanceRequest)
            .WithMany()
            .HasForeignKey(x => x.AllowanceRequestId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_AllowanceChangeLogs_EmployeeId");

        builder.HasIndex(x => x.EffectiveDate)
            .HasDatabaseName("IX_AllowanceChangeLogs_EffectiveDate");

        builder.HasIndex(x => new { x.EmployeeId, x.EffectiveDate })
            .HasDatabaseName("IX_AllowanceChangeLogs_Employee_EffectiveDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
