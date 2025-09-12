using MediatR;

namespace TimeAttendanceSystem.Application.Common;

/// <summary>
/// Marker interface for CQRS commands that modify system state.
/// Extends MediatR's IRequest interface to distinguish commands from queries
/// and provide semantic clarity in the CQRS architecture.
/// </summary>
/// <typeparam name="TResponse">The type of response returned by the command handler</typeparam>
/// <remarks>
/// CQRS Command Characteristics:
/// - Represents an intent to change system state (Create, Update, Delete operations)
/// - Distinguished from queries which only read data
/// - Typically returns Result objects indicating success/failure
/// - May return created entity IDs or operation confirmations
/// - Processed by command handlers that implement business logic
/// 
/// Command Design Principles:
/// - Commands should be verbs describing actions (CreateUser, UpdateEmployee)
/// - Immutable request objects with all necessary parameters
/// - Single responsibility for specific business operations
/// - Validation handled before reaching business logic
/// - Authorization checks integrated into command processing
/// 
/// Usage Patterns:
/// - User management: CreateUser, UpdateUser, DeleteUser commands
/// - Employee operations: CreateEmployee, UpdateEmployee commands  
/// - Authentication: LoginCommand, LogoutCommand, RefreshTokenCommand
/// - Authorization: AssignRoleCommand, RemovePermissionCommand
/// - Configuration: CreateBranchCommand, UpdateSettingsCommand
/// 
/// Integration with MediatR:
/// - Dispatched through IMediator.Send() method
/// - Handled by classes implementing IRequestHandler&lt;TCommand, TResponse&gt;
/// - Supports middleware pipeline for cross-cutting concerns
/// - Enables decorator pattern for logging, validation, caching
/// - Facilitates testing with clear command/response contracts
/// 
/// Error Handling:
/// - Business logic failures returned as Result.Failure objects
/// - Validation errors included in failure messages
/// - Infrastructure exceptions bubble up for handling by infrastructure
/// - Consistent error response format across all commands
/// 
/// Security Considerations:
/// - Authorization checks mandatory before state changes
/// - User context validated against operation permissions
/// - Multi-tenant scope enforced for data isolation
/// - Audit logging integrated for compliance requirements
/// - Input validation to prevent injection attacks
/// 
/// Performance Guidelines:
/// - Async processing for database operations
/// - Transaction management for data consistency
/// - Bulk operations where appropriate
/// - Efficient queries with proper indexing
/// - Monitoring and metrics collection
/// </remarks>
public interface ICommand<out TResponse> : IRequest<TResponse>
{
}