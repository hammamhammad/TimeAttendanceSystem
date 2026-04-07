using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for CompensatoryOff entity.
/// Defines database schema, constraints, and relationships for compensatory off management.
/// </summary>
public class CompensatoryOffConfiguration : IEntityTypeConfiguration<CompensatoryOff>
{
    public void Configure(EntityTypeBuilder<CompensatoryOff> builder)
    {
        // Table configuration
        builder.ToTable("CompensatoryOffs");

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

        // UsedVacation relationship (optional)
        builder.HasOne(e => e.UsedVacation)
            .WithMany()
            .HasForeignKey(e => e.UsedVacationId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Property configurations
        builder.Property(e => e.EmployeeId)
            .IsRequired();

        builder.Property(e => e.EarnedDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.ExpiryDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.Reason)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.ReasonAr)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(e => e.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.UsedVacationId)
            .IsRequired(false);

        builder.Property(e => e.HoursWorked)
            .HasPrecision(18, 2)
            .IsRequired(false);

        builder.Property(e => e.ApprovedByUserId)
            .IsRequired(false);

        builder.Property(e => e.Notes)
            .HasMaxLength(500)
            .IsRequired(false);

        // Indexes for performance
        builder.HasIndex(e => new { e.EmployeeId, e.Status })
            .HasDatabaseName("IX_CompensatoryOffs_EmployeeId_Status");

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
