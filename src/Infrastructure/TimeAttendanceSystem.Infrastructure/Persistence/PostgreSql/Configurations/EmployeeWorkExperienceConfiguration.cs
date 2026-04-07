using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeWorkExperienceConfiguration : IEntityTypeConfiguration<EmployeeWorkExperience>
{
    public void Configure(EntityTypeBuilder<EmployeeWorkExperience> builder)
    {
        builder.ToTable("EmployeeWorkExperiences");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.CompanyName)
            .HasMaxLength(300)
            .IsRequired();

        builder.Property(x => x.CompanyNameAr)
            .HasMaxLength(300);

        builder.Property(x => x.JobTitle)
            .HasMaxLength(200);

        builder.Property(x => x.JobTitleAr)
            .HasMaxLength(200);

        builder.Property(x => x.Responsibilities)
            .HasMaxLength(2000);

        builder.Property(x => x.ReasonForLeaving)
            .HasMaxLength(500);

        builder.Property(x => x.Country)
            .HasMaxLength(100);

        builder.Property(x => x.ReferenceContactName)
            .HasMaxLength(200);

        builder.Property(x => x.ReferenceContactPhone)
            .HasMaxLength(20);

        builder.Property(x => x.CertificateUrl)
            .HasMaxLength(500);

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
            .WithMany(x => x.WorkExperienceHistory)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_EmployeeWorkExperiences_EmployeeId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
