using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Extensions;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Commands.ApproveStep;

/// <summary>
/// Handler for ApproveStepCommand.
/// Approves a workflow step and updates the related entity status if workflow completes.
/// Integrates with leave balance management for vacation approvals.
/// Integrates with attendance recalculation for excuse approvals.
/// </summary>
public class ApproveStepCommandHandler : IRequestHandler<ApproveStepCommand, Result<bool>>
{
    private readonly IWorkflowEngine _workflowEngine;
    private readonly IApplicationDbContext _context;
    private readonly ILeaveAccrualService _leaveAccrualService;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly IAttendanceTransactionRepository _transactionRepository;

    public ApproveStepCommandHandler(
        IWorkflowEngine workflowEngine,
        IApplicationDbContext context,
        ILeaveAccrualService leaveAccrualService,
        IAttendanceCalculationService calculationService,
        IAttendanceTransactionRepository transactionRepository)
    {
        _workflowEngine = workflowEngine;
        _context = context;
        _leaveAccrualService = leaveAccrualService;
        _calculationService = calculationService;
        _transactionRepository = transactionRepository;
    }

    public async Task<Result<bool>> Handle(ApproveStepCommand request, CancellationToken cancellationToken)
    {
        var result = await _workflowEngine.ApproveAsync(
            request.WorkflowInstanceId,
            request.UserId,
            request.Comments);

        if (!result.IsSuccess)
        {
            return Result.Failure<bool>(result.Error ?? "Failed to approve. User may not have permission or workflow is not in correct state.");
        }

        // Check if workflow has completed and update entity status
        await UpdateEntityStatusIfWorkflowCompleteAsync(request.WorkflowInstanceId, cancellationToken);

        return Result.Success(true);
    }

