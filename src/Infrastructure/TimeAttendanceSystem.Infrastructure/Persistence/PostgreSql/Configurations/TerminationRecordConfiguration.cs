using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the TerminationRecord entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class TerminationRecordConfiguration : IEntityTypeConfiguration<TerminationRecord>
{
    public void Configure(EntityTypeBuilder<TerminationRecord> builder)
    {
        // Table mapping
        builder.ToTable("TerminationRecords");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.TerminationType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of termination (Resignation, Dismissal, etc.)");

        builder.Property(x => x.TerminationDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Date of termination");

        builder.Property(x => x.LastWorkingDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Last working date");

        builder.Property(x => x.Reason)
            .HasMaxLength(1000)
            .HasComment("Reason for termination");

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(1000)
            .HasComment("Reason for termination in Arabic");

        builder.Property(x => x.ResignationRequestId)
            .IsRequired(false)
            .HasComment("Linked resignation request if applicable");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000)
            .HasComment("Additional notes");

        // Relationships
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_TerminationRecords_Employees");

        builder.HasOne(x => x.ResignationRequest)
            .WithMany()
            .HasForeignKey(x => x.ResignationRequestId)
            .OnDelete(DeleteBehavior.SetNull)
            .HasConstraintName("FK_TerminationRecords_ResignationRequests");

        builder.HasOne(x => x.ClearanceChecklist)
            .WithOne(x => x.TerminationRecord)
            .HasForeignKey<ClearanceChecklist>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ClearanceChecklists_TerminationRecords");

        builder.HasOne(x => x.EndOfServiceBenefit)
            .WithOne(x => x.TerminationRecord)
            .HasForeignKey<EndOfServiceBenefit>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_EndOfServiceBenefits_TerminationRecords");

        builder.HasOne(x => x.FinalSettlement)
            .WithOne(x => x.TerminationRecord)
            .HasForeignKey<FinalSettlement>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_FinalSettlements_TerminationRecords");

        builder.HasOne(x => x.ExitInterview)
            .WithOne(x => x.TerminationRecord)
            .HasForeignKey<ExitInterview>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ExitInterviews_TerminationRecords");

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_TerminationRecords_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.TerminationType)
            .HasDatabaseName("IX_TerminationRecords_TerminationType")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.TerminationDate)
            .HasDatabaseName("IX_TerminationRecords_TerminationDate")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<TerminationRecord> builder)
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
