using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Application.Workflows.Commands.CreateWorkflowDefinition;

/// <summary>
/// Handler for CreateWorkflowDefinitionCommand.
/// Creates a new workflow definition with its steps for approval workflow configuration.
/// </summary>
public class CreateWorkflowDefinitionCommandHandler : IRequestHandler<CreateWorkflowDefinitionCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;

    public CreateWorkflowDefinitionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<long>> Handle(CreateWorkflowDefinitionCommand request, CancellationToken cancellationToken)
    {
        // Validate branch exists if specified
        if (request.BranchId.HasValue)
        {
            var branchExists = await _context.Branches
                .AnyAsync(b => b.Id == request.BranchId && !b.IsDeleted, cancellationToken);

            if (!branchExists)
            {
                return Result.Failure<long>("Branch not found.");
            }
        }

        // Check for duplicate name within scope
        var duplicateExists = await _context.WorkflowDefinitions
            .AnyAsync(w => w.Name == request.Name &&
                          w.EntityType == request.EntityType &&
                          w.BranchId == request.BranchId &&
                          !w.IsDeleted,
                          cancellationToken);

        if (duplicateExists)
        {
            return Result.Failure<long>("A workflow with this name already exists for this entity type and branch.");
        }

        // If this is marked as default, unset any existing default for this entity type and branch
        if (request.IsDefault)
        {
            var existingDefaults = await _context.WorkflowDefinitions
                .Where(w => w.EntityType == request.EntityType &&
                           w.BranchId == request.BranchId &&
                           w.IsDefault &&
                           !w.IsDeleted)
                .ToListAsync(cancellationToken);

            foreach (var existing in existingDefaults)
            {
                existing.IsDefault = false;
            }
        }

        // Create the workflow definition
        var workflowDefinition = new WorkflowDefinition
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            EntityType = request.EntityType,
            BranchId = request.BranchId,
            IsActive = true,
            IsDefault = request.IsDefault,
            Version = 1
        };

        _context.WorkflowDefinitions.Add(workflowDefinition);
        await _context.SaveChangesAsync(cancellationToken);

        // Create the workflow steps
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
                TimeoutAction = stepDto.TimeoutAction,
                AllowDelegation = stepDto.AllowDelegation,
                NotifyOnAction = stepDto.NotifyOnAction,
                NotifyRequesterOnReach = stepDto.NotifyRequesterOnReach,
                ApproverInstructions = stepDto.ApproverInstructions,
                ApproverInstructionsAr = stepDto.ApproverInstructionsAr,
                RequireCommentsOnApprove = stepDto.RequireCommentsOnApprove,
                RequireCommentsOnReject = stepDto.RequireCommentsOnReject
            };

            workflowDefinition.Steps.Add(step);
        }

        await _context.SaveChangesAsync(cancellationToken);

        // Update step references (next steps, escalation steps)
        var steps = workflowDefinition.Steps.ToList();
        foreach (var stepDto in request.Steps)
        {
            var step = steps.FirstOrDefault(s => s.StepOrder == stepDto.StepOrder);
            if (step == null) continue;

            // Map step order references to actual step IDs
            if (stepDto.OnApproveNextStepId.HasValue)
            {
                var nextStep = steps.FirstOrDefault(s => s.StepOrder == stepDto.OnApproveNextStepId);
                step.OnApproveNextStepId = nextStep?.Id;
            }

            if (stepDto.OnRejectNextStepId.HasValue)
            {
                var nextStep = steps.FirstOrDefault(s => s.StepOrder == stepDto.OnRejectNextStepId);
                step.OnRejectNextStepId = nextStep?.Id;
            }

            if (stepDto.EscalationStepId.HasValue)
            {
                var escalationStep = steps.FirstOrDefault(s => s.StepOrder == stepDto.EscalationStepId);
                step.EscalationStepId = escalationStep?.Id;
            }
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(workflowDefinition.Id);
    }
}
