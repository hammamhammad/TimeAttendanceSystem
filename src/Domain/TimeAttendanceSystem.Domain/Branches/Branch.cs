using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Branches;

/// <summary>
/// Domain entity representing an organizational branch or location within the multi-tenant time attendance system.
/// Serves as the primary unit of organizational hierarchy, providing geographic, operational, and administrative
/// boundaries for employee management, time tracking, and organizational reporting within enterprise structures.
/// </summary>
/// <remarks>
/// Branch Entity Features:
/// - Multi-tenant organizational structure support with unique identification
/// - Geographic and operational location management for distributed organizations
/// - Timezone-aware operations supporting global workforce management
/// - Hierarchical organizational structure with department subdivision capabilities
/// - Administrative boundary definition for access control and data isolation
/// - Integration with user access control and employee assignment systems
/// 
/// Organizational Hierarchy:
/// - Primary organizational unit for multi-tenant system architecture
/// - Parent container for departments and employee organizational assignments
/// - Geographic location representation supporting distributed workforce
/// - Operational center definition for time attendance policy application
/// - Administrative boundary for reporting, compliance, and access control
/// - Business unit representation supporting complex organizational structures
/// 
/// Multi-tenant Architecture:
/// - Tenant isolation boundary ensuring data privacy and security
/// - Branch-scoped user access control preventing cross-tenant data access
/// - Organizational data partitioning for performance and security optimization
/// - Independent operational configuration per branch location
/// - Scalable multi-tenant design supporting organizational growth and change
/// - Compliance with data residency and privacy regulations per location
/// 
/// Timezone Management:
/// - Location-specific timezone configuration for accurate time tracking
/// - Global workforce support with local time calculation capabilities
/// - Daylight saving time handling for accurate attendance calculations
/// - Cross-timezone reporting and analysis with proper time normalization
/// - Local business hours definition and policy enforcement
/// - Integration with global time synchronization and scheduling systems
/// 
/// Operational Management:
/// - Active/inactive status control for branch lifecycle management
/// - Temporary branch closure support without data loss
/// - Business continuity planning through branch status management
/// - Seasonal operation support for location-specific business patterns
/// - Maintenance mode capabilities for system updates and configurations
/// - Integration with organizational change management processes
/// 
/// Integration Points:
/// - Employee assignment and organizational hierarchy management
/// - User access control and permission scoping within branch boundaries
/// - Time attendance policy application and enforcement by location
/// - Reporting and analytics with branch-specific data aggregation
/// - Compliance and audit trail generation for regulatory requirements
/// - Integration with external HR and organizational management systems
/// </remarks>
public class Branch : BaseEntity
{
    /// <summary>
    /// Gets or sets the unique branch code for organizational identification and integration.
    /// Serves as a business identifier for external system integration and user-friendly reference.
    /// </summary>
    /// <value>Alphanumeric code uniquely identifying the branch within the organization</value>
    public string Code { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the descriptive name of the branch for display and organizational reference.
    /// Provides human-readable identification for user interfaces, reports, and communications.
    /// </summary>
    /// <value>Descriptive branch name for organizational identification and display purposes</value>
    public string Name { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the timezone identifier for this branch location supporting global operations.
    /// Enables accurate time calculations, attendance tracking, and scheduling for distributed organizations.
    /// </summary>
    /// <value>IANA timezone identifier (e.g., "America/New_York", "Europe/London") for location-specific time handling</value>
    public string TimeZone { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the operational status of the branch indicating availability for business operations.
    /// Controls branch visibility, employee assignment eligibility, and operational feature availability.
    /// </summary>
    /// <value>Boolean indicating operational status (true = active/operational, false = inactive/closed)</value>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets the collection of departments operating within this branch location.
    /// Represents the organizational subdivision providing functional structure and employee grouping.
    /// </summary>
    /// <value>Collection of Department entities belonging to this branch for organizational hierarchy</value>
    public ICollection<Department> Departments { get; set; } = new List<Department>();
}