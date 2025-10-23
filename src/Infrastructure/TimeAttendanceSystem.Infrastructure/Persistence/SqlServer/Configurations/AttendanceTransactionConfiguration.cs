using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer.Configurations;

/// <summary>
/// Entity Framework configuration for AttendanceTransaction entity.
/// Defines database mappings, relationships, and constraints for attendance transaction management.
/// </summary>
public class AttendanceTransactionConfiguration : IEntityTypeConfiguration<AttendanceTransaction>
{
    public void Configure(EntityTypeBuilder<AttendanceTransaction> builder)
    {
        // Table configuration
        builder.ToTable("AttendanceTransactions");

        // Primary key
        builder.HasKey(at => at.Id);

        // Properties configuration
        builder.Property(at => at.EmployeeId)
            .IsRequired();

        builder.Property(at => at.TransactionType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(at => at.TransactionTimeUtc)
            .IsRequired()
            .HasColumnType("datetime2");

        builder.Property(at => at.TransactionTimeLocal)
            .IsRequired()
            .HasColumnType("datetime2");

        builder.Property(at => at.AttendanceDate)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(at => at.IsManual)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(at => at.EnteredByUserId)
            .IsRequired(false);

        builder.Property(at => at.Notes)
            .HasMaxLength(1000)
            .IsRequired(false);

        builder.Property(at => at.Location)
            .HasMaxLength(200)
            .IsRequired(false);

        builder.Property(at => at.DeviceId)
            .HasMaxLength(100)
            .IsRequired(false);

        builder.Property(at => at.IpAddress)
            .HasMaxLength(45)
            .IsRequired(false);

        builder.Property(at => at.IsVerified)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(at => at.VerifiedByUserId)
            .IsRequired(false);

        builder.Property(at => at.VerifiedAtUtc)
            .HasColumnType("datetime2")
            .IsRequired(false);

        // Indexes
        builder.HasIndex(at => new { at.EmployeeId, at.AttendanceDate, at.TransactionTimeUtc })
            .HasDatabaseName("IX_AttendanceTransactions_Employee_Date_Time");

        builder.HasIndex(at => at.TransactionType)
            .HasDatabaseName("IX_AttendanceTransactions_TransactionType");

        builder.HasIndex(at => at.AttendanceDate)
            .HasDatabaseName("IX_AttendanceTransactions_AttendanceDate");

        builder.HasIndex(at => at.IsManual)
            .HasDatabaseName("IX_AttendanceTransactions_IsManual");

        builder.HasIndex(at => at.IsVerified)
            .HasDatabaseName("IX_AttendanceTransactions_IsVerified");

        builder.HasIndex(at => at.DeviceId)
            .HasDatabaseName("IX_AttendanceTransactions_DeviceId");

        // Relationships
        builder.HasOne(at => at.Employee)
            .WithMany()
            .HasForeignKey(at => at.EmployeeId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(at => at.EnteredByUser)
            .WithMany()
            .HasForeignKey(at => at.EnteredByUserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(at => at.VerifiedByUser)
            .WithMany()
            .HasForeignKey(at => at.VerifiedByUserId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}