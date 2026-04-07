using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for CustomReportDefinition entity.
/// Defines database schema, constraints, and relationships for custom report definitions.
/// </summary>
public class CustomReportDefinitionConfiguration : IEntityTypeConfiguration<CustomReportDefinition>
{
    public void Configure(EntityTypeBuilder<CustomReportDefinition> builder)
    {
        // Table configuration
        builder.ToTable("CustomReportDefinitions");

        // Primary key
        builder.HasKey(e => e.Id);

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        // ScheduledReports relationship
        builder.HasMany(e => e.ScheduledReports)
            .WithOne(e => e.CustomReportDefinition)
            .HasForeignKey(e => e.CustomReportDefinitionId)
            .OnDelete(DeleteBehavior.Cascade);

        // Property configurations
        builder.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(e => e.NameAr)
            .HasMaxLength(200)
            .IsRequired(false);

        builder.Property(e => e.Description)
            .HasMaxLength(1000)
            .IsRequired(false);

        builder.Property(e => e.DescriptionAr)
            .HasMaxLength(1000)
            .IsRequired(false);

        builder.Property(e => e.DataSource)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.ColumnsJson)
            .IsRequired()
            .HasMaxLength(10000);

        builder.Property(e => e.FiltersJson)
            .HasMaxLength(10000)
            .IsRequired(false);

        builder.Property(e => e.SortingJson)
            .HasMaxLength(5000)
            .IsRequired(false);

        builder.Property(e => e.BranchId)
            .IsRequired(false);

        builder.Property(e => e.CreatedByUserId)
            .IsRequired();

        builder.Property(e => e.IsPublic)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(e => e.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        // Base entity configuration
        builder.Property(e => e.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("NOW()");

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(100);

        builder.Property(e => e.ModifiedAtUtc)
            .IsRequired(false);

        builder.Property(e => e.ModifiedBy)
            .HasMaxLength(100);

        builder.Property(e => e.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(e => e.RowVersion)
            .IsConcurrencyToken()
            .IsRequired()
            .HasDefaultValue(new byte[] { 1 });
    }
}
