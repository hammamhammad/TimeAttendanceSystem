using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the EmployeeSalaryComponent entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class EmployeeSalaryComponentConfiguration : IEntityTypeConfiguration<EmployeeSalaryComponent>
{
    public void Configure(EntityTypeBuilder<EmployeeSalaryComponent> builder)
    {
        // Table mapping
        builder.ToTable("EmployeeSalaryComponents");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.EmployeeSalaryId)
            .IsRequired()
            .HasComment("Employee salary record identifier");

        builder.Property(x => x.SalaryComponentId)
            .IsRequired()
            .HasComment("Salary component identifier");

        builder.Property(x => x.Amount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Calculated component amount");

        builder.Property(x => x.OverrideAmount)
            .HasColumnType("decimal(18,2)")
            .HasComment("Manual override amount (null = use calculated)");

        // Relationships
        builder.HasOne(x => x.EmployeeSalary)
            .WithMany(x => x.Components)
            .HasForeignKey(x => x.EmployeeSalaryId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_EmployeeSalaryComponents_EmployeeSalaries");

        builder.HasOne(x => x.SalaryComponent)
            .WithMany()
            .HasForeignKey(x => x.SalaryComponentId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeSalaryComponents_SalaryComponents");

        // Indexes
        builder.HasIndex(x => x.EmployeeSalaryId)
            .HasDatabaseName("IX_EmployeeSalaryComponents_EmployeeSalaryId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.SalaryComponentId)
            .HasDatabaseName("IX_EmployeeSalaryComponents_SalaryComponentId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<EmployeeSalaryComponent> builder)
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
