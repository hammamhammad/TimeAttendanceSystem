using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Commands.UpdateExcusePolicy;

/// <summary>
/// Fluent Validation rules for UpdateExcusePolicyCommand.
/// Ensures data integrity and business rule compliance before processing.
/// </summary>
public class UpdateExcusePolicyCommandValidator : AbstractValidator<UpdateExcusePolicyCommand>
{
    public UpdateExcusePolicyCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Policy ID must be valid");

        RuleFor(x => x.BranchId)
            .GreaterThan(0)
            .When(x => x.BranchId.HasValue)
            .WithMessage("Branch ID must be valid when provided");

        RuleFor(x => x.MaxPersonalExcusesPerMonth)
            .GreaterThan(0)
            .LessThanOrEqualTo(50)
            .WithMessage("Maximum personal excuses per month must be between 1 and 50");

        RuleFor(x => x.MaxPersonalExcuseHoursPerMonth)
            .GreaterThan(0)
            .LessThanOrEqualTo(200)
            .WithMessage("Maximum personal excuse hours per month must be between 0 and 200");

        RuleFor(x => x.MaxPersonalExcuseHoursPerDay)
            .GreaterThan(0)
            .LessThanOrEqualTo(24)
            .WithMessage("Maximum personal excuse hours per day must be between 0 and 24");

        RuleFor(x => x.MaxHoursPerExcuse)
            .GreaterThan(0)
            .LessThanOrEqualTo(24)
            .WithMessage("Maximum hours per excuse must be between 0 and 24");

        RuleFor(x => x.MinimumExcuseDuration)
            .GreaterThan(0)
            .LessThanOrEqualTo(24)
            .WithMessage("Minimum excuse duration must be between 0 and 24 hours");

        RuleFor(x => x.MaxRetroactiveDays)
            .GreaterThanOrEqualTo(0)
            .LessThanOrEqualTo(365)
            .WithMessage("Maximum retroactive days must be between 0 and 365");

        // Business rule validations
        RuleFor(x => x)
            .Must(HaveValidDailyVsMonthlyLimits)
            .WithMessage("Daily excuse hours limit cannot exceed monthly limit")
            .WithName("DailyVsMonthlyLimits");

        RuleFor(x => x)
            .Must(HaveValidSingleVsDailyLimits)
            .WithMessage("Maximum hours per excuse cannot exceed daily limit")
            .WithName("SingleVsDailyLimits");

        RuleFor(x => x)
            .Must(HaveValidMinimumVsMaximumDuration)
            .WithMessage("Minimum excuse duration cannot exceed maximum hours per excuse")
            .WithName("MinimumVsMaximumDuration");
    }

    private static bool HaveValidDailyVsMonthlyLimits(UpdateExcusePolicyCommand command)
    {
        return command.MaxPersonalExcuseHoursPerDay <= command.MaxPersonalExcuseHoursPerMonth;
    }

    private static bool HaveValidSingleVsDailyLimits(UpdateExcusePolicyCommand command)
    {
        return command.MaxHoursPerExcuse <= command.MaxPersonalExcuseHoursPerDay;
    }

    private static bool HaveValidMinimumVsMaximumDuration(UpdateExcusePolicyCommand command)
    {
        return command.MinimumExcuseDuration <= command.MaxHoursPerExcuse;
    }
}