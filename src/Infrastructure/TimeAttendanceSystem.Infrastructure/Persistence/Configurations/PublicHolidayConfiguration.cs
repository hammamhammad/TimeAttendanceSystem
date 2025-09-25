using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Configurations;

public class PublicHolidayConfiguration : IEntityTypeConfiguration<PublicHoliday>
{
    public void Configure(EntityTypeBuilder<PublicHoliday> builder)
    {
        builder.ToTable("PublicHolidays");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200)
            .HasComment("Name of the public holiday");

        builder.Property(x => x.NameAr)
            .HasMaxLength(200)
            .HasComment("Arabic name of the public holiday");

        builder.Property(x => x.SpecificDate)
            .HasComment("Specific date for one-time holidays");

        builder.Property(x => x.Month)
            .HasComment("Month for recurring holidays (1-12)");

        builder.Property(x => x.Day)
            .HasComment("Day of month for recurring holidays (1-31)");

        builder.Property(x => x.HolidayType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of holiday recurrence pattern");

        builder.Property(x => x.IsActive)
            .IsRequired()
            .HasComment("Whether this holiday is currently active");

        builder.Property(x => x.IsNational)
            .IsRequired()
            .HasComment("Whether this holiday applies to all branches");

        builder.Property(x => x.BranchId)
            .HasComment("Specific branch ID for regional holidays");

        builder.Property(x => x.Description)
            .HasMaxLength(500)
            .HasComment("Description or notes about the holiday");

        builder.Property(x => x.EffectiveFromYear)
            .HasComment("Year from which this holiday becomes effective");

        builder.Property(x => x.EffectiveToYear)
            .HasComment("Year until which this holiday is valid");

        builder.Property(x => x.DayOfWeek)
            .HasConversion<int?>()
            .HasComment("Day of week for floating holidays");

        builder.Property(x => x.WeekOccurrence)
            .HasComment("Week occurrence for floating holidays (1-5, -1 for last)");

        builder.Property(x => x.CountryCode)
            .HasMaxLength(3)
            .HasComment("Country code for international holiday support");

        builder.Property(x => x.Priority)
            .IsRequired()
            .HasComment("Priority when multiple holidays fall on same date");

        // Indexes
        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_PublicHolidays_IsActive");

        builder.HasIndex(x => x.IsNational)
            .HasDatabaseName("IX_PublicHolidays_IsNational");

        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_PublicHolidays_BranchId");

        builder.HasIndex(x => x.HolidayType)
            .HasDatabaseName("IX_PublicHolidays_HolidayType");

        builder.HasIndex(x => new { x.Month, x.Day })
            .HasDatabaseName("IX_PublicHolidays_MonthDay");

        builder.HasIndex(x => x.SpecificDate)
            .HasDatabaseName("IX_PublicHolidays_SpecificDate");

        builder.HasIndex(x => new { x.EffectiveFromYear, x.EffectiveToYear })
            .HasDatabaseName("IX_PublicHolidays_EffectiveYears");

        // Constraints
        builder.ToTable(t => t.HasCheckConstraint("CK_PublicHolidays_Month", "[Month] IS NULL OR ([Month] >= 1 AND [Month] <= 12)"));
        builder.ToTable(t => t.HasCheckConstraint("CK_PublicHolidays_Day", "[Day] IS NULL OR ([Day] >= 1 AND [Day] <= 31)"));
        builder.ToTable(t => t.HasCheckConstraint("CK_PublicHolidays_WeekOccurrence", "[WeekOccurrence] IS NULL OR ([WeekOccurrence] BETWEEN -1 AND 5 AND [WeekOccurrence] != 0)"));
        builder.ToTable(t => t.HasCheckConstraint("CK_PublicHolidays_Priority", "[Priority] >= 1"));
        builder.ToTable(t => t.HasCheckConstraint("CK_PublicHolidays_EffectiveYears", "[EffectiveToYear] IS NULL OR [EffectiveToYear] > [EffectiveFromYear]"));
        builder.ToTable(t => t.HasCheckConstraint("CK_PublicHolidays_BranchSpecific", "([IsNational] = 1 AND [BranchId] IS NULL) OR ([IsNational] = 0 AND [BranchId] IS NOT NULL)"));

        // Foreign key relationships
        builder.HasOne<Domain.Branches.Branch>()
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_PublicHolidays_Branches");
    }
}