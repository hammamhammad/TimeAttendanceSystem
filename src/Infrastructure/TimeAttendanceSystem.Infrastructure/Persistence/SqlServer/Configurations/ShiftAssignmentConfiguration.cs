using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer.Configurations;

/// <summary>
/// Entity Framework configuration for the ShiftAssignment entity.
/// Configures database schema, relationships, indexes, and constraints for comprehensive shift assignment management.
/// </summary>
/// <remarks>
/// Configuration Features:
/// - Primary key and foreign key relationship setup
/// - Index optimization for query performance
/// - Check constraints for data integrity validation
/// - Proper nullable field handling for conditional relationships
/// - Audit trail and soft delete support
/// - Multi-tenant data isolation through relationships
///
/// Database Design:
/// - Composite indexes for efficient querying by assignment type and dates
/// - Foreign key constraints with cascade behaviors for data consistency
/// - Check constraints to ensure only one target type is specified per assignment
/// - Proper data types and lengths for optimal storage and performance
/// - Index strategies optimized for common query patterns
///
/// Business Rule Enforcement:
/// - Ensures assignment type matches populated target fields
/// - Validates date logic through database constraints
/// - Enforces referential integrity across organizational hierarchy
/// - Supports soft delete pattern for audit trail preservation
/// - Enables efficient querying for active assignments by date ranges
/// </remarks>
public class ShiftAssignmentConfiguration : IEntityTypeConfiguration<ShiftAssignment>
{
    /// <summary>
    /// Configures the ShiftAssignment entity with database schema definitions,
    /// relationships, constraints, and performance optimizations.
    /// </summary>
    /// <param name="builder">Entity type builder for configuring the ShiftAssignment entity</param>
    public void Configure(EntityTypeBuilder<ShiftAssignment> builder)
    {
        // Table configuration
        builder.ToTable("ShiftAssignments");

        // Primary key
        builder.HasKey(sa => sa.Id);

        // Properties configuration
        builder.Property(sa => sa.ShiftId)
            .IsRequired()
            .HasComment("Foreign key to the Shift entity being assigned");

        builder.Property(sa => sa.AssignmentType)
            .IsRequired()
            .HasConversion<int>()
            .HasComment("Type of assignment: Employee (1), Department (2), or Branch (3)");

        builder.Property(sa => sa.EmployeeId)
            .IsRequired(false)
            .HasComment("Employee ID for employee-level assignments (null for department/branch assignments)");

        builder.Property(sa => sa.DepartmentId)
            .IsRequired(false)
            .HasComment("Department ID for department-level assignments (null for employee/branch assignments)");

        builder.Property(sa => sa.BranchId)
            .IsRequired(false)
            .HasComment("Branch ID for branch-level assignments (null for employee/department assignments)");

        builder.Property(sa => sa.EffectiveFromDate)
            .IsRequired()
            .HasColumnType("datetime2")
            .HasColumnName("EffectiveFromDate")
            .HasComment("Date when this assignment becomes active");

        builder.Property(sa => sa.EffectiveToDate)
            .IsRequired(false)
            .HasColumnType("datetime2")
            .HasColumnName("EffectiveToDate")
            .HasComment("Optional end date for temporary assignments");

        builder.Property(sa => sa.Status)
            .IsRequired()
            .HasConversion<int>()
            .HasDefaultValue(ShiftAssignmentStatus.Pending)
            .HasComment("Assignment status: Pending (1), Active (2), Inactive (3), Expired (4), Cancelled (5)");

        builder.Property(sa => sa.Priority)
            .IsRequired()
            .HasDefaultValue(10)
            .HasComment("Assignment priority for conflict resolution (higher values take precedence)");

        builder.Property(sa => sa.Notes)
            .IsRequired(false)
            .HasMaxLength(1000)
            .HasComment("Optional notes about the assignment");

        builder.Property(sa => sa.AssignedByUserId)
            .IsRequired()
            .HasComment("ID of the user who created this assignment");

        // Audit fields from BaseEntity
        builder.Property(sa => sa.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(sa => sa.CreatedAtUtc)
            .IsRequired();

        builder.Property(sa => sa.CreatedBy)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(sa => sa.ModifiedAtUtc)
            .IsRequired(false);

        builder.Property(sa => sa.ModifiedBy)
            .IsRequired(false)
            .HasMaxLength(100);

        builder.Property(sa => sa.RowVersion)
            .IsRowVersion();

        // Relationships
        builder.HasOne(sa => sa.Shift)
            .WithMany()
            .HasForeignKey(sa => sa.ShiftId)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_ShiftAssignments_Shifts");

        builder.HasOne(sa => sa.Employee)
            .WithMany()
            .HasForeignKey(sa => sa.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false)
            .HasConstraintName("FK_ShiftAssignments_Employees");

        builder.HasOne(sa => sa.Department)
            .WithMany()
            .HasForeignKey(sa => sa.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false)
            .HasConstraintName("FK_ShiftAssignments_Departments");

        builder.HasOne(sa => sa.Branch)
            .WithMany()
            .HasForeignKey(sa => sa.BranchId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false)
            .HasConstraintName("FK_ShiftAssignments_Branches");

        // Indexes for performance optimization

        // Primary query index for active assignments
        builder.HasIndex(sa => new { sa.Status, sa.EffectiveFromDate, sa.EffectiveToDate })
            .HasDatabaseName("IX_ShiftAssignments_Status_EffectiveFromDate_EffectiveToDate")
            .HasFilter("[IsDeleted] = 0");

        // Assignment type specific indexes
        builder.HasIndex(sa => new { sa.AssignmentType, sa.EmployeeId, sa.EffectiveFromDate })
            .HasDatabaseName("IX_ShiftAssignments_Employee_EffectiveFromDate")
            .HasFilter("[IsDeleted] = 0 AND [AssignmentType] = 1 AND [EmployeeId] IS NOT NULL");

        builder.HasIndex(sa => new { sa.AssignmentType, sa.DepartmentId, sa.EffectiveFromDate })
            .HasDatabaseName("IX_ShiftAssignments_Department_EffectiveFromDate")
            .HasFilter("[IsDeleted] = 0 AND [AssignmentType] = 2 AND [DepartmentId] IS NOT NULL");

        builder.HasIndex(sa => new { sa.AssignmentType, sa.BranchId, sa.EffectiveFromDate })
            .HasDatabaseName("IX_ShiftAssignments_Branch_EffectiveFromDate")
            .HasFilter("[IsDeleted] = 0 AND [AssignmentType] = 3 AND [BranchId] IS NOT NULL");

        // Shift-based query index
        builder.HasIndex(sa => sa.ShiftId)
            .HasDatabaseName("IX_ShiftAssignments_ShiftId")
            .HasFilter("[IsDeleted] = 0");

        // Priority-based index for conflict resolution
        builder.HasIndex(sa => new { sa.Priority, sa.Status, sa.EffectiveFromDate })
            .HasDatabaseName("IX_ShiftAssignments_Priority_Status_EffectiveFromDate")
            .HasFilter("[IsDeleted] = 0");

        // Check constraints for data integrity

        // Ensure only one target type is specified
        builder.HasCheckConstraint("CK_ShiftAssignments_SingleTargetType",
            @"(CASE WHEN [AssignmentType] = 1 THEN 1 ELSE 0 END) +
              (CASE WHEN [AssignmentType] = 2 THEN 1 ELSE 0 END) +
              (CASE WHEN [AssignmentType] = 3 THEN 1 ELSE 0 END) = 1");

        // Ensure target ID matches assignment type
        builder.HasCheckConstraint("CK_ShiftAssignments_EmployeeTypeMatch",
            @"([AssignmentType] = 1 AND [EmployeeId] IS NOT NULL AND [DepartmentId] IS NULL AND [BranchId] IS NULL) OR
              ([AssignmentType] != 1)");

        builder.HasCheckConstraint("CK_ShiftAssignments_DepartmentTypeMatch",
            @"([AssignmentType] = 2 AND [DepartmentId] IS NOT NULL AND [EmployeeId] IS NULL AND [BranchId] IS NULL) OR
              ([AssignmentType] != 2)");

        builder.HasCheckConstraint("CK_ShiftAssignments_BranchTypeMatch",
            @"([AssignmentType] = 3 AND [BranchId] IS NOT NULL AND [EmployeeId] IS NULL AND [DepartmentId] IS NULL) OR
              ([AssignmentType] != 3)");

        // Ensure end date is after effective date when specified
        builder.HasCheckConstraint("CK_ShiftAssignments_EndDateAfterEffectiveDate",
            "[EffectiveToDate] IS NULL OR [EffectiveToDate] > [EffectiveFromDate]");

        // Ensure priority is within valid range
        builder.HasCheckConstraint("CK_ShiftAssignments_ValidPriority",
            "[Priority] >= 0 AND [Priority] <= 100");

        // Global query filter for soft delete
        builder.HasQueryFilter(sa => !sa.IsDeleted);
    }
}