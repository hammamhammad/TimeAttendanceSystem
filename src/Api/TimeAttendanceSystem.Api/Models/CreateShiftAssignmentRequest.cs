using TimeAttendanceSystem.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for creating new shift assignments with comprehensive validation.
/// Supports assignment to employees, departments, or branches with effective date management.
/// </summary>
/// <remarks>
/// Request Features:
/// - Multi-level assignment support (Employee, Department, Branch)
/// - Effective date management with optional end dates
/// - Priority-based assignment system
/// - Status control for assignment lifecycle
/// - Comprehensive validation attributes
/// - Optional notes for assignment context
///
/// Validation Rules:
/// - ShiftId must reference an existing active shift
/// - AssignmentType determines which target ID field is required
/// - EffectiveDate cannot be more than 5 years in the past
/// - EndDate must be after EffectiveDate if specified
/// - Priority must be between 0 and 100
/// - Notes are optional but limited to 1000 characters
/// </remarks>
public class CreateShiftAssignmentRequest
{
    /// <summary>
    /// Gets or sets the identifier of the shift to be assigned.
    /// Must reference an existing active shift in the system.
    /// </summary>
    [Required(ErrorMessage = "Shift ID is required")]
    [Range(1, long.MaxValue, ErrorMessage = "Shift ID must be a positive number")]
    public long ShiftId { get; set; }

    /// <summary>
    /// Gets or sets the type of assignment indicating the organizational level.
    /// Determines whether this is an Employee, Department, or Branch assignment.
    /// </summary>
    [Required(ErrorMessage = "Assignment type is required")]
    [EnumDataType(typeof(ShiftAssignmentType), ErrorMessage = "Invalid assignment type")]
    public ShiftAssignmentType AssignmentType { get; set; }

    /// <summary>
    /// Gets or sets the employee identifier for employee-level assignments.
    /// Required when AssignmentType is Employee, must be null otherwise.
    /// </summary>
    public long? EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the department identifier for department-level assignments.
    /// Required when AssignmentType is Department, must be null otherwise.
    /// </summary>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Gets or sets the branch identifier for branch-level assignments.
    /// Required when AssignmentType is Branch, must be null otherwise.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the date when this assignment becomes effective.
    /// Supports future-dated assignments for planning and scheduling.
    /// </summary>
    [Required(ErrorMessage = "Effective date is required")]
    public DateTime EffectiveDate { get; set; }

    /// <summary>
    /// Gets or sets the optional end date for temporary assignments.
    /// If null, the assignment is considered permanent until manually changed.
    /// </summary>
    public DateTime? EndDate { get; set; }

    /// <summary>
    /// Gets or sets the initial status of the assignment.
    /// Defaults to Active for immediate assignments, use Pending for future assignments.
    /// </summary>
    [EnumDataType(typeof(ShiftAssignmentStatus), ErrorMessage = "Invalid assignment status")]
    public ShiftAssignmentStatus Status { get; set; } = ShiftAssignmentStatus.Active;

    /// <summary>
    /// Gets or sets the priority of this assignment for conflict resolution.
    /// Higher values take precedence when multiple assignments could apply.
    /// </summary>
    [Range(0, 100, ErrorMessage = "Priority must be between 0 and 100")]
    public int Priority { get; set; } = 10;

    /// <summary>
    /// Gets or sets optional notes providing context about the assignment.
    /// Used for documenting the reason or business justification for the assignment.
    /// </summary>
    [MaxLength(1000, ErrorMessage = "Notes cannot exceed 1000 characters")]
    public string? Notes { get; set; }

    /// <summary>
    /// Validates that the request has proper assignment type and target entity pairing.
    /// </summary>
    /// <returns>Validation result with any errors found</returns>
    public ValidationResult? ValidateAssignmentTarget()
    {
        var hasEmployee = EmployeeId.HasValue;
        var hasDepartment = DepartmentId.HasValue;
        var hasBranch = BranchId.HasValue;

        switch (AssignmentType)
        {
            case ShiftAssignmentType.Employee:
                if (!hasEmployee)
                    return new ValidationResult("Employee ID is required for employee assignments");
                if (hasDepartment || hasBranch)
                    return new ValidationResult("Only Employee ID should be specified for employee assignments");
                break;

            case ShiftAssignmentType.Department:
                if (!hasDepartment)
                    return new ValidationResult("Department ID is required for department assignments");
                if (hasEmployee || hasBranch)
                    return new ValidationResult("Only Department ID should be specified for department assignments");
                break;

            case ShiftAssignmentType.Branch:
                if (!hasBranch)
                    return new ValidationResult("Branch ID is required for branch assignments");
                if (hasEmployee || hasDepartment)
                    return new ValidationResult("Only Branch ID should be specified for branch assignments");
                break;

            default:
                return new ValidationResult("Invalid assignment type");
        }

        return ValidationResult.Success;
    }

    /// <summary>
    /// Validates that the end date is after the effective date if specified.
    /// </summary>
    /// <returns>Validation result with any date logic errors</returns>
    public ValidationResult? ValidateDateLogic()
    {
        if (EndDate.HasValue && EndDate <= EffectiveDate)
        {
            return new ValidationResult("End date must be after effective date");
        }

        return ValidationResult.Success;
    }
}