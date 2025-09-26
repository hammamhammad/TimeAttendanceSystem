using FluentValidation;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.CreateVacationType;

/// <summary>
/// FluentValidation validator for CreateVacationTypeCommand providing essential input validation.
/// Validates only the simplified vacation type properties: Name, NameAr, and BranchId.
/// </summary>
/// <remarks>
/// Validation Categories:
/// - Required Field Validation: Ensures Name is provided
/// - Data Format Validation: Validates string lengths and formats
/// - Optional Field Validation: Validates Arabic name when provided
/// - Branch Validation: Ensures BranchId is valid when specified
///
/// Validation Features:
/// - User-friendly error messages
/// - String length limits aligned with database schema constraints
/// - Multi-language support for Arabic names
/// - Flexible branch assignment (null allowed for all branches)
/// </remarks>
public class CreateVacationTypeCommandValidator : AbstractValidator<CreateVacationTypeCommand>
{
    /// <summary>
    /// Initializes the validator with simplified validation rules for vacation type creation.
    /// Configures validation constraints for Name, NameAr, and BranchId only.
    /// </summary>
    public CreateVacationTypeCommandValidator()
    {
        // Branch Validation (Optional - can be null for all branches)
        RuleFor(x => x.BranchId)
            .GreaterThan(0)
            .When(x => x.BranchId.HasValue)
            .WithMessage("Branch ID must be a positive number when specified");

        // Name Validation (Required Field)
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Vacation type name is required")
            .MaximumLength(100)
            .WithMessage("Vacation type name must not exceed 100 characters")
            .Must(BeValidName)
            .WithMessage("Vacation type name contains invalid characters");

        // Arabic Name Validation (Optional but Constrained)
        RuleFor(x => x.NameAr)
            .MaximumLength(100)
            .WithMessage("Arabic name must not exceed 100 characters")
            .Must(BeValidArabicName)
            .When(x => !string.IsNullOrEmpty(x.NameAr))
            .WithMessage("Arabic name contains invalid characters");
    }

    /// <summary>
    /// Validates that a vacation type name contains only acceptable characters.
    /// Prevents special characters that could cause display or data issues.
    /// </summary>
    /// <param name="name">The name to validate</param>
    /// <returns>True if the name is valid, false otherwise</returns>
    private static bool BeValidName(string? name)
    {
        if (string.IsNullOrEmpty(name)) return true; // Handled by NotEmpty rule

        // Allow letters, numbers, spaces, hyphens, and common punctuation
        return name.All(c => char.IsLetterOrDigit(c) ||
                           char.IsWhiteSpace(c) ||
                           c == '-' ||
                           c == '_' ||
                           c == '.' ||
                           c == '(' ||
                           c == ')');
    }

    /// <summary>
    /// Validates that an Arabic name contains appropriate characters.
    /// Allows Arabic characters, numbers, and common punctuation.
    /// </summary>
    /// <param name="nameAr">The Arabic name to validate</param>
    /// <returns>True if the Arabic name is valid, false otherwise</returns>
    private static bool BeValidArabicName(string? nameAr)
    {
        if (string.IsNullOrEmpty(nameAr)) return true; // Optional field

        // Allow Arabic characters, numbers, spaces, and common punctuation
        return nameAr.All(c => char.IsLetterOrDigit(c) ||
                             char.IsWhiteSpace(c) ||
                             c == '-' ||
                             c == '_' ||
                             c == '.' ||
                             c == '(' ||
                             c == ')' ||
                             (c >= 0x0600 && c <= 0x06FF) || // Arabic block
                             (c >= 0x0750 && c <= 0x077F) || // Arabic Supplement
                             (c >= 0xFB50 && c <= 0xFDFF) || // Arabic Presentation Forms-A
                             (c >= 0xFE70 && c <= 0xFEFF));  // Arabic Presentation Forms-B
    }
}