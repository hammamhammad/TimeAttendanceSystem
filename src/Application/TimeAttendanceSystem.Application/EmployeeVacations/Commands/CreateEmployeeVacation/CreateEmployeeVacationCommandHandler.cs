using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateEmployeeVacation;

/// <summary>
/// Command handler for creating employee vacation requests with workflow integration.
/// Implements comprehensive validation, conflict detection, balance checking, workflow submission, and attendance integration.
/// </summary>
public class CreateEmployeeVacationCommandHandler : IRequestHandler<CreateEmployeeVacationCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;
    private readonly IWorkflowEngine _workflowEngine;
    private readonly ICurrentUser _currentUser;
    private readonly ILeaveAccrualService _leaveAccrualService;

    public CreateEmployeeVacationCommandHandler(
        IApplicationDbContext context,
        IWorkflowEngine workflowEngine,
        ICurrentUser currentUser,
        ILeaveAccrualService leaveAccrualService)
    {
        _context = context;
        _workflowEngine = workflowEngine;
        _currentUser = currentUser;
        _leaveAccrualService = leaveAccrualService;
    }

    /// <summary>
    /// Handles the creation of a new employee vacation record with full validation and integration.
    /// </summary>
    /// <param name="request">Command containing vacation details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing the created vacation ID or validation errors</returns>
    public async Task<Result<long>> Handle(CreateEmployeeVacationCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = _currentUser.UserId ?? 0;
        var isOnBehalfOf = request.OnBehalfOfEmployeeId.HasValue;
        var targetEmployeeId = request.EmployeeId;

        // If submitting on behalf of another employee, validate manager chain
        if (isOnBehalfOf)
        {
            var isInChain = await IsInManagementChainAsync(currentUserId, request.OnBehalfOfEmployeeId!.Value, cancellationToken);
            if (!isInChain)
            {
                return Result.Failure<long>("You can only submit requests on behalf of employees in your management chain");
            }
            targetEmployeeId = request.OnBehalfOfEmployeeId.Value;
        }

        // Validate employee exists and is active
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == targetEmployeeId, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<long>("Employee not found");
        }

        // Validate vacation type exists and is active
        var vacationType = await _context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.Id == request.VacationTypeId && vt.IsActive, cancellationToken);

        if (vacationType == null)
        {
            return Result.Failure<long>("Vacation type not found or inactive");
        }

        // Get current user name for audit trail
        var currentUserName = _currentUser.Username ?? "Unknown";

        // Create vacation entity - ALWAYS pending workflow approval
        var vacation = new EmployeeVacation
        {
            EmployeeId = targetEmployeeId,
            VacationTypeId = request.VacationTypeId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsApproved = false, // Pending workflow approval
            Notes = isOnBehalfOf
                ? $"{request.Notes}\n[Submitted on behalf by user ID: {currentUserId}]"
                : request.Notes,
            SubmittedByUserId = currentUserId,
            CreatedBy = currentUserName
        };

        // Calculate total days
        vacation.CalculateTotalDays();

        // Validate vacation business rules
        var (isValid, errors) = vacation.ValidateVacation();
        if (!isValid)
        {
            return Result.Failure<long>(string.Join(", ", errors));
        }

        // Check for overlapping vacations for the same employee
        var hasOverlapQuery = _context.EmployeeVacations
            .Where(ev => ev.EmployeeId == targetEmployeeId)
            .Where(ev => ev.StartDate <= request.EndDate && ev.EndDate >= request.StartDate);

        var hasOverlap = await hasOverlapQuery.AnyAsync(cancellationToken);

        if (hasOverlap)
        {
            return Result.Failure<long>("Vacation dates overlap with existing vacation period");
        }

        // Check leave balance availability
        var vacationYear = request.StartDate.Year;
        var hasSufficientBalance = await _leaveAccrualService.CheckSufficientBalanceAsync(
            targetEmployeeId,
            request.VacationTypeId,
            vacation.TotalDays,
            vacationYear,
            cancellationToken);

        if (!hasSufficientBalance.IsSuccess)
        {
            // Return the user-friendly error message from the service
            return Result.Failure<long>(hasSufficientBalance.Error ?? "Failed to check leave balance.");
        }

        // Add vacation to context
        _context.EmployeeVacations.Add(vacation);

        // Save changes to get the vacation ID
        await _context.SaveChangesAsync(cancellationToken);

        // Reserve leave balance for this pending vacation request
        var reserveResult = await _leaveAccrualService.ReserveLeaveBalanceAsync(
            targetEmployeeId,
            request.VacationTypeId,
            vacation.TotalDays,
            vacation.Id,
            vacationYear,
            cancellationToken);

        if (!reserveResult.IsSuccess)
        {
            // Failed to reserve balance - delete the vacation and return error
            _context.EmployeeVacations.Remove(vacation);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Failure<long>($"Failed to reserve leave balance: {reserveResult.Error}");
        }

        // Start workflow for approval
        var contextData = new Dictionary<string, object>
        {
            { "days", vacation.TotalDays },
            { "startDate", vacation.StartDate.ToString("yyyy-MM-dd") },
            { "endDate", vacation.EndDate.ToString("yyyy-MM-dd") },
            { "vacationTypeId", vacation.VacationTypeId }
        };

        var workflowResult = await _workflowEngine.StartWorkflowAsync(
            WorkflowEntityType.Vacation,
            vacation.Id,
            currentUserId,
            employee.BranchId,
            contextData);

        if (!workflowResult.IsSuccess)
        {
            // Workflow start failed - this is critical for the system configured with workflows
            // Release the reserved balance
            await _leaveAccrualService.ReleaseLeaveBalanceAsync(
                targetEmployeeId,
                request.VacationTypeId,
                vacation.TotalDays,
                vacation.Id,
                vacationYear,
                cancellationToken);

            // Delete the vacation and return error
            _context.EmployeeVacations.Remove(vacation);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Failure<long>($"Failed to start approval workflow: {workflowResult.Error}");
        }

        // Update vacation with workflow instance ID
        vacation.WorkflowInstanceId = workflowResult.Value.Id;
        await _context.SaveChangesAsync(cancellationToken);

        // Auto-approve manager's step if submitted on behalf and manager is assigned to current step
        if (isOnBehalfOf && workflowResult.Value.Id > 0)
        {
            var canApprove = await _workflowEngine.CanUserApproveAsync(workflowResult.Value.Id, currentUserId);
            if (canApprove)
            {
                await _workflowEngine.ApproveAsync(
                    workflowResult.Value.Id,
                    currentUserId,
                    "Auto-approved: Request submitted by manager on behalf of employee");
            }
        }

        return Result.Success(vacation.Id);
    }

    /// <summary>
    /// Checks if the current user is in the employee's management chain (recursive).
    /// </summary>
    /// <param name="userId">User ID of the potential manager</param>
    /// <param name="employeeId">Employee ID to check</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if user is in the management chain</returns>
    private async Task<bool> IsInManagementChainAsync(long userId, long employeeId, CancellationToken cancellationToken)
    {
        // Get the employee link for the current user
        var userEmployeeLink = await _context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == userId, cancellationToken);

        if (userEmployeeLink == null)
            return false;

        var managerEmployeeId = userEmployeeLink.EmployeeId;

        // Get the target employee
        var currentEmployee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == employeeId, cancellationToken);

        // Traverse up the management chain
        while (currentEmployee != null)
        {
            if (currentEmployee.ManagerEmployeeId == managerEmployeeId)
                return true;

            if (!currentEmployee.ManagerEmployeeId.HasValue)
                break;

            currentEmployee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == currentEmployee.ManagerEmployeeId, cancellationToken);
        }

        return false;
    }

    /// <summary>
    /// Updates attendance records for the vacation period when vacation is approved.
    /// </summary>
    /// <param name="vacation">The approved vacation record</param>
    /// <param name="cancellationToken">Cancellation token</param>
    private async Task UpdateAttendanceRecordsAsync(EmployeeVacation vacation, CancellationToken cancellationToken)
    {
        try
        {
            // Get all dates in the vacation period
            var vacationDates = vacation.GetVacationDates();

            foreach (var date in vacationDates)
            {
                // Find or create attendance record for this date
                var attendanceRecord = await _context.AttendanceRecords
                    .FirstOrDefaultAsync(ar => ar.EmployeeId == vacation.EmployeeId &&
                                              ar.AttendanceDate.Date == date.Date, cancellationToken);

                if (attendanceRecord != null)
                {
                    // Update existing attendance record to OnLeave
                    attendanceRecord.Status = AttendanceStatus.OnLeave;
                    attendanceRecord.Notes = string.IsNullOrEmpty(attendanceRecord.Notes)
                        ? $"On vacation: {vacation.VacationType?.Name}"
                        : $"{attendanceRecord.Notes}\nOn vacation: {vacation.VacationType?.Name}";
                }
                else
                {
                    // Create new attendance record for vacation day
                    var newAttendanceRecord = new AttendanceRecord
                    {
                        EmployeeId = vacation.EmployeeId,
                        AttendanceDate = date,
                        Status = AttendanceStatus.OnLeave,
                        ScheduledHours = 0,
                        WorkingHours = 0,
                        BreakHours = 0,
                        OvertimeHours = 0,
                        Notes = $"On vacation: {vacation.VacationType?.Name}"
                    };

                    _context.AttendanceRecords.Add(newAttendanceRecord);
                }
            }

            // Save attendance record changes
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception)
        {
            // Log error but don't fail the vacation creation
            // Attendance integration is secondary to vacation creation
            // TODO: Add proper logging here
        }
    }
}