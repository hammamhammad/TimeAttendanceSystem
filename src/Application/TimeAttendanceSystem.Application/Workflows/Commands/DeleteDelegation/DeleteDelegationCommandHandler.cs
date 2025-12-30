using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.DeleteDelegation;

/// <summary>
/// Handler for DeleteDelegationCommand.
/// </summary>
public class DeleteDelegationCommandHandler : IRequestHandler<DeleteDelegationCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public DeleteDelegationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(DeleteDelegationCommand request, CancellationToken cancellationToken)
    {
        var delegation = await _context.ApprovalDelegations
            .FirstOrDefaultAsync(d => d.Id == request.Id && !d.IsDeleted, cancellationToken);

        if (delegation == null)
        {
            return Result.Failure<bool>("Delegation not found.");
        }

        delegation.IsDeleted = true;
        delegation.IsActive = false;
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}
