using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.ToggleRemoteWorkPolicyStatus;

/// <summary>
/// Handler for toggling the active status of a remote work policy.
/// </summary>
public class ToggleRemoteWorkPolicyStatusCommandHandler : IRequestHandler<ToggleRemoteWorkPolicyStatusCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public ToggleRemoteWorkPolicyStatusCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(ToggleRemoteWorkPolicyStatusCommand request, CancellationToken cancellationToken)
    {
        var policy = await _context.RemoteWorkPolicies
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (policy == null)
            throw new NotFoundException("Remote work policy not found");

        // If activating, deactivate other active policies for the same branch
        if (!policy.IsActive)
        {
            var otherActivePolicies = await _context.RemoteWorkPolicies
                .Where(p => p.BranchId == policy.BranchId && p.IsActive && p.Id != policy.Id)
                .ToListAsync(cancellationToken);

            foreach (var otherPolicy in otherActivePolicies)
            {
                otherPolicy.IsActive = false;
                otherPolicy.ModifiedAtUtc = DateTime.UtcNow;
            }
        }

        // Toggle status
        policy.IsActive = !policy.IsActive;
        policy.ModifiedAtUtc = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}