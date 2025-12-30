using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for LeaveAccrualPolicy entity.
/// Defines database schema, constraints, and relationships for leave accrual policies.
/// </summary>
public class LeaveAccrualPolicyConfiguration : IEntityTypeConfiguration<LeaveAccrualPolicy>
{
    public void Configure(EntityTypeBuilder<LeaveAccrualPolicy> builder)
    {
        // Table configuration
        builder.ToTable("LeaveAccrualPolicies");

        // Primary key
        builder.HasKey(p => p.Id);

        // VacationType relationship (required)
        builder.HasOne(p => p.VacationType)
            .WithMany()
            .HasForeignKey(p => p.VacationTypeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        // Property configurations
        builder.Property(p => p.Name)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(p => p.Description)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(p => p.AccrualFrequency)
            .HasMaxLength(50)
            .HasDefaultValue("Monthly")
            .IsRequired();

        builder.Property(p => p.IsMonthlyAccrual)
            .HasDefaultValue(true)
            .IsRequired();

        builder.Property(p => p.ProrateMidYearHires)
            .HasDefaultValue(true)
            .IsRequired();

        builder.Property(p => p.MinimumServiceMonths)
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(p => p.MaxAccrualCap)
            .HasPrecision(5, 2)
            .IsRequired(false);

        builder.Property(p => p.AllowsCarryOver)
            .HasDefaultValue(false)
            .IsRequired();

        builder.Property(p => p.MaxCarryOverDays)
            .HasPrecision(5, 2)
            .IsRequired(false);

        builder.Property(p => p.ExpiresAtYearEnd)
            .HasDefaultValue(true)
            .IsRequired();

        builder.Property(p => p.CarryOverExpiryMonths)
            .IsRequired(false);

        builder.Property(p => p.IsActive)
            .HasDefaultValue(true)
            .IsRequired();

        builder.Property(p => p.EffectiveStartDate)
            .IsRequired(false);

        builder.Property(p => p.EffectiveEndDate)
            .IsRequired(false);

        builder.Property(p => p.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property(p => p.CreatedBy)
            .HasMaxLength(255)
            .IsRequired(false);

        builder.Property(p => p.ModifiedAtUtc)
            .IsRequired(false);

        builder.Property(p => p.ModifiedBy)
            .HasMaxLength(255)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(p => p.VacationTypeId)
            .HasDatabaseName("IX_LeaveAccrualPolicies_VacationTypeId");

        builder.HasIndex(p => p.IsActive)
            .HasDatabaseName("IX_LeaveAccrualPolicies_IsActive");

        // Unique constraint: One active policy per vacation type
        builder.HasIndex(p => new { p.VacationTypeId, p.IsActive })
            .HasDatabaseName("IX_LeaveAccrualPolicies_VacationType_Active")
            .HasFilter("\"IsActive\" = true");
    }
}
