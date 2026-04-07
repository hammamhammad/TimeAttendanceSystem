using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BenefitDependentConfiguration : IEntityTypeConfiguration<BenefitDependent>
{
    public void Configure(EntityTypeBuilder<BenefitDependent> builder)
    {
        builder.ToTable("BenefitDependents");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.FirstName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.FirstNameAr)
            .HasMaxLength(100);

        builder.Property(x => x.LastName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.LastNameAr)
            .HasMaxLength(100);

        builder.Property(x => x.Relationship)
            .HasConversion<int>();

        builder.Property(x => x.NationalId)
            .HasMaxLength(50);

        builder.Property(x => x.AdditionalPremium)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10)
            .HasDefaultValue("SAR");

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
        builder.HasOne(x => x.BenefitEnrollment)
            .WithMany(x => x.Dependents)
            .HasForeignKey(x => x.BenefitEnrollmentId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.EmployeeDependent)
            .WithMany()
            .HasForeignKey(x => x.EmployeeDependentId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.BenefitEnrollmentId)
            .HasDatabaseName("IX_BenefitDependents_BenefitEnrollmentId");

        builder.HasIndex(x => x.EmployeeDependentId)
            .HasDatabaseName("IX_BenefitDependents_EmployeeDependentId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
