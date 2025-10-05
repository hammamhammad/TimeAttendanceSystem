using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.DeleteRemoteWorkPolicy;

/// <summary>
/// Handler for deleting a remote work policy (soft delete).
/// </summary>
public class DeleteRemoteWorkPolicyCommandHandler : IRequestHandler<DeleteRemoteWorkPolicyCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public DeleteRemoteWorkPolicyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteRemoteWorkPolicyCommand request, CancellationToken cancellationToken)
    {
        var policy = await _context.RemoteWorkPolicies
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (policy == null)
            throw new NotFoundException("Remote work policy not found");

        // Check if there are active requests using this policy
        var hasActiveRequests = await _context.RemoteWorkRequests
            .AnyAsync(a => a.RemoteWorkPolicyId == request.Id &&
                          (a.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Pending ||
                           a.Status == Domain.RemoteWork.RemoteWorkRequestStatus.Approved),
                     cancellationToken);

        if (hasActiveRequests)
            throw new ValidationException("Cannot delete policy with active remote work requests");

        // Soft delete
        policy.IsDeleted = true;
        policy.ModifiedAtUtc = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}