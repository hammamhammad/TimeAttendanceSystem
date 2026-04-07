using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingAttendanceConfiguration : IEntityTypeConfiguration<TrainingAttendance>
{
    public void Configure(EntityTypeBuilder<TrainingAttendance> builder)
    {
        builder.ToTable("TrainingAttendanceRecords");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.Notes).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Session)
            .WithMany(s => s.Attendances)
            .HasForeignKey(x => x.TrainingSessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.TrainingSessionId).HasDatabaseName("IX_TrainingAttendance_SessionId");
        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_TrainingAttendance_EmployeeId");
        builder.HasIndex(x => new { x.TrainingSessionId, x.EmployeeId, x.AttendanceDate })
            .IsUnique()
            .HasDatabaseName("IX_TrainingAttendance_Session_Employee_Date");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
