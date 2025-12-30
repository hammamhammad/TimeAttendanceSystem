using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Domain.Workflows;

/// <summary>
/// Domain entity representing a workflow definition that configures the approval process.
/// Defines the sequence of steps, approvers, and conditions for processing requests.
/// </summary>
/// <remarks>
/// WorkflowDefinition Features:
/// - Configurable multi-level approval chains
/// - Entity type binding (Vacation, Excuse, RemoteWork, etc.)
/// - Branch-specific or organization-wide workflows
/// - Version control for workflow modifications
/// - Active/Inactive status for lifecycle management
/// - Default workflow designation per entity type
///
/// Business Rules:
/// - Only one default workflow per entity type per branch (or organization-wide)
/// - Workflow must have at least one step to be activated
/// - Version increments on each modification
/// - Deactivation preserves running instances
/// </remarks>
public class WorkflowDefinition : BaseEntity
{
    /// <summary>
    /// Gets or sets the display name of the workflow definition.
    /// Used for identification in administration interfaces.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Arabic display name of the workflow definition.
    /// Used for RTL language support in administration interfaces.
    /// </summary>
    public string? NameAr { get; set; }

    /// <summary>
    /// Gets or sets the description of the workflow and its purpose.
    /// Provides context for administrators configuring workflows.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Gets or sets the Arabic description of the workflow.
    /// Provides context for Arabic-speaking administrators.
    /// </summary>
    public string? DescriptionAr { get; set; }

    /// <summary>
    /// Gets or sets the type of entity this workflow applies to.
    /// Determines which requests will use this workflow definition.
    /// </summary>
    public WorkflowEntityType EntityType { get; set; }

    /// <summary>
    /// Gets or sets whether this workflow is currently active.
    /// Inactive workflows cannot be used for new requests.
    /// </summary>
    public bool IsActive { get; set; } = false;

    /// <summary>
    /// Gets or sets whether this is the default workflow for the entity type.
    /// Default workflows are automatically applied when no specific workflow is assigned.
    /// </summary>
    public bool IsDefault { get; set; } = false;

    /// <summary>
    /// Gets or sets the branch this workflow applies to.
    /// Null indicates organization-wide workflow applicable to all branches.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the version number of this workflow definition.
    /// Increments each time the workflow is modified.
    /// </summary>
    public int Version { get; set; } = 1;

    /// <summary>
    /// Gets or sets the priority for workflow selection.
    /// Higher priority workflows are selected over lower priority ones.
    /// </summary>
    public int Priority { get; set; } = 0;

    // Navigation Properties

    /// <summary>
    /// Gets or sets the branch this workflow is scoped to.
    /// Navigation property for branch-specific workflow configuration.
    /// </summary>
    public Branch? Branch { get; set; }

    /// <summary>
    /// Gets or sets the collection of workflow steps.
    /// Ordered sequence of approval steps for this workflow.
    /// </summary>
    public ICollection<WorkflowStep> Steps { get; set; } = new List<WorkflowStep>();

    /// <summary>
    /// Gets or sets the collection of workflow instances using this definition.
    /// Historical record of all requests processed by this workflow.
    /// </summary>
    public ICollection<WorkflowInstance> Instances { get; set; } = new List<WorkflowInstance>();

    // Business Logic Methods

    /// <summary>
    /// Validates whether this workflow can be activated.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateForActivation()
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(Name))
        {
            errors.Add("Workflow name is required");
        }

        if (!Steps.Any())
        {
            errors.Add("Workflow must have at least one step");
        }

        if (!Steps.Any(s => s.StepType == WorkflowStepType.Approval))
        {
            errors.Add("Workflow must have at least one approval step");
        }

        // Validate step order continuity
        var stepOrders = Steps.Select(s => s.StepOrder).OrderBy(o => o).ToList();
        for (int i = 0; i < stepOrders.Count; i++)
        {
            if (stepOrders[i] != i + 1)
            {
                errors.Add("Step order must be sequential starting from 1");
                break;
            }
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Gets the first step of the workflow.
    /// </summary>
    /// <returns>The first workflow step or null if no steps exist</returns>
    public WorkflowStep? GetFirstStep()
    {
        return Steps.OrderBy(s => s.StepOrder).FirstOrDefault();
    }

    /// <summary>
    /// Gets the next step after the specified step order.
    /// </summary>
    /// <param name="currentStepOrder">Current step order</param>
    /// <returns>The next workflow step or null if at the end</returns>
    public WorkflowStep? GetNextStep(int currentStepOrder)
    {
        return Steps
            .Where(s => s.StepOrder > currentStepOrder)
            .OrderBy(s => s.StepOrder)
            .FirstOrDefault();
    }

    /// <summary>
    /// Increments the version number of this workflow.
    /// Called when workflow definition is modified.
    /// </summary>
    public void IncrementVersion()
    {
        Version++;
    }

    /// <summary>
    /// Activates this workflow for use.
    /// </summary>
    /// <returns>True if activation was successful</returns>
    public bool Activate()
    {
        var validation = ValidateForActivation();
        if (!validation.IsValid)
        {
            return false;
        }

        IsActive = true;
        return true;
    }

    /// <summary>
    /// Deactivates this workflow.
    /// Running instances continue but new requests won't use this workflow.
    /// </summary>
    public void Deactivate()
    {
        IsActive = false;
    }

    /// <summary>
    /// Sets this workflow as the default for its entity type.
    /// </summary>
    public void SetAsDefault()
    {
        IsDefault = true;
    }

    /// <summary>
    /// Removes the default designation from this workflow.
    /// </summary>
    public void RemoveDefault()
    {
        IsDefault = false;
    }
}
