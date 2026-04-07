using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BenefitEnrollmentConfiguration : IEntityTypeConfiguration<BenefitEnrollment>
{
    public void Configure(EntityTypeBuilder<BenefitEnrollment> builder)
    {
        builder.ToTable("BenefitEnrollments");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.TerminationReason)
            .HasMaxLength(1000);

        builder.Property(x => x.EmployeeMonthlyContribution)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.EmployerMonthlyContribution)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10)
            .HasDefaultValue("SAR");

        builder.Property(x => x.LifeEventType)
            .HasConversion<int>();

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
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BenefitPlan)
            .WithMany(x => x.Enrollments)
            .HasForeignKey(x => x.BenefitPlanId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.PlanOption)
            .WithMany()
            .HasForeignKey(x => x.BenefitPlanOptionId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.OpenEnrollmentPeriod)
            .WithMany()
            .HasForeignKey(x => x.OpenEnrollmentPeriodId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasMany(x => x.Dependents)
            .WithOne(x => x.BenefitEnrollment)
            .HasForeignKey(x => x.BenefitEnrollmentId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_BenefitEnrollments_EmployeeId");

        builder.HasIndex(x => x.BenefitPlanId)
            .HasDatabaseName("IX_BenefitEnrollments_BenefitPlanId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_BenefitEnrollments_Status");

        builder.HasIndex(x => new { x.EmployeeId, x.BenefitPlanId, x.Status })
            .HasDatabaseName("IX_BenefitEnrollments_Employee_Plan_Status");

        builder.HasIndex(x => x.OpenEnrollmentPeriodId)
            .HasDatabaseName("IX_BenefitEnrollments_OpenEnrollmentPeriodId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
