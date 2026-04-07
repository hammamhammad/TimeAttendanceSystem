using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeTransferConfiguration : IEntityTypeConfiguration<EmployeeTransfer>
{
    public void Configure(EntityTypeBuilder<EmployeeTransfer> builder)
    {
        builder.ToTable("EmployeeTransfers");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.FromJobTitle)
            .HasMaxLength(200);

        builder.Property(x => x.ToJobTitle)
            .HasMaxLength(200);

        builder.Property(x => x.FromJobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.ToJobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.Reason)
            .HasMaxLength(1000);

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(1000);

        builder.Property(x => x.RejectionReason)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        builder.Property(x => x.Status)
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
        builder.HasOne(x => x.Employee)
            .WithMany(x => x.Transfers)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.FromBranch)
            .WithMany()
            .HasForeignKey(x => x.FromBranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ToBranch)
            .WithMany()
            .HasForeignKey(x => x.ToBranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.FromDepartment)
            .WithMany()
            .HasForeignKey(x => x.FromDepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ToDepartment)
            .WithMany()
            .HasForeignKey(x => x.ToDepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Workflow relationship (optional)
        builder.Property(x => x.WorkflowInstanceId)
            .IsRequired(false);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeTransfers_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_EmployeeTransfers_Status");

        builder.HasIndex(x => x.EffectiveDate)
            .HasDatabaseName("IX_EmployeeTransfers_EffectiveDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
