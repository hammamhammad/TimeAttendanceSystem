using FluentValidation;

namespace TimeAttendanceSystem.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommandValidator : AbstractValidator<UpdateEmployeeCommand>
{
    public UpdateEmployeeCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Employee ID must be greater than 0");

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required")
            .MaximumLength(100)
            .WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required")
            .MaximumLength(100)
            .WithMessage("Last name cannot exceed 100 characters");

        RuleFor(x => x.FirstNameAr)
            .MaximumLength(100)
            .WithMessage("Arabic first name cannot exceed 100 characters")
            .When(x => !string.IsNullOrEmpty(x.FirstNameAr));

        RuleFor(x => x.LastNameAr)
            .MaximumLength(100)
            .WithMessage("Arabic last name cannot exceed 100 characters")
            .When(x => !string.IsNullOrEmpty(x.LastNameAr));

        RuleFor(x => x.NationalId)
            .MaximumLength(50)
            .WithMessage("National ID cannot exceed 50 characters")
            .When(x => !string.IsNullOrEmpty(x.NationalId));

        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Invalid email format")
            .MaximumLength(256)
            .WithMessage("Email cannot exceed 256 characters")
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.Phone)
            .MaximumLength(20)
            .WithMessage("Phone cannot exceed 20 characters")
            .When(x => !string.IsNullOrEmpty(x.Phone));

        RuleFor(x => x.DateOfBirth)
            .LessThan(DateTime.Today)
            .WithMessage("Date of birth must be in the past")
            .Must(dob => !dob.HasValue || CalculateAge(dob.Value) >= 16)
            .WithMessage("Employee must be at least 16 years old")
            .When(x => x.DateOfBirth.HasValue);

        RuleFor(x => x.JobTitle)
            .NotEmpty()
            .WithMessage("Job title is required")
            .MaximumLength(100)
            .WithMessage("Job title cannot exceed 100 characters");

        RuleFor(x => x.JobTitleAr)
            .MaximumLength(100)
            .WithMessage("Arabic job title cannot exceed 100 characters")
            .When(x => !string.IsNullOrEmpty(x.JobTitleAr));

        RuleFor(x => x.DepartmentId)
            .GreaterThan(0)
            .WithMessage("Department ID must be greater than 0")
            .When(x => x.DepartmentId.HasValue);

        RuleFor(x => x.ManagerEmployeeId)
            .GreaterThan(0)
            .WithMessage("Manager employee ID must be greater than 0")
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