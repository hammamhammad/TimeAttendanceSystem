using FluentValidation;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateEmployeeVacation;

/// <summary>
/// Fluent Validation rules for CreateEmployeeVacationCommand.
/// Ensures data integrity and business rule compliance before processing.
/// </summary>
public class CreateEmployeeVacationCommandValidator : AbstractValidator<CreateEmployeeVacationCommand>
{
    public CreateEmployeeVacationCommandValidator()
    {
        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be provided");

        RuleFor(x => x.VacationTypeId)
            .GreaterThan(0)
            .WithMessage("Vacation type ID must be provided");

        RuleFor(x => x.StartDate)
            .NotEmpty()
            .WithMessage("Start date is required");

        RuleFor(x => x.EndDate)
            .NotEmpty()
            .WithMessage("End date is required")
            .GreaterThanOrEqualTo(x => x.StartDate)
            .WithMessage("End date must be after or equal to start date");

        RuleFor(x => x.Notes)
            .MaximumLength(1000)
            .WithMessage("Notes cannot exceed 1000 characters");

        // Custom validation for date range
        RuleFor(x => x)
            .Must(HaveValidDateRange)
            .WithMessage("Vacation period cannot exceed 365 days")
            .WithName("DateRange");
    }

    private static bool HaveValidDateRange(CreateEmployeeVacationCommand command)
    {
        if (command.EndDate < command.StartDate)
            return false;

        var totalDays = (command.EndDate.Date - command.StartDate.Date).Days + 1;
        return totalDays <= 365; // Maximum vacation period of 1 year
    }
}