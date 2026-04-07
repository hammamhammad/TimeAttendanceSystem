using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class ExpenseClaimItemConfiguration : IEntityTypeConfiguration<ExpenseClaimItem>
{
    public void Configure(EntityTypeBuilder<ExpenseClaimItem> builder)
    {
        builder.ToTable("ExpenseClaimItems");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Description).HasMaxLength(500).IsRequired();
        builder.Property(x => x.DescriptionAr).HasMaxLength(500);
        builder.Property(x => x.Amount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.ReceiptUrl).HasMaxLength(500);
        builder.Property(x => x.Notes).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.ExpenseClaim)
            .WithMany(c => c.Items)
            .HasForeignKey(x => x.ExpenseClaimId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.ExpenseCategory)
            .WithMany()
            .HasForeignKey(x => x.ExpenseCategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.ExpenseClaimId).HasDatabaseName("IX_ExpenseClaimItems_ExpenseClaimId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
