using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingEnrollmentConfiguration : IEntityTypeConfiguration<TrainingEnrollment>
{
    public void Configure(EntityTypeBuilder<TrainingEnrollment> builder)
    {
        builder.ToTable("TrainingEnrollments");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.CancellationReason).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Employee)
            .WithMany(e => e.TrainingEnrollments)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Session)
            .WithMany(s => s.Enrollments)
            .HasForeignKey(x => x.TrainingSessionId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.Program)
            .WithMany(p => p.Enrollments)
            .HasForeignKey(x => x.TrainingProgramId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_TrainingEnrollments_EmployeeId");
        builder.HasIndex(x => x.TrainingSessionId).HasDatabaseName("IX_TrainingEnrollments_SessionId");
        builder.HasIndex(x => x.TrainingProgramId).HasDatabaseName("IX_TrainingEnrollments_ProgramId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_TrainingEnrollments_Status");
        builder.HasIndex(x => new { x.EmployeeId, x.TrainingSessionId })
            .HasDatabaseName("IX_TrainingEnrollments_EmployeeId_SessionId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
