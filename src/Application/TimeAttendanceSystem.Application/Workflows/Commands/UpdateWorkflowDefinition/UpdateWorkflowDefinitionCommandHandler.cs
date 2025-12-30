using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Application.Workflows.Commands.UpdateWorkflowDefinition;

/// <summary>
/// Handler for UpdateWorkflowDefinitionCommand.
/// Updates an existing workflow definition and its steps.
/// </summary>
public class UpdateWorkflowDefinitionCommandHandler : IRequestHandler<UpdateWorkflowDefinitionCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public UpdateWorkflowDefinitionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(UpdateWorkflowDefinitionCommand request, CancellationToken cancellationToken)
    {
        var workflowDefinition = await _context.WorkflowDefinitions
            .Include(w => w.Steps)
            .FirstOrDefaultAsync(w => w.Id == request.Id && !w.IsDeleted, cancellationToken);

        if (workflowDefinition == null)
        {
            return Result.Failure<bool>("Workflow definition not found.");
        }

        // Check if there are active instances using this workflow
        var hasActiveInstances = await _context.WorkflowInstances
            .AnyAsync(wi => wi.WorkflowDefinitionId == request.Id &&
                          wi.Status != Domain.Workflows.Enums.WorkflowStatus.Approved &&
                          wi.Status != Domain.Workflows.Enums.WorkflowStatus.Rejected &&
                          wi.Status != Domain.Workflows.Enums.WorkflowStatus.Cancelled &&
                          !wi.IsDeleted,
                          cancellationToken);

        if (hasActiveInstances)
        {
            return Result.Failure<bool>("Cannot modify workflow definition with active instances. Please wait for them to complete or cancel them first.");
        }

        // Check for duplicate name within scope
        var duplicateExists = await _context.WorkflowDefinitions
            .AnyAsync(w => w.Name == request.Name &&
                          w.EntityType == workflowDefinition.EntityType &&
                          w.BranchId == workflowDefinition.BranchId &&
                          w.Id != request.Id &&
                          !w.IsDeleted,
                          cancellationToken);

        if (duplicateExists)
        {
            return Result.Failure<bool>("A workflow with this name already exists for this entity type and branch.");
        }

        // If this is marked as default, unset any existing default
        if (request.IsDefault && !workflowDefinition.IsDefault)
        {
            var existingDefaults = await _context.WorkflowDefinitions
                .Where(w => w.EntityType == workflowDefinition.EntityType &&
                           w.BranchId == workflowDefinition.BranchId &&
                           w.IsDefault &&
                           w.Id != request.Id &&
                           !w.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var existing in existingDefaults)
            {
                existing.IsDefault = false;
            }
        }

        // Update workflow definition
        workflowDefinition.Name = request.Name;
        workflowDefinition.NameAr = request.NameAr;
        workflowDefinition.Description = request.Description;
        workflowDefinition.DescriptionAr = request.DescriptionAr;
        workflowDefinition.IsDefault = request.IsDefault;
        workflowDefinition.Version++;

        // Remove existing steps
        foreach (var step in workflowDefinition.Steps.ToList())
        {
            step.IsDeleted = true;
        }

        // Create new steps
        var newSteps = new List<WorkflowStep>();
        foreach (var stepDto in request.Steps.OrderBy(s => s.StepOrder))
        {
            var step = new WorkflowStep
            {
                WorkflowDefinitionId = workflowDefinition.Id,
                StepOrder = stepDto.StepOrder,
                Name = stepDto.Name,
                NameAr = stepDto.NameAr,
                StepType = stepDto.StepType,
                ApproverType = stepDto.ApproverType,
                ApproverRoleId = stepDto.ApproverRoleId,
                ApproverUserId = stepDto.ApproverUserId,
                ConditionJson = stepDto.ConditionJson,
                TimeoutHours = stepDto.TimeoutHours,
                AllowDelegation = stepDto.AllowDelegation,
                NotifyOnAction = stepDto.NotifyOnAction,
                NotifyRequesterOnReach = stepDto.NotifyRequesterOnReach,
                ApproverInstructions = stepDto.ApproverInstructions,
                ApproverInstructionsAr = stepDto.ApproverInstructionsAr,
                RequireCommentsOnApprove = stepDto.RequireCommentsOnApprove,
                RequireCommentsOnReject = stepDto.RequireCommentsOnReject
            };

            _context.WorkflowSteps.Add(step);
            newSteps.Add(step);
        }

        await _context.SaveChangesAsync(cancellationToken);

        // Update step references
        foreach (var stepDto in request.Steps)
        {
            var step = newSteps.FirstOrDefault(s => s.StepOrder == stepDto.StepOrder);
            if (step == null) continue;

            if (stepDto.OnApproveNextStepId.HasValue)
            {
                var nextStep = newSteps.FirstOrDefault(s => s.StepOrder == stepDto.OnApproveNextStepId);
                step.OnApproveNextStepId = nextStep?.Id;
            }

            if (stepDto.OnRejectNextStepId.HasValue)
            {
                var nextStep = newSteps.FirstOrDefault(s => s.StepOrder == stepDto.OnRejectNextStepId);
                step.OnRejectNextStepId = nextStep?.Id;
            }

            if (stepDto.EscalationStepId.HasValue)
            {
                var escalationStep = newSteps.FirstOrDefault(s => s.StepOrder == stepDto.EscalationStepId);
                step.EscalationStepId = escalationStep?.Id;
            }
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}
