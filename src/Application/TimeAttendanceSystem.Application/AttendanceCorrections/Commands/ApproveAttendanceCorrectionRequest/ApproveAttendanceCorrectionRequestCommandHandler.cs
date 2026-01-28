using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Extensions;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.ApproveAttendanceCorrectionRequest;

/// <summary>
/// Command handler for approving or rejecting attendance correction requests.
/// Implements approval workflow with transaction creation and attendance recalculation.
/// </summary>
public class ApproveAttendanceCorrectionRequestCommandHandler : IRequestHandler<ApproveAttendanceCorrectionRequestCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly IAttendanceTransactionRepository _transactionRepository;

    public ApproveAttendanceCorrectionRequestCommandHandler(
        IApplicationDbContext context,
        IAttendanceCalculationService calculationService,
        IAttendanceTransactionRepository transactionRepository)
    {
        _context = context;
        _calculationService = calculationService;
        _transactionRepository = transactionRepository;
    }

    /// <summary>
    /// Handles the approval or rejection of an attendance correction request.
    /// </summary>
    /// <param name="request">Command containing approval decision details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure with error details</returns>
    public async Task<Result<bool>> Handle(ApproveAttendanceCorrectionRequestCommand request, CancellationToken cancellationToken)
    {
        // Validate correction request exists and is in pending status
        var correctionRequest = await _context.AttendanceCorrectionRequests
            .Include(acr => acr.Employee)
            .FirstOrDefaultAsync(acr => acr.Id == request.CorrectionRequestId, cancellationToken);

        if (correctionRequest == null)
        {
            return Result.Failure<bool>("Correction request not found");
        }

        if (correctionRequest.ApprovalStatus != ApprovalStatus.Pending)
        {
            return Result.Failure<bool>("Only pending correction requests can be approved or rejected");
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
            return Result.Failure<bool>("Rejection reason is required when rejecting a correction request");
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
                correctionRequest.Approve(request.ApproverId, request.ProcessingNotes);
            }
            else if (request.Decision == ApprovalStatus.Rejected)
            {
                correctionRequest.Reject(request.ApproverId, request.RejectionReason!, request.ProcessingNotes);
            }

            // Save changes
            await _context.SaveChangesAsync(cancellationToken);

            // If approved, create transaction and update attendance records
            if (request.Decision == ApprovalStatus.Approved)
            {
                await CreateTransactionAndRecalculateAttendanceAsync(correctionRequest, request.ApproverId, cancellationToken);
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
    /// Creates attendance transaction and recalculates attendance when correction is approved.
    /// </summary>
    private async Task CreateTransactionAndRecalculateAttendanceAsync(
        AttendanceCorrectionRequest correctionRequest,
        long approverId,
        CancellationToken cancellationToken)
    {
        // Normalize the correction date to UTC for PostgreSQL compatibility
        var normalizedCorrectionDate = correctionRequest.CorrectionDate.ToUtcDate();

        // Create the transaction time by combining date and time
        var correctionDateTime = correctionRequest.CorrectionDate.Date
            .Add(correctionRequest.CorrectionTime.ToTimeSpan());

        // Determine transaction type based on correction type
        var transactionType = correctionRequest.CorrectionType == AttendanceCorrectionType.CheckIn
            ? TransactionType.CheckIn
            : TransactionType.CheckOut;

        // Create new attendance transaction
        var transaction = new AttendanceTransaction
        {
            EmployeeId = correctionRequest.EmployeeId,
            TransactionTimeUtc = DateTime.SpecifyKind(correctionDateTime, DateTimeKind.Utc),
            TransactionTimeLocal = correctionDateTime,
            AttendanceDate = normalizedCorrectionDate,
            TransactionType = transactionType,
            IsManual = true,
            EnteredByUserId = approverId,
            IsVerified = true,
            VerifiedByUserId = approverId,
            VerifiedAtUtc = DateTime.UtcNow,
            Notes = $"Created from attendance correction request #{correctionRequest.Id}. Reason: {correctionRequest.Reason}"
        };

        // Create the transaction using repository
        var createdTransaction = await _transactionRepository.CreateAsync(transaction, cancellationToken);

        // Link the created transaction to the correction request
        correctionRequest.CreatedTransactionId = createdTransaction.Id;
        await _context.SaveChangesAsync(cancellationToken);

        // Find existing attendance record for the date with shift assignment
        var attendanceRecord = await _context.AttendanceRecords
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
            .FirstOrDefaultAsync(ar => ar.EmployeeId == correctionRequest.EmployeeId &&
                                     ar.AttendanceDate.Date == normalizedCorrectionDate &&
                                     !ar.IsFinalized,
                                cancellationToken);

        if (attendanceRecord != null)
        {
            // Get all transactions for recalculation (including the new one)
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                correctionRequest.EmployeeId, correctionRequest.CorrectionDate, cancellationToken);

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
            attendanceRecord.Notes = string.IsNullOrEmpty(attendanceRecord.Notes)
                ? $"Recalculated after attendance correction approval (ID: {correctionRequest.Id})"
                : $"{attendanceRecord.Notes} | Recalculated after attendance correction approval (ID: {correctionRequest.Id})";
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
