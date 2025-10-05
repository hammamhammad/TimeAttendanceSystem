using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.ApproveRemoteWorkRequest;

/// <summary>
/// Command handler for approving or rejecting remote work requests.
/// Implements approval workflow with audit trail.
/// </summary>
public class ApproveRemoteWorkRequestCommandHandler : IRequestHandler<ApproveRemoteWorkRequestCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public ApproveRemoteWorkRequestCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the approval or rejection of a remote work request.
    /// </summary>
    /// <param name="request">Command containing approval decision details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure with error details</returns>
    public async Task<Result<bool>> Handle(ApproveRemoteWorkRequestCommand request, CancellationToken cancellationToken)
    {
        // Validate request exists and is in pending status
        var remoteWorkRequest = await _context.RemoteWorkRequests
            .Include(r => r.Employee)
            .FirstOrDefaultAsync(r => r.Id == request.RequestId, cancellationToken);

        if (remoteWorkRequest == null)
        {
            return Result.Failure<bool>("Remote work request not found");
        }

        if (remoteWorkRequest.Status != RemoteWorkRequestStatus.Pending)
        {
            return Result.Failure<bool>("Only pending requests can be approved or rejected");
        }

        // Validate approver exists
        var approver = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == request.ApproverId, cancellationToken);

        if (approver == null)
        {
            return Result.Failure<bool>("Approver not found");
        }

        // Validate decision and rejection reason
        if (request.Decision == RemoteWorkRequestStatus.Rejected && string.IsNullOrWhiteSpace(request.RejectionReason))
        {
            return Result.Failure<bool>("Rejection reason is required when rejecting a request");
        }

        if (request.Decision == RemoteWorkRequestStatus.Pending)
        {
            return Result.Failure<bool>("Decision must be either Approved or Rejected");
        }

        // Apply the approval decision
        try
        {
            remoteWorkRequest.Status = request.Decision;
            remoteWorkRequest.ApprovedByUserId = request.ApproverId;
            remoteWorkRequest.ApprovedAt = DateTime.UtcNow;

            if (request.Decision == RemoteWorkRequestStatus.Rejected)
            {
                remoteWorkRequest.RejectionReason = request.RejectionReason;
            }

            remoteWorkRequest.ModifiedAtUtc = DateTime.UtcNow;

            // Save changes
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success(true);
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Error approving remote work request: {ex.Message}");
        }
    }
}
