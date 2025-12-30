using FluentValidation;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.AdjustLeaveBalance;

/// <summary>
/// FluentValidation validator for AdjustLeaveBalanceCommand ensuring valid balance adjustment parameters.
/// </summary>
public class AdjustLeaveBalanceCommandValidator : AbstractValidator<AdjustLeaveBalanceCommand>
{
    public AdjustLeaveBalanceCommandValidator()
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

        // Adjustment days validation
        RuleFor(x => x.AdjustmentDays)
            .NotEqual(0)
            .WithMessage("Adjustment days cannot be zero")
            .GreaterThan(-1000)
            .WithMessage("Adjustment days cannot be less than -1000")
            .LessThan(1000)
            .WithMessage("Adjustment days cannot exceed 1000");

        // Reason validation - must be meaningful
        RuleFor(x => x.Reason)
            .NotEmpty()
            .WithMessage("Reason is required for balance adjustment")
            .MinimumLength(10)
            .WithMessage("Reason must be at least 10 characters to ensure proper documentation")
            .MaximumLength(500)
            .WithMessage("Reason cannot exceed 500 characters");
    }
}
