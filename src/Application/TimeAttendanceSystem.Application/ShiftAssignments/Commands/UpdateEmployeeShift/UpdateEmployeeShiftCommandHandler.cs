using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.ShiftAssignments.Commands.UpdateEmployeeShift;

/// <summary>
/// Command handler for updating an employee's current shift assignment.
/// Implements comprehensive business logic for shift changes with proper audit trail and validation.
/// </summary>
/// <remarks>
/// Handler Responsibilities:
/// - Validate employee exists and user has access
/// - Validate new shift exists and is active
/// - Deactivate existing active shift assignments for the employee
/// - Create new active shift assignment
/// - Maintain proper audit trail and effective dates
/// - Ensure data consistency through transaction management
///
/// Business Rules:
/// - Employee must exist and be active
/// - New shift must exist and be active
/// - User must have access to the employee's branch (multi-tenant security)
/// - Only one active shift assignment per employee at any time
/// - Effective date cannot be in the distant past
/// - Previous assignments are deactivated, not deleted (audit trail)
///
/// Security:
/// - Branch-scoped access control enforced
/// - System administrators have unrestricted access
/// - Audit logging for all shift changes
/// - Input validation to prevent malicious data
/// </remarks>
public class UpdateEmployeeShiftCommandHandler : BaseHandler<UpdateEmployeeShiftCommand, Result<bool>>
{
    /// <summary>
    /// Initializes a new instance of the UpdateEmployeeShiftCommandHandler.
    /// </summary>
    /// <param name="context">Database context for data access operations</param>
    /// <param name="currentUser">Current user context for authorization and audit</param>
    public UpdateEmployeeShiftCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    /// <summary>
    /// Handles the employee shift update command with comprehensive validation and business logic.
    /// Updates an employee's current shift assignment while maintaining audit trail and data consistency.
    /// </summary>
    /// <param name="request">Update employee shift command with employee ID and new shift details</param>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Result indicating success or failure of the shift update operation</returns>
    public override async Task<Result<bool>> Handle(UpdateEmployeeShiftCommand request, CancellationToken cancellationToken)
    {
        // Set effective date to today if not specified
        var effectiveDate = request.EffectiveDate ?? DateTime.UtcNow.Date;

        // Validate effective date is not too far in the past
        if (effectiveDate < DateTime.UtcNow.AddYears(-1))
        {
            return Result.Failure<bool>("Effective date cannot be more than 1 year in the past.");
        }

        // Validate employee exists and get branch information for access control
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<bool>("Employee not found or is inactive.");
        }

        // Enforce branch-scoped access control
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
        {
            return Result.Failure<bool>("Access denied to this employee's branch.");
        }

        // Validate new shift exists and is active
        var newShift = await Context.Shifts
            .FirstOrDefaultAsync(s => s.Id == request.NewShiftId && s.Status == ShiftStatus.Active, cancellationToken);

        if (newShift == null)
        {
            return Result.Failure<bool>("Shift not found or is not active.");
        }

        // Check if the employee already has this shift assigned
        var existingActiveAssignment = await Context.ShiftAssignments
            .Where(sa => sa.EmployeeId == request.EmployeeId &&
                        sa.AssignmentType == ShiftAssignmentType.Employee &&
                        sa.Status == ShiftAssignmentStatus.Active &&
                        sa.EffectiveFromDate <= DateTime.UtcNow &&
                        (sa.EffectiveToDate == null || sa.EffectiveToDate >= DateTime.UtcNow))
            .OrderByDescending(sa => sa.Priority)
            .ThenByDescending(sa => sa.EffectiveFromDate)
            .FirstOrDefaultAsync(cancellationToken);

        if (existingActiveAssignment?.ShiftId == request.NewShiftId)
        {
            return Result.Failure<bool>("Employee is already assigned to this shift.");
        }

        // Deactivate any existing active shift assignments for this employee
        var activeAssignments = await Context.ShiftAssignments
            .Where(sa => sa.EmployeeId == request.EmployeeId &&
                        sa.AssignmentType == ShiftAssignmentType.Employee &&
                        sa.Status == ShiftAssignmentStatus.Active)
            .ToListAsync(cancellationToken);

        foreach (var assignment in activeAssignments)
        {
            assignment.Status = ShiftAssignmentStatus.Inactive;
            assignment.EffectiveToDate = effectiveDate.AddDays(-1); // End the day before new assignment starts
            assignment.ModifiedAtUtc = DateTime.UtcNow;
            assignment.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
        }

        // Create new active shift assignment
        var newAssignment = new ShiftAssignment
        {
            ShiftId = request.NewShiftId,
            AssignmentType = ShiftAssignmentType.Employee,
            EmployeeId = request.EmployeeId,
            DepartmentId = null,
            BranchId = null,
            EffectiveFromDate = effectiveDate,
            EffectiveToDate = null, // No end date - active until changed
            Status = ShiftAssignmentStatus.Active,
            Priority = 10, // Standard priority for employee assignments
            Notes = request.Notes ?? "Shift assignment updated via employee management",
            AssignedByUserId = CurrentUser.UserId ?? 1, // Default to system admin user
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        // Validate the new assignment
        var (isValid, errors) = newAssignment.ValidateAssignment();
        if (!isValid)
        {
            return Result.Failure<bool>($"Invalid shift assignment: {string.Join(", ", errors)}");
        }

        // Add new assignment to context
        Context.ShiftAssignments.Add(newAssignment);

        // Save changes
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}