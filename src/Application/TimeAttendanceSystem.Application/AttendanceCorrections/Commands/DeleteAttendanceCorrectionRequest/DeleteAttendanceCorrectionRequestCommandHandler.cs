using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Extensions;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.DeleteAttendanceCorrectionRequest;

/// <summary>
/// Command handler for deleting attendance correction requests.
/// Handles soft delete and attendance recalculation for approved requests.
/// </summary>
public class DeleteAttendanceCorrectionRequestCommandHandler : IRequestHandler<DeleteAttendanceCorrectionRequestCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly IAttendanceTransactionRepository _transactionRepository;

    public DeleteAttendanceCorrectionRequestCommandHandler(
        IApplicationDbContext context,
        IAttendanceCalculationService calculationService,
        IAttendanceTransactionRepository transactionRepository)
    {
        _context = context;
        _calculationService = calculationService;
        _transactionRepository = transactionRepository;
    }

    public async Task<Result<bool>> Handle(DeleteAttendanceCorrectionRequestCommand request, CancellationToken cancellationToken)
    {
        var correctionRequest = await _context.AttendanceCorrectionRequests
            .FirstOrDefaultAsync(acr => acr.Id == request.Id && !acr.IsDeleted, cancellationToken);

        if (correctionRequest == null)
        {
            return Result.Failure<bool>("Attendance correction request not found");
        }

        // Store details before deletion for recalculation
        var employeeId = correctionRequest.EmployeeId;
        var correctionDate = correctionRequest.CorrectionDate;
        var wasApproved = correctionRequest.ApprovalStatus == ApprovalStatus.Approved;
        var createdTransactionId = correctionRequest.CreatedTransactionId;

        try
        {
            // If the correction was approved and created a transaction, delete the transaction too
            if (wasApproved && createdTransactionId.HasValue)
            {
                await _transactionRepository.DeleteAsync(createdTransactionId.Value, cancellationToken);
            }

            // Soft delete - mark as deleted instead of removing from database
            correctionRequest.IsDeleted = true;
            correctionRequest.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);

            // Recalculate attendance if the correction was approved (since it affected calculations)
            if (wasApproved)
            {
                await RecalculateAttendanceAsync(employeeId, correctionDate, cancellationToken);
            }

            return Result.Success(true);
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Failed to delete attendance correction request: {ex.Message}");
        }
    }

    /// <summary>
    /// Recalculates attendance record after an approved correction request is deleted.
    /// This ensures attendance status is recalculated without the deleted transaction.
    /// </summary>
    private async Task RecalculateAttendanceAsync(long employeeId, DateTime correctionDate, CancellationToken cancellationToken)
    {
        // Normalize the correction date to UTC for PostgreSQL compatibility
        var normalizedCorrectionDate = correctionDate.ToUtcDate();

        // Find existing attendance record for the date with shift assignment
        var attendanceRecord = await _context.AttendanceRecords
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
            .FirstOrDefaultAsync(ar => ar.EmployeeId == employeeId &&
                                     ar.AttendanceDate.Date == normalizedCorrectionDate &&
                                     !ar.IsFinalized,
                                cancellationToken);

        if (attendanceRecord != null)
        {
            // Get remaining transactions for recalculation (the deleted one is no longer included)
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                employeeId, correctionDate, cancellationToken);

            // Recalculate attendance - this will now NOT consider the deleted transaction
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
                ? $"Recalculated after attendance correction deletion"
                : $"{attendanceRecord.Notes} | Recalculated after attendance correction deletion";
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
