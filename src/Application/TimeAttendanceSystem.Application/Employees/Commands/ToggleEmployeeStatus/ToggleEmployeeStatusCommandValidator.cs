using FluentValidation;

namespace TimeAttendanceSystem.Application.Employees.Commands.ToggleEmployeeStatus;

/// <summary>
/// Validator for ToggleEmployeeStatusCommand
/// </summary>
public class ToggleEmployeeStatusCommandValidator : AbstractValidator<ToggleEmployeeStatusCommand>
{
    public ToggleEmployeeStatusCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Employee ID must be greater than 0");
    }
}
