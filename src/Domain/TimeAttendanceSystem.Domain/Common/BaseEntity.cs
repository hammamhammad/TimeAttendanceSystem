namespace TimeAttendanceSystem.Domain.Common;

/// <summary>
/// Abstract base entity providing common properties and behavior for all domain entities in the system.
/// Implements comprehensive audit trail capabilities, soft delete functionality, and optimistic concurrency control
/// to support enterprise-grade data management, compliance requirements, and multi-user operational scenarios.
/// </summary>
/// <remarks>
/// Base Entity Features:
/// - Unique identifier management with long integer primary keys
/// - Comprehensive audit trail with creation and modification tracking
/// - Soft delete implementation preserving data for compliance and recovery
/// - Optimistic concurrency control preventing data conflicts in multi-user scenarios
/// - User attribution for all data changes supporting accountability and compliance
/// - UTC timestamp standardization preventing timezone-related data consistency issues
/// 
/// Audit Trail Implementation:
/// - CreatedAtUtc: Immutable creation timestamp in UTC for consistent global operations
/// - CreatedBy: User identification for creation accountability and compliance tracking
/// - ModifiedAtUtc: Latest modification timestamp supporting change tracking and versioning
/// - ModifiedBy: User identification for modification accountability and audit requirements
/// - Automatic timestamp management through Entity Framework interceptors
/// - Comprehensive change history support for regulatory compliance and data governance
/// 
/// Soft Delete Functionality:
/// - IsDeleted flag enabling logical deletion without physical data removal
/// - Data preservation for compliance, audit, and recovery requirements
/// - Query filtering to exclude deleted entities from normal business operations
/// - Administrative access to deleted data for compliance and forensic analysis
/// - Referential integrity maintenance during logical deletion processes
/// - Support for data lifecycle management and retention policies
/// 
/// Concurrency Control:
/// - RowVersion byte array implementing optimistic concurrency through Entity Framework
/// - Automatic version increment on every entity modification
/// - Conflict detection and resolution for concurrent modification scenarios
/// - Data integrity protection in multi-user and distributed system environments
/// - Performance optimization through lock-free concurrency management
/// - Support for eventual consistency patterns in distributed architectures
/// 
/// Enterprise Integration:
/// - Consistent entity structure across all domain aggregates and entities
/// - Support for multi-tenant organizational structures and data isolation
/// - Integration with organizational user management and identity systems
/// - Compliance with data protection regulations (GDPR, HIPAA, SOX)
/// - Audit trail integration with enterprise monitoring and compliance systems
/// - Performance optimization through efficient indexing and query patterns
/// 
/// Data Governance:
/// - Immutable audit fields preventing tampering and ensuring data integrity
/// - User attribution enabling accountability and compliance reporting
/// - Soft delete supporting data retention policies and regulatory requirements
/// - Version control through optimistic concurrency supporting change management
/// - UTC timestamp standardization supporting global operations and reporting
/// - Comprehensive change tracking enabling forensic analysis and compliance audits
/// </remarks>
public abstract class BaseEntity
{
    /// <summary>
    /// Gets or sets the unique identifier for this entity.
    /// Serves as the primary key for database operations and entity relationships.
    /// </summary>
    /// <value>Long integer providing globally unique entity identification</value>
    public long Id { get; set; }
    /// <summary>
    /// Gets or sets the UTC timestamp when this entity was created.
    /// Provides immutable audit trail information for compliance and tracking purposes.
    /// </summary>
    /// <value>UTC DateTime of entity creation, automatically set by infrastructure</value>
    public DateTime CreatedAtUtc { get; set; }
    /// <summary>
    /// Gets or sets the username or identifier of the user who created this entity.
    /// Provides accountability and audit trail information for compliance requirements.
    /// </summary>
    /// <value>Username string identifying the entity creator</value>
    public string CreatedBy { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the UTC timestamp when this entity was last modified.
    /// Provides change tracking information for audit trails and version control.
    /// </summary>
    /// <value>UTC DateTime of last modification, null if never modified</value>
    public DateTime? ModifiedAtUtc { get; set; }
    /// <summary>
    /// Gets or sets the username or identifier of the user who last modified this entity.
    /// Provides accountability for changes and supports compliance audit requirements.
    /// </summary>
    /// <value>Username string identifying the last modifier, null if never modified</value>
    public string? ModifiedBy { get; set; }
    /// <summary>
    /// Gets or sets a value indicating whether this entity has been logically deleted.
    /// Implements soft delete functionality preserving data for compliance and recovery.
    /// </summary>
    /// <value>Boolean flag indicating logical deletion status (true = deleted, false = active)</value>
    public bool IsDeleted { get; set; }
    /// <summary>
    /// Gets or sets the row version byte array for optimistic concurrency control.
    /// Automatically managed by Entity Framework to detect and prevent concurrent modifications.
    /// </summary>
    /// <value>Byte array representing the current version of the entity for concurrency checking</value>
    public byte[] RowVersion { get; set; } = Array.Empty<byte>();
}