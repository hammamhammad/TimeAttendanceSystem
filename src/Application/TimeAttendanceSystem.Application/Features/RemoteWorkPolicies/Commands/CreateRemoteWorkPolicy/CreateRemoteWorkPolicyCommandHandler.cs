using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.CreateRemoteWorkPolicy;

/// <summary>
/// Handler for creating a new remote work policy.
/// </summary>
public class CreateRemoteWorkPolicyCommandHandler : IRequestHandler<CreateRemoteWorkPolicyCommand, long>
{
    private readonly IApplicationDbContext _context;

    public CreateRemoteWorkPolicyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<long> Handle(CreateRemoteWorkPolicyCommand request, CancellationToken cancellationToken)
    {
        // Validate branch exists only if BranchId is specified (branch-specific policy)
        if (request.BranchId.HasValue)
        {
            var branchExists = await _context.Branches
                .AnyAsync(b => b.Id == request.BranchId.Value, cancellationToken);

            if (!branchExists)
                throw new NotFoundException("Branch not found");

            // Check if there's already an active policy for this branch
            var existingActivePolicy = await _context.RemoteWorkPolicies
                .Where(p => p.BranchId == request.BranchId && p.IsActive)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingActivePolicy != null && request.IsActive)
            {
                // Deactivate the existing policy
                existingActivePolicy.IsActive = false;
            }
        }
        else
        {
            // For company-wide policies, check if there's already an active company-wide policy
            var existingCompanyWidePolicy = await _context.RemoteWorkPolicies
                .Where(p => p.BranchId == null && p.IsActive)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingCompanyWidePolicy != null && request.IsActive)
            {
                // Deactivate the existing company-wide policy
                existingCompanyWidePolicy.IsActive = false;
            }
        }

        // Create the policy
        var policy = new RemoteWorkPolicy
        {
            BranchId = request.BranchId,
            MaxDaysPerWeek = request.MaxDaysPerWeek,
            MaxDaysPerMonth = request.MaxDaysPerMonth,
            MaxDaysPerYear = request.MaxDaysPerYear,
            RequiresManagerApproval = request.RequiresManagerApproval,
            AllowConsecutiveDays = request.AllowConsecutiveDays,
            MaxConsecutiveDays = request.MaxConsecutiveDays,
            MinAdvanceNoticeDays = request.MinAdvanceNoticeDays,
            BlackoutPeriods = request.BlackoutPeriods,
            CountForOvertime = request.CountForOvertime,
            EnforceShiftTimes = request.EnforceShiftTimes,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow
        };

        // Validate the policy configuration
        var (isValid, errors) = policy.ValidateConfiguration();
        if (!isValid)
            throw new ValidationException(string.Join(", ", errors));

        _context.RemoteWorkPolicies.Add(policy);
        await _context.SaveChangesAsync(cancellationToken);

        return policy.Id;
    }
}