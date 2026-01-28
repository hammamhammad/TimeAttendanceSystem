using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for AttendanceCorrectionRequest entity.
/// Defines database schema, constraints, and relationships for attendance correction management.
/// </summary>
public class AttendanceCorrectionRequestConfiguration : IEntityTypeConfiguration<AttendanceCorrectionRequest>
{
    public void Configure(EntityTypeBuilder<AttendanceCorrectionRequest> builder)
    {
        // Table configuration
        builder.ToTable("AttendanceCorrectionRequests");

        // Primary key
        builder.HasKey(e => e.Id);

        // Employee relationship (required)
        builder.HasOne(e => e.Employee)
            .WithMany()
            .HasForeignKey(e => e.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        // Approver relationship (optional)
        builder.HasOne(e => e.ApprovedBy)
            .WithMany()
            .HasForeignKey(e => e.ApprovedById)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Workflow instance relationship (optional)
        builder.Property(e => e.WorkflowInstanceId)
            .IsRequired(false);

        builder.HasOne(e => e.WorkflowInstance)
            .WithMany()
            .HasForeignKey(e => e.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Created transaction relationship (optional)
        builder.HasOne(e => e.CreatedTransaction)
            .WithMany()
            .HasForeignKey(e => e.CreatedTransactionId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Property configurations
        builder.Property(e => e.EmployeeId)
            .IsRequired();

        builder.Property(e => e.CorrectionDate)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(e => e.CorrectionTime)
            .IsRequired()
            .HasColumnType("time");

        builder.Property(e => e.CorrectionType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.Reason)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.AttachmentPath)
            .IsRequired(false)
            .HasMaxLength(1000);

        builder.Property(e => e.ApprovalStatus)
            .IsRequired()
            .HasConversion<int>()
            .HasDefaultValue(ApprovalStatus.Pending);

        builder.Property(e => e.ApprovedById)
            .IsRequired(false);

        builder.Property(e => e.ApprovedAt)
            .IsRequired(false)
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.RejectionReason)
            .IsRequired(false)
            .HasMaxLength(500);

        builder.Property(e => e.ProcessingNotes)
            .IsRequired(false)
            .HasMaxLength(1000);

        builder.Property(e => e.SubmittedByUserId)
            .IsRequired(false);

        builder.Property(e => e.CreatedTransactionId)
            .IsRequired(false);

        // Indexes for performance
        builder.HasIndex(e => e.EmployeeId)
            .HasDatabaseName("IX_AttendanceCorrectionRequests_EmployeeId");

        builder.HasIndex(e => e.CorrectionDate)
            .HasDatabaseName("IX_AttendanceCorrectionRequests_CorrectionDate");

        builder.HasIndex(e => e.ApprovalStatus)
            .HasDatabaseName("IX_AttendanceCorrectionRequests_ApprovalStatus");

        builder.HasIndex(e => e.CorrectionType)
            .HasDatabaseName("IX_AttendanceCorrectionRequests_CorrectionType");

        builder.HasIndex(e => e.ApprovedById)
            .HasDatabaseName("IX_AttendanceCorrectionRequests_ApprovedById");

        // Composite indexes for common queries
        builder.HasIndex(e => new { e.EmployeeId, e.CorrectionDate })
            .HasDatabaseName("IX_AttendanceCorrectionRequests_EmployeeId_CorrectionDate");

        builder.HasIndex(e => new { e.CorrectionDate, e.ApprovalStatus })
            .HasDatabaseName("IX_AttendanceCorrectionRequests_CorrectionDate_ApprovalStatus");

        builder.HasIndex(e => new { e.EmployeeId, e.CorrectionDate, e.CorrectionType })
            .HasDatabaseName("IX_AttendanceCorrectionRequests_EmployeeId_CorrectionDate_CorrectionType")
            .HasFilter("\"IsDeleted\" = false AND \"ApprovalStatus\" IN (1, 2)"); // Pending or Approved

        // Unique constraint to prevent duplicate pending corrections for the same employee, date, and type
        builder.HasIndex(e => new { e.EmployeeId, e.CorrectionDate, e.CorrectionType })
            .IsUnique()
            .HasDatabaseName("UQ_AttendanceCorrectionRequests_EmployeeId_CorrectionDate_CorrectionType")
            .HasFilter("\"IsDeleted\" = false AND \"ApprovalStatus\" = 1"); // Pending only

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        // Base entity configuration (Id, audit fields, soft delete)
        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity<T>(EntityTypeBuilder<T> builder) where T : class
    {
        // Configure audit fields from BaseEntity
        builder.Property("CreatedAtUtc")
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property("ModifiedAtUtc")
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property("CreatedBy")
            .HasMaxLength(100);

        builder.Property("ModifiedBy")
            .HasMaxLength(100);

        builder.Property("IsDeleted")
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property("RowVersion")
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });
    }
}
