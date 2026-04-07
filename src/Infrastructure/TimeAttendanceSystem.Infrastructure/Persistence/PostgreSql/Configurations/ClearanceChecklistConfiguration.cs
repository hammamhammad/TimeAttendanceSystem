using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the ClearanceChecklist entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class ClearanceChecklistConfiguration : IEntityTypeConfiguration<ClearanceChecklist>
{
    public void Configure(EntityTypeBuilder<ClearanceChecklist> builder)
    {
        // Table mapping
        builder.ToTable("ClearanceChecklists");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.TerminationRecordId)
            .IsRequired()
            .HasComment("Termination record identifier");

        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.OverallStatus)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Overall clearance status");

        builder.Property(x => x.CompletedAt)
            .HasColumnType("timestamp with time zone")
            .HasComment("When clearance was completed");

        // Relationships
        builder.HasOne(x => x.TerminationRecord)
            .WithOne(x => x.ClearanceChecklist)
            .HasForeignKey<ClearanceChecklist>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ClearanceChecklists_TerminationRecords");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_ClearanceChecklists_Employees");

        builder.HasMany(x => x.Items)
            .WithOne(x => x.ClearanceChecklist)
            .HasForeignKey(x => x.ClearanceChecklistId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ClearanceItems_ClearanceChecklists");

        // Indexes
        builder.HasIndex(x => x.TerminationRecordId)
            .IsUnique()
            .HasDatabaseName("IX_ClearanceChecklists_TerminationRecordId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_ClearanceChecklists_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.OverallStatus)
            .HasDatabaseName("IX_ClearanceChecklists_OverallStatus")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<ClearanceChecklist> builder)
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
