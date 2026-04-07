using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class GrievanceAttachmentConfiguration : IEntityTypeConfiguration<GrievanceAttachment>
{
    public void Configure(EntityTypeBuilder<GrievanceAttachment> builder)
    {
        builder.ToTable("GrievanceAttachments");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.GrievanceId)
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
        builder.HasOne(x => x.Grievance)
            .WithMany(x => x.GrievanceAttachments)
            .HasForeignKey(x => x.GrievanceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.FileAttachment)
            .WithMany()
            .HasForeignKey(x => x.FileAttachmentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(x => x.GrievanceId)
            .HasDatabaseName("IX_GrievanceAttachments_GrievanceId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
