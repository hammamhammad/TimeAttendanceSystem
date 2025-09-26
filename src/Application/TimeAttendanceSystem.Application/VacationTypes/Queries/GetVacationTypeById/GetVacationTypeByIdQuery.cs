using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypeById;

/// <summary>
/// CQRS query for retrieving a single vacation type by its unique identifier.
/// Provides comprehensive vacation policy details with operational permissions and usage statistics
/// for detailed administrative views and edit form pre-population.
/// </summary>
/// <param name="Id">Unique identifier of the vacation type to retrieve</param>
/// <param name="IncludeUsageStatistics">Whether to include usage statistics in the response (default: false)</param>
/// <remarks>
/// Query Features:
/// - Single vacation type retrieval with complete policy configuration
/// - Multi-tenant security enforcement respecting branch access scope
/// - Optional usage statistics for administrative insights and reporting
/// - Business rule evaluation for operational permission determination
/// - Comprehensive error handling for not found and access denied scenarios
///
/// Security Implementation:
/// - Automatic branch-scoped access control for non-system administrators
/// - System administrators have unrestricted access to all vacation types
/// - Regular users can only view vacation types within their assigned branches
/// - Cross-tenant data isolation maintained throughout query execution
/// - Unauthorized access attempts properly handled with appropriate error messages
///
/// Permission Calculation:
/// - CanBeModified flag based on current user permissions and vacation type status
/// - CanBeDeleted flag validated against existing usage and business rules
/// - Real-time permission evaluation for accurate UI state management
/// - Business rule integration for dynamic operation availability
///
/// Usage Statistics:
/// - Optional inclusion to balance performance with detailed insights
/// - Calculated statistics for informed decision-making and reporting
/// - Performance optimized with conditional loading based on request parameter
/// - Comprehensive metrics including usage trends and employee assignments
///
/// Performance Considerations:
/// - Single entity retrieval optimized for minimal database roundtrips
/// - Conditional statistics loading based on IncludeUsageStatistics parameter
/// - Eager loading of related branch information to prevent N+1 queries
/// - Efficient permission calculation with cached business rule evaluation
/// - Async operations for non-blocking request processing
///
/// Error Handling:
/// - Not found scenarios handled with appropriate error messages
/// - Access denied situations properly communicated to client
/// - Invalid ID parameters validated with meaningful error responses
/// - Database connectivity issues handled gracefully
/// - Consistent Result pattern for standardized error communication
///
/// Response Format:
/// - Returns Result&lt;VacationTypeDetailDto&gt; with complete vacation type details
/// - Includes comprehensive policy configuration for administrative purposes
/// - Contains operational permissions for UI state management
/// - Optionally includes usage statistics based on request parameter
/// - Consistent error handling through Result pattern for client integration
///
/// Usage Examples:
/// - Vacation type detail view: GetVacationTypeByIdQuery(123)
/// - Edit form pre-population: GetVacationTypeByIdQuery(123, false)
/// - Administrative dashboard with stats: GetVacationTypeByIdQuery(123, true)
/// - API endpoint for single vacation type: GetVacationTypeByIdQuery(id)
/// </remarks>
public record GetVacationTypeByIdQuery(long Id, bool IncludeUsageStatistics = false) : IRequest<Result<VacationTypeDetailDto>>;