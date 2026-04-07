using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BenefitEligibilityRuleConfiguration : IEntityTypeConfiguration<BenefitEligibilityRule>
{
    public void Configure(EntityTypeBuilder<BenefitEligibilityRule> builder)
    {
        builder.ToTable("BenefitEligibilityRules");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.RuleType)
            .HasConversion<int>();

        builder.Property(x => x.EmploymentStatusRequired)
            .HasConversion<int>();

        builder.Property(x => x.ContractTypeRequired)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.BenefitPlan)
            .WithMany(x => x.EligibilityRules)
            .HasForeignKey(x => x.BenefitPlanId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Department)
            .WithMany()
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.BenefitPlanId)
            .HasDatabaseName("IX_BenefitEligibilityRules_BenefitPlanId");

        builder.HasIndex(x => x.DepartmentId)
            .HasDatabaseName("IX_BenefitEligibilityRules_DepartmentId");

        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_BenefitEligibilityRules_BranchId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
