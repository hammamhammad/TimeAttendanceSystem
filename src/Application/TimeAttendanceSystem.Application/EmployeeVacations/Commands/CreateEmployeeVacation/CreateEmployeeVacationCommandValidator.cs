using FluentValidation;
using TecAxle.Hrms.Application.Validation;

namespace TecAxle.Hrms.Application.EmployeeVacations.Commands.CreateEmployeeVacation;

/// <summary>
/// Validation rules for CreateEmployeeVacationCommand. Max-period rule uses the tenant-configured
/// <c>TenantSettings.MaxVacationDaysPerRequest</c> (default 365) rather than a hardcoded 365.
/// </summary>
public class CreateEmployeeVacationCommandValidator : AbstractValidator<CreateEmployeeVacationCommand>
{
    private readonly IValidationSettingsProvider _settings;

    public CreateEmployeeVacationCommandValidator(IValidationSettingsProvider settings)
    {
        _settings = settings;

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

        // Tenant-configurable maximum vacation period
        RuleFor(x => x)
            .MustAsync(HaveValidDateRangeAsync)
            .WithMessage(_ => $"Vacation period cannot exceed {_settings.Current.MaxVacationDaysPerRequest} days")
            .WithName("DateRange");

        RuleFor(x => x.HalfDayType)
            .NotNull()
            .When(x => x.IsHalfDay)
            .WithMessage("Half-day type (Morning or Afternoon) is required when requesting half-day leave");

        RuleFor(x => x)
            .Must(x => x.StartDate.Date == x.EndDate.Date)
            .When(x => x.IsHalfDay)
            .WithMessage("Half-day leave must be for a single day (start date must equal end date)")
            .WithName("HalfDayDateRange");
    }

    private async Task<bool> HaveValidDateRangeAsync(CreateEmployeeVacationCommand command, CancellationToken ct)
    {
        if (command.EndDate < command.StartDate)
            return false;

        await _settings.WarmAsync(ct);
        var totalDays = (command.EndDate.Date - command.StartDate.Date).Days + 1;
        return totalDays <= _settings.Current.MaxVacationDaysPerRequest;
    }
}
