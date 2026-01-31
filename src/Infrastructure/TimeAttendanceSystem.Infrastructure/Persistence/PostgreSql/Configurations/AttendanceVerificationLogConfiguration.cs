using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the AttendanceVerificationLog entity.
/// Defines database mapping, relationships, and indexes for audit logging of mobile check-in attempts.
/// </summary>
public class AttendanceVerificationLogConfiguration : IEntityTypeConfiguration<AttendanceVerificationLog>
{
    public void Configure(EntityTypeBuilder<AttendanceVerificationLog> builder)
    {
        // Table mapping
        builder.ToTable("AttendanceVerificationLogs");

        // Primary key
        builder.HasKey(l => l.Id);

        // Properties configuration
        builder.Property(l => l.EmployeeId)
            .IsRequired()
            .HasComment("Employee attempting check-in/out");

        builder.Property(l => l.BranchId)
            .IsRequired()
            .HasComment("Branch where verification was attempted");

        builder.Property(l => l.AttemptedAt)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasComment("Timestamp of verification attempt");

        builder.Property(l => l.TransactionType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of transaction: CheckIn, CheckOut, BreakStart, BreakEnd");

        builder.Property(l => l.Status)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Outcome: Success or Failed");

        builder.Property(l => l.FailureReason)
            .HasConversion<int>()
            .HasComment("Specific reason for failure if applicable");

        builder.Property(l => l.DeviceLatitude)
            .HasComment("Latitude reported by employee's device");

        builder.Property(l => l.DeviceLongitude)
            .HasComment("Longitude reported by employee's device");

        builder.Property(l => l.DistanceFromBranch)
            .HasComment("Calculated distance in meters from branch");

        builder.Property(l => l.ScannedTagUid)
            .HasMaxLength(100)
            .HasComment("NFC tag UID that was scanned");

        builder.Property(l => l.ExpectedTagUids)
            .HasMaxLength(500)
            .HasComment("Expected tag UIDs for the branch (comma-separated)");

        builder.Property(l => l.DeviceId)
            .HasMaxLength(100)
            .HasComment("Unique identifier of the mobile device");

        builder.Property(l => l.DeviceModel)
            .HasMaxLength(100)
            .HasComment("Device model/manufacturer");

        builder.Property(l => l.DevicePlatform)
            .HasMaxLength(20)
            .HasComment("Device platform: ios or android");

        builder.Property(l => l.AppVersion)
            .HasMaxLength(50)
            .HasComment("Version of the mobile app used");

        // Relationships
        builder.HasOne(l => l.Employee)
            .WithMany()
            .HasForeignKey(l => l.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_AttendanceVerificationLogs_Employees");

        builder.HasOne(l => l.Branch)
            .WithMany()
            .HasForeignKey(l => l.BranchId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_AttendanceVerificationLogs_Branches");

        // Indexes
        builder.HasIndex(l => l.EmployeeId)
            .HasDatabaseName("IX_AttendanceVerificationLogs_EmployeeId");

        builder.HasIndex(l => l.BranchId)
            .HasDatabaseName("IX_AttendanceVerificationLogs_BranchId");

        builder.HasIndex(l => l.AttemptedAt)
            .HasDatabaseName("IX_AttendanceVerificationLogs_AttemptedAt")
            .IsDescending();

        builder.HasIndex(l => l.Status)
            .HasDatabaseName("IX_AttendanceVerificationLogs_Status");

        builder.HasIndex(l => new { l.EmployeeId, l.AttemptedAt })
            .HasDatabaseName("IX_AttendanceVerificationLogs_EmployeeId_AttemptedAt")
            .IsDescending(false, true);

        builder.HasIndex(l => new { l.Status, l.AttemptedAt })
            .HasDatabaseName("IX_AttendanceVerificationLogs_Status_AttemptedAt")
            .HasFilter("\"Status\" = 2")  // Failed status only
            .IsDescending(false, true);

        // Note: No query filter - audit logs should never be hidden
        // Note: No soft delete - audit data is immutable

        // Base entity configuration (without soft delete for audit logs)
        ConfigureBaseEntity(builder);
    }

    private void ConfigureBaseEntity(EntityTypeBuilder<AttendanceVerificationLog> builder)
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
            .HasComment("Soft delete flag - should remain false for audit logs");

        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 })
            .HasComment("Concurrency control timestamp");
    }
}
