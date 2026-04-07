using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeProfileChangeConfiguration : IEntityTypeConfiguration<EmployeeProfileChange>
{
    public void Configure(EntityTypeBuilder<EmployeeProfileChange> builder)
    {
        builder.ToTable("EmployeeProfileChanges");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.FieldName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.OldValue)
            .HasMaxLength(500);

        builder.Property(x => x.NewValue)
            .HasMaxLength(500);

        builder.Property(x => x.OldDisplayValue)
            .HasMaxLength(500);

        builder.Property(x => x.NewDisplayValue)
            .HasMaxLength(500);

        builder.Property(x => x.ChangeType)
            .HasConversion<int>();

        builder.Property(x => x.RelatedEntityType)
            .HasMaxLength(100);

        builder.Property(x => x.Reason)
            .HasMaxLength(1000);

        builder.Property(x => x.ReasonAr)
            .HasMaxLength(1000);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

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
        builder.HasOne(x => x.Employee)
            .WithMany(x => x.ProfileChanges)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeProfileChanges_EmployeeId");

        builder.HasIndex(x => x.EffectiveDate)
            .HasDatabaseName("IX_EmployeeProfileChanges_EffectiveDate");

        builder.HasIndex(x => x.IsApplied)
            .HasDatabaseName("IX_EmployeeProfileChanges_IsApplied");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
