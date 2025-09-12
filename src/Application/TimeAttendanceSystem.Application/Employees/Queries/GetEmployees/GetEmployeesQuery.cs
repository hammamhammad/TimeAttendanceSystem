using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployees;

/// <summary>
/// CQRS query for retrieving paginated employee lists with comprehensive filtering capabilities.
/// Supports multi-field search, organizational filtering, and employment status management
/// with multi-tenant security and performance optimization for HR operations.
/// </summary>
/// <param name="Page">Page number for pagination (1-based indexing, default: 1)</param>
/// <param name="PageSize">Number of employees per page (default: 10, recommended max: 100)</param>
/// <param name="Search">Optional search term across employee names, numbers, and emails</param>
/// <param name="BranchId">Optional branch ID to filter employees by organizational location</param>
/// <param name="DepartmentId">Optional department ID to filter employees by department assignment</param>
/// <param name="ManagerId">Optional manager employee ID to filter by reporting hierarchy</param>
/// <param name="IsActive">Optional status filter (true: active, false: inactive/deleted, null: all)</param>
/// <param name="EmploymentStatus">Optional employment status filter (Active, Inactive, Terminated, etc.)</param>
/// <remarks>
/// Employee Query Features:
/// - Comprehensive pagination for efficient data loading in large organizations
/// - Multi-field search across names, employee numbers, and contact information
/// - Hierarchical organizational filtering by branch and department
/// - Reporting structure filtering by manager assignments
/// - Employment lifecycle management with status filtering
/// - Bilingual name search supporting both English and Arabic names
/// - Multi-tenant security with branch-scoped access control
/// 
/// Search Functionality:
/// - Case-insensitive partial matching across multiple employee fields
/// - Searches employee numbers for quick employee lookup
/// - Full name search in both English and Arabic languages
/// - Email address search for contact-based employee discovery
/// - Optimized search performance with database indexing
/// - Special character handling for international names
/// 
/// Organizational Filtering:
/// - Branch-based filtering for multi-location organizations
/// - Department-scoped employee lists for departmental management
/// - Manager-based filtering for team and reporting structure views
/// - Hierarchical filtering supporting organizational depth
/// - Cross-branch employee visibility for administrators
/// 
/// Employment Status Management:
/// - Active/inactive status filtering for current workforce analysis
/// - Employment status filtering (Active, Terminated, On Leave, etc.)
/// - Lifecycle-based employee filtering for HR processes
/// - Historical employee data access for compliance and reporting
/// - Soft delete support maintaining data integrity
/// 
/// Performance Considerations:
/// - Efficient database queries with proper JOIN operations
/// - Indexed search fields for fast text-based filtering
/// - Optimized pagination with server-side processing
/// - Eager loading of related entities to prevent N+1 queries
/// - Query result caching for frequently accessed employee lists
/// 
/// Multi-tenant Security:
/// - Branch-scoped access control for data isolation
/// - User permission validation for employee data access
/// - Cross-branch visibility based on user roles and permissions
/// - Department-level access control for sensitive operations
/// - Manager-based access restrictions for hierarchical security
/// 
/// HR Management Use Cases:
/// - Employee directory and contact management
/// - Organizational chart generation and reporting
/// - Department-based employee allocation and planning
/// - Manager assignment and reporting structure management
/// - Employment lifecycle tracking and compliance reporting
/// - Time attendance system integration for workforce management
/// 
/// Response Data:
/// - Complete employee information with organizational context
/// - Contact details and professional information
/// - Employment status and lifecycle data
/// - Organizational relationships (branch, department, manager)
/// - User account linking status for system access management
/// - Audit information for compliance and change tracking
/// 
/// Integration Points:
/// - Time attendance tracking system integration
/// - HR management system data synchronization
/// - Organizational reporting and analytics
/// - Employee self-service portal data provision
/// - Payroll system employee data integration
/// - Performance management system employee lookup
/// </remarks>
public record GetEmployeesQuery(
    int Page = 1,
    int PageSize = 10,
    string? Search = null,
    long? BranchId = null,
    long? DepartmentId = null,
    long? ManagerId = null,
    bool? IsActive = null,
    string? EmploymentStatus = null
) : IRequest<Result<PagedResult<EmployeeDto>>>;