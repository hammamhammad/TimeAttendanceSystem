using FluentValidation;
using TecAxle.Hrms.Application.Validation;

namespace TecAxle.Hrms.Application.AttendanceCorrections.Commands.CreateAttendanceCorrectionRequest;

/// <summary>
/// Validator for CreateAttendanceCorrectionRequestCommand. The retroactive-window cap is
/// tenant-configurable via <c>TenantSettings.AttendanceCorrectionMaxRetroactiveDays</c>
/// (default 30) — preserves pre-v13.4 behavior.
/// </summary>
public class CreateAttendanceCorrectionRequestCommandValidator : AbstractValidator<CreateAttendanceCorrectionRequestCommand>
{
    private readonly IValidationSettingsProvider _settings;

    public CreateAttendanceCorrectionRequestCommandValidator(IValidationSettingsProvider settings)
    {
        _settings = settings;

        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be provided");

        RuleFor(x => x.CorrectionDate)
            .NotEmpty()
            .WithMessage("Correction date is required")
            .Must(BeInPast)
            .WithMessage("Correction date must be before today (corrections are only for past dates)")
            .MustAsync(BeWithinRetroactiveLimitAsync)
            .WithMessage(_ => $"Correction date cannot be more than {_settings.Current.AttendanceCorrectionMaxRetroactiveDays} days in the past");

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

        RuleFor(x => x.ProcessingNotes)
            .MaximumLength(1000)
            .When(x => !string.IsNullOrEmpty(x.ProcessingNotes))
            .WithMessage("Processing notes cannot exceed 1000 characters");
    }

    private static bool BeInPast(DateTime correctionDate)
        => correctionDate.Date < DateTime.Today;

    private async Task<bool> BeWithinRetroactiveLimitAsync(DateTime correctionDate, CancellationToken ct)
    {
        await _settings.WarmAsync(ct);
        var max = _settings.Current.AttendanceCorrectionMaxRetroactiveDays;
        return correctionDate.Date >= DateTime.Today.AddDays(-max);
    }
}
