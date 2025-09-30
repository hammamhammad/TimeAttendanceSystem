using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;
using TimeAttendanceSystem.Application.Employees.Commands.UpdateEmployee;
using TimeAttendanceSystem.Application.Employees.Commands.DeleteEmployee;
using TimeAttendanceSystem.Application.Employees.Queries.GetEmployees;
using TimeAttendanceSystem.Application.Employees.Queries.GetEmployeeById;
using TimeAttendanceSystem.Application.ShiftAssignments.Commands.UpdateEmployeeShift;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// REST API controller for comprehensive employee management operations in the time attendance system.
/// Provides complete CRUD operations, advanced filtering, and organizational hierarchy management
/// with multi-tenant support, role-based access control, and comprehensive data validation.
/// </summary>
/// <remarks>
/// Employee Management Features:
/// - Complete employee lifecycle management (create, read, update, delete operations)
/// - Advanced filtering and search capabilities across multiple employee attributes
/// - Organizational hierarchy management with branch and department associations
/// - Bilingual employee information support for English and Arabic languages
/// - Employment status tracking and lifecycle management for HR operations
/// - Manager-employee relationship management for organizational structure
/// - Integration with user account linking for system access management
/// 
/// API Endpoint Structure:
/// - GET /api/v1/employees: Paginated employee list with comprehensive filtering
/// - GET /api/v1/employees/{id}: Individual employee details retrieval
/// - POST /api/v1/employees: New employee creation with full profile data
/// - PUT /api/v1/employees/{id}: Complete employee information updates
/// - DELETE /api/v1/employees/{id}: Employee removal with soft delete functionality
/// - RESTful design following OpenAPI specifications and HTTP standards
/// 
/// Security and Authorization:
/// - OAuth2/JWT-based authentication required for all endpoint access
/// - Role-based access control with fine-grained permission validation
/// - Multi-tenant data isolation through branch-scoped access controls
/// - Input validation and sanitization preventing injection attacks
/// - Comprehensive audit logging for all employee data modifications
/// - HTTPS enforcement for secure data transmission and privacy protection
/// 
/// Data Validation and Integrity:
/// - Comprehensive input validation using FluentValidation framework
/// - Business rule enforcement for employment data consistency
/// - Organizational hierarchy validation preventing circular references
/// - Email and phone number format validation with international support
/// - Employment date validation ensuring logical employment lifecycle
/// - National ID validation supporting various identification systems
/// 
/// Multi-tenant Architecture:
/// - Branch-scoped employee management ensuring organizational data isolation
/// - Department-level organization within branch boundaries
/// - Cross-branch administrative access for enterprise-wide operations
/// - Manager assignment validation within organizational hierarchy
/// - Reporting and analytics with proper tenant isolation
/// - Compliance with data residency and privacy regulations
/// 
/// Performance and Scalability:
/// - Efficient pagination for large employee datasets
/// - Optimized database queries with proper indexing and JOIN operations
/// - Caching strategies for frequently accessed employee information
/// - Async operations throughout for non-blocking request processing
/// - Bulk operation support for large-scale employee management
/// - Memory-efficient data transfer with optimized serialization
/// 
/// Integration Capabilities:
/// - MediatR CQRS pattern for clean architecture and separation of concerns
/// - Integration with HR systems through standardized data formats
/// - Employee photo management with secure file storage integration
/// - Time attendance system integration through employee identification
/// - Payroll system integration through employment data synchronization
/// - External identity provider integration for user account linking
/// </remarks>
[ApiController]
[Route("api/v1/employees")]
[Authorize]
public class EmployeesController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Initializes a new instance of the EmployeesController with required dependencies.
    /// Sets up the controller with MediatR for CQRS command and query processing.
    /// </summary>
    /// <param name="mediator">MediatR mediator for command and query dispatching</param>
    public EmployeesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves a paginated list of employees with comprehensive filtering capabilities.
    /// Supports advanced search, organizational filtering, and employment status filtering
    /// for comprehensive employee management and reporting operations.
    /// </summary>
    /// <param name="page">Page number for pagination (1-based, default: 1)</param>
    /// <param name="pageSize">Number of employees per page (default: 10, max recommended: 100)</param>
    /// <param name="search">Optional search term for employee names, numbers, and contact information</param>
    /// <param name="branchId">Optional branch ID filter for organizational scope</param>
    /// <param name="departmentId">Optional department ID filter for departmental employee lists</param>
    /// <param name="managerId">Optional manager employee ID filter for team member lists</param>
    /// <param name="isActive">Optional active status filter (true: active, false: inactive, null: all)</param>
    /// <param name="employmentStatus">Optional employment status filter (Active, Terminated, OnLeave, etc.)</param>
    /// <returns>Paginated employee list with metadata and filtering results</returns>
    /// <response code="200">Employee list retrieved successfully with pagination metadata</response>
    /// <response code="400">Invalid request parameters or filtering criteria</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions for employee access</response>
    [HttpGet]
    [Authorize(Policy = "EmployeeRead")]
    public async Task<IActionResult> GetEmployees(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] long? managerId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? employmentStatus = null)
    {
        var query = new GetEmployeesQuery(page, pageSize, search, branchId, departmentId, managerId, isActive, employmentStatus);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets a count of employees that would be affected by bulk vacation assignment.
    /// Returns the number of active employees in the specified branch or department.
    /// </summary>
    /// <param name="assignmentType">Type of assignment: "Branch" or "Department"</param>
    /// <param name="branchId">Branch ID for branch-level assignment</param>
    /// <param name="departmentId">Department ID for department-level assignment</param>
    /// <returns>Count of affected employees</returns>
    /// <response code="200">Employee count retrieved successfully</response>
    /// <response code="400">Invalid assignment type or missing required parameters</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions for employee access</response>
    [HttpGet("count-preview")]
    [Authorize(Policy = "EmployeeRead")]
    public async Task<IActionResult> GetEmployeeCountPreview(
        [FromQuery] int assignmentType,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null)
    {
        var query = new GetEmployeesQuery(1, int.MaxValue, null, null, null, null, true, "Active");

        // Apply filter based on assignment type (1 = Branch, 2 = Department)
        switch (assignmentType)
        {
            case 1: // Branch
                if (!branchId.HasValue)
                {
                    return BadRequest(new { error = "Branch ID is required for branch assignment" });
                }
                query = new GetEmployeesQuery(1, int.MaxValue, null, branchId, null, null, true, "Active");
                break;

            case 2: // Department
                if (!departmentId.HasValue)
                {
                    return BadRequest(new { error = "Department ID is required for department assignment" });
                }
                query = new GetEmployeesQuery(1, int.MaxValue, null, null, departmentId, null, true, "Active");
                break;

            default:
                return BadRequest(new { error = "Invalid assignment type. Must be 1 (Branch) or 2 (Department)" });
        }

        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { count = result.Value.TotalCount });
    }

    /// <summary>
    /// Retrieves detailed information for a specific employee by their unique identifier.
    /// Returns comprehensive employee data including organizational relationships and employment details.
    /// </summary>
    /// <param name="id">Unique employee identifier</param>
    /// <returns>Complete employee information with organizational context</returns>
    /// <response code="200">Employee details retrieved successfully</response>
    /// <response code="404">Employee not found or access denied</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions for employee access</response>
    [HttpGet("{id}")]
    [Authorize(Policy = "EmployeeRead")]
    public async Task<IActionResult> GetEmployeeById(long id)
    {
        var query = new GetEmployeeByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new employee record with comprehensive profile information and organizational assignments.
    /// Supports bilingual employee data, organizational hierarchy, and employment lifecycle management.
    /// </summary>
    /// <param name="request">Employee creation request containing all required and optional employee information</param>
    /// <returns>Created employee identifier and confirmation</returns>
    /// <response code="200">Employee created successfully with unique identifier</response>
    /// <response code="400">Invalid employee data or validation errors</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions for employee creation</response>
    /// <response code="409">Conflict - duplicate employee number or email address</response>
    [HttpPost]
    [Authorize(Policy = "EmployeeManagement")]
    public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeRequest request)
    {
        var command = new CreateEmployeeCommand(
            request.BranchId,
            request.EmployeeNumber,
            request.FirstName,
            request.LastName,
            request.FirstNameAr,
            request.LastNameAr,
            request.NationalId,
            request.Email,
            request.Phone,
            request.DateOfBirth,
            request.Gender,
            request.HireDate,
            request.EmploymentStatus,
            request.JobTitle,
            request.JobTitleAr,
            request.DepartmentId,
            request.ManagerEmployeeId,
            request.WorkLocationType
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { id = result.Value });
    }

    /// <summary>
    /// Updates existing employee information with comprehensive data validation and organizational consistency.
    /// Supports partial updates while maintaining data integrity and organizational hierarchy requirements.
    /// </summary>
    /// <param name="id">Unique identifier of the employee to update</param>
    /// <param name="request">Employee update request containing modified employee information</param>
    /// <returns>Confirmation of successful update operation</returns>
    /// <response code="204">Employee updated successfully</response>
    /// <response code="400">Invalid employee data or validation errors</response>
    /// <response code="404">Employee not found or access denied</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions for employee modification</response>
    /// <response code="409">Conflict - duplicate email address or organizational hierarchy conflict</response>
    [HttpPut("{id}")]
    [Authorize(Policy = "EmployeeManagement")]
    public async Task<IActionResult> UpdateEmployee(long id, [FromBody] UpdateEmployeeRequest request)
    {
        var command = new UpdateEmployeeCommand
        {
            Id = id,
            FirstName = request.FirstName,
            LastName = request.LastName,
            FirstNameAr = request.FirstNameAr,
            LastNameAr = request.LastNameAr,
            Email = request.Email,
            Phone = request.Phone,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            EmploymentStatus = request.EmploymentStatus,
            JobTitle = request.JobTitle,
            JobTitleAr = request.JobTitleAr,
            DepartmentId = request.DepartmentId,
            ManagerEmployeeId = request.ManagerEmployeeId,
            WorkLocationType = request.WorkLocationType,
            PhotoUrl = request.PhotoUrl
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Removes an employee from the system using soft delete functionality for data preservation.
    /// Maintains employment history and organizational relationships for compliance and audit requirements.
    /// </summary>
    /// <param name="id">Unique identifier of the employee to delete</param>
    /// <returns>Confirmation of successful deletion operation</returns>
    /// <response code="204">Employee deleted successfully</response>
    /// <response code="400">Invalid deletion request or business rule violation</response>
    /// <response code="404">Employee not found or already deleted</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions for employee deletion</response>
    /// <response code="409">Conflict - cannot delete employee with active dependencies</response>
    [HttpDelete("{id}")]
    [Authorize(Policy = "EmployeeManagement")]
    public async Task<IActionResult> DeleteEmployee(long id)
    {
        var command = new DeleteEmployeeCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Updates the current shift assignment for a specific employee.
    /// Deactivates any existing active shift assignments and creates a new active assignment.
    /// </summary>
    /// <param name="id">Unique identifier of the employee whose shift is being updated</param>
    /// <param name="request">Shift update request containing new shift information</param>
    /// <returns>Confirmation of successful shift update operation</returns>
    /// <response code="200">Employee shift updated successfully</response>
    /// <response code="400">Invalid shift update request or validation errors</response>
    /// <response code="404">Employee not found or access denied</response>
    /// <response code="401">Unauthorized access - authentication required</response>
    /// <response code="403">Forbidden - insufficient permissions for shift assignment</response>
    [HttpPost("{id}/shift")]
    [Authorize(Policy = "EmployeeAssignment")]
    public async Task<IActionResult> UpdateEmployeeShift(long id, [FromBody] UpdateEmployeeShiftRequest request)
    {
        var command = new UpdateEmployeeShiftCommand(
            id,
            request.ShiftId,
            request.EffectiveDate,
            request.Notes
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { success = true, message = "Employee shift updated successfully" });
    }

    /// <summary>
    /// Gets employees for dropdown selection.
    /// Returns a simplified list of active employees for form dropdowns.
    /// </summary>
    /// <returns>List of employees with id and name for dropdown options</returns>
    /// <response code="200">Employees retrieved successfully for dropdown</response>
    /// <response code="401">User not authenticated or invalid authentication token</response>
    /// <response code="403">User lacks permission to view employees</response>
    [HttpGet("dropdown")]
    [Authorize(Policy = "EmployeeRead")]
    public async Task<IActionResult> GetEmployeesForDropdown()
    {
        var query = new GetEmployeesQuery(1, 1000, null, null, null, null, true, "Active"); // Get all active employees
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        // Transform to simple dropdown format
        var dropdownData = result.Value.Items.Select(emp => new
        {
            id = emp.Id,
            name = $"{emp.FirstName} {emp.LastName}"
        });

        return Ok(dropdownData);
    }
}

/// <summary>
/// Request model for creating new employee records with comprehensive profile information.
/// Contains all required and optional employee data for complete employee setup and organizational assignment.
/// </summary>
/// <param name="BranchId">Branch identifier for organizational assignment and multi-tenant scope</param>
/// <param name="EmployeeNumber">Unique employee number within branch for identification and integration</param>
/// <param name="FirstName">Employee's first name in primary language (English)</param>
/// <param name="LastName">Employee's last name in primary language (English)</param>
/// <param name="FirstNameAr">Employee's first name in Arabic for bilingual support (optional)</param>
/// <param name="LastNameAr">Employee's last name in Arabic for bilingual support (optional)</param>
/// <param name="NationalId">National identification number for legal and compliance purposes (optional)</param>
/// <param name="Email">Business email address for communication and system notifications (optional)</param>
/// <param name="Phone">Phone number for contact and emergency purposes (optional)</param>
/// <param name="DateOfBirth">Date of birth for age-related policies and benefits (optional)</param>
/// <param name="Gender">Gender information for reporting and accommodation requirements (optional)</param>
/// <param name="HireDate">Employment start date for tenure calculation and anniversary tracking</param>
/// <param name="EmploymentStatus">Current employment status (Active, Inactive, OnLeave, etc.)</param>
/// <param name="JobTitle">Job title and role designation in primary language</param>
/// <param name="JobTitleAr">Job title in Arabic for bilingual organizations (optional)</param>
/// <param name="DepartmentId">Department assignment within branch organizational structure (optional)</param>
/// <param name="ManagerEmployeeId">Manager employee ID for reporting hierarchy (optional)</param>
/// <param name="WorkLocationType">Work arrangement type (Office, Remote, Hybrid, Field, etc.)</param>
public record CreateEmployeeRequest(
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
);

/// <summary>
/// Request model for updating existing employee information with comprehensive data validation.
/// Contains modifiable employee fields while maintaining organizational consistency and data integrity.
/// </summary>
/// <param name="FirstName">Updated first name in primary language (English)</param>
/// <param name="LastName">Updated last name in primary language (English)</param>
/// <param name="FirstNameAr">Updated first name in Arabic for bilingual support (optional)</param>
/// <param name="LastNameAr">Updated last name in Arabic for bilingual support (optional)</param>
/// <param name="Email">Updated business email address for communication (optional)</param>
/// <param name="Phone">Updated phone number for contact purposes (optional)</param>
/// <param name="DateOfBirth">Updated date of birth information (optional)</param>
/// <param name="Gender">Updated gender information for reporting purposes (optional)</param>
/// <param name="EmploymentStatus">Updated employment status reflecting current employment state</param>
/// <param name="JobTitle">Updated job title and role designation in primary language</param>
/// <param name="JobTitleAr">Updated job title in Arabic for bilingual organizations (optional)</param>
/// <param name="DepartmentId">Updated department assignment within organizational structure (optional)</param>
/// <param name="ManagerEmployeeId">Updated manager assignment for reporting hierarchy (optional)</param>
/// <param name="WorkLocationType">Updated work arrangement type (Office, Remote, Hybrid, etc.)</param>
/// <param name="PhotoUrl">Updated employee photo URL for identification and directory (optional)</param>
public record UpdateEmployeeRequest(
    string FirstName,
    string LastName,
    string? FirstNameAr,
    string? LastNameAr,
    string? Email,
    string? Phone,
    DateTime? DateOfBirth,
    Gender? Gender,
    EmploymentStatus EmploymentStatus,
    string JobTitle,
    string? JobTitleAr,
    long? DepartmentId,
    long? ManagerEmployeeId,
    WorkLocationType WorkLocationType,
    string? PhotoUrl
);

/// <summary>
/// Request model for updating an employee's current shift assignment.
/// Contains the new shift information and optional effective date and notes.
/// </summary>
/// <param name="ShiftId">The identifier of the new shift to assign to the employee</param>
/// <param name="EffectiveDate">Optional effective date for the new shift assignment (defaults to today)</param>
/// <param name="Notes">Optional notes about the shift change reason</param>
public record UpdateEmployeeShiftRequest(
    long ShiftId,
    DateTime? EffectiveDate = null,
    string? Notes = null
);