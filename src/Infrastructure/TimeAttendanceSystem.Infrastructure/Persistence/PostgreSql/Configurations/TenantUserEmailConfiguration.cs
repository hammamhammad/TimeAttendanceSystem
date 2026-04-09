using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TenantUserEmailConfiguration : IEntityTypeConfiguration<TenantUserEmail>
{
    public void Configure(EntityTypeBuilder<TenantUserEmail> builder)
    {
        builder.ToTable("TenantUserEmails");
        builder.HasIndex(e => new { e.Email, e.TenantId }).IsUnique();
        builder.HasIndex(e => e.Email);
        builder.HasOne(e => e.Tenant)
            .WithMany()
            .HasForeignKey(e => e.TenantId)
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasQueryFilter(e => !e.IsDeleted);
    }
}
