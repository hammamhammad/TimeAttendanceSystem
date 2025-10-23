using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer.Configurations;

public class OvertimeConfigurationConfiguration : IEntityTypeConfiguration<OvertimeConfiguration>
{
    public void Configure(EntityTypeBuilder<OvertimeConfiguration> builder)
    {
        builder.ToTable("OvertimeConfigurations");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.EnablePreShiftOvertime)
            .IsRequired();

        builder.Property(x => x.EnablePostShiftOvertime)
            .IsRequired();

        builder.Property(x => x.NormalDayRate)
            .IsRequired()
            .HasColumnType("decimal(5,2)")
            .HasComment("Overtime rate multiplier for normal working days (e.g., 1.5 for 150%)");

        builder.Property(x => x.PublicHolidayRate)
            .IsRequired()
            .HasColumnType("decimal(5,2)")
            .HasComment("Overtime rate multiplier for public holidays (e.g., 2.0 for 200%)");

        builder.Property(x => x.OffDayRate)
            .IsRequired()
            .HasColumnType("decimal(5,2)")
            .HasComment("Overtime rate multiplier for off days/weekends (e.g., 2.5 for 250%)");

        builder.Property(x => x.MinimumOvertimeMinutes)
            .IsRequired()
            .HasComment("Minimum minutes of overtime before it counts (e.g., 15)");

        builder.Property(x => x.ConsiderFlexibleTime)
            .IsRequired()
            .HasComment("Whether to consider flexible time rules when calculating overtime");

        builder.Property(x => x.MaxPreShiftOvertimeHours)
            .IsRequired()
            .HasColumnType("decimal(4,2)")
            .HasComment("Maximum pre-shift overtime hours allowed per day");

        builder.Property(x => x.MaxPostShiftOvertimeHours)
            .IsRequired()
            .HasColumnType("decimal(4,2)")
            .HasComment("Maximum post-shift overtime hours allowed per day");

        builder.Property(x => x.RequireApproval)
            .IsRequired()
            .HasComment("Whether overtime requires manager approval");

        builder.Property(x => x.OvertimeGracePeriodMinutes)
            .IsRequired()
            .HasComment("Grace period in minutes before overtime calculation begins");

        builder.Property(x => x.WeekendAsOffDay)
            .IsRequired()
            .HasComment("Whether weekends are automatically considered off days");

        builder.Property(x => x.RoundingIntervalMinutes)
            .IsRequired()
            .HasComment("Rounding interval for overtime hours (0 = no rounding)");

        builder.Property(x => x.PolicyNotes)
            .HasMaxLength(1000)
            .HasComment("Additional notes about overtime policies");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasComment("Whether this configuration is currently active");

        builder.Property(x => x.EffectiveFromDate)
            .IsRequired()
            .HasComment("Date from which this configuration becomes effective");

        builder.Property(x => x.EffectiveToDate)
            .HasComment("Date until which this configuration is valid (null = indefinite)");

        // Indexes
        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_OvertimeConfigurations_IsActive");

        builder.HasIndex(x => new { x.EffectiveFromDate, x.EffectiveToDate })
            .HasDatabaseName("IX_OvertimeConfigurations_EffectiveDates");

        // Constraints
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_NormalDayRate", "[NormalDayRate] > 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_PublicHolidayRate", "[PublicHolidayRate] > 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_OffDayRate", "[OffDayRate] > 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_MinimumOvertimeMinutes", "[MinimumOvertimeMinutes] >= 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_MaxPreShiftOvertimeHours", "[MaxPreShiftOvertimeHours] >= 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_MaxPostShiftOvertimeHours", "[MaxPostShiftOvertimeHours] >= 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_OvertimeGracePeriodMinutes", "[OvertimeGracePeriodMinutes] >= 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_RoundingIntervalMinutes", "[RoundingIntervalMinutes] >= 0"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OvertimeConfigurations_EffectiveDates", "[EffectiveToDate] IS NULL OR [EffectiveToDate] > [EffectiveFromDate]"));
    }
}