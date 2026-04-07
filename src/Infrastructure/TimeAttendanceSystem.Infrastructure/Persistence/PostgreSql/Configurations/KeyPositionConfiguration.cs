using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Succession;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class KeyPositionConfiguration : IEntityTypeConfiguration<KeyPosition>
{
    public void Configure(EntityTypeBuilder<KeyPosition> builder)
    {
        builder.ToTable("KeyPositions");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.JobTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.JobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.CriticalityLevel)
            .HasConversion<int>();

        builder.Property(x => x.VacancyRisk)
            .HasConversion<int>();

        builder.Property(x => x.ImpactOfVacancy)
            .HasMaxLength(2000);

        builder.Property(x => x.ImpactOfVacancyAr)
            .HasMaxLength(2000);

        builder.Property(x => x.RequiredCompetencies)
            .HasMaxLength(2000);

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Department)
            .WithMany()
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.JobGrade)
            .WithMany()
            .HasForeignKey(x => x.JobGradeId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.CurrentHolder)
            .WithMany()
            .HasForeignKey(x => x.CurrentHolderId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasMany(x => x.SuccessionPlans)
            .WithOne(x => x.KeyPosition)
            .HasForeignKey(x => x.KeyPositionId);

        // Indexes
        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_KeyPositions_BranchId");

        builder.HasIndex(x => x.DepartmentId)
            .HasDatabaseName("IX_KeyPositions_DepartmentId");

        builder.HasIndex(x => x.JobGradeId)
            .HasDatabaseName("IX_KeyPositions_JobGradeId");

        builder.HasIndex(x => x.CurrentHolderId)
            .HasDatabaseName("IX_KeyPositions_CurrentHolderId");

        builder.HasIndex(x => x.CriticalityLevel)
            .HasDatabaseName("IX_KeyPositions_CriticalityLevel");

        builder.HasIndex(x => x.VacancyRisk)
            .HasDatabaseName("IX_KeyPositions_VacancyRisk");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
