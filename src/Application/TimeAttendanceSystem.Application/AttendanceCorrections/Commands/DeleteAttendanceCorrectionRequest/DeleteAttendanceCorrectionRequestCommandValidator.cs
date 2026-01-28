using FluentValidation;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.DeleteAttendanceCorrectionRequest;

/// <summary>
/// Fluent Validation rules for DeleteAttendanceCorrectionRequestCommand.
/// </summary>
public class DeleteAttendanceCorrectionRequestCommandValidator : AbstractValidator<DeleteAttendanceCorrectionRequestCommand>
{
    public DeleteAttendanceCorrectionRequestCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Valid correction request ID is required");
    }
}
