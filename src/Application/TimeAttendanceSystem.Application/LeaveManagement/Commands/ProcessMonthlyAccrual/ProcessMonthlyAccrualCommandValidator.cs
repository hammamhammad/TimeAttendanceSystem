using FluentValidation;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.ProcessMonthlyAccrual;

/// <summary>
/// FluentValidation validator for ProcessMonthlyAccrualCommand ensuring valid accrual processing parameters.
/// </summary>
public class ProcessMonthlyAccrualCommandValidator : AbstractValidator<ProcessMonthlyAccrualCommand>
{
    public ProcessMonthlyAccrualCommandValidator()
    {
        // Year validation
        RuleFor(x => x.Year)
            .InclusiveBetween(2000, 2100)
            .WithMessage("Year must be between 2000 and 2100");

        // Month validation
        RuleFor(x => x.Month)
            .InclusiveBetween(1, 12)
            .WithMessage("Month must be between 1 and 12");

        // Don't allow future accrual processing
        RuleFor(x => x)
            .Must(x =>
            {
                var targetDate = new DateTime(x.Year, x.Month, 1);
                var today = DateTime.Today;
                // Allow processing current month or past months
                return targetDate <= new DateTime(today.Year, today.Month, 1);
            })
            .WithMessage("Cannot process accrual for future months");

        // Employee ID validation
        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be a valid positive number")
            .When(x => x.EmployeeId.HasValue);
    }
}
