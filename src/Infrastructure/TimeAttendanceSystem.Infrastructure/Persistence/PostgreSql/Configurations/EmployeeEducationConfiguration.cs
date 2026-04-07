using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeEducationConfiguration : IEntityTypeConfiguration<EmployeeEducation>
{
    public void Configure(EntityTypeBuilder<EmployeeEducation> builder)
    {
        builder.ToTable("EmployeeEducations");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.InstitutionName)
            .HasMaxLength(300)
            .IsRequired();

        builder.Property(x => x.InstitutionNameAr)
            .HasMaxLength(300);

        builder.Property(x => x.Degree)
            .HasMaxLength(200);

        builder.Property(x => x.DegreeAr)
            .HasMaxLength(200);

        builder.Property(x => x.FieldOfStudy)
            .HasMaxLength(200);

        builder.Property(x => x.FieldOfStudyAr)
            .HasMaxLength(200);

        builder.Property(x => x.Grade)
            .HasMaxLength(50);

        builder.Property(x => x.CertificateUrl)
            .HasMaxLength(500);

        builder.Property(x => x.Country)
            .HasMaxLength(100);

        // Enum conversion
        builder.Property(x => x.Level)
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
            .WithMany(x => x.EducationHistory)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeEducations_EmployeeId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
