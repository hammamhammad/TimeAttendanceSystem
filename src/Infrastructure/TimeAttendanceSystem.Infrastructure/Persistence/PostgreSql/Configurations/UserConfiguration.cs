using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Username)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Email)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Phone)
            .HasMaxLength(20);

        builder.Property(x => x.PasswordHash)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.PasswordSalt)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.PreferredLanguage)
            .HasMaxLength(10)
            .IsRequired()
            .HasDefaultValue("en");

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        builder.HasIndex(x => x.Username)
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.Email)
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.HasMany(x => x.UserRoles)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.UserBranchScopes)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.RefreshTokens)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}