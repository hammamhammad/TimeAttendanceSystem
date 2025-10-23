using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

public class OffDayConfiguration : IEntityTypeConfiguration<OffDay>
{
    public void Configure(EntityTypeBuilder<OffDay> builder)
    {
        builder.ToTable("OffDays");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Name/description of the off day configuration");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Arabic name of the off day configuration");

        builder.Property(x => x.OffDayType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of off day configuration (weekly/custom period)");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasComment("Whether this off day configuration is currently active");

        builder.Property(x => x.IsCompanyWide)
            .IsRequired()
            .HasComment("Whether this applies to all branches");

        builder.Property(x => x.BranchId)
            .HasComment("Specific branch ID for branch-specific off days");

        builder.Property(x => x.StartDate)
            .HasComment("Start date for custom period off days");

        builder.Property(x => x.EndDate)
            .HasComment("End date for custom period off days");

        builder.Property(x => x.IsSunday)
            .IsRequired()
            .HasComment("Whether Sunday is an off day");

        builder.Property(x => x.IsMonday)
            .IsRequired()
            .HasComment("Whether Monday is an off day");

        builder.Property(x => x.IsTuesday)
            .IsRequired()
            .HasComment("Whether Tuesday is an off day");

        builder.Property(x => x.IsWednesday)
            .IsRequired()
            .HasComment("Whether Wednesday is an off day");

        builder.Property(x => x.IsThursday)
            .IsRequired()
            .HasComment("Whether Thursday is an off day");

        builder.Property(x => x.IsFriday)
            .IsRequired()
            .HasComment("Whether Friday is an off day");

        builder.Property(x => x.IsSaturday)
            .IsRequired()
            .HasComment("Whether Saturday is an off day");

        builder.Property(x => x.Description)
            .HasMaxLength(500)
            .HasComment("Description or notes about the off day configuration");

        builder.Property(x => x.Priority)
            .IsRequired()
            .HasComment("Priority when multiple configurations overlap");

        builder.Property(x => x.OverridesPublicHolidays)
            .IsRequired()
            .HasComment("Whether this off day overrides public holidays");

        builder.Property(x => x.EffectiveFromDate)
            .IsRequired()
            .HasComment("Date from which this configuration becomes effective");

        builder.Property(x => x.EffectiveToDate)
            .HasComment("Date until which this configuration is valid");

        // Indexes
        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_OffDays_IsActive");

        builder.HasIndex(x => x.IsCompanyWide)
            .HasDatabaseName("IX_OffDays_IsCompanyWide");

        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_OffDays_BranchId");

        builder.HasIndex(x => x.OffDayType)
            .HasDatabaseName("IX_OffDays_OffDayType");

        builder.HasIndex(x => new { x.StartDate, x.EndDate })
            .HasDatabaseName("IX_OffDays_DateRange");

        builder.HasIndex(x => new { x.EffectiveFromDate, x.EffectiveToDate })
            .HasDatabaseName("IX_OffDays_EffectiveDates");

        builder.HasIndex(x => x.Priority)
            .HasDatabaseName("IX_OffDays_Priority");

        // Constraints
        builder.ToTable(t => t.HasCheckConstraint("CK_OffDays_Priority", "[Priority] >= 1"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OffDays_EffectiveDates", "[EffectiveToDate] IS NULL OR [EffectiveToDate] > [EffectiveFromDate]"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OffDays_CustomPeriodDates", "[OffDayType] != 1 OR ([StartDate] IS NOT NULL AND [EndDate] IS NOT NULL AND [EndDate] > [StartDate])"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OffDays_BranchSpecific", "([IsCompanyWide] = 1 AND [BranchId] IS NULL) OR ([IsCompanyWide] = 0 AND [BranchId] IS NOT NULL)"));
        builder.ToTable(t => t.HasCheckConstraint("CK_OffDays_WeeklyPattern", "[OffDayType] != 0 OR ([IsSunday] = 1 OR [IsMonday] = 1 OR [IsTuesday] = 1 OR [IsWednesday] = 1 OR [IsThursday] = 1 OR [IsFriday] = 1 OR [IsSaturday] = 1)"));

        // Foreign key relationships
        builder.HasOne<Domain.Branches.Branch>()
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_OffDays_Branches");
    }
}