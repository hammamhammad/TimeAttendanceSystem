using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the TaxBracket entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class TaxBracketConfiguration : IEntityTypeConfiguration<TaxBracket>
{
    public void Configure(EntityTypeBuilder<TaxBracket> builder)
    {
        // Table mapping
        builder.ToTable("TaxBrackets");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.TaxConfigurationId)
            .IsRequired()
            .HasComment("Tax configuration identifier");

        builder.Property(x => x.MinAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Minimum income amount for this bracket");

        builder.Property(x => x.MaxAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Maximum income amount for this bracket");

        builder.Property(x => x.Rate)
            .IsRequired()
            .HasColumnType("decimal(18,4)")
            .HasComment("Tax rate for this bracket");

        builder.Property(x => x.FixedAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Fixed tax amount for this bracket");

        // Relationships
        builder.HasOne(x => x.TaxConfiguration)
            .WithMany(x => x.Brackets)
            .HasForeignKey(x => x.TaxConfigurationId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_TaxBrackets_TaxConfigurations");

        // Indexes
        builder.HasIndex(x => x.TaxConfigurationId)
            .HasDatabaseName("IX_TaxBrackets_TaxConfigurationId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<TaxBracket> builder)
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
