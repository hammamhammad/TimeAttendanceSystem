using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AllowanceRequestConfiguration : IEntityTypeConfiguration<AllowanceRequest>
{
    public void Configure(EntityTypeBuilder<AllowanceRequest> builder)
    {
        builder.ToTable("AllowanceRequests");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.RequestedAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.RequestedPercentage)
            .HasColumnType("decimal(8,4)");

        builder.Property(x => x.Reason)
            .HasMaxLength(1000);

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(1000);

        builder.Property(x => x.Justification)
            .HasMaxLength(2000);

        builder.Property(x => x.SupportingDocumentUrl)
            .HasMaxLength(500);

        builder.Property(x => x.RequestType)
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(1000);

        builder.Property(x => x.ApprovalComments)
            .HasMaxLength(1000);

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

        builder.HasOne(x => x.AllowanceType)
            .WithMany()
            .HasForeignKey(x => x.AllowanceTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.AllowancePolicy)
            .WithMany(x => x.Requests)
            .HasForeignKey(x => x.AllowancePolicyId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_AllowanceRequests_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_AllowanceRequests_Status");

        builder.HasIndex(x => new { x.EmployeeId, x.Status })
            .HasDatabaseName("IX_AllowanceRequests_Employee_Status");

        builder.HasIndex(x => x.AllowanceTypeId)
            .HasDatabaseName("IX_AllowanceRequests_AllowanceTypeId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
