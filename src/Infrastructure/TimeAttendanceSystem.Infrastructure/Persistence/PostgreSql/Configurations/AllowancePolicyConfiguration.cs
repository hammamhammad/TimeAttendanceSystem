using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AllowancePolicyConfiguration : IEntityTypeConfiguration<AllowancePolicy>
{
    public void Configure(EntityTypeBuilder<AllowancePolicy> builder)
    {
        builder.ToTable("AllowancePolicies");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(500);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(500);

        builder.Property(x => x.EligibilityRules);

        builder.Property(x => x.MinAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.MaxAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.MaxPercentageOfBasic)
            .HasColumnType("decimal(8,4)");

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
        builder.HasOne(x => x.AllowanceType)
            .WithMany(x => x.Policies)
            .HasForeignKey(x => x.AllowanceTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.AllowanceTypeId)
            .HasDatabaseName("IX_AllowancePolicies_AllowanceTypeId");

        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_AllowancePolicies_BranchId");

        builder.HasIndex(x => new { x.AllowanceTypeId, x.IsActive })
            .HasDatabaseName("IX_AllowancePolicies_TypeId_IsActive");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
