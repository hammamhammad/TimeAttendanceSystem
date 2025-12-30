namespace TimeAttendanceSystem.Domain.Workflows.Enums;

/// <summary>
/// Defines how the approver is determined for a workflow step.
/// Supports dynamic and static approver assignment methods.
/// </summary>
public enum ApproverType
{
    /// <summary>
    /// Approver is the direct manager of the requesting employee.
    /// Dynamically resolved based on the employee's reporting structure.
    /// </summary>
    DirectManager = 1,

    /// <summary>
    /// Approver is any user with a specific role.
    /// All users with the role can act on the approval.
    /// </summary>
    Role = 2,

    /// <summary>
    /// Approver is a specific user defined in the workflow step.
    /// Fixed assignment regardless of requesting employee.
    /// </summary>
    SpecificUser = 3,

    /// <summary>
    /// Approver is the department head of the requesting employee.
    /// Dynamically resolved based on department hierarchy.
    /// </summary>
    DepartmentHead = 4,

    /// <summary>
    /// Approver is the branch manager of the requesting employee.
    /// Dynamically resolved based on branch hierarchy.
    /// </summary>
    BranchManager = 5,

    /// <summary>
    /// Auto-approval without human intervention.
    /// Used for validation steps that automatically pass/fail.
    /// </summary>
    System = 6
}
