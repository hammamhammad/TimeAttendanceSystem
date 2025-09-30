using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Commands.CreateExcusePolicy;

/// <summary>
/// Command handler for creating excuse policy configurations.
/// Implements comprehensive validation, conflict detection, and policy hierarchy management.
/// </summary>
public class CreateExcusePolicyCommandHandler : IRequestHandler<CreateExcusePolicyCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;

    public CreateExcusePolicyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the creation of a new excuse policy with full validation and conflict resolution.
    /// </summary>
    /// <param name="request">Command containing policy configuration</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing the created policy ID or validation errors</returns>
    public async Task<Result<long>> Handle(CreateExcusePolicyCommand request, CancellationToken cancellationToken)
    {
        // Validate branch exists if BranchId is provided
        if (request.BranchId.HasValue)
        {
            var branch = await _context.Branches
                .FirstOrDefaultAsync(b => b.Id == request.BranchId.Value, cancellationToken);

            if (branch == null)
            {
                return Result.Failure<long>("Branch not found");
            }
        }

        // Check for existing active policy for the same branch
        var existingPolicy = await _context.ExcusePolicies
            .Where(ep => ep.BranchId == request.BranchId && ep.IsActive)
            .FirstOrDefaultAsync(cancellationToken);

        if (existingPolicy != null)
        {
            return Result.Failure<long>($"An active excuse policy already exists for this {(request.BranchId.HasValue ? "branch" : "organization")}");
        }

        // Create excuse policy entity
        var policy = new ExcusePolicy
        {
            BranchId = request.BranchId,
            MaxPersonalExcusesPerMonth = request.MaxPersonalExcusesPerMonth,
            MaxPersonalExcuseHoursPerMonth = request.MaxPersonalExcuseHoursPerMonth,
            MaxPersonalExcuseHoursPerDay = request.MaxPersonalExcuseHoursPerDay,
            MaxHoursPerExcuse = request.MaxHoursPerExcuse,
            RequiresApproval = request.RequiresApproval,
            AllowPartialHourExcuses = request.AllowPartialHourExcuses,
            MinimumExcuseDuration = request.MinimumExcuseDuration,
            MaxRetroactiveDays = request.MaxRetroactiveDays,
            AllowSelfServiceRequests = request.AllowSelfServiceRequests,
            IsActive = true
        };

        // Validate policy business rules
        var (isValid, errors) = policy.ValidatePolicy();
        if (!isValid)
        {
            return Result.Failure<long>(string.Join(", ", errors));
        }

        // Add policy to context
        _context.ExcusePolicies.Add(policy);

        // Save changes to get the policy ID
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(policy.Id);
    }
}