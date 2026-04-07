using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeCertificationConfiguration : IEntityTypeConfiguration<EmployeeCertification>
{
    public void Configure(EntityTypeBuilder<EmployeeCertification> builder)
    {
        builder.ToTable("EmployeeCertifications");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.CertificationName).HasMaxLength(500).IsRequired();
        builder.Property(x => x.CertificationNameAr).HasMaxLength(500);
        builder.Property(x => x.IssuingAuthority).HasMaxLength(300);
        builder.Property(x => x.IssuingAuthorityAr).HasMaxLength(300);
        builder.Property(x => x.CertificationNumber).HasMaxLength(100);
        builder.Property(x => x.Status).HasConversion<int>();
        builder.Property(x => x.DocumentUrl).HasMaxLength(500);
        builder.Property(x => x.Notes).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Employee)
            .WithMany(e => e.Certifications)
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Course)
            .WithMany()
            .HasForeignKey(x => x.TrainingCourseId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_EmployeeCertifications_EmployeeId");
        builder.HasIndex(x => x.Status).HasDatabaseName("IX_EmployeeCertifications_Status");
        builder.HasIndex(x => x.ExpiryDate).HasDatabaseName("IX_EmployeeCertifications_ExpiryDate");
        builder.HasIndex(x => x.TrainingCourseId).HasDatabaseName("IX_EmployeeCertifications_CourseId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
