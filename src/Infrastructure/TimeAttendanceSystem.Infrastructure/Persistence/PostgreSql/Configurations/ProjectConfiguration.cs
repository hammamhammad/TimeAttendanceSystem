using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.ToTable("Projects");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.ClientName)
            .HasMaxLength(200);

        builder.Property(x => x.ClientNameAr)
            .HasMaxLength(200);

        builder.Property(x => x.BudgetHours)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Status)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.ManagerEmployee)
            .WithMany()
            .HasForeignKey(x => x.ManagerEmployeeId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Tasks)
            .WithOne(x => x.Project)
            .HasForeignKey(x => x.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.Code)
            .IsUnique()
            .HasDatabaseName("IX_Projects_Code");

        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_Projects_BranchId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_Projects_Status");

        builder.HasIndex(x => x.ManagerEmployeeId)
            .HasDatabaseName("IX_Projects_ManagerEmployeeId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
