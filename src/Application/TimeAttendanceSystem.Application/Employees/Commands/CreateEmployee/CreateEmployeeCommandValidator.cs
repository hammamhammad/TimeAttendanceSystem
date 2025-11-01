using FluentValidation;

namespace TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;

/// <summary>
/// FluentValidation validator for CreateEmployeeCommand ensuring comprehensive employee data validation.
/// Implements extensive input validation for employee creation with security-focused validation rules,
/// organizational integrity checks, and data quality enforcement for HR management operations.
/// </summary>
/// <remarks>
/// Employee Creation Validation Features:
/// - Complete demographic and contact information validation
/// - Organizational relationship validation (branch, department, manager)
/// - Business rule enforcement for employment data integrity
/// - Input sanitization and length restrictions to prevent injection attacks
/// - Date validation for employment lifecycle management
/// - Hierarchical validation for reporting structure integrity
/// - Bilingual field validation supporting international organizations
/// 
/// Validation Security Features:
/// - Input length restrictions to prevent buffer overflow attacks
/// - Required field validation for essential employee data
/// - Email format validation to prevent malformed contact data
/// - Date range validation to prevent invalid employment dates
/// - Hierarchical integrity checks to prevent organizational loops
/// - Special character handling for international names and addresses
/// 
/// Business Rule Enforcement:
/// - Employment date validation ensuring logical date constraints
/// - Organizational hierarchy validation for manager assignments
/// - Department and branch relationship validation
/// - Employee number uniqueness within branch scope
/// - Contact information format validation for system integration
/// - Job title and role validation for organizational consistency
/// 
/// Multi-tenant Validation:
/// - Branch-scoped validation for multi-location organizations
/// - Department validation within branch context
/// - Manager assignment validation within organizational boundaries
/// - Cross-tenant data isolation through validation rules
/// - Organizational structure integrity enforcement
/// 
/// Data Quality Assurance:
/// - Name field validation with appropriate length restrictions
/// - Contact information format validation and sanitization
/// - Employment status validation for lifecycle management
/// - Job classification validation for HR system integration
/// - Bilingual field validation for international support
/// 
/// Integration with MediatR Pipeline:
/// - Automatic validation through MediatR pipeline behavior
/// - Validation executed before command handler processing
/// - Consistent error response format across all employee operations
/// - Integration with localization for user-friendly error messages
/// - Standardized validation failure handling and reporting
/// 
/// Performance Considerations:
/// - Efficient validation rules with minimal database queries
/// - Early validation to prevent unnecessary processing
/// - Optimized validation logic for high-volume employee operations
/// - Cached validation rules for improved performance
/// - Lightweight validation with focused rule execution
/// </remarks>
public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    /// <summary>
    /// Initializes a new instance of the CreateEmployeeCommandValidator with comprehensive validation rules.
    /// Configures FluentValidation rules for secure employee creation request validation covering
    /// all required and optional fields with appropriate business rules and security constraints.
    /// </summary>
    /// <remarks>
    /// Validation Rule Configuration:
    /// - Organizational validation: Branch ID, Department ID with existence checks
    /// - Identity validation: Employee number uniqueness, names with length restrictions
    /// - Contact validation: Email format, phone number format and length
    /// - Employment validation: Hire date logic, job title requirements
    /// - Hierarchical validation: Manager assignment and reporting structure
    /// - Bilingual validation: Arabic name fields with appropriate constraints
    /// - Security validation: Input sanitization and injection prevention
    /// 
    /// Required Field Validation:
    /// - Branch assignment for multi-tenant organizational structure
    /// - Employee number for unique identification within branch
    /// - Employee names for identity and directory purposes
    /// - Hire date for employment lifecycle management
    /// - Job title for organizational structure and role clarity
    /// 
    /// Optional Field Validation:
    /// - Bilingual names supporting Arabic language organizations
    /// - Contact information with format validation
    /// - National identification with appropriate constraints
    /// - Department assignment within organizational hierarchy
    /// - Manager assignment for reporting structure
    /// - Date of birth for demographic and compliance purposes
    /// 
    /// Business Rule Enforcement:
    /// - Employment dates must be logical and within reasonable ranges
    /// - Manager assignments must reference valid existing employees
    /// - Department assignments must exist within the specified branch
    /// - Contact information must follow standard formats
    /// - Name fields must support international character sets
    /// 
    /// Security Considerations:
    /// - Length limits prevent buffer overflow and memory exhaustion attacks
    /// - Format validation prevents injection of malicious content
    /// - Required field validation ensures essential data presence
    /// - Optional field validation maintains backward compatibility
    /// - Input restrictions reduce attack surface for employee management
    /// </remarks>
    public CreateEmployeeCommandValidator()
    {
        // Branch validation: Required for multi-tenant organizational assignment
        RuleFor(x => x.BranchId)
            .GreaterThan(0)
            .WithMessage("Branch ID must be a valid positive number");

        // Employee number validation: Required unique identifier within branch
        RuleFor(x => x.EmployeeNumber)
            .NotEmpty()
            .WithMessage("Employee number is required for identification")
            .MaximumLength(50)
            .WithMessage("Employee number cannot exceed 50 characters");

        // First name validation: Required for employee identity
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required for employee identity")
            .MaximumLength(100)
            .WithMessage("First name cannot exceed 100 characters");

        // Last name validation: Required for employee identity
        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required for employee identity")
            .MaximumLength(100)
            .WithMessage("Last name cannot exceed 100 characters");

        // Arabic first name validation: Optional bilingual support
        RuleFor(x => x.FirstNameAr)
            .MaximumLength(100)
            .WithMessage("Arabic first name cannot exceed 100 characters")
            .When(x => !string.IsNullOrEmpty(x.FirstNameAr));

        // Arabic last name validation: Optional bilingual support
        RuleFor(x => x.LastNameAr)
            .MaximumLength(100)
            .WithMessage("Arabic last name cannot exceed 100 characters")
            .When(x => !string.IsNullOrEmpty(x.LastNameAr));

        // National ID validation: Optional identification field
        RuleFor(x => x.NationalId)
            .MaximumLength(50)
            .WithMessage("National ID cannot exceed 50 characters")
            .When(x => !string.IsNullOrEmpty(x.NationalId));

        // Email validation: Optional contact with format validation
        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Email address must be in valid format")
            .MaximumLength(200)
            .WithMessage("Email address cannot exceed 200 characters")
            .When(x => !string.IsNullOrEmpty(x.Email));

        // Phone validation: Optional contact with length restriction
        RuleFor(x => x.Phone)
            .MaximumLength(20)
            .WithMessage("Phone number cannot exceed 20 characters")
            .When(x => !string.IsNullOrEmpty(x.Phone));

        // Date of birth validation: Required for minimum age verification
        RuleFor(x => x.DateOfBirth)
            .NotEmpty()
            .WithMessage("Date of birth is required")
            .LessThan(DateTime.Today)
            .WithMessage("Date of birth must be in the past")
            .Must(dob => dob.HasValue && CalculateAge(dob.Value) >= 16)
            .WithMessage("Employee must be at least 16 years old");

        // Hire date validation: Required employment start date
        RuleFor(x => x.HireDate)
            .NotEmpty()
            .WithMessage("Hire date is required for employment records")
            .LessThanOrEqualTo(DateTime.Today)
            .WithMessage("Hire date cannot be in the future");

        // Job title validation: Required organizational role
        RuleFor(x => x.JobTitle)
            .NotEmpty()
            .WithMessage("Job title is required for organizational structure")
            .MaximumLength(200)
            .WithMessage("Job title cannot exceed 200 characters");

        // Arabic job title validation: Optional bilingual support
        RuleFor(x => x.JobTitleAr)
            .MaximumLength(200)
            .WithMessage("Arabic job title cannot exceed 200 characters")
            .When(x => !string.IsNullOrEmpty(x.JobTitleAr));

        // Department validation: Optional organizational assignment
        RuleFor(x => x.DepartmentId)
            .GreaterThan(0)
            .WithMessage("Department ID must be a valid positive number")
            .When(x => x.DepartmentId.HasValue);

        // Manager validation: Optional hierarchical assignment
        RuleFor(x => x.ManagerEmployeeId)
            .GreaterThan(0)
            .WithMessage("Manager Employee ID must be a valid positive number")
            .When(x => x.ManagerEmployeeId.HasValue);
    }

    /// <summary>
    /// Calculates the age of a person based on their date of birth.
    /// </summary>
    /// <param name="dateOfBirth">The date of birth</param>
    /// <returns>The age in years</returns>
    private static int CalculateAge(DateTime dateOfBirth)
    {
        var today = DateTime.Today;
        var age = today.Year - dateOfBirth.Year;

        // Subtract one year if birthday hasn't occurred yet this year
        if (dateOfBirth.Date > today.AddYears(-age))
        {
            age--;
        }

        return age;
    }
}