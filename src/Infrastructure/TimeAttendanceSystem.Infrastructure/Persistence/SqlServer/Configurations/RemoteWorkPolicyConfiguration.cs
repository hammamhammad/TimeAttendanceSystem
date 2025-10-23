using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer.Configurations;

/// <summary>
/// Entity Framework Core configuration for RemoteWorkPolicy entity.
/// Defines database schema, relationships, and constraints.
/// </summary>
public class RemoteWorkPolicyConfiguration : IEntityTypeConfiguration<RemoteWorkPolicy>
{
    public void Configure(EntityTypeBuilder<RemoteWorkPolicy> builder)
    {
        // Table configuration
        builder.ToTable("RemoteWorkPolicies");

        // Primary key
        builder.HasKey(p => p.Id);

        // Properties
        builder.Property(p => p.BranchId)
            .IsRequired(false); // Nullable - null means company-wide policy

        builder.Property(p => p.MaxDaysPerWeek)
            .IsRequired(false);

        builder.Property(p => p.MaxDaysPerMonth)
            .IsRequired(false);

        builder.Property(p => p.MaxDaysPerYear)
            .IsRequired(false);

        builder.Property(p => p.RequiresManagerApproval)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(p => p.AllowConsecutiveDays)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(p => p.MaxConsecutiveDays)
            .IsRequired(false);

        builder.Property(p => p.MinAdvanceNoticeDays)
            .IsRequired(false);

        builder.Property(p => p.BlackoutPeriods)
            .HasMaxLength(4000)
            .IsRequired(false);

        builder.Property(p => p.CountForOvertime)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(p => p.EnforceShiftTimes)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(p => p.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        // Audit fields from BaseEntity
        builder.Property(p => p.CreatedAtUtc)
            .IsRequired();

        builder.Property(p => p.CreatedBy)
            .IsRequired(false)
            .HasMaxLength(100);

        builder.Property(p => p.ModifiedAtUtc)
            .IsRequired(false);

        builder.Property(p => p.ModifiedBy)
            .IsRequired(false)
            .HasMaxLength(100);

        builder.Property(p => p.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(p => p.RowVersion)
            .IsRowVersion();

        // Indexes
        builder.HasIndex(p => p.BranchId)
            .HasDatabaseName("IX_RemoteWorkPolicies_BranchId");

        builder.HasIndex(p => p.IsActive)
            .HasDatabaseName("IX_RemoteWorkPolicies_IsActive");

        builder.HasIndex(p => p.IsDeleted)
            .HasDatabaseName("IX_RemoteWorkPolicies_IsDeleted");

        // Unique constraint - one active policy per branch
        builder.HasIndex(p => new { p.BranchId, p.IsActive, p.IsDeleted })
            .HasDatabaseName("IX_RemoteWorkPolicies_BranchId_IsActive_IsDeleted")
            .HasFilter("[IsActive] = 1 AND [IsDeleted] = 0");

        // Relationships
        builder.HasOne(p => p.Branch)
            .WithMany()
            .HasForeignKey(p => p.BranchId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false); // Allow null for company-wide policies

        builder.HasMany(p => p.RemoteWorkRequests)
            .WithOne(a => a.RemoteWorkPolicy)
            .HasForeignKey(a => a.RemoteWorkPolicyId)
            .OnDelete(DeleteBehavior.Restrict);

        // Query filters for soft delete
        builder.HasQueryFilter(p => !p.IsDeleted);
    }
}