using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Commands.DeleteEmployeeExcuse;

public class DeleteEmployeeExcuseCommandValidator : AbstractValidator<DeleteEmployeeExcuseCommand>
{
    public DeleteEmployeeExcuseCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Valid excuse ID is required");
    }
}