using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Platform;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class PlatformUserConfiguration : IEntityTypeConfiguration<PlatformUser>
{
    public void Configure(EntityTypeBuilder<PlatformUser> builder)
    {
        builder.ToTable("PlatformUsers");
        builder.HasIndex(e => e.Email).IsUnique().HasFilter("\"IsDeleted\" = false");
        builder.HasIndex(e => e.Username).IsUnique().HasFilter("\"IsDeleted\" = false");
        builder.Property(e => e.Role).HasConversion<string>();
        builder.HasQueryFilter(e => !e.IsDeleted);
    }
}
