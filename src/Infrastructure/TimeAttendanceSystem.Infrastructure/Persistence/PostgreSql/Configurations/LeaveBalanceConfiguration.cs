using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for LeaveBalance entity.
/// Defines database schema, constraints, and relationships for leave balances.
/// </summary>
public class LeaveBalanceConfiguration : IEntityTypeConfiguration<LeaveBalance>
{
    public void Configure(EntityTypeBuilder<LeaveBalance> builder)
    {
        // Table configuration
        builder.ToTable("LeaveBalances");

        // Primary key
        builder.HasKey(b => b.Id);

        // Employee relationship (required)
        builder.HasOne(b => b.Employee)
            .WithMany()
            .HasForeignKey(b => b.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // VacationType relationship (required)
        builder.HasOne(b => b.VacationType)
            .WithMany()
            .HasForeignKey(b => b.VacationTypeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        // Transactions relationship
        builder.HasMany(b => b.Transactions)
            .WithOne(t => t.LeaveBalance)
            .HasForeignKey(t => t.LeaveBalanceId)
            .OnDelete(DeleteBehavior.Cascade);

        // Property configurations
        builder.Property(b => b.Year)
            .IsRequired();

        builder.Property(b => b.EntitledDays)
            .HasPrecision(5, 2)
            .IsRequired();

        builder.Property(b => b.AccruedDays)
            .HasPrecision(5, 2)
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(b => b.UsedDays)
            .HasPrecision(5, 2)
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(b => b.PendingDays)
            .HasPrecision(5, 2)
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(b => b.AdjustedDays)
            .HasPrecision(5, 2)
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(b => b.LastAccrualDate)
            .IsRequired(false);

        builder.Property(b => b.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property(b => b.ModifiedAtUtc)
            .IsRequired(false);

        // Computed column for current balance
        // Note: This is calculated in the entity, not in database for PostgreSQL
        builder.Ignore(b => b.CurrentBalance);

        // Unique constraint: One balance per employee per vacation type per year
        builder.HasIndex(b => new { b.EmployeeId, b.VacationTypeId, b.Year })
            .IsUnique()
            .HasDatabaseName("IX_LeaveBalances_Employee_VacationType_Year");

        // Index for querying by year
        builder.HasIndex(b => b.Year)
            .HasDatabaseName("IX_LeaveBalances_Year");

        // Index for querying by employee
        builder.HasIndex(b => b.EmployeeId)
            .HasDatabaseName("IX_LeaveBalances_EmployeeId");
    }
}
