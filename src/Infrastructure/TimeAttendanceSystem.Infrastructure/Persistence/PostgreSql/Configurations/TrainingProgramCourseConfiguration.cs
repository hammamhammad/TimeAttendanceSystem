using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingProgramCourseConfiguration : IEntityTypeConfiguration<TrainingProgramCourse>
{
    public void Configure(EntityTypeBuilder<TrainingProgramCourse> builder)
    {
        builder.ToTable("TrainingProgramCourses");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Program)
            .WithMany(p => p.ProgramCourses)
            .HasForeignKey(x => x.TrainingProgramId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Course)
            .WithMany(c => c.ProgramCourses)
            .HasForeignKey(x => x.TrainingCourseId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.TrainingProgramId, x.TrainingCourseId })
            .IsUnique()
            .HasDatabaseName("IX_TrainingProgramCourses_ProgramId_CourseId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
