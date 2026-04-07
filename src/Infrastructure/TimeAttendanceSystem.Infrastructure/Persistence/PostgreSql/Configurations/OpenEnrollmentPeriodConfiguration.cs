using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Benefits;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class OpenEnrollmentPeriodConfiguration : IEntityTypeConfiguration<OpenEnrollmentPeriod>
{
    public void Configure(EntityTypeBuilder<OpenEnrollmentPeriod> builder)
    {
        builder.ToTable("OpenEnrollmentPeriods");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Status)
            .HasConversion<int>();

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

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
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Indexes
        builder.HasIndex(x => x.BranchId)
            .HasDatabaseName("IX_OpenEnrollmentPeriods_BranchId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_OpenEnrollmentPeriods_Status");

        builder.HasIndex(x => x.PlanYear)
            .HasDatabaseName("IX_OpenEnrollmentPeriods_PlanYear");

        builder.HasIndex(x => new { x.StartDate, x.EndDate })
            .HasDatabaseName("IX_OpenEnrollmentPeriods_DateRange");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
