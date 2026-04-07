using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Configuration;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PolicyTemplateItemConfiguration : IEntityTypeConfiguration<PolicyTemplateItem>
{
    public void Configure(EntityTypeBuilder<PolicyTemplateItem> builder)
    {
        builder.ToTable("PolicyTemplateItems");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.PolicyType).IsRequired().HasMaxLength(100);
        builder.Property(e => e.ConfigurationJson).IsRequired().HasColumnType("jsonb");
        builder.Property(e => e.SortOrder).HasDefaultValue(0);

        builder.HasIndex(e => e.PolicyTemplateId)
            .HasDatabaseName("IX_PolicyTemplateItems_PolicyTemplateId");

        builder.HasQueryFilter(e => !e.IsDeleted);

        ConfigureBaseEntity(builder);
    }

    private static void ConfigureBaseEntity<T>(EntityTypeBuilder<T> builder) where T : class
    {
        builder.Property("CreatedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("ModifiedAtUtc").IsRequired().HasDefaultValueSql("NOW()");
        builder.Property("CreatedBy").HasMaxLength(100);
        builder.Property("ModifiedBy").HasMaxLength(100);
        builder.Property("IsDeleted").IsRequired().HasDefaultValue(false);
        builder.Property("RowVersion").IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });
    }
}