    /// <summary>
    /// Updates the related entity status if the workflow has completed.
    /// </summary>
    private async Task UpdateEntityStatusIfWorkflowCompleteAsync(long workflowInstanceId, CancellationToken cancellationToken)
    {
        // Reload workflow instance to check if it's complete
        var workflowInstance = await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition)
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId, cancellationToken);

        if (workflowInstance == null ||
            (workflowInstance.Status != WorkflowStatus.Approved && workflowInstance.Status != WorkflowStatus.Rejected))
        {
            return; // Workflow not complete yet
        }

        // Update entity status based on workflow outcome and entity type
        switch (workflowInstance.EntityType)
        {
            case WorkflowEntityType.Vacation:
                await UpdateVacationStatusAsync(workflowInstance, cancellationToken);
                break;

            case WorkflowEntityType.Excuse:
                await UpdateExcuseStatusAsync(workflowInstance, cancellationToken);
                break;

            case WorkflowEntityType.RemoteWork:
                await UpdateRemoteWorkStatusAsync(workflowInstance, cancellationToken);
                break;

            // Other entity types can be added here
        }
    }

    private async Task UpdateVacationStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var vacation = await _context.EmployeeVacations
            .Include(v => v.Employee)
            .FirstOrDefaultAsync(v => v.Id == workflowInstance.EntityId, cancellationToken);

        if (vacation == null) return;

        var vacationYear = vacation.StartDate.Year;

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            vacation.IsApproved = true;
            await _context.SaveChangesAsync(cancellationToken);

            // Confirm leave usage - converts pending balance to used balance
            await _leaveAccrualService.ConfirmLeaveUsageAsync(
                vacation.EmployeeId,
                vacation.VacationTypeId,
                vacation.TotalDays,
                vacation.Id,
                vacationYear,
                cancellationToken);

            // Update attendance records to OnLeave status for the vacation period
            await UpdateAttendanceForVacationPeriodAsync(
                vacation.EmployeeId,
                vacation.StartDate,
                vacation.EndDate,
                cancellationToken);
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            vacation.IsApproved = false;
            await _context.SaveChangesAsync(cancellationToken);

            // Release reserved balance - returns pending balance to available
            await _leaveAccrualService.ReleaseLeaveBalanceAsync(
                vacation.EmployeeId,
                vacation.VacationTypeId,
                vacation.TotalDays,
                vacation.Id,
                vacationYear,
                cancellationToken);
        }
    }

    private async Task UpdateExcuseStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var excuse = await _context.EmployeeExcuses
            .FirstOrDefaultAsync(e => e.Id == workflowInstance.EntityId, cancellationToken);

        if (excuse == null) return;

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            excuse.ApprovalStatus = Domain.Excuses.ApprovalStatus.Approved;
            await _context.SaveChangesAsync(cancellationToken);

            // Recalculate attendance to apply excuse offset to late/early minutes
            await UpdateAttendanceForExcuseAsync(excuse, cancellationToken);
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            excuse.ApprovalStatus = Domain.Excuses.ApprovalStatus.Rejected;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    /// <summary>
    /// Updates attendance record when an excuse is approved via workflow.
    /// Triggers full recalculation to apply excuse offsets to late/early minutes.
    /// </summary>
    private async Task UpdateAttendanceForExcuseAsync(EmployeeExcuse excuse, CancellationToken cancellationToken)
    {
        // Normalize the excuse date to UTC for PostgreSQL compatibility
        var normalizedExcuseDate = excuse.ExcuseDate.ToUtcDate();

        // Find existing attendance record for the excuse date with shift assignment
        var attendanceRecord = await _context.AttendanceRecords
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
            .FirstOrDefaultAsync(ar => ar.EmployeeId == excuse.EmployeeId &&
                                     ar.AttendanceDate.Date == normalizedExcuseDate &&
                                     !ar.IsFinalized,
                                cancellationToken);

        if (attendanceRecord != null)
        {
            // Get transactions for recalculation
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                excuse.EmployeeId, excuse.ExcuseDate, cancellationToken);

            // Recalculate attendance - this will now consider the approved excuse
            var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                attendanceRecord, transactions, cancellationToken);

            // Copy recalculated values to existing record
            attendanceRecord.Status = recalculatedRecord.Status;
            attendanceRecord.LateMinutes = recalculatedRecord.LateMinutes;
            attendanceRecord.EarlyLeaveMinutes = recalculatedRecord.EarlyLeaveMinutes;
            attendanceRecord.WorkingHours = recalculatedRecord.WorkingHours;
            attendanceRecord.OvertimeHours = recalculatedRecord.OvertimeHours;
            attendanceRecord.BreakHours = recalculatedRecord.BreakHours;
            attendanceRecord.Notes = string.IsNullOrEmpty(attendanceRecord.Notes)
                ? $"Recalculated after excuse approval via workflow (ID: {excuse.Id})"
                : $"{attendanceRecord.Notes} | Recalculated after excuse approval via workflow (ID: {excuse.Id})";
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task UpdateRemoteWorkStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var remoteWork = await _context.RemoteWorkRequests
            .FirstOrDefaultAsync(rw => rw.Id == workflowInstance.EntityId, cancellationToken);

        if (remoteWork == null) return;

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            remoteWork.Status = Domain.RemoteWork.RemoteWorkRequestStatus.Approved;
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            remoteWork.Status = Domain.RemoteWork.RemoteWorkRequestStatus.Rejected;
        }

        await _context.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Updates attendance records to OnLeave status for the vacation period.
    /// Creates attendance records if they don't exist for dates within the vacation period.
    /// </summary>
    private async Task UpdateAttendanceForVacationPeriodAsync(
        long employeeId,
        DateTime startDate,
        DateTime endDate,
        CancellationToken cancellationToken)
    {
        // Normalize dates to UTC for PostgreSQL compatibility
        var normalizedStartDate = startDate.ToUtcDate();
        var normalizedEndDate = endDate.ToUtcDate();

        // Get all attendance records for the vacation period
        var attendanceRecords = await _context.AttendanceRecords
            .Where(ar => ar.EmployeeId == employeeId &&
                        ar.AttendanceDate.Date >= normalizedStartDate &&
                        ar.AttendanceDate.Date <= normalizedEndDate &&
                        !ar.IsFinalized) // Only update non-finalized records
            .ToListAsync(cancellationToken);

        // Update existing records to OnLeave status
        foreach (var record in attendanceRecords)
        {
            // Only update if not already OnLeave (to preserve any manual overrides)
            if (record.Status != AttendanceStatus.OnLeave)
            {
                record.Status = AttendanceStatus.OnLeave;
                // Clear working hours since employee is on leave
                record.WorkingHours = 0;
                record.OvertimeHours = 0;
                record.LateMinutes = 0;
                record.EarlyLeaveMinutes = 0;
                record.Notes = record.Notes != null
                    ? $"{record.Notes} | Updated to OnLeave due to approved vacation"
                    : "Updated to OnLeave due to approved vacation";
            }
        }

        // Create attendance records for dates that don't have records yet
        var existingDates = attendanceRecords.Select(ar => ar.AttendanceDate.Date).ToHashSet();
        var currentDate = startDate.Date;

        while (currentDate <= endDate.Date)
        {
            if (!existingDates.Contains(currentDate))
            {
                // Create a new attendance record with OnLeave status
                var newRecord = new AttendanceRecord
                {
                    EmployeeId = employeeId,
                    AttendanceDate = currentDate,
                    Status = AttendanceStatus.OnLeave,
                    WorkingHours = 0,
                    OvertimeHours = 0,
                    LateMinutes = 0,
                    EarlyLeaveMinutes = 0,
                    ScheduledHours = 0,
                    BreakHours = 0,
                    Notes = "Created as OnLeave due to approved vacation"
                };
                _context.AttendanceRecords.Add(newRecord);
            }
            currentDate = currentDate.AddDays(1);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
