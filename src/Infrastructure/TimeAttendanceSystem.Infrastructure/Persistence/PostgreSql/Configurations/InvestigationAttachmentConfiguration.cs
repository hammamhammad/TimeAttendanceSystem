using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class InvestigationAttachmentConfiguration : IEntityTypeConfiguration<InvestigationAttachment>
{
    public void Configure(EntityTypeBuilder<InvestigationAttachment> builder)
    {
        builder.ToTable("InvestigationAttachments");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.InvestigationId)
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
        builder.HasOne(x => x.Investigation)
            .WithMany(x => x.InvestigationAttachments)
            .HasForeignKey(x => x.InvestigationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.FileAttachment)
            .WithMany()
            .HasForeignKey(x => x.FileAttachmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.InvestigationId)
            .HasDatabaseName("IX_InvestigationAttachments_InvestigationId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
