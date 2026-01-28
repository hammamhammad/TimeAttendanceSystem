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
        Console.WriteLine($"[DEBUG] UpdateEntityStatusIfWorkflowCompleteAsync - WorkflowInstanceId: {workflowInstanceId}");

        // Reload workflow instance to check if it's complete
        var workflowInstance = await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition)
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId, cancellationToken);

        if (workflowInstance == null)
        {
            Console.WriteLine($"[DEBUG] Workflow instance not found for ID: {workflowInstanceId}");
            return;
        }

        Console.WriteLine($"[DEBUG] Workflow Status: {workflowInstance.Status}, EntityType: {workflowInstance.EntityType}, EntityId: {workflowInstance.EntityId}, FinalOutcome: {workflowInstance.FinalOutcome}");

        if (workflowInstance.Status != WorkflowStatus.Approved && workflowInstance.Status != WorkflowStatus.Rejected)
        {
            Console.WriteLine($"[DEBUG] Workflow not complete yet (Status: {workflowInstance.Status}). Skipping entity status update.");
            return; // Workflow not complete yet
        }

        Console.WriteLine($"[DEBUG] Workflow is complete. Proceeding to update entity status...");

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

            case WorkflowEntityType.AttendanceCorrection:
                await UpdateAttendanceCorrectionStatusAsync(workflowInstance, cancellationToken);
                break;
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
        Console.WriteLine($"[DEBUG] UpdateRemoteWorkStatusAsync - WorkflowInstanceId: {workflowInstance.Id}, Status: {workflowInstance.Status}, FinalOutcome: {workflowInstance.FinalOutcome}");

        var remoteWork = await _context.RemoteWorkRequests
            .FirstOrDefaultAsync(rw => rw.Id == workflowInstance.EntityId, cancellationToken);

        if (remoteWork == null)
        {
            Console.WriteLine($"[DEBUG] Remote work request not found for EntityId: {workflowInstance.EntityId}");
            return;
        }

        Console.WriteLine($"[DEBUG] Found remote work request - Id: {remoteWork.Id}, EmployeeId: {remoteWork.EmployeeId}, StartDate: {remoteWork.StartDate}, EndDate: {remoteWork.EndDate}");

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            Console.WriteLine($"[DEBUG] Workflow outcome is Approved - updating remote work status and attendance");
            remoteWork.Status = Domain.RemoteWork.RemoteWorkRequestStatus.Approved;
            await _context.SaveChangesAsync(cancellationToken);

            // Update attendance records to mark them as remote work days
            await UpdateAttendanceForRemoteWorkAsync(remoteWork, cancellationToken);
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            Console.WriteLine($"[DEBUG] Workflow outcome is Rejected");
            remoteWork.Status = Domain.RemoteWork.RemoteWorkRequestStatus.Rejected;
            await _context.SaveChangesAsync(cancellationToken);
        }
        else
        {
            Console.WriteLine($"[DEBUG] Workflow FinalOutcome is neither Approved nor Rejected: {workflowInstance.FinalOutcome}");
        }
    }

    /// <summary>
    /// Updates attendance records when a remote work request is approved via workflow.
    /// Marks attendance records as remote work while preserving working hours.
    /// Unlike vacation (which clears hours), remote work keeps hours since employee worked.
    /// </summary>
    private async Task UpdateAttendanceForRemoteWorkAsync(
        Domain.RemoteWork.RemoteWorkRequest remoteWork,
        CancellationToken cancellationToken)
    {
        Console.WriteLine($"[DEBUG] UpdateAttendanceForRemoteWorkAsync - RemoteWorkId: {remoteWork.Id}, EmployeeId: {remoteWork.EmployeeId}");

        // Convert DateOnly to DateTime for comparison
        var startDate = remoteWork.StartDate.ToDateTime(TimeOnly.MinValue);
        var endDate = remoteWork.EndDate.ToDateTime(TimeOnly.MinValue);

        Console.WriteLine($"[DEBUG] StartDate (raw): {startDate}, EndDate (raw): {endDate}");

        // Normalize dates to UTC for PostgreSQL compatibility
        var normalizedStartDate = startDate.ToUtcDate();
        var normalizedEndDate = endDate.ToUtcDate();

        Console.WriteLine($"[DEBUG] NormalizedStartDate: {normalizedStartDate}, NormalizedEndDate: {normalizedEndDate}");

        // Get all attendance records for the remote work period
        var attendanceRecords = await _context.AttendanceRecords
            .Where(ar => ar.EmployeeId == remoteWork.EmployeeId &&
                        ar.AttendanceDate.Date >= normalizedStartDate &&
                        ar.AttendanceDate.Date <= normalizedEndDate &&
                        !ar.IsFinalized) // Only update non-finalized records
            .ToListAsync(cancellationToken);

        Console.WriteLine($"[DEBUG] Found {attendanceRecords.Count} attendance records to update");

        // Update existing records to mark as remote work
        foreach (var record in attendanceRecords)
        {
            // Update status to RemoteWork - remote work employees are considered working
            // This is important for records that were marked as Absent before approval
            record.Status = AttendanceStatus.RemoteWork;

            // Set work location to Remote and link to the remote work request
            record.WorkLocation = Domain.Attendance.WorkLocationType.Remote;
            record.RemoteWorkRequestId = remoteWork.Id;

            // Add note about remote work approval
            record.Notes = string.IsNullOrEmpty(record.Notes)
                ? $"Marked as remote work due to approved request (ID: {remoteWork.Id})"
                : $"{record.Notes} | Marked as remote work due to approved request (ID: {remoteWork.Id})";

            record.ModifiedAtUtc = DateTime.UtcNow;
        }

        // Create attendance records for dates that don't have records yet (working days only)
        var existingDates = attendanceRecords.Select(ar => ar.AttendanceDate.Date).ToHashSet();
        var currentDate = startDate.Date;

        while (currentDate <= endDate.Date)
        {
            // Only create records for weekdays (Monday to Friday)
            if (currentDate.DayOfWeek != DayOfWeek.Saturday &&
                currentDate.DayOfWeek != DayOfWeek.Sunday &&
                !existingDates.Contains(currentDate))
            {
                // Create a new attendance record marked as remote work
                var newRecord = new AttendanceRecord
                {
                    EmployeeId = remoteWork.EmployeeId,
                    AttendanceDate = currentDate,
                    Status = AttendanceStatus.RemoteWork, // Remote work status
                    WorkLocation = Domain.Attendance.WorkLocationType.Remote,
                    RemoteWorkRequestId = remoteWork.Id,
                    WorkingHours = 0, // Will be calculated when transactions are recorded
                    OvertimeHours = 0,
                    LateMinutes = 0,
                    EarlyLeaveMinutes = 0,
                    ScheduledHours = 0,
                    BreakHours = 0,
                    Notes = $"Created as remote work due to approved request (ID: {remoteWork.Id})"
                };
                _context.AttendanceRecords.Add(newRecord);
            }
            currentDate = currentDate.AddDays(1);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Updates attendance correction request status and creates transaction when approved via workflow.
    /// Creates an attendance transaction for the correction and triggers attendance recalculation.
    /// </summary>
    private async Task UpdateAttendanceCorrectionStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var correction = await _context.AttendanceCorrectionRequests
            .Include(acr => acr.Employee)
            .FirstOrDefaultAsync(acr => acr.Id == workflowInstance.EntityId, cancellationToken);

        if (correction == null) return;

        // Get the approver's user ID from the last completed step
        var lastApproverStep = await _context.WorkflowStepExecutions
            .Where(wse => wse.WorkflowInstanceId == workflowInstance.Id && wse.Action.HasValue)
            .OrderByDescending(wse => wse.ActionTakenAt)
            .FirstOrDefaultAsync(cancellationToken);

        var approverId = lastApproverStep?.ActionTakenByUserId ?? lastApproverStep?.AssignedToUserId;

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            // Update correction status to Approved
            correction.ApprovalStatus = ApprovalStatus.Approved;
            correction.ApprovedById = approverId;
            correction.ApprovedAt = DateTime.UtcNow;
            correction.ProcessingNotes = lastApproverStep?.Comments;

            // Create attendance transaction for the correction
            var transactionType = correction.CorrectionType == AttendanceCorrectionType.CheckIn
                ? TransactionType.CheckIn
                : TransactionType.CheckOut;

            var correctionDateTime = correction.CorrectionDate.Date.Add(correction.CorrectionTime.ToTimeSpan());

            var newTransaction = new AttendanceTransaction
            {
                EmployeeId = correction.EmployeeId,
                TransactionTimeUtc = DateTime.SpecifyKind(correctionDateTime, DateTimeKind.Utc),
                TransactionTimeLocal = correctionDateTime,
                TransactionType = transactionType,
                IsManual = true,
                EnteredByUserId = approverId,
                IsVerified = true,
                VerifiedByUserId = approverId,
                VerifiedAtUtc = DateTime.UtcNow,
                Notes = $"Created from approved attendance correction request (ID: {correction.Id})"
            };

            _context.AttendanceTransactions.Add(newTransaction);
            await _context.SaveChangesAsync(cancellationToken);

            // Link the created transaction to the correction request
            correction.CreatedTransactionId = newTransaction.Id;
            await _context.SaveChangesAsync(cancellationToken);

            // Recalculate attendance for the correction date
            await UpdateAttendanceForCorrectionAsync(correction, newTransaction, cancellationToken);
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            // Update correction status to Rejected
            correction.ApprovalStatus = ApprovalStatus.Rejected;
            correction.ApprovedById = approverId;
            correction.ApprovedAt = DateTime.UtcNow;
            correction.RejectionReason = lastApproverStep?.Comments ?? "Rejected via workflow";
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    /// <summary>
    /// Updates attendance record when an attendance correction is approved via workflow.
    /// Triggers full recalculation to include the new transaction.
    /// </summary>
    private async Task UpdateAttendanceForCorrectionAsync(AttendanceCorrectionRequest correction, AttendanceTransaction newTransaction, CancellationToken cancellationToken)
    {
        // Normalize the correction date to UTC for PostgreSQL compatibility
        var normalizedCorrectionDate = correction.CorrectionDate.ToUtcDate();

        // Find existing attendance record for the correction date with shift assignment
        var attendanceRecord = await _context.AttendanceRecords
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
            .FirstOrDefaultAsync(ar => ar.EmployeeId == correction.EmployeeId &&
                                     ar.AttendanceDate.Date == normalizedCorrectionDate &&
                                     !ar.IsFinalized,
                                cancellationToken);

        if (attendanceRecord != null)
        {
            // Get all transactions for recalculation (including the newly created one)
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                correction.EmployeeId, correction.CorrectionDate, cancellationToken);

            // Recalculate attendance - this will now include the new transaction
            var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                attendanceRecord, transactions, cancellationToken);

            // Copy recalculated values to existing record
            attendanceRecord.Status = recalculatedRecord.Status;
            attendanceRecord.LateMinutes = recalculatedRecord.LateMinutes;
            attendanceRecord.EarlyLeaveMinutes = recalculatedRecord.EarlyLeaveMinutes;
            attendanceRecord.WorkingHours = recalculatedRecord.WorkingHours;
            attendanceRecord.OvertimeHours = recalculatedRecord.OvertimeHours;
            attendanceRecord.BreakHours = recalculatedRecord.BreakHours;
            attendanceRecord.ActualCheckInTime = recalculatedRecord.ActualCheckInTime;
            attendanceRecord.ActualCheckOutTime = recalculatedRecord.ActualCheckOutTime;
            attendanceRecord.Notes = string.IsNullOrEmpty(attendanceRecord.Notes)
                ? $"Recalculated after attendance correction approval via workflow (ID: {correction.Id})"
                : $"{attendanceRecord.Notes} | Recalculated after attendance correction approval via workflow (ID: {correction.Id})";
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
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
