using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.UpdateRemoteWorkRequest;

/// <summary>
/// Handler for updating remote work requests.
/// </summary>
public class UpdateRemoteWorkRequestCommandHandler : IRequestHandler<UpdateRemoteWorkRequestCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public UpdateRemoteWorkRequestCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(UpdateRemoteWorkRequestCommand request, CancellationToken cancellationToken)
    {
        // Get the existing request
        var remoteWorkRequest = await _context.RemoteWorkRequests
            .Include(a => a.RemoteWorkPolicy)
            .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

        if (remoteWorkRequest == null)
            throw new NotFoundException("Remote work request not found");

        // Validate dates are allowed by policy (blackout periods)
        var currentDate = request.StartDate;
        while (currentDate <= request.EndDate)
        {
            if (!remoteWorkRequest.RemoteWorkPolicy.IsDateAllowed(currentDate))
                throw new ValidationException($"Date {currentDate:yyyy-MM-dd} falls within a blackout period");
            currentDate = currentDate.AddDays(1);
        }

        // Calculate working days
        var workingDays = CalculateWorkingDays(request.StartDate, request.EndDate);

        // Check for overlapping requests (exclude current request)
        var hasOverlap = await _context.RemoteWorkRequests
            .AnyAsync(a => a.Id != request.Id &&
                          a.EmployeeId == remoteWorkRequest.EmployeeId &&
                          (a.Status == RemoteWorkRequestStatus.Approved ||
                           a.Status == RemoteWorkRequestStatus.Pending) &&
                          ((request.StartDate >= a.StartDate && request.StartDate <= a.EndDate) ||
                           (request.EndDate >= a.StartDate && request.EndDate <= a.EndDate) ||
                           (request.StartDate <= a.StartDate && request.EndDate >= a.EndDate)),
                     cancellationToken);

        if (hasOverlap)
            return Result.Failure("Remote work request overlaps with existing request");

        // Validate status change
        if (request.Status == RemoteWorkRequestStatus.Rejected && string.IsNullOrWhiteSpace(request.RejectionReason))
            return Result.Failure("Rejection reason is required when rejecting a request");

        // Update the request (employee cannot be changed)
        remoteWorkRequest.StartDate = request.StartDate;
        remoteWorkRequest.EndDate = request.EndDate;
        remoteWorkRequest.Reason = request.Reason;
        remoteWorkRequest.Status = request.Status;
        remoteWorkRequest.RejectionReason = request.RejectionReason;
        remoteWorkRequest.ApprovalComments = request.ApprovalComments;
        remoteWorkRequest.WorkingDaysCount = workingDays;
        remoteWorkRequest.ModifiedAtUtc = DateTime.UtcNow;

        // Validate the request
        var (isValid, errors) = remoteWorkRequest.ValidateRequest();
        if (!isValid)
            return Result.Failure(string.Join(", ", errors));

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }

    private int CalculateWorkingDays(DateOnly startDate, DateOnly endDate)
    {
        var workingDays = 0;
        var currentDate = startDate;

        while (currentDate <= endDate)
        {
            // Count weekdays (Monday to Friday)
            var dayOfWeek = currentDate.DayOfWeek;
            if (dayOfWeek != DayOfWeek.Saturday && dayOfWeek != DayOfWeek.Sunday)
            {
                workingDays++;
            }
            currentDate = currentDate.AddDays(1);
        }

        return workingDays;
    }
}
