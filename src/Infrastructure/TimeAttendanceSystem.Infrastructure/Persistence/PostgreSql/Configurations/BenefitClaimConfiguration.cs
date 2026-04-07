using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BenefitClaimConfiguration : IEntityTypeConfiguration<BenefitClaim>
{
    public void Configure(EntityTypeBuilder<BenefitClaim> builder)
    {
        builder.ToTable("BenefitClaims");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.ClaimAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.ApprovedAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10)
            .HasDefaultValue("SAR");

        builder.Property(x => x.ClaimType)
            .HasConversion<int>();

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(1000);

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

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
            .WithMany()
            .HasForeignKey(x => x.BenefitEnrollmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.BenefitEnrollmentId)
            .HasDatabaseName("IX_BenefitClaims_BenefitEnrollmentId");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_BenefitClaims_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_BenefitClaims_Status");

        builder.HasIndex(x => new { x.EmployeeId, x.Status })
            .HasDatabaseName("IX_BenefitClaims_Employee_Status");

        builder.HasIndex(x => x.ClaimDate)
            .HasDatabaseName("IX_BenefitClaims_ClaimDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
