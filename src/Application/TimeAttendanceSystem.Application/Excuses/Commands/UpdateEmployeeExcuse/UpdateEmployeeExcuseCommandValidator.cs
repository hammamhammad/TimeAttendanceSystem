using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Commands.UpdateEmployeeExcuse;

public class UpdateEmployeeExcuseCommandValidator : AbstractValidator<UpdateEmployeeExcuseCommand>
{
    public UpdateEmployeeExcuseCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Valid excuse ID is required");

        RuleFor(x => x.ExcuseDate)
            .NotEmpty()
            .WithMessage("Excuse date is required");

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

        RuleFor(x => x.ExcuseType)
            .IsInEnum()
            .WithMessage("Valid excuse type is required");

        RuleFor(x => x.ApprovalStatus)
            .IsInEnum()
            .WithMessage("Valid approval status is required");

        RuleFor(x => x.ReviewerComments)
            .MaximumLength(1000)
            .WithMessage("Reviewer comments cannot exceed 1000 characters")
            .When(x => !string.IsNullOrEmpty(x.ReviewerComments));
    }
}