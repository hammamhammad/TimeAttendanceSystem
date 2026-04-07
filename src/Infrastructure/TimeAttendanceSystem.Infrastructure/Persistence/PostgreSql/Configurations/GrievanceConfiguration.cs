using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Configurations;

public class GrievanceConfiguration : IEntityTypeConfiguration<Grievance>
{
    public void Configure(EntityTypeBuilder<Grievance> builder)
    {
        builder.ToTable("Grievances");

        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.GrievanceNumber)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.EmployeeId)
            .IsRequired();

        builder.Property(x => x.GrievanceType)
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

        builder.Property(x => x.Priority)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.Status)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.ResolutionSummary)
            .HasMaxLength(4000);

        builder.Property(x => x.ResolutionSummaryAr)
            .HasMaxLength(4000);

        builder.Property(x => x.ResolutionDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.FiledDate)
            .IsRequired()
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.DueDate)
            .HasColumnType("timestamp with time zone");

        builder.Property(x => x.EscalationDate)
            .HasColumnType("timestamp with time zone");

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

        builder.HasOne(x => x.AgainstEmployee)
            .WithMany()
            .HasForeignKey(x => x.AgainstEmployeeId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(x => x.GrievanceNumber)
            .IsUnique()
            .HasDatabaseName("IX_Grievances_GrievanceNumber")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.EmployeeId)
            .HasDatabaseName("IX_Grievances_EmployeeId");

        builder.HasIndex(x => x.Status)
            .HasDatabaseName("IX_Grievances_Status")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(x => x.AssignedToUserId)
            .HasDatabaseName("IX_Grievances_AssignedToUserId")
            .HasFilter("\"IsDeleted\" = false");

        // Query filter
        builder.HasQueryFilter(x => !x.IsDeleted);
    }
}
