using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BenefitPlanConfiguration : IEntityTypeConfiguration<BenefitPlan>
{
    public void Configure(EntityTypeBuilder<BenefitPlan> builder)
    {
        builder.ToTable("BenefitPlans");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(x => x.Code)
            .IsUnique()
            .HasDatabaseName("IX_BenefitPlans_Code");

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.BenefitType)
            .HasConversion<int>();

        builder.Property(x => x.EmployeePremiumAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.EmployerPremiumAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10)
            .HasDefaultValue("SAR");

        builder.Property(x => x.CoverageDetails)
            .HasMaxLength(4000);

        builder.Property(x => x.CoverageDetailsAr)
            .HasMaxLength(4000);

        builder.Property(x => x.DependentPremiumAmount)
            .HasColumnType("decimal(18,2)");

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
        builder.HasOne(x => x.InsuranceProvider)
            .WithMany()
            .HasForeignKey(x => x.InsuranceProviderId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasMany(x => x.Options)
            .WithOne(x => x.BenefitPlan)
            .HasForeignKey(x => x.BenefitPlanId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.EligibilityRules)
            .WithOne(x => x.BenefitPlan)
            .HasForeignKey(x => x.BenefitPlanId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Enrollments)
            .WithOne(x => x.BenefitPlan)
            .HasForeignKey(x => x.BenefitPlanId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.BenefitType)
            .HasDatabaseName("IX_BenefitPlans_BenefitType");

        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_BenefitPlans_IsActive");

        builder.HasIndex(x => x.PlanYear)
            .HasDatabaseName("IX_BenefitPlans_PlanYear");

        builder.HasIndex(x => x.InsuranceProviderId)
            .HasDatabaseName("IX_BenefitPlans_InsuranceProviderId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
