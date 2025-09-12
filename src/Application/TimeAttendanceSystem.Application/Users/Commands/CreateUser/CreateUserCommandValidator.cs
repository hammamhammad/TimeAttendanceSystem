using FluentValidation;

namespace TimeAttendanceSystem.Application.Users.Commands.CreateUser;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty()
            .MaximumLength(100)
            .Matches(@"^[a-zA-Z0-9._-]+$")
            .WithMessage("Username can only contain letters, numbers, dots, underscores, and hyphens.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.Phone)
            .MaximumLength(20)
            .When(x => !string.IsNullOrEmpty(x.Phone));

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8)
            .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$")
            .WithMessage("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.");

        RuleFor(x => x.PreferredLanguage)
            .NotEmpty()
            .Must(x => x == "en" || x == "ar")
            .WithMessage("PreferredLanguage must be 'en' or 'ar'.");

        RuleFor(x => x.RoleIds)
            .NotEmpty()
            .WithMessage("At least one role must be assigned.");

        RuleFor(x => x.BranchIds)
            .NotEmpty()
            .WithMessage("At least one branch scope must be assigned.");
    }
}