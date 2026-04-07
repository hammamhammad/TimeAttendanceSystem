using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class LetterTemplateConfiguration : IEntityTypeConfiguration<LetterTemplate>
{
    public void Configure(EntityTypeBuilder<LetterTemplate> builder)
    {
        builder.ToTable("LetterTemplates");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.LetterType).HasConversion<int>();
        builder.Property(x => x.Name).HasMaxLength(300).IsRequired();
        builder.Property(x => x.NameAr).HasMaxLength(300);
        builder.Property(x => x.Content).HasColumnType("text");
        builder.Property(x => x.ContentAr).HasColumnType("text");
        builder.Property(x => x.HeaderLogoUrl).HasMaxLength(500);
        builder.Property(x => x.FooterText).HasMaxLength(1000);
        builder.Property(x => x.FooterTextAr).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.LetterType).HasDatabaseName("IX_LetterTemplates_LetterType");
        builder.HasIndex(x => x.BranchId).HasDatabaseName("IX_LetterTemplates_BranchId");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
