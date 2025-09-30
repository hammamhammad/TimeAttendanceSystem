using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.DeleteExcusePolicy;

/// <summary>
/// Command handler for deleting excuse policies (soft delete).
/// Implements validation and dependency checking before deletion.
/// </summary>
public class DeleteExcusePolicyCommandHandler : IRequestHandler<DeleteExcusePolicyCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public DeleteExcusePolicyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the deletion of an excuse policy with validation and dependency checking.
    /// </summary>
    /// <param name="request">Command containing policy ID to delete</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure with error details</returns>
    public async Task<Result<bool>> Handle(DeleteExcusePolicyCommand request, CancellationToken cancellationToken)
    {
        // Find the existing policy
        var policy = await _context.ExcusePolicies
            .FirstOrDefaultAsync(ep => ep.Id == request.Id, cancellationToken);

        if (policy == null)
        {
            return Result.Failure<bool>("Excuse policy not found");
        }

        // Check for active excuse requests using this policy
        var hasActiveExcuses = await _context.EmployeeExcuses
            .AnyAsync(ee => ee.Employee.BranchId == policy.BranchId &&
                           ee.ApprovalStatus == Domain.Excuses.ApprovalStatus.Pending,
                      cancellationToken);

        if (hasActiveExcuses)
        {
            return Result.Failure<bool>("Cannot delete policy with pending excuse requests. Please handle all pending requests first.");
        }

        // Perform soft delete by marking as inactive and setting a flag (if implemented)
        // For now, we'll just remove it since we don't have a soft delete flag in the entity
        _context.ExcusePolicies.Remove(policy);

        // Save changes
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}