using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Configurations;

public class ShiftPeriodConfiguration : IEntityTypeConfiguration<ShiftPeriod>
{
    public void Configure(EntityTypeBuilder<ShiftPeriod> builder)
    {
        builder.ToTable("ShiftPeriods");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.PeriodOrder)
            .IsRequired();

        builder.Property(x => x.StartTime)
            .IsRequired();

        builder.Property(x => x.EndTime)
            .IsRequired();

        builder.Property(x => x.Hours)
            .HasPrecision(5, 2)
            .IsRequired();

        builder.Property(x => x.IsNightPeriod)
            .HasDefaultValue(false);

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsRowVersion();

        builder.HasIndex(x => new { x.ShiftId, x.PeriodOrder })
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");

        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.HasOne(x => x.Shift)
            .WithMany(x => x.ShiftPeriods)
            .HasForeignKey(x => x.ShiftId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}