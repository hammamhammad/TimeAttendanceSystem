using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BenefitPlanOptionConfiguration : IEntityTypeConfiguration<BenefitPlanOption>
{
    public void Configure(EntityTypeBuilder<BenefitPlanOption> builder)
    {
        builder.ToTable("BenefitPlanOptions");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.EmployeeCost)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.EmployerCost)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10)
            .HasDefaultValue("SAR");

        builder.Property(x => x.CoverageLevel)
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
            .WithMany(x => x.Options)
            .HasForeignKey(x => x.BenefitPlanId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.BenefitPlanId)
            .HasDatabaseName("IX_BenefitPlanOptions_BenefitPlanId");

        builder.HasIndex(x => x.IsActive)
            .HasDatabaseName("IX_BenefitPlanOptions_IsActive");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
