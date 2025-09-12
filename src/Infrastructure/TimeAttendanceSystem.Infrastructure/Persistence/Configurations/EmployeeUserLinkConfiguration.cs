using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Employees;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Configurations;

public class EmployeeUserLinkConfiguration : IEntityTypeConfiguration<EmployeeUserLink>
{
    public void Configure(EntityTypeBuilder<EmployeeUserLink> builder)
    {
        builder.ToTable("EmployeeUserLinks");

        builder.HasKey(x => new { x.EmployeeId, x.UserId });

        builder.HasOne(x => x.Employee)
            .WithOne(x => x.EmployeeUserLink)
            .HasForeignKey<EmployeeUserLink>(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}