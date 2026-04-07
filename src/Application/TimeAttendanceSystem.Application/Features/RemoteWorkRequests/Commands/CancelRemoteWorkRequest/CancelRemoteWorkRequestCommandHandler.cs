using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.CancelRemoteWorkRequest;

/// <summary>
/// Handler for cancelling a remote work request.
/// </summary>
public class CancelRemoteWorkRequestCommandHandler : IRequestHandler<CancelRemoteWorkRequestCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CancelRemoteWorkRequestCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CancelRemoteWorkRequestCommand request, CancellationToken cancellationToken)
    {
        var remoteWorkRequest = await _context.RemoteWorkRequests
            .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

        if (remoteWorkRequest == null)
            return Result.Failure("Remote work request not found");

        remoteWorkRequest.Cancel();
        remoteWorkRequest.ModifiedAtUtc = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}