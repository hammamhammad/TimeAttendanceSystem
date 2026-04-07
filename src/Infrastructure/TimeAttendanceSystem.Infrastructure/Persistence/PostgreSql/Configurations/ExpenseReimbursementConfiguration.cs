using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class ExpenseReimbursementConfiguration : IEntityTypeConfiguration<ExpenseReimbursement>
{
    public void Configure(EntityTypeBuilder<ExpenseReimbursement> builder)
    {
        builder.ToTable("ExpenseReimbursements");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Amount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Method).HasConversion<int>();
        builder.Property(x => x.ReferenceNumber).HasMaxLength(100);
        builder.Property(x => x.Notes).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.ExpenseClaim)
            .WithOne(c => c.Reimbursement)
            .HasForeignKey<ExpenseReimbursement>(x => x.ExpenseClaimId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.PayrollRecord)
            .WithMany()
            .HasForeignKey(x => x.PayrollRecordId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.ExpenseClaimId).IsUnique().HasDatabaseName("IX_ExpenseReimbursements_ExpenseClaimId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
