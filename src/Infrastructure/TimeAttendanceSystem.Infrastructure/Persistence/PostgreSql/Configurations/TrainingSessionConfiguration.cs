using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingSessionConfiguration : IEntityTypeConfiguration<TrainingSession>
{
    public void Configure(EntityTypeBuilder<TrainingSession> builder)
    {
        builder.ToTable("TrainingSessions");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).HasMaxLength(500);
        builder.Property(x => x.Location).HasMaxLength(500);
        builder.Property(x => x.LocationAr).HasMaxLength(500);
        builder.Property(x => x.InstructorName).HasMaxLength(300);
        builder.Property(x => x.InstructorNameAr).HasMaxLength(300);
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.Notes).HasMaxLength(2000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Course)
            .WithMany(c => c.Sessions)
            .HasForeignKey(x => x.TrainingCourseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Program)
            .WithMany()
            .HasForeignKey(x => x.TrainingProgramId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.TrainingCourseId).HasDatabaseName("IX_TrainingSessions_CourseId");
        builder.HasIndex(x => x.TrainingProgramId).HasDatabaseName("IX_TrainingSessions_ProgramId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_TrainingSessions_Status");
        builder.HasIndex(x => x.StartDate).HasDatabaseName("IX_TrainingSessions_StartDate");
        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_TrainingSessions_BranchId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
