using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TimesheetPeriodConfiguration : IEntityTypeConfiguration<TimesheetPeriod>
{
    public void Configure(EntityTypeBuilder<TimesheetPeriod> builder)
    {
        builder.ToTable("TimesheetPeriods");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.PeriodType)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Timesheets)
            .WithOne(x => x.TimesheetPeriod)
            .HasForeignKey(x => x.TimesheetPeriodId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_TimesheetPeriods_BranchId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_TimesheetPeriods_Status");

        builder.HasIndex(x => new { x.BranchId, x.StartDate, x.EndDate })
            .HasDatabaseName("IX_TimesheetPeriods_Branch_Dates");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
