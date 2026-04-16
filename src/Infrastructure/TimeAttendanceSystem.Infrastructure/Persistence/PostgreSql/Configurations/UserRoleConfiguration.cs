using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> builder)
    {
        builder.ToTable("UserRoles");

        builder.HasKey(x => new { x.UserId, x.RoleId });

        builder.HasOne(x => x.User)
            .WithMany(x => x.UserRoles)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Role)
            .WithMany(x => x.UserRoles)
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.Cascade);

        // v13.6 — priority used by RoleAssignmentStrategy.FixedPriority
        builder.Property(x => x.Priority)
            .IsRequired()
            .HasDefaultValue(0)
            .HasComment("Seniority priority within role; higher wins under FixedPriority strategy (v13.6)");

        builder.HasIndex(x => new { x.RoleId, x.Priority })
            .HasDatabaseName("IX_UserRoles_RoleId_Priority");
    }
}