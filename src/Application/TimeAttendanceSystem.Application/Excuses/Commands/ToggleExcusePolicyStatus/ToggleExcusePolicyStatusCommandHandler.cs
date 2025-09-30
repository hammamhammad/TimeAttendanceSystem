using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ToggleExcusePolicyStatus;

/// <summary>
/// Command handler for toggling excuse policy active status.
/// Implements validation and conflict detection for policy activation/deactivation.
/// </summary>
public class ToggleExcusePolicyStatusCommandHandler : IRequestHandler<ToggleExcusePolicyStatusCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public ToggleExcusePolicyStatusCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the toggle of an excuse policy's active status with validation.
    /// </summary>
    /// <param name="request">Command containing policy ID to toggle</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure with error details</returns>
    public async Task<Result<bool>> Handle(ToggleExcusePolicyStatusCommand request, CancellationToken cancellationToken)
    {
        // Find the existing policy
        var policy = await _context.ExcusePolicies
            .FirstOrDefaultAsync(ep => ep.Id == request.Id, cancellationToken);

        if (policy == null)
        {
            return Result.Failure<bool>("Excuse policy not found");
        }

        // If currently inactive and trying to activate, check for conflicts
        if (!policy.IsActive)
        {
            var existingActivePolicy = await _context.ExcusePolicies
                .Where(ep => ep.BranchId == policy.BranchId && ep.IsActive && ep.Id != request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingActivePolicy != null)
            {
                return Result.Failure<bool>($"Another active excuse policy already exists for this {(policy.BranchId.HasValue ? "branch" : "organization")}");
            }
        }

        // Toggle the status
        policy.IsActive = !policy.IsActive;

        // Save changes
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}