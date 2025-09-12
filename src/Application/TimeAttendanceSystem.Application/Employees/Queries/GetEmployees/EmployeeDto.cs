using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployees;

/// <summary>
/// Data Transfer Object representing comprehensive employee information for HR management operations.
/// Contains complete employee details, organizational relationships, and system integration status
/// with bilingual support and multi-tenant organizational context.
/// </summary>
/// <remarks>
/// Employee DTO Features:
/// - Complete employee demographic and contact information
/// - Organizational hierarchy and reporting relationships
/// - Employment status and lifecycle management
/// - Bilingual name support for international organizations
/// - System integration status and user account linking
/// - Multi-tenant branch and department associations
/// 
/// Data Structure Design:
/// - Optimized for HR management interfaces and reporting
/// - Includes computed properties for display convenience
/// - Minimal sensitive data exposure for security
/// - Efficient serialization for API responses
/// - Compatible with frontend UI frameworks and components
/// 
/// Organizational Context:
/// - Branch assignment for multi-location organizations
/// - Department association for functional organization
/// - Manager relationship for hierarchical reporting
/// - Job title and role information for classification
/// - Work location type for modern work arrangements
/// 
/// Employment Lifecycle:
/// - Hire date for tenure calculation and anniversary tracking
/// - Employment status for workforce planning and compliance
/// - Active/inactive status for current workforce analysis
/// - Creation timestamp for audit trails and record keeping
/// - User account status for system access management
/// 
/// Internationalization Support:
/// - Bilingual names in English and Arabic languages
/// - Job title localization for multi-language interfaces
/// - Cultural name formatting conventions
/// - RTL (Right-to-Left) text support for Arabic content
/// - Localized display properties for UI convenience
/// 
/// Security and Privacy:
/// - Personal information limited to business requirements
/// - Sensitive data (SSN, salary, etc.) excluded from general DTOs
/// - Role-based data visibility and access control
/// - GDPR compliance for personal data handling
/// - Audit trail information for compliance requirements
/// </remarks>
public class EmployeeDto
{
    /// <summary>
    /// Gets or sets the unique identifier for the employee record.
    /// Primary key for employee data management and relationship linking.
    /// </summary>
    /// <value>Unique employee identifier as long integer</value>
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets the branch identifier for multi-tenant organizational structure.
    /// Links employee to specific organizational location for access control and reporting.
    /// </summary>
    /// <value>Branch ID where the employee is assigned</value>
    public long BranchId { get; set; }

