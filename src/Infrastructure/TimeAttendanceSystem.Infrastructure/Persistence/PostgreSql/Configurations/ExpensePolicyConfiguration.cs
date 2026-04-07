using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class ExpensePolicyConfiguration : IEntityTypeConfiguration<ExpensePolicy>
{
    public void Configure(EntityTypeBuilder<ExpensePolicy> builder)
    {
        builder.ToTable("ExpensePolicies");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.NameAr).HasMaxLength(200);
        builder.Property(x => x.Description).HasMaxLength(1000);
        builder.Property(x => x.MaxClaimPerMonth).HasColumnType("decimal(18,2)");
        builder.Property(x => x.MaxClaimPerYear).HasColumnType("decimal(18,2)");

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_ExpensePolicies_BranchId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
