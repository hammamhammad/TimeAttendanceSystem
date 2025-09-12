using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;

/// <summary>
/// CQRS command for creating a new employee record in the Time Attendance System.
/// Encapsulates all necessary employee information and organizational relationships
/// with comprehensive validation and multi-tenant security support.
/// </summary>
/// <param name="BranchId">ID of the branch where the employee will be assigned</param>
/// <param name="EmployeeNumber">Unique employee number within the branch (required)</param>
/// <param name="FirstName">Employee's first name in primary language (required)</param>
/// <param name="LastName">Employee's last name in primary language (required)</param>
/// <param name="FirstNameAr">Employee's first name in Arabic (optional)</param>
/// <param name="LastNameAr">Employee's last name in Arabic (optional)</param>
/// <param name="NationalId">National identification number (optional, unique if provided)</param>
/// <param name="Email">Employee's email address for communications (optional)</param>
/// <param name="Phone">Employee's contact phone number (optional)</param>
/// <param name="DateOfBirth">Employee's date of birth for age calculations (optional)</param>
/// <param name="Gender">Employee's gender for reporting and compliance (optional)</param>
/// <param name="HireDate">Official employment start date (required)</param>
/// <param name="EmploymentStatus">Current employment status (Active, Inactive, Terminated)</param>
/// <param name="JobTitle">Employee's job title in primary language (required)</param>
/// <param name="JobTitleAr">Employee's job title in Arabic (optional)</param>
/// <param name="DepartmentId">ID of the department assignment (optional)</param>
/// <param name="ManagerEmployeeId">ID of the direct manager employee (optional)</param>
/// <param name="WorkLocationType">Type of work location (Office, Remote, Hybrid)</param>
/// <remarks>
/// Command Validation Rules:
/// - BranchId must exist and user must have access to the branch
/// - EmployeeNumber must be unique within the specified branch
/// - FirstName and LastName are required and must not be empty
/// - HireDate must be a valid date (can be future date)
/// - JobTitle is required for organizational structure
/// - DepartmentId if provided must exist within the same branch
/// - ManagerEmployeeId if provided must be an existing employee in same branch
/// - NationalId if provided should follow format validation
/// - Email if provided must be valid email format
/// 
/// Business Rules:
/// - Employee number uniqueness enforced per branch (multi-tenant)
/// - Hierarchical validation: manager must exist before assignment
/// - Department assignment must be within same branch
/// - Employment status defaults to Active for new employees
/// - Bilingual support with optional Arabic names and job titles
/// - Work location type supports modern work arrangements
/// 
/// Security Considerations:
/// - User must have employee creation permissions
/// - Branch access validated through user's branch scope
/// - Personal information handled according to privacy regulations
/// - Audit trail automatically created for compliance
/// - Input validation prevents injection attacks
/// 
/// Integration Points:
/// - Creates Employee domain entity with full data model
/// - Integrates with Branch and Department validation
/// - Supports hierarchical employee structure with manager assignment
/// - Enables time attendance tracking through employee linkage
/// - Facilitates HR processes and organizational reporting
/// 
/// Response Information:
/// - Returns Result&lt;long&gt; with created employee ID on success
/// - Provides detailed error messages for validation failures
/// - Includes failure reasons for troubleshooting
/// - Supports localized error messages based on user language
/// </remarks>
public record CreateEmployeeCommand(
    long BranchId,
    string EmployeeNumber,
    string FirstName,
    string LastName,
    string? FirstNameAr,
    string? LastNameAr,
    string? NationalId,
    string? Email,
    string? Phone,
    DateTime? DateOfBirth,
    Gender? Gender,
    DateTime HireDate,
    EmploymentStatus EmploymentStatus,
    string JobTitle,
    string? JobTitleAr,
    long? DepartmentId,
    long? ManagerEmployeeId,
    WorkLocationType WorkLocationType
) : IRequest<Result<long>>;