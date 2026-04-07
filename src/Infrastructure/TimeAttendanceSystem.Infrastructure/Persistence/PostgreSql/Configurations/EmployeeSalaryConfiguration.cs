using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the EmployeeSalary entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class EmployeeSalaryConfiguration : IEntityTypeConfiguration<EmployeeSalary>
{
    public void Configure(EntityTypeBuilder<EmployeeSalary> builder)
    {
        // Table mapping
        builder.ToTable("EmployeeSalaries");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.SalaryStructureId)
            .IsRequired()
            .HasComment("Salary structure identifier");

        builder.Property(x => x.BaseSalary)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Base salary amount");

        builder.Property(x => x.Currency)
            .IsRequired()
            .HasMaxLength(10)
            .HasDefaultValue("SAR")
            .HasComment("Currency code (e.g., SAR, USD)");

        builder.Property(x => x.EffectiveDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Date when this salary becomes effective");

        builder.Property(x => x.EndDate)
            .HasColumnType("timestamp with time zone")
            .HasComment("Date when this salary ends (null = current)");

        builder.Property(x => x.Reason)
            .HasMaxLength(500)
            .HasComment("Reason for salary change");

        builder.Property(x => x.IsCurrent)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this is the current active salary");

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeSalaries_Employees");

        builder.HasOne(x => x.SalaryStructure)
            .WithMany()
            .HasForeignKey(x => x.SalaryStructureId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeSalaries_SalaryStructures");

        builder.HasMany(x => x.Components)
            .WithOne(x => x.EmployeeSalary)
            .HasForeignKey(x => x.EmployeeSalaryId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_EmployeeSalaryComponents_EmployeeSalaries");

        // Indexes
        builder.HasIndex(x => new { x.EmployeeId, x.IsCurrent })
            .HasDatabaseName("IX_EmployeeSalaries_EmployeeId_IsCurrent")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeSalaries_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.SalaryStructureId)
            .HasDatabaseName("IX_EmployeeSalaries_SalaryStructureId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<EmployeeSalary> builder)
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
