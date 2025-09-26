using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Api.Models;
using TimeAttendanceSystem.Application.VacationTypes.Commands.CreateVacationType;
using TimeAttendanceSystem.Application.VacationTypes.Commands.UpdateVacationType;
using TimeAttendanceSystem.Application.VacationTypes.Commands.DeleteVacationType;
using TimeAttendanceSystem.Application.VacationTypes.Commands.ToggleVacationTypeStatus;
using TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypes;
using TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypeById;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for vacation type management operations in the Time Attendance System.
/// Provides basic CRUD operations and status management with enterprise-grade security,
/// authorization, and multi-tenant support.
/// </summary>
/// <remarks>
/// Vacation Type Management Features:
/// - Create, read, update, delete vacation types
/// - Basic vacation type configuration with name and branch association
/// - Status management for vacation type activation/deactivation
/// - Filtering and search capabilities for administrative workflows
/// - Multi-tenant support with branch-scoped access control
/// - Detailed vacation type retrieval
///
/// Security and Authorization:
/// - All endpoints require authentication (JWT token)
/// - Permission-based authorization for sensitive operations
/// - Branch-level data access control for multi-tenant isolation
/// - Audit logging for all vacation type management actions
/// - Input validation and sanitization for data integrity
/// - Protection against unauthorized cross-branch access
///
/// Data Access Patterns:
/// - Paginated results for performance with large datasets
/// - Basic filtering by branch and status
/// - Search functionality across vacation type names
/// - Efficient queries with proper indexing and performance optimization
///
/// Multi-tenancy Support:
/// - Branch-scoped vacation type management and access control
/// - Organizational isolation
/// - Cross-branch administrative operations for system administrators
/// - Tenant data isolation and security throughout all operations
/// - Role-based multi-branch access control and permission validation
///
/// API Design Patterns:
/// - RESTful endpoints following HTTP conventions and best practices
/// - CQRS pattern with MediatR for clean architecture separation
/// - Consistent error handling and standardized response formats
/// - Request/response DTOs for API contract stability and versioning
/// - OpenAPI/Swagger documentation support for integration
///
/// Business Logic Integration:
/// - Basic vacation type validation and business rule enforcement
/// - Integration with vacation request and approval workflows
/// </remarks>
[ApiController]
[Route("api/v1/vacation-types")]
[Authorize]
public class VacationTypesController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Initializes the vacation types controller with MediatR for CQRS pattern implementation.
    /// </summary>
    /// <param name="mediator">MediatR instance for dispatching commands and queries</param>
    public VacationTypesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves a paginated list of vacation types with optional filtering and search capabilities.
    /// Supports filtering by branch and status.
    /// </summary>
    /// <param name="page">Page number for pagination (1-based, default: 1)</param>
    /// <param name="pageSize">Number of items per page (default: 10, max: 100)</param>
    /// <param name="search">Optional search term for vacation type names and descriptions</param>
    /// <param name="branchId">Optional branch ID to filter vacation types by organizational scope</param>
    /// <param name="isActive">Optional status filter (true: active, false: inactive, null: all)</param>
    /// <returns>Paginated list of vacation types with comprehensive policy information</returns>
    /// <response code="200">Vacation types retrieved successfully with pagination metadata</response>
    /// <response code="400">Invalid query parameters or request validation failure</response>
    /// <response code="401">User not authenticated or invalid authentication token</response>
    /// <response code="403">User lacks permission to view vacation types</response>
    [HttpGet]
    [Authorize(Policy = "VacationTypeRead")]
    public async Task<IActionResult> GetVacationTypes(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetVacationTypesQuery(page, pageSize, search, branchId, isActive);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Retrieves a specific vacation type by its unique identifier with comprehensive policy details.
    /// Includes operational permissions and optional usage statistics for administrative insights.
    /// </summary>
    /// <param name="id">Unique identifier of the vacation type to retrieve</param>
    /// <param name="includeStatistics">Whether to include usage statistics in the response (default: false)</param>
    /// <returns>Detailed vacation type information with policy configuration and permissions</returns>
    /// <response code="200">Vacation type retrieved successfully with complete details</response>
    /// <response code="400">Invalid vacation type ID parameter</response>
    /// <response code="401">User not authenticated or invalid authentication token</response>
    /// <response code="403">User lacks permission to view this vacation type</response>
    /// <response code="404">Vacation type not found or user lacks access</response>
    [HttpGet("{id}")]
    [Authorize(Policy = "VacationTypeRead")]
    public async Task<IActionResult> GetVacationTypeById(long id, [FromQuery] bool includeStatistics = false)
    {
        var query = new GetVacationTypeByIdQuery(id, includeStatistics);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new vacation type with basic configuration and organizational settings.
    /// Establishes a simple vacation type with name and branch association.
    /// </summary>
    /// <param name="request">Vacation type creation request with basic configuration</param>
    /// <returns>Created vacation type identifier for reference and integration</returns>
    /// <response code="200">Vacation type created successfully with generated identifier</response>
    /// <response code="400">Invalid request data, validation failure, or business rule violation</response>
    /// <response code="401">User not authenticated or invalid authentication token</response>
    /// <response code="403">User lacks permission to create vacation types</response>
    [HttpPost]
    [Authorize(Policy = "VacationTypeManagement")]
    public async Task<IActionResult> CreateVacationType([FromBody] CreateVacationTypeRequest request)
    {
        var command = new CreateVacationTypeCommand(
            request.BranchId,
            request.Name,
            request.NameAr
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { id = result.Value });
    }

    /// <summary>
    /// Updates an existing vacation type with basic configuration changes.
    /// Modifies vacation type name and branch association.
    /// </summary>
    /// <param name="id">Unique identifier of the vacation type to update</param>
    /// <param name="request">Vacation type update request with basic configuration changes</param>
    /// <returns>Success indication for vacation type policy updates</returns>
    /// <response code="204">Vacation type updated successfully with policy changes applied</response>
    /// <response code="400">Invalid request data, validation failure, or business rule violation</response>
    /// <response code="401">User not authenticated or invalid authentication token</response>
    /// <response code="403">User lacks permission to update vacation types</response>
    /// <response code="404">Vacation type not found or user lacks access</response>
    [HttpPut("{id}")]
    [Authorize(Policy = "VacationTypeManagement")]
    public async Task<IActionResult> UpdateVacationType(long id, [FromBody] UpdateVacationTypeRequest request)
    {
        var command = new UpdateVacationTypeCommand(
            id,
            request.BranchId,
            request.Name,
            request.NameAr
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Soft-deletes a vacation type while preserving historical data and audit trails.
    /// Validates business rules to ensure safe deletion without affecting existing vacation records.
    /// </summary>
    /// <param name="id">Unique identifier of the vacation type to delete</param>
    /// <returns>Success indication for vacation type deletion</returns>
    /// <response code="204">Vacation type deleted successfully with data preservation</response>
    /// <response code="400">Invalid vacation type ID, validation failure, or deletion prevented by business rules</response>
    /// <response code="401">User not authenticated or invalid authentication token</response>
    /// <response code="403">User lacks permission to delete vacation types</response>
    /// <response code="404">Vacation type not found or user lacks access</response>
    [HttpDelete("{id}")]
    [Authorize(Policy = "VacationTypeManagement")]
    public async Task<IActionResult> DeleteVacationType(long id)
    {
        var command = new DeleteVacationTypeCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Toggles the active status of a vacation type between active and inactive states.
    /// Manages vacation type availability for new requests while preserving existing data.
    /// </summary>
    /// <param name="id">Unique identifier of the vacation type to toggle status</param>
    /// <returns>Success indication for vacation type status change</returns>
    /// <response code="204">Vacation type status toggled successfully</response>
    /// <response code="400">Invalid vacation type ID, validation failure, or status change prevented by business rules</response>
    /// <response code="401">User not authenticated or invalid authentication token</response>
    /// <response code="403">User lacks permission to modify vacation type status</response>
    /// <response code="404">Vacation type not found or user lacks access</response>
    [HttpPatch("{id}/toggle-status")]
    [Authorize(Policy = "VacationTypeManagement")]
    public async Task<IActionResult> ToggleVacationTypeStatus(long id)
    {
        var command = new ToggleVacationTypeStatusCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}