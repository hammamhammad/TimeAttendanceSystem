using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingProgramConfiguration : IEntityTypeConfiguration<TrainingProgram>
{
    public void Configure(EntityTypeBuilder<TrainingProgram> builder)
    {
        builder.ToTable("TrainingPrograms");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code).HasMaxLength(50).IsRequired();
        builder.Property(x => x.Title).HasMaxLength(500).IsRequired();
        builder.Property(x => x.TitleAr).HasMaxLength(500);
        builder.Property(x => x.Description).HasMaxLength(2000);
        builder.Property(x => x.DescriptionAr).HasMaxLength(2000);
        builder.Property(x => x.TargetAudience).HasMaxLength(1000);
        builder.Property(x => x.TargetAudienceAr).HasMaxLength(1000);
        builder.Property(x => x.TotalDurationHours).HasColumnType("decimal(8,2)");
        builder.Property(x => x.Status).HasConversion<int>();

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasIndex(x => x.Code).IsUnique().HasDatabaseName("IX_TrainingPrograms_Code");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_TrainingPrograms_Status");
        builder.HasIndex(x => x.IsActive).HasDatabaseName("IX_TrainingPrograms_IsActive");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
