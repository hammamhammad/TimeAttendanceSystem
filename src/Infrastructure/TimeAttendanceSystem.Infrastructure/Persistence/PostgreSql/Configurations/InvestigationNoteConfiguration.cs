using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class InvestigationNoteConfiguration : IEntityTypeConfiguration<InvestigationNote>
{
    public void Configure(EntityTypeBuilder<InvestigationNote> builder)
    {
        builder.ToTable("InvestigationNotes");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.InvestigationId)
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
        builder.HasOne(x => x.Investigation)
            .WithMany(x => x.InvestigationNotes)
            .HasForeignKey(x => x.InvestigationId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(x => x.InvestigationId)
            .HasDatabaseName("IX_InvestigationNotes_InvestigationId");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
