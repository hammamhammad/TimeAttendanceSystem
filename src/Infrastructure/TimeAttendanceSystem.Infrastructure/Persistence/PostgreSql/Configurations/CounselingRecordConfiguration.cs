using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class CounselingRecordConfiguration : IEntityTypeConfiguration<CounselingRecord>
{
    public void Configure(EntityTypeBuilder<CounselingRecord> builder)
    {
        builder.ToTable("CounselingRecords");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.EmployeeId)
            .IsRequired();

        builder.Property(x => x.CounselorUserId)
            .IsRequired();

        builder.Property(x => x.SessionDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.SessionType)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.Subject)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.SubjectAr)
            .HasMaxLength(500);

        builder.Property(x => x.Notes)
            .HasMaxLength(4000);

        builder.Property(x => x.FollowUpDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.Outcome)
            .HasMaxLength(2000);

        builder.Property(x => x.OutcomeAr)
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

        builder.HasOne(x => x.RelatedDisciplinaryAction)
            .WithMany()
            .HasForeignKey(x => x.RelatedDisciplinaryActionId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(x => x.RelatedGrievance)
            .WithMany()
            .HasForeignKey(x => x.RelatedGrievanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_CounselingRecords_EmployeeId");

        builder.HasIndex(x => x.SessionType)
            .HasDatabaseName("IX_CounselingRecords_SessionType")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => new { x.FollowUpRequired, x.FollowUpCompleted })
            .HasDatabaseName("IX_CounselingRecords_FollowUp")
            .HasFilter("\"IsDeleted\" = false AND \"FollowUpRequired\" = true AND \"FollowUpCompleted\" = false");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
