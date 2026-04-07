using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class TrainingCategoryConfiguration : IEntityTypeConfiguration<TrainingCategory>
{
    public void Configure(EntityTypeBuilder<TrainingCategory> builder)
    {
        builder.ToTable("TrainingCategories");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.NameAr).HasMaxLength(200);
        builder.Property(x => x.Description).HasMaxLength(1000);
        builder.Property(x => x.DescriptionAr).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasIndex(x => x.IsActive).HasDatabaseName("IX_TrainingCategories_IsActive");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
