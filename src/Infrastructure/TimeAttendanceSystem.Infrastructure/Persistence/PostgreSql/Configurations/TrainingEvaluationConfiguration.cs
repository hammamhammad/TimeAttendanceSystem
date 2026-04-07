using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingEvaluationConfiguration : IEntityTypeConfiguration<TrainingEvaluation>
{
    public void Configure(EntityTypeBuilder<TrainingEvaluation> builder)
    {
        builder.ToTable("TrainingEvaluations");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Comments).HasMaxLength(2000);
        builder.Property(x => x.CommentsAr).HasMaxLength(2000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Session)
            .WithMany()
            .HasForeignKey(x => x.TrainingSessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.TrainingSessionId).HasDatabaseName("IX_TrainingEvaluations_SessionId");
        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_TrainingEvaluations_EmployeeId");
        builder.HasIndex(x => new { x.TrainingSessionId, x.EmployeeId })
            .IsUnique()
            .HasDatabaseName("IX_TrainingEvaluations_Session_Employee");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
