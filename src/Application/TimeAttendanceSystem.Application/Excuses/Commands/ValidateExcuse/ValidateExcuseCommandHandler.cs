using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ValidateExcuse;

/// <summary>
/// Command handler for validating excuse creation parameters.
/// Implements comprehensive validation against policies and business rules.
/// </summary>
public class ValidateExcuseCommandHandler : IRequestHandler<ValidateExcuseCommand, Result<ExcuseValidationDto>>
{
    private readonly IApplicationDbContext _context;

    public ValidateExcuseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the validation of excuse parameters against policies and business rules.
    /// </summary>
    /// <param name="request">Command containing excuse parameters to validate</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing validation details and any errors or warnings</returns>
    public async Task<Result<ExcuseValidationDto>> Handle(ValidateExcuseCommand request, CancellationToken cancellationToken)
    {
        var validationResult = new ExcuseValidationDto();
        var errors = new List<string>();
        var warnings = new List<string>();

        // Validate time format first
        try
        {
            var _ = request.StartTimeValue;
            var __ = request.EndTimeValue;
        }
        catch (ArgumentException ex)
        {
            errors.Add(ex.Message);
            validationResult.ValidationErrors = errors;
            return Result.Success(validationResult);
        }

        // Validate employee exists and is active
        var employee = await _context.Employees
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
        {
            errors.Add("Employee not found");
            validationResult.ValidationErrors = errors;
            return Result.Success(validationResult);
        }

        // Get applicable excuse policy - only for personal excuses
        ExcusePolicy? policy = null;
        if (request.ExcuseType == ExcuseType.PersonalExcuse)
        {
            policy = await _context.ExcusePolicies
                .Where(ep => ep.IsActive && (ep.BranchId == employee.BranchId || ep.BranchId == null))
                .OrderBy(ep => ep.BranchId.HasValue ? 0 : 1) // Prefer branch-specific over organization-wide
                .FirstOrDefaultAsync(cancellationToken);

            // Only require policy for personal excuses
            if (policy == null)
            {
                errors.Add("No active excuse policy found for personal excuses");
                validationResult.ValidationErrors = errors;
                return Result.Success(validationResult);
            }
        }

        // Calculate duration
        var duration = (decimal)(request.EndTimeValue.ToTimeSpan() - request.StartTimeValue.ToTimeSpan()).TotalHours;
        if (duration <= 0)
        {
            errors.Add("End time must be after start time");
        }

        validationResult.DurationHours = duration;
        validationResult.RequiresApproval = policy?.RequiresApproval == true && request.ExcuseType == ExcuseType.PersonalExcuse;

        // Validate duration against policy limits (only for personal excuses with policy)
        if (request.ExcuseType == ExcuseType.PersonalExcuse && policy != null)
        {
            if (duration < policy.MinimumExcuseDuration)
            {
                errors.Add($"Excuse duration must be at least {policy.MinimumExcuseDuration} hours");
            }

            if (duration > policy.MaxHoursPerExcuse)
            {
                errors.Add($"Excuse duration cannot exceed {policy.MaxHoursPerExcuse} hours per excuse");
            }

            // Check retroactive limit
            var daysDifference = (DateTime.Today - request.ExcuseDate.Date).Days;
            if (daysDifference > policy.MaxRetroactiveDays)
            {
                errors.Add($"Cannot create excuses more than {policy.MaxRetroactiveDays} days in the past");
            }

            // Check monthly limits
            var monthStart = new DateTime(request.ExcuseDate.Year, request.ExcuseDate.Month, 1);
            var monthEnd = monthStart.AddMonths(1).AddDays(-1);

            var monthlyExcuses = await _context.EmployeeExcuses
                .Where(ee => ee.EmployeeId == request.EmployeeId &&
                            ee.ExcuseType == ExcuseType.PersonalExcuse &&
                            ee.ExcuseDate >= monthStart &&
                            ee.ExcuseDate <= monthEnd &&
                            ee.ApprovalStatus != ApprovalStatus.Rejected)
                .ToListAsync(cancellationToken);

            var currentMonthlyCount = monthlyExcuses.Count;
            var currentMonthlyHours = monthlyExcuses.Sum(e => e.DurationHours);

            if (currentMonthlyCount >= policy.MaxPersonalExcusesPerMonth)
            {
                errors.Add($"Monthly excuse limit of {policy.MaxPersonalExcusesPerMonth} excuses already reached");
            }

            if (currentMonthlyHours + duration > policy.MaxPersonalExcuseHoursPerMonth)
            {
                errors.Add($"Monthly excuse hours limit of {policy.MaxPersonalExcuseHoursPerMonth} hours would be exceeded");
            }

            // Check daily limits
            var dailyExcuses = await _context.EmployeeExcuses
                .Where(ee => ee.EmployeeId == request.EmployeeId &&
                            ee.ExcuseType == ExcuseType.PersonalExcuse &&
                            ee.ExcuseDate.Date == request.ExcuseDate.Date &&
                            ee.ApprovalStatus != ApprovalStatus.Rejected)
                .ToListAsync(cancellationToken);

            var currentDailyHours = dailyExcuses.Sum(e => e.DurationHours);

            if (currentDailyHours + duration > policy.MaxPersonalExcuseHoursPerDay)
            {
                errors.Add($"Daily excuse hours limit of {policy.MaxPersonalExcuseHoursPerDay} hours would be exceeded");
            }

            // Check for overlapping excuses
            var overlappingExcuses = dailyExcuses
                .Where(e => (request.StartTimeValue < e.EndTime && request.EndTimeValue > e.StartTime))
                .ToList();

            if (overlappingExcuses.Any())
            {
                errors.Add("Excuse time overlaps with existing excuse on the same date");
            }

            // Add warnings for approaching limits
            if (currentMonthlyCount + 1 >= policy.MaxPersonalExcusesPerMonth * 0.8m)
            {
                warnings.Add($"Approaching monthly excuse limit ({currentMonthlyCount + 1}/{policy.MaxPersonalExcusesPerMonth})");
            }

            if (currentMonthlyHours + duration >= policy.MaxPersonalExcuseHoursPerMonth * 0.8m)
            {
                warnings.Add($"Approaching monthly hours limit ({currentMonthlyHours + duration:F1}/{policy.MaxPersonalExcuseHoursPerMonth})");
            }
        }

        validationResult.IsValid = !errors.Any();
        validationResult.ValidationErrors = errors;
        validationResult.PolicyWarnings = warnings;

        return Result.Success(validationResult);
    }
}