using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the PayrollRecordDetail entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class PayrollRecordDetailConfiguration : IEntityTypeConfiguration<PayrollRecordDetail>
{
    public void Configure(EntityTypeBuilder<PayrollRecordDetail> builder)
    {
        // Table mapping
        builder.ToTable("PayrollRecordDetails");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.PayrollRecordId)
            .IsRequired()
            .HasComment("Payroll record identifier");

        builder.Property(x => x.SalaryComponentId)
            .IsRequired(false)
            .HasComment("Salary component identifier (null for ad-hoc items)");

        builder.Property(x => x.ComponentName)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Component name snapshot");

        builder.Property(x => x.ComponentNameAr)
            .HasMaxLength(200)
            .HasComment("Component name in Arabic");

        builder.Property(x => x.ComponentType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of salary component");

        builder.Property(x => x.Amount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Component amount");

        builder.Property(x => x.Notes)
            .HasMaxLength(500)
            .HasComment("Additional notes");

        // Relationships
        builder.HasOne(x => x.PayrollRecord)
            .WithMany(x => x.Details)
            .HasForeignKey(x => x.PayrollRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PayrollRecordDetails_PayrollRecords");

        builder.HasOne(x => x.SalaryComponent)
            .WithMany()
            .HasForeignKey(x => x.SalaryComponentId)
            .OnDelete(DeleteBehavior.SetNull)
            .HasConstraintName("FK_PayrollRecordDetails_SalaryComponents");

        builder.HasOne(x => x.AllowanceType)
            .WithMany()
            .HasForeignKey(x => x.AllowanceTypeId)
            .OnDelete(DeleteBehavior.SetNull)
            .HasConstraintName("FK_PayrollRecordDetails_AllowanceTypes");

        // Indexes
        builder.HasIndex(x => x.PayrollRecordId)
            .HasDatabaseName("IX_PayrollRecordDetails_PayrollRecordId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.ComponentType)
            .HasDatabaseName("IX_PayrollRecordDetails_ComponentType")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<PayrollRecordDetail> builder)
    {
        builder.Property(e => e.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()")
            .HasComment("UTC timestamp when record was created");

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(100)
            .HasComment("User who created the record");

        builder.Property(e => e.ModifiedAtUtc)
            .HasComment("UTC timestamp when record was last modified");

        builder.Property(e => e.ModifiedBy)
            .HasMaxLength(100)
            .HasComment("User who last modified the record");

        builder.Property(e => e.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Soft delete flag");

        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 })
            .HasComment("Concurrency control timestamp");
    }
}
