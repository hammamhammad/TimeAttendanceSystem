using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ToggleExcusePolicyStatus;

/// <summary>
/// Fluent Validation rules for ToggleExcusePolicyStatusCommand.
/// Ensures data integrity before processing the toggle request.
/// </summary>
public class ToggleExcusePolicyStatusCommandValidator : AbstractValidator<ToggleExcusePolicyStatusCommand>
{
    public ToggleExcusePolicyStatusCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Policy ID must be valid");
    }
}