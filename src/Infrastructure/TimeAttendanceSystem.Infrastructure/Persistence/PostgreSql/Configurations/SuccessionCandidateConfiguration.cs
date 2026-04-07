using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Succession;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SuccessionCandidateConfiguration : IEntityTypeConfiguration<SuccessionCandidate>
{
    public void Configure(EntityTypeBuilder<SuccessionCandidate> builder)
    {
        builder.ToTable("SuccessionCandidates");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.ReadinessLevel)
            .HasConversion<int>();

        builder.Property(x => x.ReadinessTimeline)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.DevelopmentPlan)
            .HasMaxLength(2000);

        builder.Property(x => x.DevelopmentPlanAr)
            .HasMaxLength(2000);

        builder.Property(x => x.GapAnalysis)
            .HasMaxLength(2000);

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.SuccessionPlan)
            .WithMany(x => x.Candidates)
            .HasForeignKey(x => x.SuccessionPlanId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.TalentProfile)
            .WithMany()
            .HasForeignKey(x => x.TalentProfileId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.SuccessionPlanId)
            .HasDatabaseName("IX_SuccessionCandidates_SuccessionPlanId");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_SuccessionCandidates_EmployeeId");

        builder.HasIndex(x => x.TalentProfileId)
            .HasDatabaseName("IX_SuccessionCandidates_TalentProfileId");

        builder.HasIndex(x => new { x.SuccessionPlanId, x.EmployeeId })
            .IsUnique()
            .HasDatabaseName("IX_SuccessionCandidates_Plan_Employee_Unique")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
