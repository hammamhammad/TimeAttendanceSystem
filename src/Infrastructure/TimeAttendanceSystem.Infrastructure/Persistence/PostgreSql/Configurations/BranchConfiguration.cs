using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        builder.ToTable("Branches");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.TimeZone)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Unique code per tenant database (each tenant has its own DB)
        builder.HasIndex(x => x.Code)
            .IsUnique()
            .HasDatabaseName("IX_Branches_Code")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.HasMany(x => x.Departments)
            .WithOne(x => x.Branch)
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        // v13.6 Workflow Routing Hardening — explicit branch manager for BranchManager approver type
        builder.Property(x => x.ManagerEmployeeId)
            .HasComment("FK to designated branch-manager Employee, used by workflow engine for BranchManager approver type (v13.6)");

        builder.HasOne(x => x.ManagerEmployee)
            .WithMany()
            .HasForeignKey(x => x.ManagerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_Branches_ManagerEmployee");

        builder.HasIndex(x => x.ManagerEmployeeId)
            .HasDatabaseName("IX_Branches_ManagerEmployeeId");
    }
}