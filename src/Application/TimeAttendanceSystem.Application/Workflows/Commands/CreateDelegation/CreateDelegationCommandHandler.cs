using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Application.Workflows.Commands.CreateDelegation;

/// <summary>
/// Handler for CreateDelegationCommand.
/// </summary>
public class CreateDelegationCommandHandler : IRequestHandler<CreateDelegationCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;

    public CreateDelegationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<long>> Handle(CreateDelegationCommand request, CancellationToken cancellationToken)
    {
        // Validate users exist
        var delegatorExists = await _context.Users
            .AnyAsync(u => u.Id == request.DelegatorUserId && u.IsActive && !u.IsDeleted, cancellationToken);

        if (!delegatorExists)
        {
            return Result.Failure<long>("Delegator user not found.");
        }

        var delegateExists = await _context.Users
            .AnyAsync(u => u.Id == request.DelegateUserId && u.IsActive && !u.IsDeleted, cancellationToken);

        if (!delegateExists)
        {
            return Result.Failure<long>("Delegate user not found.");
        }

        // Check for overlapping delegations
        var hasOverlap = await _context.ApprovalDelegations
            .AnyAsync(d => d.DelegatorUserId == request.DelegatorUserId &&
                          d.IsActive &&
                          !d.IsDeleted &&
                          d.StartDate <= request.EndDate &&
                          d.EndDate >= request.StartDate,
                          cancellationToken);

        if (hasOverlap)
        {
            return Result.Failure<long>("An active delegation already exists for this period.");
        }

        // Serialize entity types to JSON
        var entityTypesJson = System.Text.Json.JsonSerializer.Serialize(
            request.EntityTypes.Select(e => e.ToString()).ToList());

        var delegation = new ApprovalDelegation
        {
            DelegatorUserId = request.DelegatorUserId,
            DelegateUserId = request.DelegateUserId,
            EntityTypesJson = entityTypesJson,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsActive = request.IsActive
        };

        _context.ApprovalDelegations.Add(delegation);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(delegation.Id);
    }
}
