using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Vacations;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for the EmployeeVacation entity.
/// Defines database mapping, relationships, constraints, and indexes for optimal performance.
/// </summary>
public class EmployeeVacationConfiguration : IEntityTypeConfiguration<EmployeeVacation>
{
    public void Configure(EntityTypeBuilder<EmployeeVacation> builder)
    {
        // Table mapping
        builder.ToTable("EmployeeVacations");

        // Primary key
        builder.HasKey(ev => ev.Id);

        // Properties configuration
        builder.Property(ev => ev.EmployeeId)
            .IsRequired()
            .HasComment("Employee identifier for vacation assignment");

        builder.Property(ev => ev.VacationTypeId)
            .IsRequired()
            .HasComment("Vacation type identifier for categorization");

        builder.Property(ev => ev.StartDate)
            .IsRequired()
            .HasColumnType("datetime2")
            .HasComment("Start date of vacation period");

        builder.Property(ev => ev.EndDate)
            .IsRequired()
            .HasColumnType("datetime2")
            .HasComment("End date of vacation period");

        builder.Property(ev => ev.TotalDays)
            .IsRequired()
            .HasComment("Total number of vacation days");

        builder.Property(ev => ev.IsApproved)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Whether vacation is approved and affects attendance");

        builder.Property(ev => ev.Notes)
            .HasMaxLength(1000)
            .IsUnicode(true)
            .HasComment("Optional notes about the vacation");

        // Relationships
        builder.HasOne(ev => ev.Employee)
            .WithMany()
            .HasForeignKey(ev => ev.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeVacations_Employees");

        builder.HasOne(ev => ev.VacationType)
            .WithMany()
            .HasForeignKey(ev => ev.VacationTypeId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_EmployeeVacations_VacationTypes");

        // Indexes for performance optimization

        // Index for employee-specific queries (most common)
        builder.HasIndex(ev => ev.EmployeeId)
            .HasDatabaseName("IX_EmployeeVacations_EmployeeId")
            .HasFilter("IsDeleted = 0");

        // Composite index for employee + date range queries
        builder.HasIndex(ev => new { ev.EmployeeId, ev.StartDate })
            .HasDatabaseName("IX_EmployeeVacations_Employee_StartDate")
            .HasFilter("IsDeleted = 0");

        // Composite index for employee + end date (for range queries)
        builder.HasIndex(ev => new { ev.EmployeeId, ev.EndDate })
            .HasDatabaseName("IX_EmployeeVacations_Employee_EndDate")
            .HasFilter("IsDeleted = 0");

        // Index for approved status filtering
        builder.HasIndex(ev => ev.IsApproved)
            .HasDatabaseName("IX_EmployeeVacations_IsApproved")
            .HasFilter("IsDeleted = 0");

        // Index for vacation type queries
        builder.HasIndex(ev => ev.VacationTypeId)
            .HasDatabaseName("IX_EmployeeVacations_VacationTypeId")
            .HasFilter("IsDeleted = 0");

        // Composite index for date range queries (for calendar views)
        builder.HasIndex(ev => new { ev.StartDate, ev.EndDate })
            .HasDatabaseName("IX_EmployeeVacations_DateRange")
            .HasFilter("IsDeleted = 0 AND IsApproved = 1");

        // Check constraints for business rules
        builder.HasCheckConstraint("CK_EmployeeVacations_ValidDateRange",
            "EndDate >= StartDate");

        builder.HasCheckConstraint("CK_EmployeeVacations_PositiveTotalDays",
            "TotalDays > 0");

        // Query filter for soft delete
        builder.HasQueryFilter(ev => !ev.IsDeleted);

        // Base entity configuration (inherited properties)
        builder.Property(ev => ev.CreatedAtUtc)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()")
            .HasComment("UTC timestamp when record was created");

        builder.Property(ev => ev.CreatedBy)
            .HasMaxLength(100)
            .HasComment("User who created the record");

        builder.Property(ev => ev.ModifiedAtUtc)
            .HasComment("UTC timestamp when record was last modified");

        builder.Property(ev => ev.ModifiedBy)
            .HasMaxLength(100)
            .HasComment("User who last modified the record");

        builder.Property(ev => ev.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false)
            .HasComment("Soft delete flag");

        builder.Property(ev => ev.RowVersion)
            .IsConcurrencyToken().ValueGeneratedOnAddOrUpdate()
            .HasComment("Concurrency control timestamp");
    }
}