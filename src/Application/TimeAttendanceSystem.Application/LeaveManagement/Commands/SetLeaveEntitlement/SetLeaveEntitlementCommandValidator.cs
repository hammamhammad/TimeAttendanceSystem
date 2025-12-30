using FluentValidation;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.SetLeaveEntitlement;

/// <summary>
/// FluentValidation validator for SetLeaveEntitlementCommand ensuring comprehensive leave entitlement validation.
/// Implements extensive input validation for leave configuration with business rule enforcement,
/// date range validation, and data integrity checks for leave management operations.
/// </summary>
public class SetLeaveEntitlementCommandValidator : AbstractValidator<SetLeaveEntitlementCommand>
{
    public SetLeaveEntitlementCommandValidator()
    {
        // Employee ID validation
        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be a valid positive number");

        // Vacation Type ID validation
        RuleFor(x => x.VacationTypeId)
            .GreaterThan(0)
            .WithMessage("Vacation Type ID must be a valid positive number");

        // Year validation
        RuleFor(x => x.Year)
            .InclusiveBetween(2000, 2100)
            .WithMessage("Year must be between 2000 and 2100");

        // Annual days validation
        RuleFor(x => x.AnnualDays)
            .GreaterThan(0)
            .WithMessage("Annual days must be greater than 0")
            .LessThanOrEqualTo(365)
            .WithMessage("Annual days cannot exceed 365");

        // Carry-over days validation
        RuleFor(x => x.CarryOverDays)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Carry-over days cannot be negative")
            .LessThanOrEqualTo(365)
            .WithMessage("Carry-over days cannot exceed 365");

        // Max carry-over days validation
        RuleFor(x => x.MaxCarryOverDays)
            .GreaterThanOrEqualTo(x => x.CarryOverDays)
            .WithMessage("Maximum carry-over days must be greater than or equal to carry-over days")
            .LessThanOrEqualTo(365)
            .WithMessage("Maximum carry-over days cannot exceed 365")
            .When(x => x.MaxCarryOverDays.HasValue);

        // Effective start date validation
        RuleFor(x => x.EffectiveStartDate)
            .Must((command, startDate) => startDate!.Value.Year == command.Year)
            .WithMessage("Effective start date must be within the entitlement year")
            .When(x => x.EffectiveStartDate.HasValue);

        // Effective end date validation
        RuleFor(x => x.EffectiveEndDate)
            .Must((command, endDate) => endDate!.Value.Year == command.Year)
            .WithMessage("Effective end date must be within the entitlement year")
            .GreaterThanOrEqualTo(x => x.EffectiveStartDate!.Value)
            .WithMessage("Effective end date must be greater than or equal to effective start date")
            .When(x => x.EffectiveEndDate.HasValue && x.EffectiveStartDate.HasValue);

        // Notes validation
        RuleFor(x => x.Notes)
            .MaximumLength(500)
            .WithMessage("Notes cannot exceed 500 characters")
            .When(x => !string.IsNullOrEmpty(x.Notes));
    }
}
