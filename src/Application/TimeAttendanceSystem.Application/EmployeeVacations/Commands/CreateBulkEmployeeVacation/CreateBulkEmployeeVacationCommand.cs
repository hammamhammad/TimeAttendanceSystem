using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateBulkEmployeeVacation;

/// <summary>
/// CQRS command for creating bulk employee vacation records.
/// Handles vacation assignment to multiple employees based on organizational structure (Branch/Department).
/// </summary>
/// <param name="VacationTypeId">Vacation type identifier for categorization</param>
/// <param name="StartDate">Start date of vacation period</param>
/// <param name="EndDate">End date of vacation period</param>
/// <param name="AssignmentType">Type of bulk assignment (Branch or Department)</param>
/// <param name="BranchId">Branch identifier for branch-wide vacation assignment</param>
/// <param name="DepartmentId">Department identifier for department-wide vacation assignment</param>
/// <param name="IsApproved">Whether vacation is approved (affects attendance)</param>
/// <param name="Notes">Optional notes about the vacation</param>
/// <remarks>
/// Command Processing:
/// - Validates vacation type exists and is active
/// - Validates branch or department exists based on assignment type
/// - Retrieves all active employees from the specified branch/department
/// - Creates individual vacation records for each eligible employee
/// - Checks for overlapping vacation periods per employee
/// - Returns count of successfully created vacation records
///
/// Business Rules Enforced:
/// - End date must be after or equal to start date
/// - Either BranchId or DepartmentId must be provided based on AssignmentType
/// - No overlapping vacations for same employee in the date range
/// - Only active employees receive vacation assignments
/// - Vacation type must be active
/// - Users must have bulk vacation creation permissions
///
/// Assignment Types:
/// - Branch: Assigns vacation to all active employees in the specified branch
/// - Department: Assigns vacation to all active employees in the specified department
///
/// Integration Effects:
/// - Approved vacations update attendance status to OnLeave for affected periods
/// - Individual vacation records created for proper audit trail and management
/// - Bulk operation maintains transactional integrity
/// </remarks>
public record CreateBulkEmployeeVacationCommand(
    long VacationTypeId,
    DateTime StartDate,
    DateTime EndDate,
    BulkAssignmentType AssignmentType,
    long? BranchId = null,
    long? DepartmentId = null,
    bool IsApproved = true,
    string? Notes = null
) : IRequest<Result<BulkVacationCreationResult>>;

/// <summary>
/// Enumeration defining the types of bulk vacation assignments.
/// </summary>
public enum BulkAssignmentType
{
    /// <summary>
    /// Assign vacation to all employees in a specific branch.
    /// </summary>
    Branch = 1,

    /// <summary>
    /// Assign vacation to all employees in a specific department.
    /// </summary>
    Department = 2
}

/// <summary>
/// Result object containing information about the bulk vacation creation operation.
/// </summary>
public class BulkVacationCreationResult
{
    /// <summary>
    /// Total number of employees that were eligible for vacation assignment.
    /// </summary>
    public int TotalEligibleEmployees { get; set; }

    /// <summary>
    /// Number of vacation records successfully created.
    /// </summary>
    public int VacationsCreated { get; set; }

    /// <summary>
    /// Number of employees that were skipped due to existing overlapping vacations.
    /// </summary>
    public int EmployeesSkipped { get; set; }

    /// <summary>
    /// List of employee names that were skipped with reasons.
    /// </summary>
    public List<SkippedEmployee> SkippedEmployees { get; set; } = new();

    /// <summary>
    /// Indicates whether the operation was completely successful.
    /// </summary>
    public bool IsCompleteSuccess => EmployeesSkipped == 0;

    /// <summary>
    /// Summary message describing the operation result.
    /// </summary>
    public string Summary => EmployeesSkipped == 0
        ? $"Successfully created {VacationsCreated} vacation records for all eligible employees."
        : $"Created {VacationsCreated} vacation records. {EmployeesSkipped} employees were skipped due to conflicts.";
}

/// <summary>
/// Information about an employee that was skipped during bulk vacation creation.
/// </summary>
public class SkippedEmployee
{
    /// <summary>
    /// Employee identifier.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Employee full name.
    /// </summary>
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>
    /// Employee number for identification.
    /// </summary>
    public string EmployeeNumber { get; set; } = string.Empty;

    /// <summary>
    /// Reason why the employee was skipped.
    /// </summary>
    public string Reason { get; set; } = string.Empty;
}