using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class InvestigationConfiguration : IEntityTypeConfiguration<Investigation>
{
    public void Configure(EntityTypeBuilder<Investigation> builder)
    {
        builder.ToTable("Investigations");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.InvestigationNumber)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.SubjectEmployeeId)
            .IsRequired();

        builder.Property(x => x.Title)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.TitleAr)
            .HasMaxLength(500);

        builder.Property(x => x.Description)
            .HasMaxLength(4000)
            .IsRequired();

        builder.Property(x => x.DescriptionAr)
            .HasMaxLength(4000);

        builder.Property(x => x.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.InvestigatorUserId)
            .IsRequired();

        builder.Property(x => x.StartDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.DueDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.CompletedDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.Findings)
            .HasMaxLength(4000);

        builder.Property(x => x.FindingsAr)
            .HasMaxLength(4000);

        builder.Property(x => x.Recommendation)
            .HasMaxLength(4000);

        builder.Property(x => x.RecommendationAr)
            .HasMaxLength(4000);

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
        builder.HasOne(x => x.SubjectEmployee)
            .WithMany()
            .HasForeignKey(x => x.SubjectEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.RelatedGrievance)
            .WithMany()
            .HasForeignKey(x => x.RelatedGrievanceId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.InvestigationNumber)
            .IsUnique()
            .HasDatabaseName("IX_Investigations_InvestigationNumber")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.SubjectEmployeeId)
            .HasDatabaseName("IX_Investigations_SubjectEmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_Investigations_Status")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.InvestigatorUserId)
            .HasDatabaseName("IX_Investigations_InvestigatorUserId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
