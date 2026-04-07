using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeVisaConfiguration : IEntityTypeConfiguration<EmployeeVisa>
{
    public void Configure(EntityTypeBuilder<EmployeeVisa> builder)
    {
        builder.ToTable("EmployeeVisas");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.VisaNumber)
            .HasMaxLength(50);

        builder.Property(x => x.SponsorName)
            .HasMaxLength(200);

        builder.Property(x => x.IssuingCountry)
            .HasMaxLength(100);

        builder.Property(x => x.DocumentUrl)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(1000);

        // Enum conversions
        builder.Property(x => x.VisaType)
            .HasConversion<int>();

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
        builder.HasOne(x => x.Employee)
            .WithMany(x => x.Visas)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeVisas_EmployeeId");

        builder.HasIndex(x => x.ExpiryDate)
            .HasDatabaseName("IX_EmployeeVisas_ExpiryDate");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
