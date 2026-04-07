using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class DisciplinaryActionConfiguration : IEntityTypeConfiguration<DisciplinaryAction>
{
    public void Configure(EntityTypeBuilder<DisciplinaryAction> builder)
    {
        builder.ToTable("DisciplinaryActions");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.ActionNumber)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.EmployeeId)
            .IsRequired();

        builder.Property(x => x.ActionType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.Severity)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.Subject)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.SubjectAr)
            .HasMaxLength(500);

        builder.Property(x => x.Description)
            .HasMaxLength(4000)
            .IsRequired();

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(4000);

        builder.Property(x => x.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.IncidentDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.ActionDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.EndDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.IssuedByUserId)
            .IsRequired();

        builder.Property(x => x.AcknowledgedAt)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.AppealNotes)
            .HasMaxLength(4000);

        builder.Property(x => x.AppealDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.AppealResolvedDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.AppealOutcome)
            .HasMaxLength(2000);

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

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
        builder.HasOne(x => x.Employee)
            .WithMany()
            .HasForeignKey(x => x.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.RelatedGrievance)
            .WithMany()
            .HasForeignKey(x => x.RelatedGrievanceId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.RelatedInvestigation)
            .WithMany()
            .HasForeignKey(x => x.RelatedInvestigationId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.ActionNumber)
            .IsUnique()
            .HasDatabaseName("IX_DisciplinaryActions_ActionNumber")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_DisciplinaryActions_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_DisciplinaryActions_Status")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
