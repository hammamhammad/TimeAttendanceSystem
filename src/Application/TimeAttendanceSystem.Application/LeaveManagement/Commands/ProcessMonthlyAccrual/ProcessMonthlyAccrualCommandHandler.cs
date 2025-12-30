using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.ProcessMonthlyAccrual;

/// <summary>
/// Command handler for processing monthly leave accrual for employees.
/// Orchestrates the accrual process using LeaveAccrualService.
/// </summary>
public class ProcessMonthlyAccrualCommandHandler : BaseHandler<ProcessMonthlyAccrualCommand, Result<int>>
{
    private readonly ILeaveAccrualService _leaveAccrualService;
    private readonly ILogger<ProcessMonthlyAccrualCommandHandler> _logger;

    public ProcessMonthlyAccrualCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILeaveAccrualService leaveAccrualService,
        ILogger<ProcessMonthlyAccrualCommandHandler> logger)
        : base(context, currentUser)
    {
        _leaveAccrualService = leaveAccrualService;
        _logger = logger;
    }

    public override async Task<Result<int>> Handle(ProcessMonthlyAccrualCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "Starting monthly accrual processing for Year {Year}, Month {Month}, EmployeeId {EmployeeId}",
            request.Year, request.Month, request.EmployeeId?.ToString() ?? "ALL");

        int processedCount;

        if (request.EmployeeId.HasValue)
        {
            // Process specific employee
            var employee = await Context.Employees
                .FirstOrDefaultAsync(e => e.Id == request.EmployeeId.Value, cancellationToken);

            if (employee == null)
                return Result.Failure<int>("Employee does not exist.");

            if (employee.EmploymentStatus != Domain.Common.EmploymentStatus.Active)
                return Result.Failure<int>("Cannot process accrual for inactive employee.");

            // Enforce branch-scoped access control for manual processing
            if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
                return Result.Failure<int>("Access denied to this employee's branch.");

            var result = await _leaveAccrualService.ProcessMonthlyAccrualForEmployeeAsync(
                request.EmployeeId.Value,
                request.Year,
                request.Month,
                cancellationToken);

            if (!result.IsSuccess)
            {
                _logger.LogError(
                    "Failed to process monthly accrual for Employee {EmployeeId}: {Error}",
                    request.EmployeeId.Value, result.Error);
                return Result.Failure<int>(result.Error);
            }

            processedCount = 1;
            _logger.LogInformation(
                "Successfully processed monthly accrual for Employee {EmployeeId}",
                request.EmployeeId.Value);
        }
        else
        {
            // Process all employees
            // Note: System-level operation, typically executed by background job
            var result = await _leaveAccrualService.ProcessMonthlyAccrualForAllEmployeesAsync(
                request.Year,
                request.Month,
                cancellationToken);

            if (!result.IsSuccess)
            {
                _logger.LogError(
                    "Failed to process monthly accrual for all employees: {Error}",
                    result.Error);
                return Result.Failure<int>(result.Error);
            }

            processedCount = result.Value;
            _logger.LogInformation(
                "Successfully processed monthly accrual for {Count} employees",
                processedCount);
        }

        return Result.Success(processedCount);
    }
}
