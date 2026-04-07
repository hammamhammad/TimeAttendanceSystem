using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class GrievanceNoteConfiguration : IEntityTypeConfiguration<GrievanceNote>
{
    public void Configure(EntityTypeBuilder<GrievanceNote> builder)
    {
        builder.ToTable("GrievanceNotes");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.GrievanceId)
            .IsRequired();

        builder.Property(x => x.AuthorUserId)
            .IsRequired();

        builder.Property(x => x.Content)
            .HasMaxLength(4000)
            .IsRequired();

        builder.Property(x => x.IsInternal)
            .IsRequired()
            .HasDefaultValue(true);

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
            .WithMany(x => x.GrievanceNotes)
            .HasForeignKey(x => x.GrievanceId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.GrievanceId)
            .HasDatabaseName("IX_GrievanceNotes_GrievanceId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
