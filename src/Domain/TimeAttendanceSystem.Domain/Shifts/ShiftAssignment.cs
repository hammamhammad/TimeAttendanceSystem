using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Domain.Shifts;

/// <summary>
/// Domain entity representing shift assignments to employees, departments, or branches.
/// Provides comprehensive shift assignment management with effective date tracking and hierarchical assignment support.
/// </summary>
/// <remarks>
/// ShiftAssignment Entity Features:
/// - Multi-level assignment support: Employee, Department, and Branch levels
/// - Effective date management for future and historical assignments
/// - Assignment priority and override capabilities for conflict resolution
/// - Comprehensive audit trail and status tracking
/// - Automatic inheritance from department/branch to employee level
/// - Flexible assignment patterns supporting various business needs
///
/// Assignment Hierarchy:
/// - Branch assignments apply to all employees in the branch (lowest priority)
/// - Department assignments apply to all employees in the department (medium priority)
/// - Employee assignments are individual and specific (highest priority)
/// - Higher priority assignments override lower priority ones
/// - Effective dates determine when assignments become active
///
/// Effective Date Management:
/// - Support for future-dated assignments for planning purposes
/// - Historical tracking of past assignments for audit and reporting
/// - Automatic activation and deactivation based on date ranges
/// - End date support for temporary assignments
/// - Assignment scheduling for shift rotation and coverage planning
///
/// Business Rules:
/// - Only one active assignment per entity per effective date
/// - Employee-level assignments override department and branch assignments
/// - Department assignments override branch assignments for employees in that department
/// - Assignments cannot overlap for the same target entity and date range
/// - Effective dates must be logical (start date before end date if end date exists)
/// - Shifts must be active to be assigned
///
/// Integration Points:
/// - Links to Shift entity for comprehensive shift management
/// - Employee relationship for individual assignments
/// - Department relationship for departmental assignments
/// - Branch relationship for branch-wide assignments
/// - Attendance system integration for shift-based time tracking
/// - Reporting system for assignment analytics and compliance
/// </remarks>
public class ShiftAssignment : BaseEntity
{
    /// <summary>
    /// Gets or sets the shift identifier that is being assigned.
    /// Links to the Shift entity defining the work schedule and rules.
    /// </summary>
    /// <value>Shift ID referencing the shift definition to be assigned</value>
    public long ShiftId { get; set; }

    /// <summary>
    /// Gets or sets the type of assignment indicating the target level.
    /// Determines whether this assignment applies to an employee, department, or branch.
    /// </summary>
    /// <value>Assignment type enum value specifying the scope of the assignment</value>
    public ShiftAssignmentType AssignmentType { get; set; }

    /// <summary>
    /// Gets or sets the employee identifier for employee-level assignments.
    /// Only populated when AssignmentType is Employee.
    /// </summary>
    /// <value>Employee ID for individual shift assignments (optional)</value>
    public long? EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the department identifier for department-level assignments.
    /// Only populated when AssignmentType is Department.
    /// </summary>
    /// <value>Department ID for departmental shift assignments (optional)</value>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Gets or sets the branch identifier for branch-level assignments.
    /// Only populated when AssignmentType is Branch.
    /// </summary>
    /// <value>Branch ID for branch-wide shift assignments (optional)</value>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the effective date when this assignment becomes active.
    /// Supports future-dated assignments for planning and scheduling purposes.
    /// </summary>
    /// <value>Date when the shift assignment takes effect</value>
    public DateTime EffectiveDate { get; set; }

    /// <summary>
    /// Gets or sets the end date when this assignment expires.
    /// Optional field supporting temporary assignments and shift rotations.
    /// </summary>
    /// <value>Date when the shift assignment ends (optional for permanent assignments)</value>
    public DateTime? EndDate { get; set; }

    /// <summary>
    /// Gets or sets the status of the shift assignment.
    /// Controls whether the assignment is active, pending, or inactive.
    /// </summary>
    /// <value>Assignment status enum value controlling assignment state</value>
    public ShiftAssignmentStatus Status { get; set; }

    /// <summary>
    /// Gets or sets the priority of this assignment for conflict resolution.
    /// Higher values take precedence when multiple assignments apply to the same entity.
    /// </summary>
    /// <value>Numeric priority value for assignment precedence (higher = more important)</value>
    public int Priority { get; set; }

    /// <summary>
    /// Gets or sets optional notes or comments about this assignment.
    /// Provides context and reasoning for the assignment decision.
    /// </summary>
    /// <value>Descriptive text about the assignment (optional)</value>
    public string? Notes { get; set; }

