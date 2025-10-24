using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
{
    public void Configure(EntityTypeBuilder<Department> builder)
    {
        builder.ToTable("Departments");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(1000);

        builder.Property(x => x.CostCenter)
            .HasMaxLength(50);

        builder.Property(x => x.Location)
            .HasMaxLength(500);

        builder.Property(x => x.Phone)
            .HasMaxLength(50);

        builder.Property(x => x.Email)
            .HasMaxLength(255);

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRowVersion()
            .HasDefaultValueSql("E'\\\\x01'::bytea");

        // Indexes for performance
        builder.HasIndex(x => new { x.BranchId, x.Code })
            .IsUnique()
            .HasDatabaseName("IX_Departments_BranchId_Code");

        builder.HasIndex(x => x.ParentDepartmentId)
            .HasDatabaseName("IX_Departments_ParentDepartmentId");

        builder.HasIndex(x => x.ManagerEmployeeId)
            .HasDatabaseName("IX_Departments_ManagerEmployeeId");

        builder.HasIndex(x => new { x.BranchId, x.IsActive, x.SortOrder })
            .HasDatabaseName("IX_Departments_BranchId_IsActive_SortOrder");

        builder.HasQueryFilter(x => !x.IsDeleted);

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany(x => x.Departments)
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.ParentDepartment)
            .WithMany(x => x.SubDepartments)
            .HasForeignKey(x => x.ParentDepartmentId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}