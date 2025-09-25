using FluentValidation;

namespace TimeAttendanceSystem.Application.Shifts.Commands.SetDefaultShift;

public class SetDefaultShiftCommandValidator : AbstractValidator<SetDefaultShiftCommand>
{
    public SetDefaultShiftCommandValidator()
    {
        RuleFor(x => x.ShiftId)
            .GreaterThan(0)
            .WithMessage("Shift ID must be a valid positive integer");
    }
}