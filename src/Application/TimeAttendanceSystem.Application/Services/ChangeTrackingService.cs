using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Services;

/// <summary>
/// Service providing comprehensive change tracking functionality for audit trail generation.
/// Analyzes Entity Framework change tracker to extract field-level modifications with old and new values
/// for compliance, forensic analysis, and data governance requirements.
/// </summary>
/// <remarks>
/// Change Tracking Features:
/// - Field-level change detection using EF Core change tracker
/// - Old value and new value extraction for all modified properties
/// - Automatic exclusion of audit metadata fields (timestamps, RowVersion)
/// - Support for complex entity modifications and relationships
/// - Null value handling for both creation and deletion scenarios
/// - Type-safe value conversion to string representation
///
/// Performance Considerations:
/// - Efficient property iteration minimizing reflection overhead
/// - Selective property filtering reducing unnecessary processing
/// - Batch change collection for multiple entity modifications
/// - Memory-efficient string conversions and collections
/// - Integration with EF Core change tracker for optimal performance
///
/// Audit Trail Integration:
/// - Generates AuditChange collection for each modified entity
/// - Captures complete before/after state for compliance
/// - Supports regulatory requirements (GDPR, SOX, HIPAA)
/// - Enables forensic analysis and data recovery scenarios
/// - Provides foundation for conflict resolution and versioning
/// </remarks>
public class ChangeTrackingService
{
    /// <summary>
    /// Extracts field-level changes from a modified entity entry.
    /// Compares original and current values for each property to generate detailed change records.
    /// </summary>
    /// <param name="entry">Entity entry from EF Core change tracker containing modification state</param>
    /// <returns>Collection of AuditChange entities representing field-level modifications</returns>
    /// <remarks>
    /// Change Detection Process:
    /// 1. Iterates through all properties in the entity
    /// 2. Filters out audit metadata properties (timestamps, RowVersion, etc.)
    /// 3. Compares original value with current value for each property
    /// 4. Creates AuditChange entry for properties with detected changes
    /// 5. Converts values to string representation for storage
    ///
    /// Excluded Properties:
    /// - CreatedAtUtc, CreatedBy: Immutable creation metadata
    /// - ModifiedAtUtc, ModifiedBy: Automatically managed modification metadata
    /// - RowVersion: EF Core concurrency token (internal use only)
    /// - IsDeleted: Soft delete flag (tracked separately in audit action)
    ///
    /// Value Handling:
    /// - Null values represented as null in OldValue/NewValue
    /// - Complex types converted to string using ToString()
    /// - Navigation properties excluded from change tracking
    /// - Scalar properties only for clean audit trail
    /// </remarks>
    public List<AuditChange> GetChanges(EntityEntry entry)
    {
        var changes = new List<AuditChange>();

        foreach (var property in entry.Properties)
        {
            // Skip audit-related properties and navigation properties
            if (ShouldSkipProperty(property.Metadata.Name))
                continue;

            var originalValue = property.OriginalValue?.ToString();
            var currentValue = property.CurrentValue?.ToString();

            // Only track changes where values actually differ
            if (originalValue != currentValue)
            {
                changes.Add(new AuditChange
                {
                    FieldName = property.Metadata.Name,
                    OldValue = originalValue,
                    NewValue = currentValue
                });
            }
        }

        return changes;
    }

    /// <summary>
    /// Determines whether a property should be excluded from change tracking.
    /// Filters out audit metadata and internal EF Core properties to keep audit trail clean.
    /// </summary>
    /// <param name="propertyName">Name of the property to evaluate</param>
    /// <returns>True if property should be skipped, false if it should be tracked</returns>
    /// <remarks>
    /// Skipped Properties:
    /// - Audit Metadata: CreatedAtUtc, CreatedBy, ModifiedAtUtc, ModifiedBy
    /// - Concurrency Control: RowVersion (EF Core internal)
    /// - Soft Delete: IsDeleted (tracked via audit action instead)
    /// - Primary Keys: Id (tracked in EntityId instead)
    ///
    /// Rationale:
    /// - Reduces noise in audit trail by focusing on business data
    /// - Prevents redundant tracking of automatically managed fields
    /// - Keeps audit change records focused on user-initiated modifications
    /// - Improves performance by reducing unnecessary change records
    /// </remarks>
    private static bool ShouldSkipProperty(string propertyName)
    {
        var skipProperties = new[]
        {
            nameof(BaseEntity.CreatedAtUtc),
            nameof(BaseEntity.CreatedBy),
            nameof(BaseEntity.ModifiedAtUtc),
            nameof(BaseEntity.ModifiedBy),
            nameof(BaseEntity.RowVersion),
            nameof(BaseEntity.IsDeleted),
            nameof(BaseEntity.Id)
        };

        return skipProperties.Contains(propertyName);
    }
}
