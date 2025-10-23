using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for WorkingDay entity.
/// Defines database mappings, relationships, and constraints for working day analysis.
/// </summary>
public class WorkingDayConfiguration : IEntityTypeConfiguration<WorkingDay>
{
    public void Configure(EntityTypeBuilder<WorkingDay> builder)
    {
        // Table configuration
        builder.ToTable("WorkingDays");

        // Primary key
        builder.HasKey(wd => wd.Id);

        // Properties configuration
        builder.Property(wd => wd.AttendanceRecordId)
            .IsRequired();

        builder.Property(wd => wd.WorkStartTime)
            .HasColumnType("datetime2")
            .IsRequired(false);

        builder.Property(wd => wd.WorkEndTime)
            .HasColumnType("datetime2")
            .IsRequired(false);

        builder.Property(wd => wd.TotalTimeOnPremises)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.ProductiveWorkingTime)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.TotalBreakTime)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.BreakPeriodCount)
            .IsRequired();

        builder.Property(wd => wd.LongestBreakDuration)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.CoreHoursWorked)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.CoreHoursCompliant)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(wd => wd.RegularOvertimeHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.PremiumOvertimeHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.EarlyStartHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.LateEndHours)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.EfficiencyPercentage)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.TrackingGaps)
            .HasColumnType("decimal(5,2)")
            .IsRequired();

        builder.Property(wd => wd.IsCalculationComplete)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(wd => wd.CalculationNotes)
            .HasMaxLength(1000)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(wd => wd.AttendanceRecordId)
            .IsUnique()
            .HasDatabaseName("IX_WorkingDays_AttendanceRecordId");

        builder.HasIndex(wd => wd.CoreHoursCompliant)
            .HasDatabaseName("IX_WorkingDays_CoreHoursCompliant");

        builder.HasIndex(wd => wd.IsCalculationComplete)
            .HasDatabaseName("IX_WorkingDays_IsCalculationComplete");

        // Relationships
        builder.HasOne(wd => wd.AttendanceRecord)
            .WithOne()
            .HasForeignKey<WorkingDay>(wd => wd.AttendanceRecordId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}