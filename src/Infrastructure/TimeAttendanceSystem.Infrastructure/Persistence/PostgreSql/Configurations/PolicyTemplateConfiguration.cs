using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Configuration;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PolicyTemplateConfiguration : IEntityTypeConfiguration<PolicyTemplate>
{
    public void Configure(EntityTypeBuilder<PolicyTemplate> builder)
    {
        builder.ToTable("PolicyTemplates");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Code).IsRequired().HasMaxLength(50);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
        builder.Property(e => e.NameAr).HasMaxLength(200);
        builder.Property(e => e.Description).HasMaxLength(1000);
        builder.Property(e => e.DescriptionAr).HasMaxLength(1000);
        builder.Property(e => e.Region).IsRequired().HasMaxLength(5).HasDefaultValue("SA");
        builder.Property(e => e.Industry).HasMaxLength(100);
        builder.Property(e => e.IsSystemTemplate).HasDefaultValue(true);
        builder.Property(e => e.IsActive).HasDefaultValue(true);

        // Optional FK to Tenant (system templates have no tenant)
        builder.HasOne(e => e.Tenant)
            .WithMany()
            .HasForeignKey(e => e.TenantId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired(false);

        // Items relationship
        builder.HasMany(e => e.Items)
            .WithOne(i => i.PolicyTemplate)
            .HasForeignKey(i => i.PolicyTemplateId)
            .OnDelete(DeleteBehavior.Cascade);

        // Unique code per scope (system templates globally unique, tenant templates unique per tenant)
        builder.HasIndex(e => new { e.Code, e.TenantId })
            .IsUnique()
            .HasDatabaseName("IX_PolicyTemplates_Code_TenantId");

        builder.HasIndex(e => e.Region)
            .HasDatabaseName("IX_PolicyTemplates_Region");

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
