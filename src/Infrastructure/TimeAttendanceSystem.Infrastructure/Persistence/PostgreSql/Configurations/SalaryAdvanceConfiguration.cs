using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class SalaryAdvanceConfiguration : IEntityTypeConfiguration<SalaryAdvance>
{
    public void Configure(EntityTypeBuilder<SalaryAdvance> builder)
    {
        builder.ToTable("SalaryAdvances");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Amount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Currency).HasMaxLength(10);
        builder.Property(x => x.Reason).HasMaxLength(1000);
        builder.Property(x => x.ReasonAr).HasMaxLength(1000);
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.RejectionReason).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.PayrollRecord)
            .WithMany()
            .HasForeignKey(x => x.PayrollRecordId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_SalaryAdvances_EmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_SalaryAdvances_Status");
        // Phase 7 (v14.7): IX_SalaryAdvances_DeductionMonth removed together with the column.
        builder.HasIndex(x => new { x.DeductionStartDate, x.DeductionEndDate })
            .HasDatabaseName("IX_SalaryAdvances_DeductionRange");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
