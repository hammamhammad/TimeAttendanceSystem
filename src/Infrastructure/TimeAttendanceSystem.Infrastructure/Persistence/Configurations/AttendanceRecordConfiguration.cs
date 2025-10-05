using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Configurations;

/// <summary>
/// Entity Framework configuration for AttendanceRecord entity.
/// Defines database mappings, relationships, and constraints for attendance record management.
/// </summary>
public class AttendanceRecordConfiguration : IEntityTypeConfiguration<AttendanceRecord>
{
    public void Configure(EntityTypeBuilder<AttendanceRecord> builder)
    {
        // Table configuration
        builder.ToTable("AttendanceRecords");

        // Primary key
        builder.HasKey(ar => ar.Id);

        // Properties configuration
        builder.Property(ar => ar.EmployeeId)
            .IsRequired();

        builder.Property(ar => ar.AttendanceDate)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(ar => ar.ShiftAssignmentId)
            .IsRequired(false);

        builder.Property(ar => ar.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(ar => ar.ScheduledStartTime)
            .HasColumnType("time")
            .IsRequired(false);

        builder.Property(ar => ar.ScheduledEndTime)
            .HasColumnType("time")
            .IsRequired(false);

        builder.Property(ar => ar.ActualCheckInTime)
            .HasColumnType("datetime2")
            .IsRequired(false);

        builder.Property(ar => ar.ActualCheckOutTime)
            .HasColumnType("datetime2")
            .IsRequired(false);

        builder.Property(ar => ar.ScheduledHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(ar => ar.WorkingHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(ar => ar.BreakHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(ar => ar.OvertimeHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(ar => ar.PreShiftOvertimeHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired()
            .HasDefaultValue(0);

        builder.Property(ar => ar.PostShiftOvertimeHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired()
            .HasDefaultValue(0);

        builder.Property(ar => ar.OvertimeRate)
            .HasColumnType("decimal(4,2)")
            .IsRequired()
            .HasDefaultValue(0);

        builder.Property(ar => ar.OvertimeAmount)
            .HasColumnType("decimal(10,2)")
            .IsRequired()
            .HasDefaultValue(0);

        builder.Property(ar => ar.OvertimeDayType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(ar => ar.OvertimeConfigurationId)
            .IsRequired(false);

        builder.Property(ar => ar.OvertimeCalculationNotes)
            .HasMaxLength(2000)
            .IsRequired(false);

        builder.Property(ar => ar.LateMinutes)
            .IsRequired();

        builder.Property(ar => ar.EarlyLeaveMinutes)
            .IsRequired();

        builder.Property(ar => ar.IsManualOverride)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(ar => ar.OverrideByUserId)
            .IsRequired(false);

        builder.Property(ar => ar.OverrideAtUtc)
            .HasColumnType("datetime2")
            .IsRequired(false);

        builder.Property(ar => ar.OverrideNotes)
            .HasMaxLength(1000)
            .IsRequired(false);

        builder.Property(ar => ar.IsApproved)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(ar => ar.ApprovedByUserId)
            .IsRequired(false);

        builder.Property(ar => ar.ApprovedAtUtc)
            .HasColumnType("datetime2")
            .IsRequired(false);

        builder.Property(ar => ar.IsFinalized)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(ar => ar.Notes)
            .HasMaxLength(2000)
            .IsRequired(false);

        builder.Property(ar => ar.WorkLocation)
            .IsRequired()
            .HasConversion<int>()
            .HasDefaultValue(WorkLocationType.OnSite);

        builder.Property(ar => ar.RemoteWorkRequestId)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(ar => new { ar.EmployeeId, ar.AttendanceDate })
            .IsUnique()
            .HasDatabaseName("IX_AttendanceRecords_Employee_Date");

        builder.HasIndex(ar => ar.AttendanceDate)
            .HasDatabaseName("IX_AttendanceRecords_AttendanceDate");

        builder.HasIndex(ar => ar.Status)
            .HasDatabaseName("IX_AttendanceRecords_Status");

        builder.HasIndex(ar => new { ar.IsApproved, ar.IsFinalized })
            .HasDatabaseName("IX_AttendanceRecords_Approval_Status");

        builder.HasIndex(ar => ar.OvertimeConfigurationId)
            .HasDatabaseName("IX_AttendanceRecords_OvertimeConfiguration");

        builder.HasIndex(ar => ar.OvertimeDayType)
            .HasDatabaseName("IX_AttendanceRecords_OvertimeDayType");

        builder.HasIndex(ar => ar.WorkLocation)
            .HasDatabaseName("IX_AttendanceRecords_WorkLocation");

        builder.HasIndex(ar => ar.RemoteWorkRequestId)
            .HasDatabaseName("IX_AttendanceRecords_RemoteWorkRequest");

        // Relationships
        builder.HasOne(ar => ar.Employee)
            .WithMany()
            .HasForeignKey(ar => ar.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(ar => ar.ShiftAssignment)
            .WithMany()
            .HasForeignKey(ar => ar.ShiftAssignmentId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(ar => ar.Transactions)
            .WithOne()
            .HasForeignKey("AttendanceRecordId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(ar => ar.RemoteWorkRequest)
            .WithMany()
            .HasForeignKey(ar => ar.RemoteWorkRequestId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}