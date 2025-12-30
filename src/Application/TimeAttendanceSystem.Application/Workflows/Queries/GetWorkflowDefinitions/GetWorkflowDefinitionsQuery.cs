using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowDefinitions;

/// <summary>
/// Query to get workflow definitions with filtering and pagination.
/// </summary>
public record GetWorkflowDefinitionsQuery : IRequest<Result<PagedResult<WorkflowDefinitionDto>>>
{
    /// <summary>
    /// Filter by entity type.
    /// </summary>
    public WorkflowEntityType? EntityType { get; init; }

    /// <summary>
    /// Filter by branch ID.
    /// </summary>
    public long? BranchId { get; init; }

    /// <summary>
    /// Filter by active status.
    /// </summary>
    public bool? IsActive { get; init; }

    /// <summary>
    /// Search term for name.
    /// </summary>
    public string? SearchTerm { get; init; }

    /// <summary>
    /// Page number (1-based).
    /// </summary>
    public int Page { get; init; } = 1;

    /// <summary>
    /// Page size.
    /// </summary>
    public int PageSize { get; init; } = 10;
}

/// <summary>
/// DTO for workflow definition in list view.
/// </summary>
public class WorkflowDefinitionDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public WorkflowEntityType EntityType { get; set; }
    public string EntityTypeName { get; set; } = string.Empty;
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public bool IsActive { get; set; }
    public bool IsDefault { get; set; }
    public int Version { get; set; }
    public int StepCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
}
