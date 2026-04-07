using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class LoanPolicyConfiguration : IEntityTypeConfiguration<LoanPolicy>
{
    public void Configure(EntityTypeBuilder<LoanPolicy> builder)
    {
        builder.ToTable("LoanPolicies");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.MaxPercentageOfSalary).HasColumnType("decimal(8,4)");

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.LoanType)
            .WithMany()
            .HasForeignKey(x => x.LoanTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.LoanTypeId).HasDatabaseName("IX_LoanPolicies_LoanTypeId");
        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_LoanPolicies_BranchId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
