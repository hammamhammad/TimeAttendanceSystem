using FluentValidation;
using TecAxle.Hrms.Application.Validation;

namespace TecAxle.Hrms.Application.EmployeeVacations.Commands.CreateBulkEmployeeVacation;

/// <summary>
/// Validator for CreateBulkEmployeeVacationCommand. Future-planning window and max-period are
/// tenant-configurable via <c>CompanySettings.MaxVacationFuturePlanningYears</c> and
/// <c>MaxVacationDaysPerRequest</c> (both with sensible defaults preserving pre-v13.3 behavior).
/// </summary>
public class CreateBulkEmployeeVacationCommandValidator : AbstractValidator<CreateBulkEmployeeVacationCommand>
{
    private readonly IValidationSettingsProvider _settings;

    public CreateBulkEmployeeVacationCommandValidator(IValidationSettingsProvider settings)
    {
        _settings = settings;
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

        // Start date should not be too far in the past
        RuleFor(x => x.StartDate)
            .GreaterThanOrEqualTo(DateTime.Today.AddYears(-1))
            .WithMessage("Start date cannot be more than 1 year in the past");

        // End date cannot exceed tenant-configured future planning window
        RuleFor(x => x)
            .MustAsync(async (cmd, ct) =>
            {
                await _settings.WarmAsync(ct);
                var maxYears = _settings.Current.MaxVacationFuturePlanningYears;
                return cmd.EndDate <= DateTime.Today.AddYears(maxYears);
            })
            .WithMessage(_ => $"End date cannot be more than {_settings.Current.MaxVacationFuturePlanningYears} years in the future")
            .WithName("EndDate");

        // Vacation period cannot exceed tenant-configured max days per request
        RuleFor(x => x)
            .MustAsync(async (cmd, ct) =>
            {
                await _settings.WarmAsync(ct);
                var totalDays = (cmd.EndDate.Date - cmd.StartDate.Date).Days + 1;
                return totalDays <= _settings.Current.MaxVacationDaysPerRequest;
            })
            .WithMessage(_ => $"Vacation period cannot exceed {_settings.Current.MaxVacationDaysPerRequest} days")
            .WithName("DateRange");
    }
}