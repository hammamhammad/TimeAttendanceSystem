namespace TimeAttendanceSystem.Domain.Common;

/// <summary>
/// Represents a comprehensive audit log entry capturing data modification operations within the system.
/// Provides detailed tracking of who, what, when, and how data was changed for compliance and security monitoring.
/// </summary>
/// <remarks>
/// AuditLog Features:
/// - User attribution through ActorUserId for accountability
/// - Operation classification through AuditAction enum
/// - Entity identification for targeted audit queries
/// - Complete request payload capture for detailed analysis
/// - Network context capture (IP address, user agent) for security analysis
/// - Field-level change tracking through AuditChanges collection
/// - Support for regulatory compliance (GDPR, SOX, HIPAA)
///
/// Change Tracking:
/// - Legacy PayloadJson contains complete new state (backward compatible)
/// - AuditChanges collection contains field-level old/new value pairs
/// - Enables both high-level and detailed change analysis
/// - Supports audit trail reconstruction and data recovery scenarios
/// </remarks>
public class AuditLog : BaseEntity
{
    /// <summary>
    /// Gets or sets the ID of the user who performed the action.
    /// Null for system-initiated operations or unauthenticated requests.
    /// </summary>
    public long? ActorUserId { get; set; }

    /// <summary>
    /// Gets or sets the type of action that was performed.
    /// Uses AuditAction enum for standardized operation classification.
    /// </summary>
    public AuditAction Action { get; set; }

    /// <summary>
    /// Gets or sets the name of the entity that was affected.
    /// Typically the domain entity class name (e.g., "Employee", "User").
    /// </summary>
    public string EntityName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the ID of the specific entity instance that was affected.
    /// Enables targeted audit trail queries for specific records.
    /// </summary>
    public string EntityId { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the complete payload JSON for the operation.
    /// Contains the full request data for legacy compatibility and context.
    /// </summary>
    public string? PayloadJson { get; set; }

    /// <summary>
    /// Gets or sets the IP address of the client that initiated the operation.
    /// Supports security analysis and forensic investigations.
    /// </summary>
    public string? IpAddress { get; set; }

    /// <summary>
    /// Gets or sets the user agent string of the client application.
    /// Provides context about the client software and platform.
    /// </summary>
    public string? UserAgent { get; set; }

    /// <summary>
    /// Gets or sets the collection of field-level changes associated with this audit entry.
    /// Each AuditChange represents a single field modification with old and new values.
    /// </summary>
    /// <value>Collection of AuditChange entities providing detailed change tracking</value>
    public ICollection<AuditChange> Changes { get; set; } = new List<AuditChange>();
}