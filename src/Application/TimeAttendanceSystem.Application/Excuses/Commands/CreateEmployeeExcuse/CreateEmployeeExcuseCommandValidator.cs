using FluentValidation;
using TecAxle.Hrms.Application.Validation;

namespace TecAxle.Hrms.Application.Excuses.Commands.CreateEmployeeExcuse;

/// <summary>
/// Validator for CreateEmployeeExcuseCommand. Excuse window is tenant-configurable via
/// <c>TenantSettings.ExcuseBackwardWindowDays</c> (default 365) and
/// <c>ExcuseForwardWindowDays</c> (default 30).
/// </summary>
public class CreateEmployeeExcuseCommandValidator : AbstractValidator<CreateEmployeeExcuseCommand>
{
    private readonly IValidationSettingsProvider _settings;

    public CreateEmployeeExcuseCommandValidator(IValidationSettingsProvider settings)
    {
        _settings = settings;

        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be provided");

        RuleFor(x => x.ExcuseDate)
            .NotEmpty()
            .WithMessage("Excuse date is required")
            .MustAsync(BeWithinValidRangeAsync)
            .WithMessage(_ => $"Excuse date must be within the last {_settings.Current.ExcuseBackwardWindowDays} days or next {_settings.Current.ExcuseForwardWindowDays} days");

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

        RuleFor(x => x)
            .Must(HaveValidDuration)
            .WithMessage("Excuse duration must be between 0.1 and 24 hours")
            .WithName("Duration");
    }

    private async Task<bool> BeWithinValidRangeAsync(DateTime excuseDate, CancellationToken ct)
    {
        await _settings.WarmAsync(ct);
        var today = DateTime.Today;
        var backward = today.AddDays(-_settings.Current.ExcuseBackwardWindowDays);
        var forward = today.AddDays(_settings.Current.ExcuseForwardWindowDays);
        return excuseDate.Date >= backward && excuseDate.Date <= forward;
    }

    private static bool HaveValidDuration(CreateEmployeeExcuseCommand command)
    {
        if (command.EndTime <= command.StartTime)
            return false;

        var duration = (command.EndTime.ToTimeSpan() - command.StartTime.ToTimeSpan()).TotalHours;
        return duration >= 0.1 && duration <= 24;
    }
}
