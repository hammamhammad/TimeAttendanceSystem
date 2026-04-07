using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class UserBranchScopeConfiguration : IEntityTypeConfiguration<UserBranchScope>
{
    public void Configure(EntityTypeBuilder<UserBranchScope> builder)
    {
        builder.ToTable("UserBranchScopes");

        builder.HasKey(x => new { x.UserId, x.BranchId });

        builder.HasOne(x => x.User)
            .WithMany(x => x.UserBranchScopes)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}