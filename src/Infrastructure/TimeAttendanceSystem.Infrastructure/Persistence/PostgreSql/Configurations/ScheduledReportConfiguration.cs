using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for ScheduledReport entity.
/// Defines database schema, constraints, and relationships for scheduled report management.
/// </summary>
public class ScheduledReportConfiguration : IEntityTypeConfiguration<ScheduledReport>
{
    public void Configure(EntityTypeBuilder<ScheduledReport> builder)
    {
        // Table configuration
        builder.ToTable("ScheduledReports");

        // Primary key
        builder.HasKey(e => e.Id);

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        // CustomReportDefinition relationship (required)
        builder.HasOne(e => e.CustomReportDefinition)
            .WithMany(e => e.ScheduledReports)
            .HasForeignKey(e => e.CustomReportDefinitionId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        // Property configurations
        builder.Property(e => e.CustomReportDefinitionId)
            .IsRequired();

        builder.Property(e => e.CronExpression)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.EmailRecipients)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(e => e.Format)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(e => e.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(e => e.LastRunAt)
            .IsRequired(false)
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.NextRunAt)
            .IsRequired(false)
            .HasColumnType("timestamp with time zone");

        builder.Property(e => e.LastRunStatus)
            .HasMaxLength(500)
            .IsRequired(false);

        // Indexes for performance
        builder.HasIndex(e => new { e.NextRunAt, e.IsActive })
            .HasDatabaseName("IX_ScheduledReports_NextRunAt_IsActive");

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
