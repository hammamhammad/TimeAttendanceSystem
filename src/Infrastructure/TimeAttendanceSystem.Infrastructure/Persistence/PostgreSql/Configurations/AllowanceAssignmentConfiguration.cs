using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AllowanceAssignmentConfiguration : IEntityTypeConfiguration<AllowanceAssignment>
{
    public void Configure(EntityTypeBuilder<AllowanceAssignment> builder)
    {
        builder.ToTable("AllowanceAssignments");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Amount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Percentage)
            .HasColumnType("decimal(8,4)");

        builder.Property(x => x.Currency)
            .HasMaxLength(10);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.CalculationType)
            .HasConversion<int>();

        builder.Property(x => x.Reason)
            .HasMaxLength(1000);

        builder.Property(x => x.ReasonAr)
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
            .WithMany(x => x.Assignments)
            .HasForeignKey(x => x.AllowanceTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.AllowanceRequest)
            .WithMany(x => x.ResultingAssignments)
            .HasForeignKey(x => x.AllowanceRequestId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_AllowanceAssignments_EmployeeId");

        builder.HasIndex(x => x.AllowanceTypeId)
            .HasDatabaseName("IX_AllowanceAssignments_AllowanceTypeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_AllowanceAssignments_Status");

        builder.HasIndex(x => new { x.EmployeeId, x.AllowanceTypeId, x.Status })
            .HasDatabaseName("IX_AllowanceAssignments_Employee_Type_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
