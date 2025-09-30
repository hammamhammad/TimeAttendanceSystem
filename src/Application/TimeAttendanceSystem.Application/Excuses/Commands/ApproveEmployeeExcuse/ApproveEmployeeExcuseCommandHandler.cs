using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
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

    public ApproveEmployeeExcuseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
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
    /// </summary>
    private async Task UpdateAttendanceRecordsAsync(Domain.Excuses.EmployeeExcuse excuse, CancellationToken cancellationToken)
    {
        // Find existing attendance record for the date
        var attendanceRecord = await _context.AttendanceRecords
            .FirstOrDefaultAsync(ar => ar.EmployeeId == excuse.EmployeeId &&
                                     ar.AttendanceDate.Date == excuse.ExcuseDate.Date,
                                cancellationToken);

        if (attendanceRecord != null)
        {
            // Update attendance status based on excuse type
            var newStatus = excuse.ExcuseType == ExcuseType.OfficialDuty
                ? AttendanceStatus.OnDuty
                : AttendanceStatus.Excused;

            attendanceRecord.Status = newStatus;
            attendanceRecord.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}