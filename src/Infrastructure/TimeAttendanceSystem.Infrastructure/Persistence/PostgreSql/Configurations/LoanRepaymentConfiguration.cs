using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class LoanRepaymentConfiguration : IEntityTypeConfiguration<LoanRepayment>
{
    public void Configure(EntityTypeBuilder<LoanRepayment> builder)
    {
        builder.ToTable("LoanRepayments");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Amount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.PrincipalAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.InterestAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.BalanceRemaining).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.Notes).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.LoanApplication)
            .WithMany(l => l.Repayments)
            .HasForeignKey(x => x.LoanApplicationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.PayrollRecord)
            .WithMany()
            .HasForeignKey(x => x.PayrollRecordId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.LoanApplicationId).HasDatabaseName("IX_LoanRepayments_LoanApplicationId");
        builder.HasIndex(x => x.DueDate).HasDatabaseName("IX_LoanRepayments_DueDate");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_LoanRepayments_Status");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
