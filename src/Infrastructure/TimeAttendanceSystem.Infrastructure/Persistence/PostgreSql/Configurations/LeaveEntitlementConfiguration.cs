using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for LeaveEntitlement entity.
/// Defines database schema, constraints, and relationships for leave entitlements.
/// </summary>
public class LeaveEntitlementConfiguration : IEntityTypeConfiguration<LeaveEntitlement>
{
    public void Configure(EntityTypeBuilder<LeaveEntitlement> builder)
    {
        // Table configuration
        builder.ToTable("LeaveEntitlements");

        // Primary key
        builder.HasKey(e => e.Id);

        // Employee relationship (required)
        builder.HasOne(e => e.Employee)
            .WithMany()
            .HasForeignKey(e => e.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // VacationType relationship (required)
        builder.HasOne(e => e.VacationType)
            .WithMany()
            .HasForeignKey(e => e.VacationTypeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        // Property configurations
        builder.Property(e => e.Year)
            .IsRequired();

        builder.Property(e => e.AnnualDays)
            .HasPrecision(5, 2)
            .IsRequired();

        builder.Property(e => e.CarryOverDays)
            .HasPrecision(5, 2)
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(e => e.MaxCarryOverDays)
            .HasPrecision(5, 2)
            .IsRequired(false);

        builder.Property(e => e.ExpiresAtYearEnd)
            .HasDefaultValue(true)
            .IsRequired();

        builder.Property(e => e.EffectiveStartDate)
            .IsRequired(false);

        builder.Property(e => e.EffectiveEndDate)
            .IsRequired(false);

        builder.Property(e => e.Notes)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(e => e.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(255)
            .IsRequired(false);

        builder.Property(e => e.ModifiedAtUtc)
            .IsRequired(false);

        builder.Property(e => e.ModifiedBy)
            .HasMaxLength(255)
            .IsRequired(false);

        // Unique constraint: One entitlement per employee per vacation type per year
        builder.HasIndex(e => new { e.EmployeeId, e.VacationTypeId, e.Year })
            .IsUnique()
            .HasDatabaseName("IX_LeaveEntitlements_Employee_VacationType_Year");

        // Index for querying by year
        builder.HasIndex(e => e.Year)
            .HasDatabaseName("IX_LeaveEntitlements_Year");
    }
}
