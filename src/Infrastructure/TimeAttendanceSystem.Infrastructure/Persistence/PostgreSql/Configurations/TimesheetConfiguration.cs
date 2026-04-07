using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TimesheetConfiguration : IEntityTypeConfiguration<Timesheet>
{
    public void Configure(EntityTypeBuilder<Timesheet> builder)
    {
        builder.ToTable("Timesheets");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.TotalHours)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.RegularHours)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.OvertimeHours)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(1000);

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

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
        builder.HasOne(x => x.TimesheetPeriod)
            .WithMany(x => x.Timesheets)
            .HasForeignKey(x => x.TimesheetPeriodId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasMany(x => x.Entries)
            .WithOne(x => x.Timesheet)
            .HasForeignKey(x => x.TimesheetId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => new { x.TimesheetPeriodId, x.EmployeeId })
            .IsUnique()
            .HasDatabaseName("IX_Timesheets_Period_Employee");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_Timesheets_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_Timesheets_Status");

        builder.HasIndex(x => x.WorkflowInstanceId)
            .HasDatabaseName("IX_Timesheets_WorkflowInstanceId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
