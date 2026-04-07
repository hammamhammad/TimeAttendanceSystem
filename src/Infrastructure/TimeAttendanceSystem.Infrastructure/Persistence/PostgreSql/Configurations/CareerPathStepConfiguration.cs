using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Succession;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class CareerPathStepConfiguration : IEntityTypeConfiguration<CareerPathStep>
{
    public void Configure(EntityTypeBuilder<CareerPathStep> builder)
    {
        builder.ToTable("CareerPathSteps");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.JobTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.JobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.RequiredCompetencies)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.CareerPath)
            .WithMany(x => x.Steps)
            .HasForeignKey(x => x.CareerPathId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.FromJobGrade)
            .WithMany()
            .HasForeignKey(x => x.FromJobGradeId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.ToJobGrade)
            .WithMany()
            .HasForeignKey(x => x.ToJobGradeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.CareerPathId)
            .HasDatabaseName("IX_CareerPathSteps_CareerPathId");

        builder.HasIndex(x => new { x.CareerPathId, x.StepOrder })
            .HasDatabaseName("IX_CareerPathSteps_Path_Order");

        builder.HasIndex(x => x.FromJobGradeId)
            .HasDatabaseName("IX_CareerPathSteps_FromJobGradeId");

        builder.HasIndex(x => x.ToJobGradeId)
            .HasDatabaseName("IX_CareerPathSteps_ToJobGradeId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
