using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Commands.CreateEmployeeExcuse;

/// <summary>
/// Fluent Validation rules for CreateEmployeeExcuseCommand.
/// Ensures data integrity and business rule compliance before processing.
/// </summary>
public class CreateEmployeeExcuseCommandValidator : AbstractValidator<CreateEmployeeExcuseCommand>
{
    public CreateEmployeeExcuseCommandValidator()
    {
        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be provided");

        RuleFor(x => x.ExcuseDate)
            .NotEmpty()
            .WithMessage("Excuse date is required")
            .Must(BeWithinValidRange)
            .WithMessage("Excuse date must be within the last year or next 30 days");

        RuleFor(x => x.StartTime)
            .NotEmpty()
            .WithMessage("Start time is required");

        RuleFor(x => x.EndTime)
            .NotEmpty()
            .WithMessage("End time is required")
            .GreaterThan(x => x.StartTime)
            .WithMessage("End time must be after start time");

        RuleFor(x => x.Reason)
            .NotEmpty()
            .WithMessage("Reason is required")
            .MaximumLength(500)
            .WithMessage("Reason cannot exceed 500 characters");

        RuleFor(x => x.AttachmentPath)
            .MaximumLength(1000)
            .When(x => !string.IsNullOrEmpty(x.AttachmentPath))
            .WithMessage("Attachment path cannot exceed 1000 characters");

        RuleFor(x => x.ProcessingNotes)
            .MaximumLength(1000)
            .When(x => !string.IsNullOrEmpty(x.ProcessingNotes))
            .WithMessage("Processing notes cannot exceed 1000 characters");

        // Custom validation for duration
        RuleFor(x => x)
            .Must(HaveValidDuration)
            .WithMessage("Excuse duration must be between 0.1 and 24 hours")
            .WithName("Duration");
    }

    private static bool BeWithinValidRange(DateTime excuseDate)
    {
        var today = DateTime.Today;
        var oneYearAgo = today.AddYears(-1);
        var thirtyDaysFromNow = today.AddDays(30);

        return excuseDate.Date >= oneYearAgo && excuseDate.Date <= thirtyDaysFromNow;
    }

    private static bool HaveValidDuration(CreateEmployeeExcuseCommand command)
    {
        if (command.EndTime <= command.StartTime)
            return false;

        var duration = (command.EndTime.ToTimeSpan() - command.StartTime.ToTimeSpan()).TotalHours;
        return duration >= 0.1 && duration <= 24;
    }
}