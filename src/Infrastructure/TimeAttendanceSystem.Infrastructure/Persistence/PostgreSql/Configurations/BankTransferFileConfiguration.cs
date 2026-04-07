using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the BankTransferFile entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class BankTransferFileConfiguration : IEntityTypeConfiguration<BankTransferFile>
{
    public void Configure(EntityTypeBuilder<BankTransferFile> builder)
    {
        // Table mapping
        builder.ToTable("BankTransferFiles");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.PayrollPeriodId)
            .IsRequired()
            .HasComment("Payroll period identifier");

        builder.Property(x => x.FileName)
            .IsRequired()
            .HasMaxLength(500)
            .HasComment("Generated file name");

        builder.Property(x => x.FileFormat)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Bank file format (CSV, WPS, SAM, etc.)");

        builder.Property(x => x.GeneratedAt)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("When the file was generated");

        builder.Property(x => x.GeneratedByUserId)
            .IsRequired()
            .HasComment("User who generated the file");

        builder.Property(x => x.TotalAmount)
            .IsRequired()
            .HasColumnType("decimal(18,2)")
            .HasComment("Total transfer amount in the file");

        builder.Property(x => x.RecordCount)
            .IsRequired()
            .HasComment("Number of transfer records in the file");

        builder.Property(x => x.FileUrl)
            .HasMaxLength(500)
            .HasComment("URL or path to the generated file");

        // Relationships
        builder.HasOne(x => x.PayrollPeriod)
            .WithMany(x => x.BankTransferFiles)
            .HasForeignKey(x => x.PayrollPeriodId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_BankTransferFiles_PayrollPeriods");

        // Indexes
        builder.HasIndex(x => x.PayrollPeriodId)
            .HasDatabaseName("IX_BankTransferFiles_PayrollPeriodId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<BankTransferFile> builder)
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
