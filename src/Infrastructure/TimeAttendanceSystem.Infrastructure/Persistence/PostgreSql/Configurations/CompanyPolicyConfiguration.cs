using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class CompanyPolicyConfiguration : IEntityTypeConfiguration<CompanyPolicy>
{
    public void Configure(EntityTypeBuilder<CompanyPolicy> builder)
    {
        builder.ToTable("CompanyPolicies");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).HasMaxLength(300).IsRequired();
        builder.Property(x => x.TitleAr).HasMaxLength(300);
        builder.Property(x => x.Description).HasMaxLength(4000);
        builder.Property(x => x.DescriptionAr).HasMaxLength(4000);
        builder.Property(x => x.DocumentUrl).HasMaxLength(500);
        builder.Property(x => x.Version).HasMaxLength(50);
        builder.Property(x => x.Status).HasConversion<int>();

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.DocumentCategory)
            .WithMany(c => c.Policies)
            .HasForeignKey(x => x.DocumentCategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.Status).HasDatabaseName("IX_CompanyPolicies_Status");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
