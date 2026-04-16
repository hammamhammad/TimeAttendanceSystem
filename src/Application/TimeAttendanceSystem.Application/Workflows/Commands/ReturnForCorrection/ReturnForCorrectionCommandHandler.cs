using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Workflows.Events;
using TecAxle.Hrms.Application.Workflows.Services;

namespace TecAxle.Hrms.Application.Workflows.Commands.ReturnForCorrection;

public sealed class ReturnForCorrectionCommandHandler
    : IRequestHandler<ReturnForCorrectionCommand, Result<bool>>
{
    private readonly IApplicationDbContext _db;
    private readonly IWorkflowEngine _engine;
    private readonly IPublisher _publisher;

    public ReturnForCorrectionCommandHandler(
        IApplicationDbContext db,
        IWorkflowEngine engine,
        IPublisher publisher)
    {
        _db = db;
        _engine = engine;
        _publisher = publisher;
    }

    public async Task<Result<bool>> Handle(ReturnForCorrectionCommand request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Comments))
        {
            return Result.Failure<bool>("Comments are required when returning a request for correction.");
        }

        var engineResult = await _engine.ReturnForCorrectionAsync(
            request.WorkflowInstanceId, request.UserId, request.Comments);

        if (!engineResult.IsSuccess)
        {
            return Result.Failure<bool>(engineResult.Error ?? "Unable to return workflow for correction.");
        }

        // Re-load the instance so we can publish a fully-populated event.
        var instance = await _db.WorkflowInstances.AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == request.WorkflowInstanceId, ct);
        if (instance != null)
        {
            await _publisher.Publish(new RequestReturnedForCorrectionEvent(
                instance.Id,
                instance.EntityType,
                instance.EntityId,
                instance.RequestedByUserId,
                request.UserId,
                request.Comments), ct);
        }

        return Result.Success(true);
    }
}
