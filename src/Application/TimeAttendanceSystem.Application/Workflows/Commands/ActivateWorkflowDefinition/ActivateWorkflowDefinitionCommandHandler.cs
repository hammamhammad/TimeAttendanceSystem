using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.ActivateWorkflowDefinition;

/// <summary>
/// Handler for ActivateWorkflowDefinitionCommand.
/// </summary>
public class ActivateWorkflowDefinitionCommandHandler : IRequestHandler<ActivateWorkflowDefinitionCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public ActivateWorkflowDefinitionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(ActivateWorkflowDefinitionCommand request, CancellationToken cancellationToken)
    {
        var workflowDefinition = await _context.WorkflowDefinitions
            .FirstOrDefaultAsync(w => w.Id == request.Id && !w.IsDeleted, cancellationToken);

        if (workflowDefinition == null)
        {
            return Result.Failure<bool>("Workflow definition not found.");
        }

        workflowDefinition.IsActive = request.IsActive;
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}
