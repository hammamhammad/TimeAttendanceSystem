using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Extensions;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Commands.DeleteEmployeeExcuse;

public class DeleteEmployeeExcuseCommandHandler : IRequestHandler<DeleteEmployeeExcuseCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly IAttendanceTransactionRepository _transactionRepository;

    public DeleteEmployeeExcuseCommandHandler(
        IApplicationDbContext context,
        IAttendanceCalculationService calculationService,
        IAttendanceTransactionRepository transactionRepository)
    {
        _context = context;
        _calculationService = calculationService;
        _transactionRepository = transactionRepository;
    }

    public async Task<Result<bool>> Handle(DeleteEmployeeExcuseCommand request, CancellationToken cancellationToken)
    {
        var excuse = await _context.EmployeeExcuses
            .FirstOrDefaultAsync(e => e.Id == request.Id && !e.IsDeleted, cancellationToken);

        if (excuse == null)
        {
            return Result.Failure<bool>("Employee excuse not found");
        }

        // Store excuse details before deletion for recalculation
        var employeeId = excuse.EmployeeId;
        var excuseDate = excuse.ExcuseDate;
        var wasApproved = excuse.ApprovalStatus == ApprovalStatus.Approved;

        try
        {
            // Soft delete - mark as deleted instead of removing from database
            excuse.IsDeleted = true;
            excuse.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);

            // Recalculate attendance if the excuse was approved (since it affected calculations)
            if (wasApproved)
            {
                await RecalculateAttendanceAsync(employeeId, excuseDate, cancellationToken);
            }

            return Result.Success(true);
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Failed to delete employee excuse: {ex.Message}");
        }
    }

    /// <summary>
    /// Recalculates attendance record after an approved excuse is deleted.
    /// This ensures late/early leave minutes are recalculated without the deleted excuse.
    /// </summary>
    private async Task RecalculateAttendanceAsync(long employeeId, DateTime excuseDate, CancellationToken cancellationToken)
    {
        // Normalize the excuse date to UTC for PostgreSQL compatibility
        var normalizedExcuseDate = excuseDate.ToUtcDate();

        // Find existing attendance record for the date with shift assignment
        var attendanceRecord = await _context.AttendanceRecords
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
            .FirstOrDefaultAsync(ar => ar.EmployeeId == employeeId &&
                                     ar.AttendanceDate.Date == normalizedExcuseDate &&
                                     !ar.IsFinalized,
                                cancellationToken);

        if (attendanceRecord != null)
        {
            // Get transactions for recalculation
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                employeeId, excuseDate, cancellationToken);

            // Recalculate attendance - this will now NOT consider the deleted excuse
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
                ? $"Recalculated after excuse deletion"
                : $"{attendanceRecord.Notes} | Recalculated after excuse deletion";
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}