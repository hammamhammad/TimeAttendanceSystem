using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class InterviewScheduleConfiguration : IEntityTypeConfiguration<InterviewSchedule>
{
    public void Configure(EntityTypeBuilder<InterviewSchedule> builder)
    {
        builder.ToTable("InterviewSchedules");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.InterviewType)
            .HasConversion<int>();

        builder.Property(x => x.Result)
            .HasConversion<int>();

        builder.Property(x => x.Location)
            .HasMaxLength(200);

        builder.Property(x => x.MeetingLink)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        builder.Property(x => x.CancellationReason)
            .HasMaxLength(500);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.JobApplication)
            .WithMany(x => x.Interviews)
            .HasForeignKey(x => x.JobApplicationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.InterviewerEmployee)
            .WithMany()
            .HasForeignKey(x => x.InterviewerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.JobApplicationId).HasDatabaseName("IX_InterviewSchedules_JobApplicationId");
        builder.HasIndex(x => x.InterviewerEmployeeId).HasDatabaseName("IX_InterviewSchedules_InterviewerEmployeeId");
        builder.HasIndex(x => x.ScheduledDate).HasDatabaseName("IX_InterviewSchedules_ScheduledDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
