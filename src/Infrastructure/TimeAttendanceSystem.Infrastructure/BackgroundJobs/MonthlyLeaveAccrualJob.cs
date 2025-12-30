using Coravel.Invocable;
using MediatR;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.LeaveManagement.Commands.ProcessMonthlyAccrual;

namespace TimeAttendanceSystem.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that runs monthly to process leave accrual for all employees.
/// Implements Coravel's IInvocable interface for scheduled execution.
/// </summary>
/// <remarks>
/// Job Responsibilities:
/// - Automatically processes monthly leave accrual on the first day of each month
/// - Calculates accrual amounts based on entitlements and policies
/// - Applies proration for mid-year hires
/// - Creates transaction records for audit trail
/// - Handles errors gracefully with comprehensive logging
///
/// Scheduling:
/// - Recommended: Run on 1st of each month at 1:00 AM
/// - Processes accrual for the previous month
/// - Can be manually triggered via API if needed
///
/// Business Rules:
/// - Only processes employees with active entitlements
/// - Respects leave accrual policies (monthly vs upfront)
/// - Prorates for mid-year hires based on policy
/// - Respects minimum service months requirements
/// - Does not exceed entitled annual days
///
/// Error Handling:
/// - Logs individual employee processing failures
/// - Continues processing remaining employees on error
/// - Provides summary statistics in logs
/// - Re-throws fatal errors for Coravel error handling
/// </remarks>
public class MonthlyLeaveAccrualJob : IInvocable
{
    private readonly IMediator _mediator;
    private readonly ILogger<MonthlyLeaveAccrualJob> _logger;

    public MonthlyLeaveAccrualJob(
        IMediator mediator,
        ILogger<MonthlyLeaveAccrualJob> logger)
    {
        _mediator = mediator;
        _logger = logger;
    }

    public async Task Invoke()
    {
        var now = DateTime.UtcNow;
        // Process accrual for the previous month
        // (Job runs on 1st of current month, processes previous month)
        var targetDate = now.AddMonths(-1);
        var year = targetDate.Year;
        var month = targetDate.Month;

        _logger.LogInformation(
            "Starting monthly leave accrual job at {Time} for {Year}-{Month:D2}",
            now, year, month);

        try
        {
            var command = new ProcessMonthlyAccrualCommand(year, month, null);
            var result = await _mediator.Send(command);

            if (result.IsSuccess)
            {
                _logger.LogInformation(
                    "Monthly leave accrual completed successfully for {Year}-{Month:D2}. " +
                    "Processed {Count} employee(s)",
                    year, month, result.Value);
            }
            else
            {
                _logger.LogWarning(
                    "Monthly leave accrual completed with errors for {Year}-{Month:D2}. " +
                    "Error: {Error}",
                    year, month, result.Error);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Fatal error during monthly leave accrual job for {Year}-{Month:D2}",
                year, month);
            throw; // Re-throw to let Coravel handle the error
        }
    }
}
