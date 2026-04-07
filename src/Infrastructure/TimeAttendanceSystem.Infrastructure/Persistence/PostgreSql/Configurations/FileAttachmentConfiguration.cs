using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class FileAttachmentConfiguration : IEntityTypeConfiguration<FileAttachment>
{
    public void Configure(EntityTypeBuilder<FileAttachment> builder)
    {
        builder.ToTable("FileAttachments");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.OriginalFileName)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.StoredFileName)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.FilePath)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(x => x.ContentType)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasMaxLength(500);

        builder.Property(x => x.EntityType)
            .HasMaxLength(100);

        builder.Property(x => x.FieldName)
            .HasMaxLength(100);

        builder.Property(x => x.Category)
            .HasMaxLength(50);

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

        // Indexes
        builder.HasIndex(x => new { x.EntityType, x.EntityId })
            .HasDatabaseName("IX_FileAttachments_EntityType_EntityId");

        builder.HasIndex(x => x.StoredFileName)
            .IsUnique()
            .HasDatabaseName("IX_FileAttachments_StoredFileName");

        builder.HasIndex(x => x.Category)
            .HasDatabaseName("IX_FileAttachments_Category");

        // Soft delete query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
