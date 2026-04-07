using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the SalaryStructure entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class SalaryStructureConfiguration : IEntityTypeConfiguration<SalaryStructure>
{
    public void Configure(EntityTypeBuilder<SalaryStructure> builder)
    {
        // Table mapping
        builder.ToTable("SalaryStructures");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Salary structure name");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Salary structure name in Arabic");

        builder.Property(x => x.Description)
            .HasMaxLength(500)
            .HasComment("Description of the salary structure");

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(500)
            .HasComment("Description in Arabic");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this salary structure is active");

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false)
            .HasConstraintName("FK_SalaryStructures_Branches");

        builder.HasMany(x => x.Components)
            .WithOne(x => x.SalaryStructure)
            .HasForeignKey(x => x.SalaryStructureId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_SalaryComponents_SalaryStructures");

        // Indexes
        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_SalaryStructures_BranchId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_SalaryStructures_IsActive")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<SalaryStructure> builder)
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
