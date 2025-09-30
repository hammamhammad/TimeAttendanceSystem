using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Commands.DeleteExcusePolicy;

/// <summary>
/// Fluent Validation rules for DeleteExcusePolicyCommand.
/// Ensures data integrity before processing the delete request.
/// </summary>
public class DeleteExcusePolicyCommandValidator : AbstractValidator<DeleteExcusePolicyCommand>
{
    public DeleteExcusePolicyCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Policy ID must be valid");
    }
}