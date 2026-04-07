using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PolicyAcknowledgmentConfiguration : IEntityTypeConfiguration<PolicyAcknowledgment>
{
    public void Configure(EntityTypeBuilder<PolicyAcknowledgment> builder)
    {
        builder.ToTable("PolicyAcknowledgments");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.IpAddress).HasMaxLength(50);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.CompanyPolicy)
            .WithMany(p => p.Acknowledgments)
            .HasForeignKey(x => x.CompanyPolicyId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => new { x.CompanyPolicyId, x.EmployeeId })
            .IsUnique()
            .HasDatabaseName("IX_PolicyAcknowledgments_Policy_Employee");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
