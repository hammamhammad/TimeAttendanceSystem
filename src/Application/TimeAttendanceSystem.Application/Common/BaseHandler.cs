using MediatR;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Application.Common;

/// <summary>
/// Abstract base class for MediatR request handlers in the Application layer.
/// Provides common dependencies and infrastructure for CQRS command and query handlers.
/// Implements shared patterns for database access and user context management.
/// </summary>
/// <typeparam name="TRequest">The type of request being handled (command or query)</typeparam>
/// <typeparam name="TResponse">The type of response returned by the handler</typeparam>
/// <remarks>
/// Base Handler Benefits:
/// - Standardizes dependency injection for all handlers
/// - Provides consistent access to database context and user information
/// - Implements common CQRS patterns and conventions
/// - Reduces boilerplate code in individual handlers
/// - Ensures proper resource disposal and lifecycle management
/// - Facilitates testing with consistent mocking patterns
/// 
/// CQRS Implementation:
/// - Separates command and query responsibilities
/// - Integrates with MediatR for request/response pattern
/// - Provides clean architecture boundaries
/// - Supports both synchronous and asynchronous operations
/// - Enables cross-cutting concerns like logging and validation
/// 
/// Common Usage Patterns:
/// - Command handlers inherit for create/update/delete operations
/// - Query handlers inherit for read/search operations  
/// - Business logic implemented in concrete Handle methods
/// - Database transactions managed at handler level
/// - User authorization checks using CurrentUser context
/// 
/// Dependency Management:
/// - Database context for data access operations
/// - Current user for authorization and audit trails
/// - Additional services injected in derived classes
/// - Proper disposal handled by DI container
/// - Thread-safe operation in web applications
/// 
/// Error Handling Strategy:
/// - Business logic errors returned as Result objects
/// - Infrastructure exceptions allowed to bubble up
/// - Validation errors handled before business logic
/// - Audit logging integrated for compliance
/// </remarks>
public abstract class BaseHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    /// <summary>
    /// Gets the database context for data access operations.
    /// Provides access to entity sets and database transaction capabilities.
    /// </summary>
    /// <value>
    /// Database context abstraction for repository pattern implementation.
    /// Supports both read and write operations with transaction management.
    /// </value>
    /// <remarks>
    /// Database Context Usage:
    /// - Entity queries and modifications
    /// - Transaction management for data consistency
    /// - Change tracking for audit trails
    /// - Connection pooling and performance optimization
    /// - Multi-tenant data filtering support
    /// </remarks>
    protected readonly IApplicationDbContext Context;

    /// <summary>
    /// Gets the current user context for authorization and audit purposes.
    /// Provides access to user identity, roles, permissions, and branch scope.
    /// </summary>
    /// <value>
    /// Current user abstraction containing authentication and authorization data.
    /// Includes user identity, roles, permissions, and multi-tenant scope.
    /// </value>
    /// <remarks>
    /// Current User Usage:
    /// - Authorization checks before sensitive operations
    /// - Audit logging with user context information
    /// - Multi-tenant data filtering by branch scope
    /// - Personalization based on user preferences
    /// - Security validation for cross-user operations
    /// </remarks>
    protected readonly ICurrentUser CurrentUser;

    /// <summary>
    /// Initializes a new instance of the BaseHandler class with required dependencies.
    /// Sets up common infrastructure needed by all command and query handlers.
    /// </summary>
    /// <param name="context">Database context for data access operations</param>
    /// <param name="currentUser">Current user context for authorization and audit</param>
    /// <remarks>
    /// Constructor Responsibilities:
    /// - Stores common dependencies for use in derived classes
    /// - Establishes consistent dependency injection patterns
    /// - Provides foundation for CQRS implementation
    /// - Enables proper testing with dependency mocking
    /// - Supports additional dependencies in derived constructors
    /// </remarks>
    protected BaseHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        Context = context;
        CurrentUser = currentUser;
    }

    /// <summary>
    /// Handles the specified request and returns the appropriate response.
    /// Abstract method implemented by concrete command and query handlers.
    /// </summary>
    /// <param name="request">The request object containing operation parameters</param>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Task containing the response object with operation results</returns>
    /// <remarks>
    /// Implementation Guidelines:
    /// - Validate request parameters and user authorization
    /// - Implement business logic with proper error handling
    /// - Use Context for database operations
    /// - Use CurrentUser for security and audit requirements
    /// - Return Result objects for operation outcomes
    /// - Handle cancellation tokens for long-running operations
    /// - Log important operations for monitoring and debugging
    /// 
    /// Error Handling:
    /// - Business logic errors: Return Result.Failure with message
    /// - Validation errors: Return Result.Failure with details
    /// - Infrastructure errors: Allow exceptions to bubble up
    /// - Authorization errors: Return appropriate failure messages
    /// 
    /// Performance Considerations:
    /// - Use async/await patterns for database operations
    /// - Implement efficient queries with proper indexing
    /// - Consider caching for frequently accessed data
    /// - Handle large result sets with pagination
    /// - Optimize for concurrent request handling
    /// </remarks>
    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}