using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
{
    public void Configure(EntityTypeBuilder<Shift> builder)
    {
        builder.ToTable("Shifts");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.Property(x => x.ShiftType)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(x => x.Status)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(x => x.RequiredHours)
            .HasPrecision(5, 2);

        builder.Property(x => x.FlexMinutesBefore)
            .HasDefaultValue(null);

        builder.Property(x => x.FlexMinutesAfter)
            .HasDefaultValue(null);

        builder.Property(x => x.GracePeriodMinutes)
            .HasDefaultValue(null);

        // Extended Business Rules - Weekly Hours and Core Hours
        builder.Property(x => x.RequiredWeeklyHours)
            .HasPrecision(5, 2)
            .HasDefaultValue(null);

        builder.Property(x => x.HasCoreHours)
            .HasDefaultValue(false);

        builder.Property(x => x.CoreStart)
            .HasDefaultValue(null);

        builder.Property(x => x.CoreEnd)
            .HasDefaultValue(null);

        // Working Days
        builder.Property(x => x.IsSunday)
            .HasDefaultValue(false);

        builder.Property(x => x.IsMonday)
            .HasDefaultValue(true);

        builder.Property(x => x.IsTuesday)
            .HasDefaultValue(true);

        builder.Property(x => x.IsWednesday)
            .HasDefaultValue(true);

        builder.Property(x => x.IsThursday)
            .HasDefaultValue(true);

        builder.Property(x => x.IsFriday)
            .HasDefaultValue(true);

        builder.Property(x => x.IsSaturday)
            .HasDefaultValue(false);

        builder.Property(x => x.IsNightShift)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(x => x.IsDefault)
            .IsRequired()
            .HasDefaultValue(false);

        // Map IsCheckInRequired to RequiresCheckInOut column for backward compatibility
        builder.Property(x => x.IsCheckInRequired)
            .HasColumnName("RequiresCheckInOut")
            .HasDefaultValue(true);

        builder.Property(x => x.IsAutoCheckOut)
            .HasDefaultValue(false);

        builder.Property(x => x.AllowFlexibleHours)
            .HasDefaultValue(false);

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        builder.HasIndex(x => x.Name)
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.HasMany(x => x.ShiftPeriods)
            .WithOne(x => x.Shift)
            .HasForeignKey(x => x.ShiftId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}