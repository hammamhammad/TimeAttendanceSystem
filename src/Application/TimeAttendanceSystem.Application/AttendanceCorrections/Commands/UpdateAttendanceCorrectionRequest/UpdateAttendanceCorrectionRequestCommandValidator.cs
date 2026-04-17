using FluentValidation;
using TecAxle.Hrms.Application.Validation;

namespace TecAxle.Hrms.Application.AttendanceCorrections.Commands.UpdateAttendanceCorrectionRequest;

/// <summary>
/// Validator for UpdateAttendanceCorrectionRequestCommand. Retroactive-window cap uses
/// the tenant-configured <c>CompanySettings.AttendanceCorrectionMaxRetroactiveDays</c> (default 30).
/// </summary>
public class UpdateAttendanceCorrectionRequestCommandValidator : AbstractValidator<UpdateAttendanceCorrectionRequestCommand>
{
    private readonly IValidationSettingsProvider _settings;

    public UpdateAttendanceCorrectionRequestCommandValidator(IValidationSettingsProvider settings)
    {
        _settings = settings;

        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Valid correction request ID is required");

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
