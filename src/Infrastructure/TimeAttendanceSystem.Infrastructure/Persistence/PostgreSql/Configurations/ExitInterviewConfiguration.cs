using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the ExitInterview entity.
/// Defines database mapping, relationships, constraints, and indexes.
/// </summary>
public class ExitInterviewConfiguration : IEntityTypeConfiguration<ExitInterview>
{
    public void Configure(EntityTypeBuilder<ExitInterview> builder)
    {
        // Table mapping
        builder.ToTable("ExitInterviews");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.TerminationRecordId)
            .IsRequired()
            .HasComment("Termination record identifier");

        builder.Property(x => x.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier");

        builder.Property(x => x.InterviewDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Date of the exit interview");

        builder.Property(x => x.InterviewerUserId)
            .IsRequired()
            .HasComment("User who conducted the interview");

        builder.Property(x => x.OverallSatisfactionRating)
            .HasComment("Overall satisfaction rating (1-5)");

        builder.Property(x => x.ReasonForLeaving)
            .HasMaxLength(1000)
            .HasComment("Primary reason for leaving");

        builder.Property(x => x.ReasonForLeavingAr)
            .HasMaxLength(1000)
            .HasComment("Reason for leaving in Arabic");

        builder.Property(x => x.WouldRejoin)
            .HasComment("Whether employee would consider rejoining");

        builder.Property(x => x.LikedMost)
            .HasMaxLength(2000)
            .HasComment("What the employee liked most about the organization");

        builder.Property(x => x.ImprovementSuggestions)
            .HasMaxLength(2000)
            .HasComment("Suggestions for improvement");

        builder.Property(x => x.AdditionalComments)
            .HasMaxLength(2000)
            .HasComment("Any additional comments");

        builder.Property(x => x.IsConfidential)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether this interview is confidential");

        // Relationships
        builder.HasOne(x => x.TerminationRecord)
            .WithOne(x => x.ExitInterview)
            .HasForeignKey<ExitInterview>(x => x.TerminationRecordId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ExitInterviews_TerminationRecords");

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_ExitInterviews_Employees");

        // Indexes
        builder.HasIndex(x => x.TerminationRecordId)
            .IsUnique()
            .HasDatabaseName("IX_ExitInterviews_TerminationRecordId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_ExitInterviews_EmployeeId")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.InterviewDate)
            .HasDatabaseName("IX_ExitInterviews_InterviewDate")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter for soft delete
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Base entity configuration
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<ExitInterview> builder)
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
