using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Commands.DeleteWorkflowDefinition;

/// <summary>
/// Handler for DeleteWorkflowDefinitionCommand.
/// </summary>
public class DeleteWorkflowDefinitionCommandHandler : IRequestHandler<DeleteWorkflowDefinitionCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public DeleteWorkflowDefinitionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(DeleteWorkflowDefinitionCommand request, CancellationToken cancellationToken)
    {
        var workflowDefinition = await _context.WorkflowDefinitions
            .Include(w => w.Steps)
            .FirstOrDefaultAsync(w => w.Id == request.Id && !w.IsDeleted, cancellationToken);

        if (workflowDefinition == null)
        {
            return Result.Failure<bool>("Workflow definition not found.");
        }

        // Check if there are active instances
        var hasActiveInstances = await _context.WorkflowInstances
            .AnyAsync(wi => wi.WorkflowDefinitionId == request.Id &&
                          wi.Status != WorkflowStatus.Approved &&
                          wi.Status != WorkflowStatus.Rejected &&
                          wi.Status != WorkflowStatus.Cancelled &&
                          !wi.IsDeleted,
                          cancellationToken);

        if (hasActiveInstances)
        {
            return Result.Failure<bool>("Cannot delete workflow definition with active instances.");
        }

        // Soft delete the workflow and its steps
        workflowDefinition.IsDeleted = true;
        workflowDefinition.IsActive = false;

        foreach (var step in workflowDefinition.Steps)
        {
            step.IsDeleted = true;
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}
