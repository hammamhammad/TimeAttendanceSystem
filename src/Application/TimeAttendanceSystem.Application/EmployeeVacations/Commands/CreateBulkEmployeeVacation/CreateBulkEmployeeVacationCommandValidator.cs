using FluentValidation;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateBulkEmployeeVacation;

/// <summary>
/// Validator for CreateBulkEmployeeVacationCommand.
/// Ensures all required fields are provided and business rules are enforced.
/// </summary>
public class CreateBulkEmployeeVacationCommandValidator : AbstractValidator<CreateBulkEmployeeVacationCommand>
{
    public CreateBulkEmployeeVacationCommandValidator()
    {
        RuleFor(x => x.VacationTypeId)
            .GreaterThan(0)
            .WithMessage("Vacation type is required");

        RuleFor(x => x.StartDate)
            .NotEmpty()
            .WithMessage("Start date is required");

        RuleFor(x => x.EndDate)
            .NotEmpty()
            .WithMessage("End date is required")
            .GreaterThanOrEqualTo(x => x.StartDate)
            .WithMessage("End date must be after or equal to start date");

        RuleFor(x => x.AssignmentType)
            .IsInEnum()
            .WithMessage("Valid assignment type is required");

        // Validate that either BranchId or DepartmentId is provided based on AssignmentType
        RuleFor(x => x.BranchId)
            .NotNull()
            .GreaterThan(0)
            .When(x => x.AssignmentType == BulkAssignmentType.Branch)
            .WithMessage("Branch ID is required for branch assignment");

        RuleFor(x => x.DepartmentId)
            .NotNull()
            .GreaterThan(0)
            .When(x => x.AssignmentType == BulkAssignmentType.Department)
            .WithMessage("Department ID is required for department assignment");

        // Ensure that only the relevant ID is provided based on AssignmentType
        RuleFor(x => x.DepartmentId)
            .Null()
            .When(x => x.AssignmentType == BulkAssignmentType.Branch)
            .WithMessage("Department ID should not be provided for branch assignment");

        RuleFor(x => x.BranchId)
            .Null()
            .When(x => x.AssignmentType == BulkAssignmentType.Department)
            .WithMessage("Branch ID should not be provided for department assignment");

        RuleFor(x => x.Notes)
            .MaximumLength(1000)
            .WithMessage("Notes cannot exceed 1000 characters");

        // Additional business rule: Start date should not be too far in the past
        RuleFor(x => x.StartDate)
            .GreaterThanOrEqualTo(DateTime.Today.AddYears(-1))
            .WithMessage("Start date cannot be more than 1 year in the past");

        // Additional business rule: End date should not be too far in the future
        RuleFor(x => x.EndDate)
            .LessThanOrEqualTo(DateTime.Today.AddYears(2))
            .WithMessage("End date cannot be more than 2 years in the future");

        // Vacation period should not exceed reasonable duration (e.g., 6 months)
        RuleFor(x => x)
            .Must(x => (x.EndDate - x.StartDate).TotalDays <= 180)
            .WithMessage("Vacation period cannot exceed 180 days");
    }
}