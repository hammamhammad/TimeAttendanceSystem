using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.UpdateAttendanceCorrectionRequest;

/// <summary>
/// Command handler for updating attendance correction requests.
/// Only pending requests can be updated.
/// </summary>
public class UpdateAttendanceCorrectionRequestCommandHandler : IRequestHandler<UpdateAttendanceCorrectionRequestCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public UpdateAttendanceCorrectionRequestCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(UpdateAttendanceCorrectionRequestCommand request, CancellationToken cancellationToken)
    {
        var correctionRequest = await _context.AttendanceCorrectionRequests
            .FirstOrDefaultAsync(acr => acr.Id == request.Id && !acr.IsDeleted, cancellationToken);

        if (correctionRequest == null)
        {
            return Result.Failure<bool>("Attendance correction request not found");
        }

        // Only pending requests can be updated
        if (correctionRequest.ApprovalStatus != ApprovalStatus.Pending)
        {
            return Result.Failure<bool>("Only pending correction requests can be updated");
        }

        // Validate correction date is not in the future
        if (request.CorrectionDate.Date > DateTime.Today)
        {
            return Result.Failure<bool>("Correction date cannot be in the future");
        }

        // Check for duplicate pending correction requests (excluding current one)
        var existingPendingCorrection = await _context.AttendanceCorrectionRequests
            .AnyAsync(acr => acr.Id != request.Id
                && acr.EmployeeId == correctionRequest.EmployeeId
                && acr.CorrectionDate.Date == request.CorrectionDate.Date
                && acr.CorrectionType == request.CorrectionType
                && acr.ApprovalStatus == ApprovalStatus.Pending
                && !acr.IsDeleted, cancellationToken);

        if (existingPendingCorrection)
        {
            var correctionTypeName = request.CorrectionType == Domain.Attendance.AttendanceCorrectionType.CheckIn ? "Check-In" : "Check-Out";
            return Result.Failure<bool>($"A pending {correctionTypeName} correction request already exists for this date");
        }

        // Update correction request properties (note: EmployeeId cannot be changed)
        correctionRequest.CorrectionDate = request.CorrectionDate.Date;
        correctionRequest.CorrectionTime = request.CorrectionTime;
        correctionRequest.CorrectionType = request.CorrectionType;
        correctionRequest.Reason = request.Reason;
        correctionRequest.ModifiedAtUtc = DateTime.UtcNow;

        // Update attachment if provided
        if (!string.IsNullOrEmpty(request.AttachmentPath))
        {
            correctionRequest.AttachmentPath = request.AttachmentPath;
        }

        try
        {
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success(true);
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Failed to update attendance correction request: {ex.Message}");
        }
    }
}
