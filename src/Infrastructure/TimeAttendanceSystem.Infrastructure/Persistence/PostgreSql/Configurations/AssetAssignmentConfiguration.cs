using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Assets;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class AssetAssignmentConfiguration : IEntityTypeConfiguration<AssetAssignment>
{
    public void Configure(EntityTypeBuilder<AssetAssignment> builder)
    {
        builder.ToTable("AssetAssignments");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.AssignmentNotes)
            .HasMaxLength(2000);

        builder.Property(x => x.ReturnNotes)
            .HasMaxLength(2000);

        builder.Property(x => x.ReturnCondition)
            .HasConversion<int>();

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.Asset)
            .WithMany(x => x.Assignments)
            .HasForeignKey(x => x.AssetId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.AssetId)
            .HasDatabaseName("IX_AssetAssignments_AssetId");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_AssetAssignments_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_AssetAssignments_Status");

        builder.HasIndex(x => new { x.AssetId, x.Status })
            .HasDatabaseName("IX_AssetAssignments_Asset_Status");

        builder.HasIndex(x => new { x.EmployeeId, x.Status })
            .HasDatabaseName("IX_AssetAssignments_Employee_Status");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
