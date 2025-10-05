using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Infrastructure.Data.Configurations;

/// <summary>
/// Entity Framework Core configuration for RemoteWorkRequest entity.
/// Defines database schema, relationships, and constraints.
/// </summary>
public class RemoteWorkRequestConfiguration : IEntityTypeConfiguration<RemoteWorkRequest>
{
    public void Configure(EntityTypeBuilder<RemoteWorkRequest> builder)
    {
        // Table configuration
        builder.ToTable("RemoteWorkRequests");

        // Primary key
        builder.HasKey(a => a.Id);

        // Properties
        builder.Property(a => a.EmployeeId)
            .IsRequired();

        builder.Property(a => a.StartDate)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(a => a.EndDate)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(a => a.Reason)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(a => a.CreatedByUserId)
            .IsRequired();

        builder.Property(a => a.Status)
            .IsRequired()
            .HasDefaultValue(RemoteWorkRequestStatus.Pending);

        builder.Property(a => a.ApprovedByUserId)
            .IsRequired(false);

        builder.Property(a => a.ApprovedAt)
            .IsRequired(false);

        builder.Property(a => a.RejectionReason)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(a => a.ApprovalComments)
            .HasMaxLength(1000)
            .IsRequired(false);

        builder.Property(a => a.RemoteWorkPolicyId)
            .IsRequired();

        builder.Property(a => a.WorkingDaysCount)
            .IsRequired();

        // Audit fields from BaseEntity
        builder.Property(a => a.CreatedAtUtc)
            .IsRequired();

        builder.Property(a => a.CreatedBy)
            .IsRequired(false)
            .HasMaxLength(100);

        builder.Property(a => a.ModifiedAtUtc)
            .IsRequired(false);

        builder.Property(a => a.ModifiedBy)
            .IsRequired(false)
            .HasMaxLength(100);

        builder.Property(a => a.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(a => a.RowVersion)
            .IsRowVersion();

        // Indexes
        builder.HasIndex(a => a.EmployeeId)
            .HasDatabaseName("IX_RemoteWorkRequests_EmployeeId");

        builder.HasIndex(a => a.StartDate)
            .HasDatabaseName("IX_RemoteWorkRequests_StartDate");

        builder.HasIndex(a => a.EndDate)
            .HasDatabaseName("IX_RemoteWorkRequests_EndDate");

        builder.HasIndex(a => a.Status)
            .HasDatabaseName("IX_RemoteWorkRequests_Status");

        builder.HasIndex(a => a.RemoteWorkPolicyId)
            .HasDatabaseName("IX_RemoteWorkRequests_RemoteWorkPolicyId");

        builder.HasIndex(a => a.CreatedByUserId)
            .HasDatabaseName("IX_RemoteWorkRequests_CreatedByUserId");

        builder.HasIndex(a => a.ApprovedByUserId)
            .HasDatabaseName("IX_RemoteWorkRequests_ApprovedByUserId");

        builder.HasIndex(a => a.IsDeleted)
            .HasDatabaseName("IX_RemoteWorkRequests_IsDeleted");

        // Composite indexes for common queries
        builder.HasIndex(a => new { a.EmployeeId, a.StartDate, a.EndDate })
            .HasDatabaseName("IX_RemoteWorkRequests_Employee_Dates");

        builder.HasIndex(a => new { a.EmployeeId, a.Status, a.StartDate })
            .HasDatabaseName("IX_RemoteWorkRequests_Employee_Status_StartDate");

        // Relationships
        builder.HasOne(a => a.Employee)
            .WithMany()
            .HasForeignKey(a => a.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.CreatedByUser)
            .WithMany()
            .HasForeignKey(a => a.CreatedByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.ApprovedByUser)
            .WithMany()
            .HasForeignKey(a => a.ApprovedByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.RemoteWorkPolicy)
            .WithMany(p => p.RemoteWorkRequests)
            .HasForeignKey(a => a.RemoteWorkPolicyId)
            .OnDelete(DeleteBehavior.Restrict);

        // Query filters for soft delete
        builder.HasQueryFilter(a => !a.IsDeleted);
    }
}