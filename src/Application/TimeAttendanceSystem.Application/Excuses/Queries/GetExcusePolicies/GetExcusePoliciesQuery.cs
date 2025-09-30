using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicies;

/// <summary>
/// CQRS query for retrieving excuse policies with filtering and pagination.
/// Supports branch-specific and organization-wide policy retrieval.
/// </summary>
/// <param name="BranchId">Optional branch identifier for branch-specific policies</param>
/// <param name="IsActive">Filter by active status</param>
/// <param name="PageNumber">Page number for pagination (1-based)</param>
/// <param name="PageSize">Number of items per page</param>
/// <remarks>
/// Query Features:
/// - Branch-scoped filtering for multi-tenant access
/// - Active/inactive status filtering
/// - Pagination support for large datasets
/// - Includes branch relationship data
/// - Sorted by creation date (newest first)
///
/// Access Control:
/// - Users can only see policies for their accessible branches
/// - Organization-wide policies visible to all users
/// - Admin users can see all policies across branches
///
/// Performance Considerations:
/// - Efficient indexing on BranchId and IsActive
/// - Lazy loading of related entities
/// - Projection to DTOs for minimal data transfer
/// </remarks>
public record GetExcusePoliciesQuery(
    long? BranchId = null,
    bool? IsActive = null,
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<Result<PagedResult<ExcusePolicyDto>>>;