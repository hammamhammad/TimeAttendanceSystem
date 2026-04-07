using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class EmployeeDocumentConfiguration : IEntityTypeConfiguration<EmployeeDocument>
{
    public void Configure(EntityTypeBuilder<EmployeeDocument> builder)
    {
        builder.ToTable("EmployeeDocuments");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.DocumentName).HasMaxLength(300).IsRequired();
        builder.Property(x => x.DocumentNameAr).HasMaxLength(300);
        builder.Property(x => x.DocumentType).HasConversion<int>();
        builder.Property(x => x.FileUrl).HasMaxLength(500);
        builder.Property(x => x.VerificationStatus).HasConversion<int>();
        builder.Property(x => x.Notes).HasMaxLength(1000);

        builder.Property(x => x.CreatedBy).HasMaxLength(100).IsRequired();
        builder.Property(x => x.ModifiedBy).HasMaxLength(100);
        builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRequired().HasDefaultValue(new byte[] { 1 });

        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.DocumentCategory)
            .WithMany(c => c.Documents)
            .HasForeignKey(x => x.DocumentCategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.EmployeeId).HasDatabaseName("IX_EmployeeDocuments_EmployeeId");
        builder.HasIndex(x => x.DocumentCategoryId).HasDatabaseName("IX_EmployeeDocuments_DocumentCategoryId");
        builder.HasIndex(x => x.ExpiryDate).HasDatabaseName("IX_EmployeeDocuments_ExpiryDate");

        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