    /// <summary>
    /// Gets or sets the branch name for display and organizational context.
    /// Human-readable branch identification for UI components and reporting.
    /// </summary>
    /// <value>Branch name string for organizational context</value>
    public string BranchName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the unique employee number within the branch context.
    /// Business identifier for employee lookup and integration with external systems.
    /// </summary>
    /// <value>Alphanumeric employee number unique within branch</value>
    /// <remarks>
    /// Employee Number Characteristics:
    /// - Unique within branch scope for multi-tenant isolation
    /// - Human-readable format for easy reference and communication
    /// - Integration key for payroll and external HR systems
    /// - Sequential or coded numbering based on organizational preferences
    /// - Used in time attendance tracking and reporting
    /// </remarks>
    public string EmployeeNumber { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee's first name in the primary language (English).
    /// Used for official records, system communications, and formal documentation.
    /// </summary>
    /// <value>First name in English</value>
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee's last name in the primary language (English).
    /// Used for official records, system communications, and formal documentation.
    /// </summary>
    /// <value>Last name in English</value>
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee's first name in Arabic for bilingual organizations.
    /// Supports cultural preferences and localized user interfaces.
    /// </summary>
    /// <value>First name in Arabic (optional)</value>
    public string FirstNameAr { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the employee's last name in Arabic for bilingual organizations.
    /// Supports cultural preferences and localized user interfaces.
    /// </summary>
    /// <value>Last name in Arabic (optional)</value>
    public string LastNameAr { get; set; } = string.Empty;

    /// <summary>
    /// Gets the employee's full name in English by combining first and last names.
    /// Computed property for display convenience and consistent name formatting.
    /// </summary>
    /// <value>Full name as "FirstName LastName" format</value>
    /// <remarks>
    /// Used for:
    /// - Display in user interfaces and dropdown lists
    /// - Report generation and document formatting
    /// - Email communications and notifications
    /// - Organizational charts and directory listings
    /// </remarks>
    public string FullName => $"{FirstName} {LastName}";

    /// <summary>
    /// Gets the employee's full name in Arabic by combining first and last names.
    /// Computed property supporting RTL languages and cultural naming conventions.
    /// </summary>
    /// <value>Full name in Arabic as "FirstNameAr LastNameAr" format</value>
    /// <remarks>
    /// Arabic Name Features:
    /// - Supports Right-to-Left (RTL) text direction
    /// - Cultural name formatting conventions
    /// - Localized user interface integration
    /// - Bilingual report and document generation
    /// </remarks>
    public string FullNameAr => $"{FirstNameAr} {LastNameAr}";

    /// <summary>
    /// Gets or sets the employee's email address for business communications.
    /// Optional contact method for system notifications and professional correspondence.
    /// </summary>
    /// <value>Business email address (optional)</value>
    /// <remarks>
    /// Email Usage:
    /// - System notifications and alerts
    /// - Password reset and security communications
    /// - Organizational announcements and updates
    /// - Integration with email systems and calendars
    /// - Professional contact directory
    /// </remarks>
    public string? Email { get; set; }

    /// <summary>
    /// Gets or sets the employee's phone number for contact and emergency purposes.
    /// Optional contact method supporting various phone number formats.
    /// </summary>
    /// <value>Phone number (optional)</value>
    public string? Phone { get; set; }

    /// <summary>
    /// Gets or sets the employee's hire date for tenure calculation and anniversary tracking.
    /// Important date for employment history, benefits eligibility, and compliance.
    /// </summary>
    /// <value>Employment start date (optional for contractors)</value>
    /// <remarks>
    /// Hire Date Applications:
    /// - Tenure calculation for benefits and policies
    /// - Anniversary tracking and recognition programs
    /// - Probationary period management
    /// - Retirement planning and vesting calculations
    /// - Compliance reporting and labor law adherence
    /// </remarks>
    public DateTime? HireDate { get; set; }

    /// <summary>
    /// Gets or sets the employee's current employment status for lifecycle management.
    /// Indicates the employee's current state in the employment lifecycle.
    /// </summary>
    /// <value>Employment status enumeration</value>
    /// <remarks>
    /// Employment Status Values:
    /// - Active: Currently employed and working
    /// - Inactive: Temporarily not working (leave, suspension)
    /// - Terminated: Employment ended (resignation, termination)
    /// - OnLeave: Extended leave (medical, personal, maternity)
    /// - Probationary: Initial employment period
    /// </remarks>
    public EmploymentStatus EmploymentStatus { get; set; }

    /// <summary>
    /// Gets or sets the employee's job title in the primary language.
    /// Professional designation for organizational structure and reporting.
    /// </summary>
    /// <value>Job title in English (optional)</value>
    public string? JobTitle { get; set; }

    /// <summary>
    /// Gets or sets the employee's job title in Arabic for bilingual organizations.
    /// Localized professional designation supporting cultural preferences.
    /// </summary>
    /// <value>Job title in Arabic (optional)</value>
    public string? JobTitleAr { get; set; }

    /// <summary>
    /// Gets or sets the department identifier for organizational grouping.
    /// Links employee to functional department within the branch structure.
    /// </summary>
    /// <value>Department ID for organizational assignment (optional)</value>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Gets or sets the department name for organizational context and display.
    /// Human-readable department identification for reporting and UI components.
    /// </summary>
    /// <value>Department name for organizational context (optional)</value>
    public string? DepartmentName { get; set; }

    /// <summary>
    /// Gets or sets the manager's employee identifier for reporting hierarchy.
    /// Establishes supervisory relationships and organizational structure.
    /// </summary>
    /// <value>Manager's employee ID for hierarchical relationships (optional)</value>
    public long? ManagerEmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the manager's full name for display and organizational context.
    /// Human-readable manager identification for hierarchy visualization.
    /// </summary>
    /// <value>Manager's full name for organizational display (optional)</value>
    public string? ManagerName { get; set; }

    /// <summary>
    /// Gets or sets the work location type for modern workplace arrangements.
    /// Indicates the primary work arrangement for the employee.
    /// </summary>
    /// <value>Work location type enumeration</value>
    /// <remarks>
    /// Work Location Types:
    /// - Office: Traditional office-based work
    /// - Remote: Work-from-home or remote location
    /// - Hybrid: Combination of office and remote work
    /// - Field: Mobile or field-based work assignments
    /// - Client Site: Work performed at client locations
    /// </remarks>
    public WorkLocationType WorkLocationType { get; set; }

    /// <summary>
    /// Gets or sets the employee's active status for current workforce analysis.
    /// Indicates whether the employee is currently part of the active workforce.
    /// </summary>
    /// <value>Active status boolean (true = active, false = inactive/deleted)</value>
    /// <remarks>
    /// Active Status Usage:
    /// - Current workforce counting and analysis
    /// - System access control and permissions
    /// - Reporting and analytics filtering
    /// - Soft delete implementation for data preservation
    /// - Historical record maintenance for compliance
    /// </remarks>
    public bool IsActive { get; set; }

    /// <summary>
    /// Gets or sets the user account linking status for system access.
    /// Indicates whether the employee has an associated user account for system login.
    /// </summary>
    /// <value>User account existence boolean</value>
    /// <remarks>
    /// User Account Integration:
    /// - Determines system access capabilities
    /// - Self-service portal availability
    /// - Time attendance system login eligibility
    /// - Security and authorization management
    /// - Employee vs user separation for data management
    /// </remarks>
    public bool HasUserAccount { get; set; }

    /// <summary>
    /// Gets or sets the record creation timestamp for audit trails.
    /// UTC timestamp indicating when the employee record was initially created.
    /// </summary>
    /// <value>Creation timestamp in UTC</value>
    /// <remarks>
    /// Audit Trail Information:
    /// - Record creation tracking for compliance
    /// - Data lifecycle management and archival
    /// - System integration and migration tracking
    /// - Historical analysis and reporting
    /// - Compliance with data retention policies
    /// </remarks>
    public DateTime CreatedAtUtc { get; set; }
}