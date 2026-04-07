using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for ShiftSwapRequest entity.
/// Defines database schema, constraints, and relationships for shift swap requests.
/// </summary>
public class ShiftSwapRequestConfiguration : IEntityTypeConfiguration<ShiftSwapRequest>
{
    public void Configure(EntityTypeBuilder<ShiftSwapRequest> builder)
    {
        // Table configuration
        builder.ToTable("ShiftSwapRequests");

        // Primary key
        builder.HasKey(e => e.Id);

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        // Employee relationship (required)
        builder.HasOne(e => e.Employee)
            .WithMany()
            .HasForeignKey(e => e.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        // SwapWithEmployee relationship (required)
        builder.HasOne(e => e.SwapWithEmployee)
            .WithMany()
            .HasForeignKey(e => e.SwapWithEmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        // OriginalShift relationship (optional)
        builder.HasOne(e => e.OriginalShift)
            .WithMany()
            .HasForeignKey(e => e.OriginalShiftId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // SwapShift relationship (optional)
        builder.HasOne(e => e.SwapShift)
            .WithMany()
            .HasForeignKey(e => e.SwapShiftId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // WorkflowInstance relationship (optional)
        builder.HasOne(e => e.WorkflowInstance)
            .WithMany()
            .HasForeignKey(e => e.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Property configurations
        builder.Property(e => e.EmployeeId)
            .IsRequired();

        builder.Property(e => e.SwapWithEmployeeId)
            .IsRequired();

        builder.Property(e => e.OriginalDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.SwapDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.Reason)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(e => e.ReasonAr)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(e => e.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.RejectionReason)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(e => e.WorkflowInstanceId)
            .IsRequired(false);

        // Indexes for performance
        builder.HasIndex(e => new { e.EmployeeId, e.OriginalDate })
            .HasDatabaseName("IX_ShiftSwapRequests_EmployeeId_OriginalDate");

        builder.HasIndex(e => new { e.SwapWithEmployeeId, e.SwapDate })
            .HasDatabaseName("IX_ShiftSwapRequests_SwapWithEmployeeId_SwapDate");

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
