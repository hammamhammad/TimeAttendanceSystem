using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer.Configurations;

/// <summary>
/// Entity Framework configuration for ExcusePolicy entity.
/// Defines database schema, constraints, and relationships for excuse policy management.
/// </summary>
public class ExcusePolicyConfiguration : IEntityTypeConfiguration<ExcusePolicy>
{
    public void Configure(EntityTypeBuilder<ExcusePolicy> builder)
    {
        // Table configuration
        builder.ToTable("ExcusePolicies");

        // Primary key
        builder.HasKey(e => e.Id);

        // Branch relationship (optional - null means organization-wide)
        builder.HasOne(e => e.Branch)
            .WithMany()
            .HasForeignKey(e => e.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Property configurations
        builder.Property(e => e.BranchId)
            .IsRequired(false);

        builder.Property(e => e.MaxPersonalExcusesPerMonth)
            .IsRequired()
            .HasDefaultValue(5);

        builder.Property(e => e.MaxPersonalExcuseHoursPerMonth)
            .IsRequired()
            .HasPrecision(5, 2)
            .HasDefaultValue(8.0m);

        builder.Property(e => e.MaxPersonalExcuseHoursPerDay)
            .IsRequired()
            .HasPrecision(5, 2)
            .HasDefaultValue(4.0m);

        builder.Property(e => e.MaxHoursPerExcuse)
            .IsRequired()
            .HasPrecision(5, 2)
            .HasDefaultValue(2.0m);

        builder.Property(e => e.RequiresApproval)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(e => e.AllowPartialHourExcuses)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(e => e.MinimumExcuseDuration)
            .IsRequired()
            .HasPrecision(5, 2)
            .HasDefaultValue(0.5m);

        builder.Property(e => e.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(e => e.MaxRetroactiveDays)
            .IsRequired()
            .HasDefaultValue(7);

        builder.Property(e => e.AllowSelfServiceRequests)
            .IsRequired()
            .HasDefaultValue(true);

        // Indexes for performance
        builder.HasIndex(e => e.BranchId)
            .HasDatabaseName("IX_ExcusePolicies_BranchId");

        builder.HasIndex(e => e.IsActive)
            .HasDatabaseName("IX_ExcusePolicies_IsActive");

        // Composite index for branch-scoped policy lookups
        builder.HasIndex(e => new { e.BranchId, e.IsActive })
            .HasDatabaseName("IX_ExcusePolicies_BranchId_IsActive");

        // Check constraints for business rules
        builder.HasCheckConstraint("CK_ExcusePolicies_MaxPersonalExcusesPerMonth",
            "[MaxPersonalExcusesPerMonth] > 0");

        builder.HasCheckConstraint("CK_ExcusePolicies_MaxPersonalExcuseHoursPerMonth",
            "[MaxPersonalExcuseHoursPerMonth] > 0");

        builder.HasCheckConstraint("CK_ExcusePolicies_MaxPersonalExcuseHoursPerDay",
            "[MaxPersonalExcuseHoursPerDay] > 0");

        builder.HasCheckConstraint("CK_ExcusePolicies_MaxHoursPerExcuse",
            "[MaxHoursPerExcuse] > 0");

        builder.HasCheckConstraint("CK_ExcusePolicies_MinimumExcuseDuration",
            "[MinimumExcuseDuration] > 0");

        builder.HasCheckConstraint("CK_ExcusePolicies_MaxRetroactiveDays",
            "[MaxRetroactiveDays] >= 0");

        // Business rule constraints
        builder.HasCheckConstraint("CK_ExcusePolicies_DailyVsMonthlyLimits",
            "[MaxPersonalExcuseHoursPerDay] <= [MaxPersonalExcuseHoursPerMonth]");

        builder.HasCheckConstraint("CK_ExcusePolicies_SingleVsDailyLimits",
            "[MaxHoursPerExcuse] <= [MaxPersonalExcuseHoursPerDay]");

        builder.HasCheckConstraint("CK_ExcusePolicies_MinimumVsMaximumDuration",
            "[MinimumExcuseDuration] <= [MaxHoursPerExcuse]");

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
            .HasDefaultValueSql("GETUTCDATE()");

        builder.Property("ModifiedAtUtc")
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()");

        builder.Property("CreatedBy")
            .HasMaxLength(100);

        builder.Property("ModifiedBy")
            .HasMaxLength(100);

        builder.Property("IsDeleted")
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property("RowVersion")
            .IsRequired()
            .IsRowVersion();
    }
}