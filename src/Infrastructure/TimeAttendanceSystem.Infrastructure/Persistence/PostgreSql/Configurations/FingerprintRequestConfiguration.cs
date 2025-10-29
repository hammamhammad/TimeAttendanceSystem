using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.FingerprintRequests;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity configuration for FingerprintRequest
/// </summary>
public class FingerprintRequestConfiguration : IEntityTypeConfiguration<FingerprintRequest>
{
    public void Configure(EntityTypeBuilder<FingerprintRequest> builder)
    {
        builder.ToTable("FingerprintRequests");

        builder.HasKey(fr => fr.Id);

        // Configure properties
        builder.Property(fr => fr.RequestType)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(fr => fr.IssueDescription)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(fr => fr.AffectedFingers)
            .HasMaxLength(200);

        builder.Property(fr => fr.PreferredDate)
            .HasColumnType("date");

        builder.Property(fr => fr.PreferredTime)
            .HasColumnType("time");

        builder.Property(fr => fr.ScheduledDate)
            .HasColumnType("date");

        builder.Property(fr => fr.ScheduledTime)
            .HasColumnType("time");

        builder.Property(fr => fr.CompletedDate)
            .HasColumnType("timestamp");

        builder.Property(fr => fr.Status)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(fr => fr.TechnicianNotes)
            .HasMaxLength(1000);

        // Configure relationships
        builder.HasOne(fr => fr.Employee)
            .WithMany()
            .HasForeignKey(fr => fr.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        builder.HasOne(fr => fr.Technician)
            .WithMany()
            .HasForeignKey(fr => fr.TechnicianId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false);

        // Configure indexes for performance
        builder.HasIndex(fr => fr.EmployeeId)
            .HasDatabaseName("IX_FingerprintRequests_EmployeeId");

        builder.HasIndex(fr => fr.Status)
            .HasDatabaseName("IX_FingerprintRequests_Status");

        builder.HasIndex(fr => fr.ScheduledDate)
            .HasDatabaseName("IX_FingerprintRequests_ScheduledDate");

        builder.HasIndex(fr => new { fr.EmployeeId, fr.Status })
            .HasDatabaseName("IX_FingerprintRequests_EmployeeId_Status");

        // Soft delete filter
        builder.HasQueryFilter(fr => !fr.IsDeleted);
    }
}
