namespace TimeAttendanceSystem.Application.Common;

/// <summary>
/// Represents the result of an operation that can either succeed or fail.
/// Implements the Result pattern for functional error handling without exceptions.
/// Provides a clear, explicit way to handle operation outcomes in the Application layer.
/// </summary>
/// <remarks>
/// Result Pattern Benefits:
/// - Explicit error handling without exception overhead
/// - Forces developers to handle both success and failure cases
/// - Provides clear operation outcome indication
/// - Enables functional programming patterns in C#
/// - Improves code readability and maintainability
/// - Reduces unhandled exceptions and runtime errors
/// 
/// Design Principles:
/// - Immutable state prevents accidental modification
/// - Factory methods ensure proper construction
/// - Type safety through generic constraints
/// - Consistent error handling across application
/// - Clear success/failure semantics
/// 
/// Usage Patterns:
/// - Command handlers return Result for operation status
/// - Query handlers return Result&lt;T&gt; for data with status
/// - Business logic methods use Result for validation
/// - API controllers check Result status for responses
/// - Service methods chain Results for complex operations
/// 
/// Error Handling Strategy:
/// - Success: Operation completed without issues
/// - Failure: Operation failed with descriptive error message
/// - No exceptions thrown for business logic failures
/// - Exceptions reserved for unexpected system errors
/// - Consistent error messaging for user feedback
/// 
/// Integration with CQRS:
/// - Commands return Result for operation confirmation
/// - Queries return Result&lt;T&gt; for data with validation
/// - Handlers use Result to communicate outcomes
/// - Controllers translate Results to HTTP responses
/// </remarks>
public class Result
{
    /// <summary>
    /// Gets a value indicating whether the operation completed successfully.
    /// True indicates success, false indicates failure with error details.
    /// </summary>
    /// <value>
    /// Boolean indicating operation success status.
    /// Used for conditional logic and response determination.
    /// </value>
    public bool IsSuccess { get; }

    /// <summary>
    /// Gets a value indicating whether the operation failed.
    /// Convenience property that inverts IsSuccess for failure checks.
    /// </summary>
    /// <value>
    /// Boolean indicating operation failure status.
    /// Equivalent to !IsSuccess for clearer failure handling.
    /// </value>
    public bool IsFailure => !IsSuccess;

    /// <summary>
    /// Gets the error message describing why the operation failed.
    /// Empty string for successful operations, descriptive message for failures.
    /// </summary>
    /// <value>
    /// Error message string explaining the failure reason.
    /// Used for user feedback, logging, and debugging.
    /// Empty for successful operations.
    /// </value>
    public string Error { get; }

    /// <summary>
    /// Initializes a new instance of the Result class with success status and error message.
    /// Protected constructor ensures proper instantiation through factory methods.
    /// </summary>
    /// <param name="isSuccess">Boolean indicating if operation succeeded</param>
    /// <param name="error">Error message for failures, empty for success</param>
    /// <exception cref="InvalidOperationException">
    /// Thrown when success is true but error is not empty, or when success is false but error is empty.
    /// Ensures Result invariants are maintained.
    /// </exception>
    /// <remarks>
    /// Constructor Validation:
    /// - Success operations must have empty error messages
    /// - Failed operations must have non-empty error messages
    /// - Prevents invalid Result states at construction
    /// - Enforces consistent Result semantics
    /// </remarks>
    protected Result(bool isSuccess, string error)
    {
        if (isSuccess && !string.IsNullOrEmpty(error))
            throw new InvalidOperationException();
        if (!isSuccess && string.IsNullOrEmpty(error))
            throw new InvalidOperationException();

        IsSuccess = isSuccess;
        Error = error;
    }

    /// <summary>
    /// Creates a successful Result instance with no error message.
    /// Factory method for operations that complete successfully without return value.
    /// </summary>
    /// <returns>Result instance indicating successful operation</returns>
    /// <example>
    /// <code>
    /// public Result DeleteUser(int userId)
    /// {
    ///     // Delete operation logic
    ///     return Result.Success();
    /// }
    /// </code>
    /// </example>
    public static Result Success() => new(true, string.Empty);

    /// <summary>
    /// Creates a failed Result instance with the specified error message.
    /// Factory method for operations that fail with descriptive error information.
    /// </summary>
    /// <param name="error">Descriptive error message explaining the failure</param>
    /// <returns>Result instance indicating failed operation with error details</returns>
    /// <example>
    /// <code>
    /// public Result ValidateUser(User user)
    /// {
    ///     if (string.IsNullOrEmpty(user.Username))
    ///         return Result.Failure("Username is required");
    ///     
    ///     return Result.Success();
    /// }
    /// </code>
    /// </example>
    public static Result Failure(string error) => new(false, error);

