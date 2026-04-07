using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeBankDetailConfiguration : IEntityTypeConfiguration<EmployeeBankDetail>
{
    public void Configure(EntityTypeBuilder<EmployeeBankDetail> builder)
    {
        builder.ToTable("EmployeeBankDetails");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.BankName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.BankNameAr)
            .HasMaxLength(200);

        builder.Property(x => x.AccountHolderName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.AccountNumber)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.IBAN)
            .HasMaxLength(50);

        builder.Property(x => x.SwiftCode)
            .HasMaxLength(20);

        builder.Property(x => x.BranchName)
            .HasMaxLength(200);

        builder.Property(x => x.Currency)
            .HasMaxLength(10);

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
            .WithMany(x => x.BankDetails)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeBankDetails_EmployeeId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
