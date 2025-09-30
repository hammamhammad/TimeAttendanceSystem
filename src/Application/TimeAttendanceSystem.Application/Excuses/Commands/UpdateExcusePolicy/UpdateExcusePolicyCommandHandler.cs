using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.UpdateExcusePolicy;

/// <summary>
/// Command handler for updating excuse policy configurations.
/// Implements comprehensive validation, conflict detection, and policy hierarchy management.
/// </summary>
public class UpdateExcusePolicyCommandHandler : IRequestHandler<UpdateExcusePolicyCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public UpdateExcusePolicyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the update of an existing excuse policy with full validation and conflict resolution.
    /// </summary>
    /// <param name="request">Command containing updated policy configuration</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure with error details</returns>
    public async Task<Result<bool>> Handle(UpdateExcusePolicyCommand request, CancellationToken cancellationToken)
    {
        // Find the existing policy
        var policy = await _context.ExcusePolicies
            .FirstOrDefaultAsync(ep => ep.Id == request.Id, cancellationToken);

        if (policy == null)
        {
            return Result.Failure<bool>("Excuse policy not found");
        }

        // Validate branch exists if BranchId is provided
        if (request.BranchId.HasValue)
        {
            var branch = await _context.Branches
                .FirstOrDefaultAsync(b => b.Id == request.BranchId.Value, cancellationToken);

            if (branch == null)
            {
                return Result.Failure<bool>("Branch not found");
            }
        }

        // Check if changing branch scope (not allowed)
        if (policy.BranchId != request.BranchId)
        {
            return Result.Failure<bool>("Cannot change branch scope of existing policy");
        }

        // Check for existing active policy conflict if activating
        if (request.IsActive && !policy.IsActive)
        {
            var existingActivePolicy = await _context.ExcusePolicies
                .Where(ep => ep.BranchId == request.BranchId && ep.IsActive && ep.Id != request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingActivePolicy != null)
            {
                return Result.Failure<bool>($"Another active excuse policy already exists for this {(request.BranchId.HasValue ? "branch" : "organization")}");
            }
        }

        // Update policy properties
        policy.MaxPersonalExcusesPerMonth = request.MaxPersonalExcusesPerMonth;
        policy.MaxPersonalExcuseHoursPerMonth = request.MaxPersonalExcuseHoursPerMonth;
        policy.MaxPersonalExcuseHoursPerDay = request.MaxPersonalExcuseHoursPerDay;
        policy.MaxHoursPerExcuse = request.MaxHoursPerExcuse;
        policy.RequiresApproval = request.RequiresApproval;
        policy.AllowPartialHourExcuses = request.AllowPartialHourExcuses;
        policy.MinimumExcuseDuration = request.MinimumExcuseDuration;
        policy.MaxRetroactiveDays = request.MaxRetroactiveDays;
        policy.AllowSelfServiceRequests = request.AllowSelfServiceRequests;
        policy.IsActive = request.IsActive;

        // Validate policy business rules
        var (isValid, errors) = policy.ValidatePolicy();
        if (!isValid)
        {
            return Result.Failure<bool>(string.Join(", ", errors));
        }

        // Save changes
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}