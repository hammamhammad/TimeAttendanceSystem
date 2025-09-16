using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.ShiftAssignments.Commands.CreateShiftAssignment;

/// <summary>
/// Command for creating new shift assignments to employees, departments, or branches.
/// Supports comprehensive shift assignment management with effective date tracking and hierarchical assignment capabilities.
/// </summary>
/// <remarks>
/// Command Features:
/// - Multi-level assignment support for Employee, Department, and Branch levels
/// - Effective date management for future and historical assignments
/// - Priority-based assignment with conflict resolution capabilities
/// - Status management for assignment lifecycle control
/// - Comprehensive validation and business rule enforcement
/// - Audit trail integration for assignment tracking
///
/// Assignment Types:
/// - Employee: Individual shift assignment with highest priority
/// - Department: Department-wide assignment with medium priority
/// - Branch: Organization-wide assignment with lowest priority
/// - Priority system allows for proper override behavior
///
/// Business Rules:
/// - Only one target type (Employee, Department, or Branch) can be specified per assignment
/// - Effective dates must be logical (end date after start date if specified)
/// - Assignments cannot conflict for the same target and overlapping dates
/// - Referenced entities (Shift, Employee, Department, Branch) must exist and be active
/// - User must have permission to create assignments for the specified scope
/// </remarks>
public record CreateShiftAssignmentCommand(
    /// <summary>
    /// The identifier of the shift to be assigned.
    /// Must reference an active shift in the system.
    /// </summary>
    long ShiftId,

    /// <summary>
    /// The type of assignment indicating the organizational level.
    /// Determines whether this is an Employee, Department, or Branch assignment.
    /// </summary>
    ShiftAssignmentType AssignmentType,

    /// <summary>
    /// The employee identifier for employee-level assignments.
    /// Required when AssignmentType is Employee, must be null otherwise.
    /// </summary>
    long? EmployeeId = null,

    /// <summary>
    /// The department identifier for department-level assignments.
    /// Required when AssignmentType is Department, must be null otherwise.
    /// </summary>
    long? DepartmentId = null,

    /// <summary>
    /// The branch identifier for branch-level assignments.
    /// Required when AssignmentType is Branch, must be null otherwise.
    /// </summary>
    long? BranchId = null,

    /// <summary>
    /// The date when this assignment becomes effective.
    /// Supports future-dated assignments for planning and scheduling.
    /// </summary>
    DateTime EffectiveDate = default,

    /// <summary>
    /// The optional end date for temporary assignments.
    /// If null, the assignment is considered permanent until manually changed.
    /// </summary>
    DateTime? EndDate = null,

    /// <summary>
    /// The initial status of the assignment.
    /// Defaults to Active for immediate assignments, use Pending for future assignments.
    /// </summary>
    ShiftAssignmentStatus Status = ShiftAssignmentStatus.Active,

    /// <summary>
    /// The priority of this assignment for conflict resolution.
    /// Higher values take precedence when multiple assignments could apply.
    /// Default priority is 10, allowing for both higher and lower priority assignments.
    /// </summary>
    int Priority = 10,

    /// <summary>
    /// Optional notes providing context about the assignment.
    /// Used for documenting the reason or business justification for the assignment.
    /// </summary>
    string? Notes = null
) : ICommand<Result<long>>;