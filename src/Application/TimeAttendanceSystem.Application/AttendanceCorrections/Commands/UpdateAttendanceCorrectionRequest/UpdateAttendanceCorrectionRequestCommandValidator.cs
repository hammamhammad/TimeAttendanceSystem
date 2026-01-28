using FluentValidation;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.UpdateAttendanceCorrectionRequest;

/// <summary>
/// Fluent Validation rules for UpdateAttendanceCorrectionRequestCommand.
/// Ensures data integrity and business rule compliance before processing.
/// </summary>
public class UpdateAttendanceCorrectionRequestCommandValidator : AbstractValidator<UpdateAttendanceCorrectionRequestCommand>
{
    /// <summary>
    /// Maximum number of days in the past for which a correction can be submitted.
    /// </summary>
    private const int MaxRetroactiveDays = 30;

    public UpdateAttendanceCorrectionRequestCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Valid correction request ID is required");

        RuleFor(x => x.CorrectionDate)
            .NotEmpty()
            .WithMessage("Correction date is required")
            .Must(BeInPast)
            .WithMessage("Correction date must be before today (corrections are only for past dates)")
            .Must(BeWithinRetroactiveLimit)
            .WithMessage($"Correction date cannot be more than {MaxRetroactiveDays} days in the past");

        RuleFor(x => x.CorrectionTime)
            .NotEmpty()
            .WithMessage("Correction time is required");

        RuleFor(x => x.CorrectionType)
            .IsInEnum()
            .WithMessage("Invalid correction type. Must be CheckIn (1) or CheckOut (2)");

        RuleFor(x => x.Reason)
            .NotEmpty()
            .WithMessage("Reason is required")
            .MinimumLength(10)
            .WithMessage("Reason must be at least 10 characters long")
            .MaximumLength(500)
            .WithMessage("Reason cannot exceed 500 characters");

        RuleFor(x => x.AttachmentPath)
            .MaximumLength(1000)
            .When(x => !string.IsNullOrEmpty(x.AttachmentPath))
            .WithMessage("Attachment path cannot exceed 1000 characters");
    }

    private static bool BeInPast(DateTime correctionDate)
    {
        // Correction date must be strictly before today (yesterday or earlier)
        return correctionDate.Date < DateTime.Today;
    }

    private static bool BeWithinRetroactiveLimit(DateTime correctionDate)
    {
        var maxRetroactiveDate = DateTime.Today.AddDays(-MaxRetroactiveDays);
        return correctionDate.Date >= maxRetroactiveDate;
    }
}
