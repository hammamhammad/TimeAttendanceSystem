using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for LeaveEncashment entity.
/// Defines database schema, constraints, and relationships for leave encashment management.
/// </summary>
public class LeaveEncashmentConfiguration : IEntityTypeConfiguration<LeaveEncashment>
{
    public void Configure(EntityTypeBuilder<LeaveEncashment> builder)
    {
        // Table configuration
        builder.ToTable("LeaveEncashments");

        // Primary key
        builder.HasKey(e => e.Id);

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

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

        // PayrollRecord relationship (optional)
        builder.HasOne(e => e.PayrollRecord)
            .WithMany()
            .HasForeignKey(e => e.PayrollRecordId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Property configurations
        builder.Property(e => e.EmployeeId)
            .IsRequired();

        builder.Property(e => e.VacationTypeId)
            .IsRequired();

        builder.Property(e => e.Year)
            .IsRequired();

        builder.Property(e => e.DaysEncashed)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(e => e.AmountPerDay)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(e => e.TotalAmount)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(e => e.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.PayrollRecordId)
            .IsRequired(false);

        builder.Property(e => e.ApprovedByUserId)
            .IsRequired(false);

        builder.Property(e => e.Notes)
            .HasMaxLength(500)
            .IsRequired(false);

        // Indexes for performance
        builder.HasIndex(e => new { e.EmployeeId, e.Year })
            .HasDatabaseName("IX_LeaveEncashments_EmployeeId_Year");

        // Base entity configuration
        builder.Property(e => e.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(100);

        builder.Property(e => e.ModifiedAtUtc)
            .IsRequired(false);

        builder.Property(e => e.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(e => e.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });
    }
}
