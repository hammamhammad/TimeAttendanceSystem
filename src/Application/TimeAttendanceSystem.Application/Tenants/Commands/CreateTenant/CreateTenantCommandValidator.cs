using FluentValidation;

namespace TecAxle.Hrms.Application.Tenants.Commands.CreateTenant;

public class CreateTenantCommandValidator : AbstractValidator<CreateTenantCommand>
{
    public CreateTenantCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Tenant name is required.")
            .MaximumLength(200).WithMessage("Tenant name cannot exceed 200 characters.");

        RuleFor(x => x.NameAr)
            .MaximumLength(200).WithMessage("Arabic name cannot exceed 200 characters.")
            .When(x => !string.IsNullOrEmpty(x.NameAr));

        RuleFor(x => x.Subdomain)
            .MaximumLength(50).WithMessage("Subdomain cannot exceed 50 characters.")
            .Matches(@"^[a-z0-9-]+$").WithMessage("Subdomain can only contain lowercase letters, numbers, and hyphens.")
            .When(x => !string.IsNullOrEmpty(x.Subdomain));

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email address.")
            .MaximumLength(200).WithMessage("Email cannot exceed 200 characters.");

        RuleFor(x => x.Phone)
            .MaximumLength(50).WithMessage("Phone cannot exceed 50 characters.")
            .When(x => !string.IsNullOrEmpty(x.Phone));

        RuleFor(x => x.Website)
            .MaximumLength(500).WithMessage("Website cannot exceed 500 characters.")
            .When(x => !string.IsNullOrEmpty(x.Website));

        RuleFor(x => x.Address)
            .MaximumLength(500).WithMessage("Address cannot exceed 500 characters.")
            .When(x => !string.IsNullOrEmpty(x.Address));

        RuleFor(x => x.CompanyRegistrationNumber)
            .MaximumLength(100)
            .When(x => !string.IsNullOrEmpty(x.CompanyRegistrationNumber));

        RuleFor(x => x.TaxIdentificationNumber)
            .MaximumLength(100)
            .When(x => !string.IsNullOrEmpty(x.TaxIdentificationNumber));

        RuleFor(x => x.Industry)
            .MaximumLength(100)
            .When(x => !string.IsNullOrEmpty(x.Industry));

        RuleFor(x => x.Country)
            .MaximumLength(100)
            .When(x => !string.IsNullOrEmpty(x.Country));

        RuleFor(x => x.City)
            .MaximumLength(100)
            .When(x => !string.IsNullOrEmpty(x.City));

        RuleFor(x => x.DefaultTimezone)
            .NotEmpty().WithMessage("Default timezone is required.");

        RuleFor(x => x.DefaultLanguage)
            .NotEmpty().WithMessage("Default language is required.")
            .Must(x => x == "en" || x == "ar")
            .WithMessage("Default language must be 'en' or 'ar'.");

        RuleFor(x => x.DefaultCurrency)
            .NotEmpty().WithMessage("Default currency is required.")
            .MaximumLength(10).WithMessage("Currency code cannot exceed 10 characters.");

        RuleFor(x => x.BillingCycle)
            .Must(x => x == null || x == "Monthly" || x == "Annual")
            .WithMessage("Billing cycle must be 'Monthly' or 'Annual'.");
    }
}
