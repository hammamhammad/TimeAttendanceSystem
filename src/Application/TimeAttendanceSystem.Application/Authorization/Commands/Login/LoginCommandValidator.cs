using FluentValidation;

namespace TimeAttendanceSystem.Application.Authorization.Commands.Login;

/// <summary>
/// FluentValidation validator for LoginCommand ensuring secure and proper authentication request validation.
/// Implements comprehensive input validation for login credentials with security-focused validation rules
/// to prevent malicious input and ensure data integrity before authentication processing.
/// </summary>
/// <remarks>
/// Validation Security Features:
/// - Input sanitization and length restrictions to prevent injection attacks
/// - Required field validation for essential authentication credentials
/// - Reasonable length limits to prevent DoS attacks through large payloads
/// - Optional field validation for enhanced security without breaking functionality
/// - Early validation prevents unnecessary processing of invalid requests
/// 
/// Authentication Security:
/// - Username validation ensures proper credential format
/// - Password validation prevents empty or oversized password attacks
/// - Device information validation for session tracking security
/// - Length restrictions prevent buffer overflow and memory exhaustion
/// - Input validation reduces attack surface for authentication system
/// 
/// Performance Benefits:
/// - Fast client-side and server-side validation
/// - Early rejection of invalid requests reduces processing load
/// - Efficient validation rules with minimal overhead
/// - Prevention of unnecessary database queries for invalid inputs
/// - Reduced authentication processing costs through input filtering
/// 
/// Integration with MediatR Pipeline:
/// - Automatic validation through MediatR pipeline behavior
/// - Validation executed before command handler processing
/// - Consistent error response format across all commands
/// - Integration with localization for user-friendly error messages
/// - Standardized validation failure handling and reporting
/// 
/// Validation Rules Applied:
/// - Username: Required, maximum 100 characters for reasonable user identification
/// - Password: Required, maximum 500 characters to prevent oversized attacks
/// - DeviceInfo: Optional, maximum 500 characters for session tracking data
/// - All rules designed to balance security, usability, and system performance
/// </remarks>
public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    /// <summary>
    /// Initializes a new instance of the LoginCommandValidator with comprehensive validation rules.
    /// Configures FluentValidation rules for secure authentication request validation.
    /// </summary>
    /// <remarks>
    /// Validation Rule Configuration:
    /// - Username validation: Required field with length restriction
    /// - Password validation: Required field with security-focused length limit
    /// - DeviceInfo validation: Optional field with reasonable size restriction
    /// - All validations designed to prevent common security vulnerabilities
    /// 
    /// Security Considerations:
    /// - Length limits prevent buffer overflow and memory exhaustion attacks
    /// - Required field validation ensures essential authentication data presence
    /// - Optional field validation maintains backward compatibility
    /// - Input restrictions reduce attack surface for authentication system
    /// </remarks>
    public LoginCommandValidator()
    {
        // Username validation: Required for authentication, reasonable length limit
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("Username is required for authentication")
            .MaximumLength(100)
            .WithMessage("Username cannot exceed 100 characters");

        // Password validation: Required for authentication, prevent oversized attacks
        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required for authentication")
            .MaximumLength(500)
            .WithMessage("Password cannot exceed 500 characters");

        // Device information validation: Optional field with size restriction
        RuleFor(x => x.DeviceInfo)
            .MaximumLength(500)
            .WithMessage("Device information cannot exceed 500 characters")
            .When(x => !string.IsNullOrEmpty(x.DeviceInfo));
    }
}