using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingCourseConfiguration : IEntityTypeConfiguration<TrainingCourse>
{
    public void Configure(EntityTypeBuilder<TrainingCourse> builder)
    {
        builder.ToTable("TrainingCourses");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code).HasMaxLength(50).IsRequired();
        builder.Property(x => x.Title).HasMaxLength(500).IsRequired();
        builder.Property(x => x.TitleAr).HasMaxLength(500);
        builder.Property(x => x.Description).HasMaxLength(2000);
        builder.Property(x => x.DescriptionAr).HasMaxLength(2000);
        builder.Property(x => x.Provider).HasMaxLength(300);
        builder.Property(x => x.ProviderAr).HasMaxLength(300);
        builder.Property(x => x.DeliveryMethod).HasConversion<int>();
        builder.Property(x => x.DurationHours).HasColumnType("decimal(8,2)");
        builder.Property(x => x.Cost).HasColumnType("decimal(18,2)");
        builder.Property(x => x.Currency).HasMaxLength(10);
        builder.Property(x => x.Prerequisites).HasMaxLength(2000);
        builder.Property(x => x.PrerequisitesAr).HasMaxLength(2000);
        builder.Property(x => x.CertificationName).HasMaxLength(300);
        builder.Property(x => x.CertificationValidityMonths);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Category)
            .WithMany(c => c.Courses)
            .HasForeignKey(x => x.TrainingCategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.Code).IsUnique().HasDatabaseName("IX_TrainingCourses_Code");
        builder.HasIndex(x => x.TrainingCategoryId).HasDatabaseName("IX_TrainingCourses_CategoryId");
        builder.HasIndex(x => x.IsActive).HasDatabaseName("IX_TrainingCourses_IsActive");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
