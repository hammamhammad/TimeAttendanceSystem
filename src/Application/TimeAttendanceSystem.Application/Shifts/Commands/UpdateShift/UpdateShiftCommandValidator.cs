using FluentValidation;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.Shifts.Commands.UpdateShift;

/// <summary>
/// FluentValidation validator for UpdateShiftCommand ensuring comprehensive shift data validation.
/// Implements business rules from shift management requirements with security-focused validation.
/// </summary>
public class UpdateShiftCommandValidator : AbstractValidator<UpdateShiftCommand>
{
    public UpdateShiftCommandValidator()
    {
        // ID validation: Required for update operations
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Shift ID must be a valid positive number");

        // Name validation: Required and unique per branch
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Shift name is required")
            .MaximumLength(200)
            .WithMessage("Shift name cannot exceed 200 characters");

        // Description validation: Optional with length limit
        RuleFor(x => x.Description)
            .MaximumLength(1000)
            .WithMessage("Description cannot exceed 1000 characters")
            .When(x => !string.IsNullOrEmpty(x.Description));


        // Shift type validation
        RuleFor(x => x.ShiftType)
            .IsInEnum()
            .WithMessage("Invalid shift type");

        // Hours-only shift validation
        RuleFor(x => x.RequiredHours)
            .GreaterThan(0)
            .WithMessage("Required hours must be greater than 0")
            .LessThanOrEqualTo(24)
            .WithMessage("Required hours cannot exceed 24 hours per day")
            .When(x => x.ShiftType == ShiftType.HoursOnly);

        RuleFor(x => x.RequiredHours)
            .Null()
            .WithMessage("Required hours should not be set for time-based shifts")
            .When(x => x.ShiftType == ShiftType.TimeBased);

        // Flexible hours validation: Only valid for time-based shifts
        RuleFor(x => x.AllowFlexibleHours)
            .Equal(false)
            .WithMessage("Flexible hours are not valid for hours-only shifts")
            .When(x => x.ShiftType == ShiftType.HoursOnly);

        RuleFor(x => x.FlexMinutesBefore)
            .Null()
            .WithMessage("Flex minutes before should not be set when flexible hours are not allowed")
            .When(x => !x.AllowFlexibleHours);

        RuleFor(x => x.FlexMinutesBefore)
            .GreaterThan(0)
            .WithMessage("Flex minutes before must be greater than 0")
            .LessThanOrEqualTo(480)
            .WithMessage("Flex minutes before cannot exceed 8 hours (480 minutes)")
            .When(x => x.AllowFlexibleHours && x.FlexMinutesBefore.HasValue);

        RuleFor(x => x.FlexMinutesAfter)
            .Null()
            .WithMessage("Flex minutes after should not be set when flexible hours are not allowed")
            .When(x => !x.AllowFlexibleHours);

        RuleFor(x => x.FlexMinutesAfter)
            .GreaterThan(0)
            .WithMessage("Flex minutes after must be greater than 0")
            .LessThanOrEqualTo(480)
            .WithMessage("Flex minutes after cannot exceed 8 hours (480 minutes)")
            .When(x => x.AllowFlexibleHours && x.FlexMinutesAfter.HasValue);

        // Grace period validation: Only valid for time-based shifts, can be combined with flexible hours
        RuleFor(x => x.GracePeriodMinutes)
            .Null()
            .WithMessage("Grace period is not valid for hours-only shifts")
            .When(x => x.ShiftType == ShiftType.HoursOnly);

        RuleFor(x => x.GracePeriodMinutes)
            .GreaterThan(0)
            .WithMessage("Grace period must be greater than 0")
            .LessThanOrEqualTo(120)
            .WithMessage("Grace period cannot exceed 2 hours (120 minutes)")
            .When(x => x.ShiftType == ShiftType.TimeBased && x.GracePeriodMinutes.HasValue);

        // Shift periods validation
        RuleFor(x => x.ShiftPeriods)
            .NotEmpty()
            .WithMessage("Time-based shifts must have at least one shift period")
            .When(x => x.ShiftType == ShiftType.TimeBased);

        RuleFor(x => x.ShiftPeriods)
            .Must(periods => periods == null || periods.Count <= 2)
            .WithMessage("Shifts can have at most two periods per day")
            .When(x => x.ShiftPeriods != null);

        RuleFor(x => x.ShiftPeriods)
            .Null()
            .WithMessage("Hours-only shifts should not have shift periods")
            .When(x => x.ShiftType == ShiftType.HoursOnly);

        // Individual shift period validation
        RuleForEach(x => x.ShiftPeriods)
            .SetValidator(new UpdateShiftPeriodCommandValidator())
            .When(x => x.ShiftPeriods != null);

        // Check-in/check-out validation
        RuleFor(x => new { x.IsCheckInRequired, x.IsAutoCheckOut })
            .Must(x => x.IsCheckInRequired || x.IsAutoCheckOut)
            .WithMessage("Either check-in must be required or auto check-out must be enabled");
    }
}

/// <summary>
/// Validator for individual shift periods during update.
/// </summary>
public class UpdateShiftPeriodCommandValidator : AbstractValidator<UpdateShiftPeriodCommand>
{
    public UpdateShiftPeriodCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0)
            .WithMessage("Shift period ID must be a valid positive number")
            .When(x => x.Id.HasValue);

        RuleFor(x => x.PeriodOrder)
            .GreaterThan(0)
            .WithMessage("Period order must be greater than 0")
            .LessThanOrEqualTo(2)
            .WithMessage("Period order cannot exceed 2");

        RuleFor(x => x.StartTime)
            .NotEmpty()
            .WithMessage("Start time is required");

        RuleFor(x => x.EndTime)
            .NotEmpty()
            .WithMessage("End time is required");
    }
}