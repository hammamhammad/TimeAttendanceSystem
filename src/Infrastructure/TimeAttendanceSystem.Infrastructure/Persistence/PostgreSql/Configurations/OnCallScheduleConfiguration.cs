using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for OnCallSchedule entity.
/// Defines database schema, constraints, and relationships for on-call schedule management.
/// </summary>
public class OnCallScheduleConfiguration : IEntityTypeConfiguration<OnCallSchedule>
{
    public void Configure(EntityTypeBuilder<OnCallSchedule> builder)
    {
        // Table configuration
        builder.ToTable("OnCallSchedules");

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

        // Shift relationship (optional)
        builder.HasOne(e => e.Shift)
            .WithMany()
            .HasForeignKey(e => e.ShiftId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Property configurations
        builder.Property(e => e.EmployeeId)
            .IsRequired();

        builder.Property(e => e.StartDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.EndDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.OnCallType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.ShiftId)
            .IsRequired(false);

        builder.Property(e => e.Notes)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(e => e.NotesAr)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(e => e.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        // Indexes for performance
        builder.HasIndex(e => new { e.EmployeeId, e.StartDate, e.EndDate })
            .HasDatabaseName("IX_OnCallSchedules_EmployeeId_StartDate_EndDate");

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
