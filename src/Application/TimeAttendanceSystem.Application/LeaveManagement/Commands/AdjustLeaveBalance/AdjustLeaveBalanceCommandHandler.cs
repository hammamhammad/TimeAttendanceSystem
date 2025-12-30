using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.AdjustLeaveBalance;

/// <summary>
/// Command handler for manually adjusting employee leave balances.
/// Implements administrative balance corrections with full audit trail.
/// </summary>
public class AdjustLeaveBalanceCommandHandler : BaseHandler<AdjustLeaveBalanceCommand, Result<bool>>
{
    private readonly ILeaveAccrualService _leaveAccrualService;
    private readonly ILogger<AdjustLeaveBalanceCommandHandler> _logger;

    public AdjustLeaveBalanceCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILeaveAccrualService leaveAccrualService,
        ILogger<AdjustLeaveBalanceCommandHandler> logger)
        : base(context, currentUser)
    {
        _leaveAccrualService = leaveAccrualService;
        _logger = logger;
    }

    public override async Task<Result<bool>> Handle(AdjustLeaveBalanceCommand request, CancellationToken cancellationToken)
    {
        // Validate employee exists and is active
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
            return Result.Failure<bool>("Employee does not exist.");

        if (employee.EmploymentStatus != Domain.Common.EmploymentStatus.Active)
            return Result.Failure<bool>("Cannot adjust balance for inactive employee.");

        // Enforce branch-scoped access control
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<bool>("Access denied to this employee's branch.");

        // Validate vacation type exists and is active
        var vacationType = await Context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.Id == request.VacationTypeId, cancellationToken);

        if (vacationType == null)
            return Result.Failure<bool>("Vacation type does not exist.");

        if (!vacationType.IsActive)
            return Result.Failure<bool>("Cannot adjust balance for inactive vacation type.");

        // Call the service to perform the adjustment
        var result = await _leaveAccrualService.AdjustLeaveBalanceAsync(
            request.EmployeeId,
            request.VacationTypeId,
            request.AdjustmentDays,
            request.Reason,
            request.Year,
            CurrentUser.Username ?? "System",
            cancellationToken);

        if (!result.IsSuccess)
        {
            _logger.LogError(
                "Failed to adjust leave balance for Employee {EmployeeId}, VacationType {VacationTypeId}, Year {Year}: {Error}",
                request.EmployeeId, request.VacationTypeId, request.Year, result.Error);
            return Result.Failure<bool>(result.Error);
        }

        _logger.LogInformation(
            "Successfully adjusted leave balance for Employee {EmployeeId}, VacationType {VacationTypeId}, Year {Year} by {AdjustmentDays} days. Reason: {Reason}",
            request.EmployeeId, request.VacationTypeId, request.Year, request.AdjustmentDays, request.Reason);

        return Result.Success(true);
    }
}
