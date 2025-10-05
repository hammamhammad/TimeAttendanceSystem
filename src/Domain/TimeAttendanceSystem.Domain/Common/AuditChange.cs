namespace TimeAttendanceSystem.Domain.Common;

/// <summary>
/// Represents a single field-level change within an audit log entry.
/// Captures the old value and new value for each modified field to provide complete change tracking
/// for compliance, forensic analysis, and data governance requirements.
/// </summary>
/// <remarks>
/// AuditChange Features:
/// - Field-level change tracking with before/after value capture
/// - Support for regulatory compliance requirements (GDPR, SOX, HIPAA)
/// - Forensic analysis capabilities for data modification investigations
/// - Integration with parent AuditLog for comprehensive audit trail
/// - Nullable old values supporting entity creation scenarios
/// - Nullable new values supporting entity deletion scenarios
///
/// Use Cases:
/// - Compliance reporting showing exact data modifications
/// - Audit trail analysis for security investigations
/// - Data change history for conflict resolution
/// - Regulatory compliance documentation and reporting
/// - User accountability and change attribution
/// - Data recovery and rollback support
///
/// Relationship:
/// - Many AuditChanges belong to one AuditLog (many-to-one)
/// - Foreign key relationship ensures referential integrity
/// - Cascade delete ensures cleanup when audit log is removed
/// </remarks>
public class AuditChange : BaseEntity
{
    /// <summary>
    /// Gets or sets the foreign key reference to the parent audit log entry.
    /// Links this field-level change to the overall audit operation context.
    /// </summary>
    /// <value>Long integer identifying the parent AuditLog entity</value>
    public long AuditLogId { get; set; }

    /// <summary>
    /// Gets or sets the navigation property to the parent audit log.
    /// Provides access to the complete audit context including user, timestamp, and operation details.
    /// </summary>
    /// <value>AuditLog instance containing the parent audit entry</value>
    public AuditLog AuditLog { get; set; } = null!;

    /// <summary>
    /// Gets or sets the name of the field that was modified.
    /// Identifies which property of the entity was changed during the operation.
    /// </summary>
    /// <value>String representing the property name from the domain entity</value>
    public string FieldName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the value of the field before the modification.
    /// Null for newly created entities or when the original value was null.
    /// </summary>
    /// <value>String representation of the original field value, null if not applicable</value>
    public string? OldValue { get; set; }

    /// <summary>
    /// Gets or sets the value of the field after the modification.
    /// Null for deleted entities or when the new value is null.
    /// </summary>
    /// <value>String representation of the new field value, null if not applicable</value>
    public string? NewValue { get; set; }
}
