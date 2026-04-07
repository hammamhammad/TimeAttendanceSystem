using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the SalaryComponent entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class SalaryComponentConfiguration : IEntityTypeConfiguration<SalaryComponent>
{
    public void Configure(EntityTypeBuilder<SalaryComponent> builder)
    {
        // Table mapping
        builder.ToTable("SalaryComponents");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Component name");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Component name in Arabic");

        builder.Property(x => x.ComponentType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of salary component (Earning, Deduction, etc.)");

        builder.Property(x => x.CalculationType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("How the component amount is calculated");

        builder.Property(x => x.Amount)
            .HasColumnType("decimal(18,2)")
            .HasComment("Fixed amount for the component");

        builder.Property(x => x.Percentage)
            .HasColumnType("decimal(8,4)")
            .HasComment("Percentage of base salary");

        builder.Property(x => x.IsRecurring)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this component recurs every pay period");

        builder.Property(x => x.IsTaxable)
            .IsRequired()
            .HasComment("Whether this component is subject to tax");

        builder.Property(x => x.IsSocialInsurable)
            .IsRequired()
            .HasComment("Whether this component is subject to social insurance");

        builder.Property(x => x.DisplayOrder)
            .IsRequired()
            .HasComment("Display order for UI rendering");

        // Relationships
        builder.HasOne(x => x.SalaryStructure)
            .WithMany(x => x.Components)
            .HasForeignKey(x => x.SalaryStructureId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_SalaryComponents_SalaryStructures");

        builder.HasOne(x => x.AllowanceType)
            .WithMany()
            .HasForeignKey(x => x.AllowanceTypeId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.SalaryStructureId)
            .HasDatabaseName("IX_SalaryComponents_SalaryStructureId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.ComponentType)
            .HasDatabaseName("IX_SalaryComponents_ComponentType")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<SalaryComponent> builder)
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
