using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.VacationTypes;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;

/// <summary>
/// Entity Framework configuration for VacationType entity.
/// Defines database schema, constraints, relationships, and indexes for simplified
/// vacation type management with multi-tenant support and performance optimization.
/// </summary>
/// <remarks>
/// Configuration Features:
/// - Column definitions with appropriate data types and constraints
/// - Foreign key relationships with proper referential integrity
/// - Unique constraints ensuring business rule compliance
/// - Performance indexes for efficient querying and filtering
/// - Query filters for soft delete and multi-tenant data isolation
/// - Unicode support for bilingual field storage
///
/// Database Schema:
/// - Primary key identity column with auto-increment
/// - Branch relationship with restrict delete for data integrity
/// - Unique constraint on name within branch scope
/// - Indexes on frequently queried columns for performance
/// - Audit fields inherited from BaseEntity configuration
/// - Soft delete query filter for data retention compliance
///
/// Performance Considerations:
/// - Composite unique index on BranchId and Name for business rules
/// - Single column indexes on IsActive for status filtering
/// - Appropriate column lengths to balance storage and performance
/// </remarks>
public class VacationTypeConfiguration : IEntityTypeConfiguration<VacationType>
{
    /// <summary>
    /// Configures the VacationType entity mapping with simplified database schema definition.
    /// Establishes table structure, relationships, constraints, and performance optimizations
    /// for streamlined vacation type management with multi-tenant capabilities.
    /// </summary>
    /// <param name="builder">Entity type builder for VacationType configuration</param>
    public void Configure(EntityTypeBuilder<VacationType> builder)
    {
        // Table Configuration
        builder.ToTable("VacationTypes");

        // Primary Key
        builder.HasKey(vt => vt.Id);

        // Basic Properties with Validation
        builder.Property(vt => vt.Name)
            .IsRequired()
            .HasMaxLength(100)
            .IsUnicode(true); // Support for international characters

        builder.Property(vt => vt.NameAr)
            .HasMaxLength(100)
            .IsUnicode(true); // Arabic language support

        // Boolean Properties with Defaults
        builder.Property(vt => vt.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        // Foreign Key Relationships
        builder.HasOne(vt => vt.Branch)
            .WithMany() // Branch can have many vacation types
            .HasForeignKey(vt => vt.BranchId)
            .OnDelete(DeleteBehavior.Restrict) // Prevent cascade delete for data integrity
            .IsRequired(false); // BranchId is nullable

        // Unique Constraints for Business Rules
        builder.HasIndex(vt => new { vt.BranchId, vt.Name })
            .IsUnique()
            .HasDatabaseName("IX_VacationTypes_BranchId_Name_Unique")
            .HasFilter("\"IsDeleted\" = false"); // Only enforce uniqueness for non-deleted records

        // Performance Indexes
        builder.HasIndex(vt => vt.IsActive)
            .HasDatabaseName("IX_VacationTypes_IsActive")
            .HasFilter("\"IsDeleted\" = false");

        builder.HasIndex(vt => vt.BranchId)
            .HasDatabaseName("IX_VacationTypes_BranchId")
            .HasFilter("\"IsDeleted\" = false");

        // Composite Index for Common Query Patterns
        builder.HasIndex(vt => new { vt.BranchId, vt.IsActive })
            .HasDatabaseName("IX_VacationTypes_BranchId_IsActive")
            .HasFilter("\"IsDeleted\" = false");

        // Query Filter for Soft Delete (inherited from BaseEntity)
        builder.HasQueryFilter(vt => !vt.IsDeleted);

        // Additional Configuration for BaseEntity Properties
        // These are typically handled by a base configuration, but included for completeness
        builder.Property(vt => vt.CreatedAtUtc)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasDefaultValueSql("NOW()");

        builder.Property(vt => vt.ModifiedAtUtc)
            .IsRequired(false)
            .HasColumnType("timestamp with time zone");

        builder.Property(vt => vt.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false);

        // Configure navigation properties for optimal loading
        builder.Navigation(vt => vt.Branch)
            .EnableLazyLoading(false); // Prevent N+1 queries, require explicit Include
    }
}