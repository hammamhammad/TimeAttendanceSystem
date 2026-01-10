using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for EmployeeExcuse entity.
/// Defines database schema, constraints, and relationships for employee excuse management.
/// </summary>
public class EmployeeExcuseConfiguration : IEntityTypeConfiguration<EmployeeExcuse>
{
    public void Configure(EntityTypeBuilder<EmployeeExcuse> builder)
    {
        // Table configuration
        builder.ToTable("EmployeeExcuses");

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

        // Property configurations
        builder.Property(e => e.EmployeeId)
            .IsRequired();

        builder.Property(e => e.ExcuseDate)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(e => e.ExcuseType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.StartTime)
            .IsRequired()
            .HasColumnType("time");

        builder.Property(e => e.EndTime)
            .IsRequired()
            .HasColumnType("time");

        builder.Property(e => e.DurationHours)
            .IsRequired()
            .HasPrecision(5, 2)
            .HasComputedColumnSql("EXTRACT(EPOCH FROM (\"EndTime\" - \"StartTime\")) / 3600.0", stored: true);

        builder.Property(e => e.Reason)
            .IsRequired()
            .HasMaxLength(500);

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

        builder.Property(e => e.AttachmentPath)
            .IsRequired(false)
            .HasMaxLength(1000);

        builder.Property(e => e.AffectsSalary)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(e => e.ProcessingNotes)
            .IsRequired(false)
            .HasMaxLength(1000);

        // Indexes for performance
        builder.HasIndex(e => e.EmployeeId)
            .HasDatabaseName("IX_EmployeeExcuses_EmployeeId");

        builder.HasIndex(e => e.ExcuseDate)
            .HasDatabaseName("IX_EmployeeExcuses_ExcuseDate");

        builder.HasIndex(e => e.ApprovalStatus)
            .HasDatabaseName("IX_EmployeeExcuses_ApprovalStatus");

        builder.HasIndex(e => e.ExcuseType)
            .HasDatabaseName("IX_EmployeeExcuses_ExcuseType");

        builder.HasIndex(e => e.ApprovedById)
            .HasDatabaseName("IX_EmployeeExcuses_ApprovedById");

        // Composite indexes for common queries
        builder.HasIndex(e => new { e.EmployeeId, e.ExcuseDate })
            .HasDatabaseName("IX_EmployeeExcuses_EmployeeId_ExcuseDate");

        builder.HasIndex(e => new { e.ExcuseDate, e.ApprovalStatus })
            .HasDatabaseName("IX_EmployeeExcuses_ExcuseDate_ApprovalStatus");

        builder.HasIndex(e => new { e.EmployeeId, e.ExcuseDate, e.StartTime, e.EndTime })
            .HasDatabaseName("IX_EmployeeExcuses_EmployeeId_ExcuseDate_TimeRange")
            .HasFilter("\"IsDeleted\" = false AND \"ApprovalStatus\" IN (1, 2)"); // Pending or Approved

        // Constraints handled by domain model validation

        // Unique constraint to prevent overlapping excuses for the same employee on the same date
        builder.HasIndex(e => new { e.EmployeeId, e.ExcuseDate, e.StartTime, e.EndTime })
            .IsUnique()
            .HasDatabaseName("UQ_EmployeeExcuses_EmployeeId_ExcuseDate_TimeRange")
            .HasFilter("\"IsDeleted\" = false AND \"ApprovalStatus\" IN (1, 2)"); // Pending or Approved only

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