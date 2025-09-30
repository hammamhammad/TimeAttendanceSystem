using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ValidateExcuse;

/// <summary>
/// Fluent Validation rules for ValidateExcuseCommand.
/// Ensures data integrity before processing the validation request.
/// </summary>
public class ValidateExcuseCommandValidator : AbstractValidator<ValidateExcuseCommand>
{
    public ValidateExcuseCommandValidator()
    {
        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be valid");

        RuleFor(x => x.ExcuseDate)
            .NotEmpty()
            .WithMessage("Excuse date is required");

        RuleFor(x => x.ExcuseType)
            .IsInEnum()
            .WithMessage("Valid excuse type is required");

        RuleFor(x => x.StartTime)
            .NotEmpty()
            .WithMessage("Start time is required");

        RuleFor(x => x.EndTime)
            .NotEmpty()
            .WithMessage("End time is required");

        RuleFor(x => x)
            .Must(HaveValidTimeRange)
            .WithMessage("End time must be after start time")
            .WithName("TimeRange");
    }

    private static bool HaveValidTimeRange(ValidateExcuseCommand command)
    {
        try
        {
            return command.EndTimeValue > command.StartTimeValue;
        }
        catch
        {
            // If we can't parse the times, let the handler deal with it
            return true;
        }
    }
}