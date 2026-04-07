using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class LoanApplicationConfiguration : IEntityTypeConfiguration<LoanApplication>
{
    public void Configure(EntityTypeBuilder<LoanApplication> builder)
    {
        builder.ToTable("LoanApplications");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.RequestedAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.ApprovedAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.MonthlyInstallment).HasColumnType("decimal(18,2)");
        builder.Property(x => x.InterestRate).HasColumnType("decimal(8,4)");
        builder.Property(x => x.OutstandingBalance).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Purpose).HasMaxLength(1000);
        builder.Property(x => x.PurposeAr).HasMaxLength(1000);
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.RejectionReason).HasMaxLength(1000);
        builder.Property(x => x.Notes).HasMaxLength(2000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.LoanType)
            .WithMany()
            .HasForeignKey(x => x.LoanTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.LoanPolicy)
            .WithMany()
            .HasForeignKey(x => x.LoanPolicyId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_LoanApplications_EmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_LoanApplications_Status");
        builder.HasIndex(x => new { x.EmployeeId, x.Status }).HasDatabaseName("IX_LoanApplications_Employee_Status");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