    /// <summary>
    /// Creates a successful Result&lt;T&gt; instance with the specified return value.
    /// Factory method for operations that succeed and return data.
    /// </summary>
    /// <typeparam name="T">Type of the success value</typeparam>
    /// <param name="value">The success value to return</param>
    /// <returns>Result&lt;T&gt; instance with success status and return value</returns>
    /// <example>
    /// <code>
    /// public Result&lt;User&gt; GetUser(int userId)
    /// {
    ///     var user = repository.GetById(userId);
    ///     return Result.Success(user);
    /// }
    /// </code>
    /// </example>
    public static Result<T> Success<T>(T value) => new(value, true, string.Empty);

    /// <summary>
    /// Creates a failed Result&lt;T&gt; instance with the specified error message.
    /// Factory method for operations that fail and would have returned data.
    /// </summary>
    /// <typeparam name="T">Type that would have been returned on success</typeparam>
    /// <param name="error">Descriptive error message explaining the failure</param>
    /// <returns>Result&lt;T&gt; instance with failure status and error message</returns>
    /// <example>
    /// <code>
    /// public Result&lt;User&gt; GetUser(int userId)
    /// {
    ///     var user = repository.GetById(userId);
    ///     if (user == null)
    ///         return Result.Failure&lt;User&gt;("User not found");
    ///     
    ///     return Result.Success(user);
    /// }
    /// </code>
    /// </example>
    public static Result<T> Failure<T>(string error) => new(default!, false, error);
}

/// <summary>
/// Represents the result of an operation that can either succeed with a return value or fail with an error.
/// Generic version of Result pattern for operations that return data on success.
/// Extends base Result class with strongly-typed value property.
/// </summary>
/// <typeparam name="T">The type of value returned on successful operation</typeparam>
/// <remarks>
/// Generic Result Features:
/// - Type-safe return values for successful operations
/// - Inherits all Result pattern benefits from base class
/// - Enables functional chaining and composition patterns
/// - Provides clear success/failure semantics with data
/// - Supports both value and reference types
/// 
/// Usage Scenarios:
/// - Query operations that return entities or DTOs
/// - Validation methods that return processed data
/// - Transformation operations with success/failure states
/// - Service methods that may return computed values
/// - API endpoints that return data with status
/// 
/// Value Handling:
/// - Value property contains return data for successful operations
/// - Value is default(T) for failed operations (should not be accessed)
/// - Always check IsSuccess before accessing Value property
/// - Provides type safety for return value consumption
/// 
/// Error Scenarios:
/// - Network failures in external service calls
/// - Validation failures with user input
/// - Business rule violations during processing
/// - Resource not found conditions
/// - Authorization failures for restricted operations
/// </remarks>
public class Result<T> : Result
{
    /// <summary>
    /// Gets the return value for successful operations.
    /// Contains the operation result data when IsSuccess is true.
    /// </summary>
    /// <value>
    /// The typed return value for successful operations.
    /// Default value of type T for failed operations (should not be accessed).
    /// Always check IsSuccess before accessing this property.
    /// </value>
    /// <remarks>
    /// Value Access Patterns:
    /// - Check IsSuccess before accessing Value
    /// - Use pattern matching for safe value extraction
    /// - Combine with LINQ for functional composition
    /// - Handle both success and failure cases explicitly
    /// 
    /// Safe Access Example:
    /// <code>
    /// var result = GetUser(userId);
    /// if (result.IsSuccess)
    /// {
    ///     var user = result.Value; // Safe to access
    ///     // Use user data
    /// }
    /// else
    /// {
    ///     // Handle error: result.Error
    /// }
    /// </code>
    /// </remarks>
    public T Value { get; }

    /// <summary>
    /// Initializes a new instance of the Result&lt;T&gt; class with value, success status, and error message.
    /// Internal constructor called by factory methods to ensure proper instantiation.
    /// </summary>
    /// <param name="value">The return value for the operation</param>
    /// <param name="isSuccess">Boolean indicating if operation succeeded</param>
    /// <param name="error">Error message for failures, empty for success</param>
    /// <remarks>
    /// Constructor Responsibilities:
    /// - Initializes base Result class with status and error
    /// - Sets the typed Value property for data access
    /// - Maintains Result pattern invariants through base constructor
    /// - Provides type safety for generic return values
    /// </remarks>
    protected internal Result(T value, bool isSuccess, string error) : base(isSuccess, error)
    {
        Value = value;
    }
}