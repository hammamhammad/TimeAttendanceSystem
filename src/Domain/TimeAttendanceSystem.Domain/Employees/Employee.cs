using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Domain.Employees;

/// <summary>
/// Domain entity representing an employee within the organizational time attendance system.
/// Provides comprehensive employee information management including personal details, organizational relationships,
/// employment lifecycle, and integration with user authentication systems for complete HR operations support.
/// </summary>
/// <remarks>
/// Employee Entity Features:
/// - Complete employee demographic and professional information management
/// - Hierarchical organizational relationships with branch, department, and manager assignments
/// - Employment lifecycle tracking from hire through status changes and termination
/// - Bilingual name support for international organizations and cultural preferences
/// - User account integration for system access and self-service capabilities
/// - Photo management for employee identification and directory services
/// - Multi-tenant organizational context through branch assignment
/// 
/// Personal Information Management:
/// - Comprehensive name handling with bilingual support (English/Arabic)
/// - Contact information management for communication and emergency purposes
/// - National identification support for compliance and legal requirements
/// - Demographic information collection supporting diversity and compliance reporting
/// - Date of birth tracking for age-related policy enforcement and benefits
/// - Gender information for reporting and accommodation requirements
/// 
/// Organizational Structure:
/// - Branch assignment for multi-tenant organizational isolation and access control
/// - Department assignment for functional organization and reporting structure
/// - Manager relationship for hierarchical reporting and approval workflows
/// - Direct reports collection for management hierarchy and delegation capabilities
/// - Job title management with bilingual support for international operations
/// - Work location type classification for modern workplace arrangements
/// 
/// Employment Lifecycle:
/// - Hire date tracking for tenure calculation and anniversary management
/// - Employment status management supporting various employment states
/// - Job classification and role definition for organizational structure
/// - Career progression tracking through job title and department changes
/// - Status transitions supporting HR processes and compliance requirements
/// - Integration with payroll and benefits systems through employment data
/// 
/// System Integration:
/// - User account linking for authentication and system access management
/// - Employee number generation for unique identification within branch scope
/// - Photo URL management for employee directory and identification systems
/// - Integration with time attendance tracking through employee identification
/// - Support for self-service portals and employee-facing applications
/// - External system integration through employee number and identification
/// 
/// Multi-tenant Support:
/// - Branch-scoped employee management ensuring organizational data isolation
/// - Cross-branch administrative access control for enterprise operations
/// - Department-level organization within branch boundaries
/// - Manager assignment validation within organizational hierarchy
/// - Reporting and analytics with proper tenant isolation and access control
/// - Compliance with data residency and privacy requirements per location
/// 
/// Compliance and Reporting:
/// - Comprehensive employee data collection for regulatory compliance
/// - Equal opportunity reporting through demographic information collection
/// - Audit trail support through base entity change tracking capabilities
/// - Data retention and lifecycle management for compliance requirements
/// - Privacy protection through controlled access and data minimization
/// - Integration with HR compliance systems and regulatory reporting
/// </remarks>
public class Employee : BaseEntity
{
    /// <summary>
    /// Gets or sets the branch identifier linking this employee to their organizational location.
    /// Defines multi-tenant scope and organizational boundary for access control and reporting.
    /// </summary>
    /// <value>Branch ID establishing organizational context and tenant isolation</value>
    public long BranchId { get; set; }
    /// <summary>
    /// Gets or sets the unique employee number within the branch organizational scope.
    /// Serves as business identifier for integration, reporting, and user-friendly employee reference.
    /// </summary>
    /// <value>Alphanumeric employee identifier unique within branch for business operations</value>
    public string EmployeeNumber { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the employee's first name in the primary language (English).
    /// Used for official records, communications, and system identification purposes.
    /// </summary>
    /// <value>First name in English for primary identification and official records</value>
    public string FirstName { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the employee's last name in the primary language (English).
    /// Used for official records, communications, and system identification purposes.
    /// </summary>
    /// <value>Last name in English for primary identification and official records</value>
    public string LastName { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the employee's first name in Arabic for bilingual organizational support.
    /// Supports cultural preferences and localized user interfaces in Arabic-speaking regions.
    /// </summary>
    /// <value>First name in Arabic for cultural accommodation and localization (optional)</value>
    public string? FirstNameAr { get; set; }
    /// <summary>
    /// Gets or sets the employee's last name in Arabic for bilingual organizational support.
    /// Supports cultural preferences and localized user interfaces in Arabic-speaking regions.
    /// </summary>
    /// <value>Last name in Arabic for cultural accommodation and localization (optional)</value>
    public string? LastNameAr { get; set; }
    public string? NationalId { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public DateTime HireDate { get; set; }
    public EmploymentStatus EmploymentStatus { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public long? DepartmentId { get; set; }
    public long? ManagerEmployeeId { get; set; }
    public WorkLocationType WorkLocationType { get; set; }
    public string? PhotoUrl { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether this employee is active in the system.
    /// Active employees can access the system and are visible in normal operations.
    /// Inactive employees are hidden from normal operations but data is preserved.
    /// This is separate from IsDeleted (soft delete) which marks records for permanent removal.
    /// </summary>
    /// <value>Boolean flag indicating active status (true = active, false = inactive)</value>
    public bool IsActive { get; set; } = true;

    public Branch Branch { get; set; } = null!;
    public Department? Department { get; set; }
    public Employee? Manager { get; set; }
    public ICollection<Employee> DirectReports { get; set; } = new List<Employee>();
    public EmployeeUserLink? EmployeeUserLink { get; set; }

    public string FullName => $"{FirstName} {LastName}";
    public string? FullNameAr => !string.IsNullOrEmpty(FirstNameAr) && !string.IsNullOrEmpty(LastNameAr) 
        ? $"{FirstNameAr} {LastNameAr}" 
        : null;
}