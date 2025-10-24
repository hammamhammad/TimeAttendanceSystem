using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.ToTable("Employees");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.EmployeeNumber)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.FirstName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.LastName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.FirstNameAr)
            .HasMaxLength(100);

        builder.Property(x => x.LastNameAr)
            .HasMaxLength(100);

        builder.Property(x => x.NationalId)
            .HasMaxLength(50);

        builder.Property(x => x.Email)
            .HasMaxLength(200);

        builder.Property(x => x.Phone)
            .HasMaxLength(20);

        builder.Property(x => x.Gender)
            .HasConversion<int>();

        builder.Property(x => x.EmploymentStatus)
            .HasConversion<int>();

        builder.Property(x => x.JobTitle)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.JobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.WorkLocationType)
            .HasConversion<int>();

        builder.Property(x => x.PhotoUrl)
            .HasMaxLength(500);

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRowVersion()
            .HasDefaultValueSql("E'\\\\x01'::bytea");

        builder.HasIndex(x => new { x.BranchId, x.EmployeeNumber })
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Department)
            .WithMany()
            .HasForeignKey(x => x.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Manager)
            .WithMany(x => x.DirectReports)
            .HasForeignKey(x => x.ManagerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.EmployeeUserLink)
            .WithOne(x => x.Employee)
            .HasForeignKey<EmployeeUserLink>(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}