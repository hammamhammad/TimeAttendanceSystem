using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Workflows.Events;
using TecAxle.Hrms.Application.Workflows.Services;

namespace TecAxle.Hrms.Application.Workflows.Commands.Resubmit;

public sealed class ResubmitWorkflowCommandHandler
    : IRequestHandler<ResubmitWorkflowCommand, Result<bool>>
{
    private readonly IApplicationDbContext _db;
    private readonly IWorkflowEngine _engine;
    private readonly IPublisher _publisher;

    public ResubmitWorkflowCommandHandler(
        IApplicationDbContext db,
        IWorkflowEngine engine,
        IPublisher publisher)
    {
        _db = db;
        _engine = engine;
        _publisher = publisher;
    }

    public async Task<Result<bool>> Handle(ResubmitWorkflowCommand request, CancellationToken ct)
    {
        var engineResult = await _engine.ResubmitAsync(
            request.WorkflowInstanceId, request.UserId, request.Comments);

        if (!engineResult.IsSuccess)
        {
            return Result.Failure<bool>(engineResult.Error ?? "Unable to resubmit workflow.");
        }

        var instance = await _db.WorkflowInstances.AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == request.WorkflowInstanceId, ct);
        if (instance != null)
        {
            await _publisher.Publish(new RequestResubmittedEvent(
                instance.Id,
                instance.EntityType,
                instance.EntityId,
                instance.RequestedByUserId,
                request.Comments,
                instance.ResubmissionCount), ct);
        }

        return Result.Success(true);
    }
}
