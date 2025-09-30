using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.UpdateEmployeeExcuse;

public class UpdateEmployeeExcuseCommandHandler : IRequestHandler<UpdateEmployeeExcuseCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public UpdateEmployeeExcuseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(UpdateEmployeeExcuseCommand request, CancellationToken cancellationToken)
    {
        var excuse = await _context.EmployeeExcuses
            .FirstOrDefaultAsync(e => e.Id == request.Id && !e.IsDeleted, cancellationToken);

        if (excuse == null)
        {
            return Result.Failure<bool>("Employee excuse not found");
        }

        // Calculate duration hours
        var duration = request.EndTime.ToTimeSpan() - request.StartTime.ToTimeSpan();
        var durationHours = (decimal)duration.TotalHours;

        // Update excuse properties (note: EmployeeId cannot be changed)
        excuse.ExcuseDate = request.ExcuseDate;
        excuse.ExcuseType = request.ExcuseType;
        excuse.StartTime = request.StartTime;
        excuse.EndTime = request.EndTime;
        excuse.DurationHours = durationHours;
        excuse.Reason = request.Reason;
        excuse.ApprovalStatus = request.ApprovalStatus;
        excuse.ProcessingNotes = request.ReviewerComments;
        excuse.ModifiedAtUtc = DateTime.UtcNow;

        // Update attachment if provided
        if (!string.IsNullOrEmpty(request.AttachmentPath))
        {
            excuse.AttachmentPath = request.AttachmentPath;
        }

        // Set reviewer information if status is not pending
        if (request.ApprovalStatus != Domain.Excuses.ApprovalStatus.Pending)
        {
            excuse.ApprovedAt = DateTime.UtcNow;
            // Note: ApprovedById would be set from current user context in a real application
            // For now, we'll leave it as is or set a placeholder
        }

        try
        {
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success(true);
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Failed to update employee excuse: {ex.Message}");
        }
    }
}