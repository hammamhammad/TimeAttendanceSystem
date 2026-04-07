using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class CompetencyConfiguration : IEntityTypeConfiguration<Competency>
{
    public void Configure(EntityTypeBuilder<Competency> builder)
    {
        builder.ToTable("Competencies");
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.NameAr)
            .HasMaxLength(200);

        builder.Property(x => x.Description)
            .HasMaxLength(2000);

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(2000);

        builder.Property(x => x.Category)
            .HasMaxLength(100);

        builder.Property(x => x.CategoryAr)
            .HasMaxLength(100);

        // Audit fields
        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        // Relationships
        builder.HasOne(x => x.CompetencyFramework)
            .WithMany(x => x.Competencies)
            .HasForeignKey(x => x.CompetencyFrameworkId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.CompetencyFrameworkId).HasDatabaseName("IX_Competencies_FrameworkId");
        builder.HasIndex(x => new { x.CompetencyFrameworkId, x.DisplayOrder }).HasDatabaseName("IX_Competencies_Framework_Order");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
