using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

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

        // Phase 1: Personal info enhancements
        builder.Property(x => x.MiddleName)
            .HasMaxLength(100);

        builder.Property(x => x.MiddleNameAr)
            .HasMaxLength(100);

        builder.Property(x => x.MaritalStatus)
            .HasConversion<int>();

        builder.Property(x => x.Nationality)
            .HasMaxLength(100);

        builder.Property(x => x.NationalityAr)
            .HasMaxLength(100);

        builder.Property(x => x.Religion)
            .HasMaxLength(50);

        builder.Property(x => x.PassportNumber)
            .HasMaxLength(50);

        // Phase 1: Employment enhancements
        builder.Property(x => x.CostCenter)
            .HasMaxLength(50);

        builder.Property(x => x.CurrentContractType)
            .HasConversion<int>();

        builder.Property(x => x.ProbationStatus)
            .HasConversion<int>();

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

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

        // Phase 1: JobGrade relationship (optional)
        builder.HasOne(x => x.JobGrade)
            .WithMany(x => x.Employees)
            .HasForeignKey(x => x.JobGradeId)
            .OnDelete(DeleteBehavior.SetNull);

        // Phase 1: Navigation collections (configured in their respective configurations)
        builder.HasMany(x => x.Contracts)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.Transfers)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.Promotions)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.SalaryAdjustments)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.ProfileChanges)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.BankDetails)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.Dependents)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.EmergencyContacts)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.Addresses)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.EducationHistory)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.WorkExperienceHistory)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);

        builder.HasMany(x => x.Visas)
            .WithOne(x => x.Employee)
            .HasForeignKey(x => x.EmployeeId);
    }
}