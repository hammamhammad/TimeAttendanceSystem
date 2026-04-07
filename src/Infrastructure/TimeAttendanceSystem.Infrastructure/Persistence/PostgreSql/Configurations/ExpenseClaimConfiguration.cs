using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class ExpenseClaimConfiguration : IEntityTypeConfiguration<ExpenseClaim>
{
    public void Configure(EntityTypeBuilder<ExpenseClaim> builder)
    {
        builder.ToTable("ExpenseClaims");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.ClaimNumber).HasMaxLength(50).IsRequired();
        builder.Property(x => x.TotalAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Currency).HasMaxLength(10);
        builder.Property(x => x.Description).HasMaxLength(2000);
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.RejectionReason).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ExpensePolicy)
            .WithMany()
            .HasForeignKey(x => x.ExpensePolicyId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.WorkflowInstance)
            .WithMany()
            .HasForeignKey(x => x.WorkflowInstanceId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_ExpenseClaims_EmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_ExpenseClaims_Status");
        builder.HasIndex(x => x.ClaimNumber).IsUnique().HasDatabaseName("IX_ExpenseClaims_ClaimNumber");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
