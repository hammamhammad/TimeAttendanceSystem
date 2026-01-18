using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Extensions;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ApproveEmployeeExcuse;

/// <summary>
/// Command handler for approving or rejecting employee excuse requests.
/// Implements approval workflow with attendance integration and audit trail.
/// </summary>
public class ApproveEmployeeExcuseCommandHandler : IRequestHandler<ApproveEmployeeExcuseCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly IAttendanceTransactionRepository _transactionRepository;

    public ApproveEmployeeExcuseCommandHandler(
        IApplicationDbContext context,
        IAttendanceCalculationService calculationService,
        IAttendanceTransactionRepository transactionRepository)
    {
        _context = context;
        _calculationService = calculationService;
        _transactionRepository = transactionRepository;
    }

    /// <summary>
    /// Handles the approval or rejection of an employee excuse request.
    /// </summary>
    /// <param name="request">Command containing approval decision details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure with error details</returns>
    public async Task<Result<bool>> Handle(ApproveEmployeeExcuseCommand request, CancellationToken cancellationToken)
    {
        // Validate excuse exists and is in pending status
        var excuse = await _context.EmployeeExcuses
            .Include(e => e.Employee)
            .FirstOrDefaultAsync(e => e.Id == request.ExcuseId, cancellationToken);

        if (excuse == null)
        {
            return Result.Failure<bool>("Excuse not found");
        }

        if (excuse.ApprovalStatus != ApprovalStatus.Pending)
        {
            return Result.Failure<bool>("Only pending excuses can be approved or rejected");
        }

        // Validate approver exists
        var approver = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == request.ApproverId, cancellationToken);

        if (approver == null)
        {
            return Result.Failure<bool>("Approver not found");
        }

        // Validate decision and rejection reason
        if (request.Decision == ApprovalStatus.Rejected && string.IsNullOrWhiteSpace(request.RejectionReason))
        {
            return Result.Failure<bool>("Rejection reason is required when rejecting an excuse");
        }

        if (request.Decision == ApprovalStatus.Pending)
        {
            return Result.Failure<bool>("Decision must be either Approved or Rejected");
        }

        // Apply the approval decision
        try
        {
            if (request.Decision == ApprovalStatus.Approved)
            {
                excuse.Approve(request.ApproverId, request.ProcessingNotes);
            }
            else if (request.Decision == ApprovalStatus.Rejected)
            {
                excuse.Reject(request.ApproverId, request.RejectionReason!, request.ProcessingNotes);
            }

            // Save changes
            await _context.SaveChangesAsync(cancellationToken);

            // If approved, update attendance records
            if (request.Decision == ApprovalStatus.Approved)
            {
                await UpdateAttendanceRecordsAsync(excuse, cancellationToken);
            }

            return Result.Success(true);
        }
        catch (InvalidOperationException ex)
        {
            return Result.Failure<bool>(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<bool>(ex.Message);
        }
    }

    /// <summary>
    /// Updates attendance records for the excuse period when excuse is approved.
    /// Triggers full recalculation to properly apply excuse offsets to late/early minutes.
    /// </summary>
    private async Task UpdateAttendanceRecordsAsync(Domain.Excuses.EmployeeExcuse excuse, CancellationToken cancellationToken)
    {
        // Normalize the excuse date to UTC for PostgreSQL compatibility
        var normalizedExcuseDate = excuse.ExcuseDate.ToUtcDate();

        // Find existing attendance record for the date with shift assignment
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
                ? $"Recalculated after excuse approval (ID: {excuse.Id})"
                : $"{attendanceRecord.Notes} | Recalculated after excuse approval (ID: {excuse.Id})";
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}