    /// <summary>
    /// Gets or sets the user identifier who assigned this shift.
    /// Provides accountability and audit trail for assignment decisions.
    /// </summary>
    /// <value>User ID of the person who created this assignment</value>
    public long AssignedByUserId { get; set; }

    // Navigation properties
    /// <summary>
    /// Gets or sets the shift entity that is being assigned.
    /// Navigation property providing access to shift details and rules.
    /// </summary>
    /// <value>Shift entity containing the work schedule definition</value>
    public Shift Shift { get; set; } = null!;

    /// <summary>
    /// Gets or sets the employee entity for employee-level assignments.
    /// Navigation property for individual shift assignments.
    /// </summary>
    /// <value>Employee entity for person-specific assignments (optional)</value>
    public Employee? Employee { get; set; }

    /// <summary>
    /// Gets or sets the department entity for department-level assignments.
    /// Navigation property for departmental shift assignments.
    /// </summary>
    /// <value>Department entity for department-wide assignments (optional)</value>
    public Department? Department { get; set; }

    /// <summary>
    /// Gets or sets the branch entity for branch-level assignments.
    /// Navigation property for branch-wide shift assignments.
    /// </summary>
    /// <value>Branch entity for organization-wide assignments (optional)</value>
    public Branch? Branch { get; set; }

    /// <summary>
    /// Validates the shift assignment business rules and data integrity.
    /// Ensures assignment is properly configured and follows business logic.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages if validation fails</returns>
    public (bool IsValid, List<string> Errors) ValidateAssignment()
    {
        var errors = new List<string>();

        // Validate assignment type matches populated fields
        switch (AssignmentType)
        {
            case ShiftAssignmentType.Employee:
                if (!EmployeeId.HasValue)
                    errors.Add("Employee ID is required for employee-level assignments");
                if (DepartmentId.HasValue || BranchId.HasValue)
                    errors.Add("Department and Branch IDs must be null for employee-level assignments");
                break;

            case ShiftAssignmentType.Department:
                if (!DepartmentId.HasValue)
                    errors.Add("Department ID is required for department-level assignments");
                if (EmployeeId.HasValue || BranchId.HasValue)
                    errors.Add("Employee and Branch IDs must be null for department-level assignments");
                break;

            case ShiftAssignmentType.Branch:
                if (!BranchId.HasValue)
                    errors.Add("Branch ID is required for branch-level assignments");
                if (EmployeeId.HasValue || DepartmentId.HasValue)
                    errors.Add("Employee and Department IDs must be null for branch-level assignments");
                break;

            default:
                errors.Add("Invalid assignment type specified");
                break;
        }

        // Validate date logic
        if (EndDate.HasValue && EndDate <= EffectiveDate)
        {
            errors.Add("End date must be after effective date");
        }

        // Validate effective date is not in the distant past (more than 5 years)
        if (EffectiveDate < DateTime.UtcNow.AddYears(-5))
        {
            errors.Add("Effective date cannot be more than 5 years in the past");
        }

        // Validate priority is within reasonable range
        if (Priority < 0 || Priority > 100)
        {
            errors.Add("Priority must be between 0 and 100");
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Determines if this assignment is currently active based on dates and status.
    /// </summary>
    /// <returns>True if the assignment is active for the current date</returns>
    public bool IsCurrentlyActive()
    {
        var now = DateTime.UtcNow.Date;
        return Status == ShiftAssignmentStatus.Active &&
               EffectiveDate.Date <= now &&
               (!EndDate.HasValue || EndDate.Value.Date >= now);
    }

    /// <summary>
    /// Determines if this assignment will be active on a specific date.
    /// </summary>
    /// <param name="date">The date to check assignment status for</param>
    /// <returns>True if the assignment is active on the specified date</returns>
    public bool IsActiveOnDate(DateTime date)
    {
        return Status == ShiftAssignmentStatus.Active &&
               EffectiveDate.Date <= date.Date &&
               (!EndDate.HasValue || EndDate.Value.Date >= date.Date);
    }

    /// <summary>
    /// Gets the target entity name for display purposes.
    /// </summary>
    /// <returns>String representation of the assignment target</returns>
    public string GetTargetDisplayName()
    {
        return AssignmentType switch
        {
            ShiftAssignmentType.Employee => Employee?.FullName ?? $"Employee ID: {EmployeeId}",
            ShiftAssignmentType.Department => Department?.Name ?? $"Department ID: {DepartmentId}",
            ShiftAssignmentType.Branch => Branch?.Name ?? $"Branch ID: {BranchId}",
            _ => "Unknown Target"
        };
    }
}