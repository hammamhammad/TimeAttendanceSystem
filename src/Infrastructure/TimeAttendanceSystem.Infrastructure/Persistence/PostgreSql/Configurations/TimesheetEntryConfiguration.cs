using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TimesheetEntryConfiguration : IEntityTypeConfiguration<TimesheetEntry>
{
    public void Configure(EntityTypeBuilder<TimesheetEntry> builder)
    {
        builder.ToTable("TimesheetEntries");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Hours)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.OvertimeHours)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

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
        builder.HasOne(x => x.Timesheet)
            .WithMany(x => x.Entries)
            .HasForeignKey(x => x.TimesheetId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Project)
            .WithMany()
            .HasForeignKey(x => x.ProjectId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ProjectTask)
            .WithMany()
            .HasForeignKey(x => x.ProjectTaskId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.AttendanceRecord)
            .WithMany()
            .HasForeignKey(x => x.AttendanceRecordId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.TimesheetId)
            .HasDatabaseName("IX_TimesheetEntries_TimesheetId");

        builder.HasIndex(x => x.ProjectId)
            .HasDatabaseName("IX_TimesheetEntries_ProjectId");

        builder.HasIndex(x => x.ProjectTaskId)
            .HasDatabaseName("IX_TimesheetEntries_ProjectTaskId");

        builder.HasIndex(x => new { x.TimesheetId, x.EntryDate })
            .HasDatabaseName("IX_TimesheetEntries_Timesheet_Date");

        builder.HasIndex(x => x.AttendanceRecordId)
            .HasDatabaseName("IX_TimesheetEntries_AttendanceRecordId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
