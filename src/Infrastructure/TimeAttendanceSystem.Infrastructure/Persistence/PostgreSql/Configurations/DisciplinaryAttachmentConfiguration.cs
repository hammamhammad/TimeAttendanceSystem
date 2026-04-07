using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class DisciplinaryAttachmentConfiguration : IEntityTypeConfiguration<DisciplinaryAttachment>
{
    public void Configure(EntityTypeBuilder<DisciplinaryAttachment> builder)
    {
        builder.ToTable("DisciplinaryAttachments");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.DisciplinaryActionId)
            .IsRequired();

        builder.Property(x => x.FileAttachmentId)
            .IsRequired();

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
        builder.HasOne(x => x.DisciplinaryAction)
            .WithMany(x => x.DisciplinaryAttachments)
            .HasForeignKey(x => x.DisciplinaryActionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.FileAttachment)
            .WithMany()
            .HasForeignKey(x => x.FileAttachmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.DisciplinaryActionId)
            .HasDatabaseName("IX_DisciplinaryAttachments_DisciplinaryActionId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
