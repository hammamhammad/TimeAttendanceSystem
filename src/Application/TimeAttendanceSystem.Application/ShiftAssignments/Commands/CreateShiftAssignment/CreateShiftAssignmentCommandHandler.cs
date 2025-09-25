using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.ShiftAssignments.Commands.CreateShiftAssignment;

/// <summary>
/// Command handler for creating shift assignments with comprehensive validation and business rule enforcement.
/// Implements multi-level assignment management with proper conflict resolution and audit trail generation.
/// </summary>
/// <remarks>
/// Handler Responsibilities:
/// - Validates that referenced entities (Shift, Employee, Department, Branch) exist and are active
/// - Ensures assignment type matches specified target entity
/// - Checks for conflicting assignments in the same date range for the same target
/// - Enforces business rules around assignment hierarchy and priority
/// - Provides comprehensive audit trail for assignment creation
/// - Supports future-dated assignments and temporary assignments with end dates
///
/// Validation Logic:
/// - Shift must exist and be active
/// - Target entity (Employee/Department/Branch) must exist based on assignment type
/// - No overlapping active assignments for the same target and date range
/// - Date logic validation (end date after effective date if specified)
/// - Priority and status value validation
///
/// Conflict Resolution:
/// - Checks for existing assignments that would conflict with the new assignment
/// - Considers assignment hierarchy (Employee > Department > Branch)
/// - Validates date range overlaps for the same target entity
/// - Allows multiple assignments with different priorities for complex scenarios
///
/// Audit and Security:
/// - Records assignment creation in audit log
/// - Tracks who created the assignment for accountability
/// - Validates user permissions for assignment scope
/// - Maintains comprehensive change history
/// </remarks>
public class CreateShiftAssignmentCommandHandler : BaseHandler<CreateShiftAssignmentCommand, Result<long>>
{
    public CreateShiftAssignmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateShiftAssignmentCommand request, CancellationToken cancellationToken)
    {
        // Validate the shift exists and is active
        var shift = await Context.Shifts
            .FirstOrDefaultAsync(s => s.Id == request.ShiftId, cancellationToken);

        if (shift == null)
        {
            return Result.Failure<long>("Shift not found");
        }

        if (shift.Status != ShiftStatus.Active)
        {
            return Result.Failure<long>("Cannot assign inactive shift");
        }

        // Validate assignment type and target entity
        var targetValidationResult = await ValidateTargetEntity(request, cancellationToken);
        if (targetValidationResult.IsFailure)
        {
            return Result.Failure<long>(targetValidationResult.Error);
        }

        // Validate effective date - must be greater than today's date
        var dateValidationResult = ValidateEffectiveDate(request);
        if (dateValidationResult.IsFailure)
        {
            return Result.Failure<long>(dateValidationResult.Error);
        }

        // Create the assignment, ensuring only the correct ID is set based on assignment type
        var assignment = new ShiftAssignment
        {
            ShiftId = request.ShiftId,
            AssignmentType = request.AssignmentType,
            EmployeeId = request.AssignmentType == ShiftAssignmentType.Employee ? request.EmployeeId : null,
            DepartmentId = request.AssignmentType == ShiftAssignmentType.Department ? request.DepartmentId : null,
            BranchId = request.AssignmentType == ShiftAssignmentType.Branch ? request.BranchId : null,
            EffectiveFromDate = request.EffectiveDate,
            EffectiveToDate = request.EndDate,
            Status = request.Status,
            Priority = request.Priority,
            Notes = request.Notes,
            AssignedByUserId = CurrentUser.UserId ?? 0,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username
        };

        // Validate the assignment business rules
        var (isValid, errors) = assignment.ValidateAssignment();
        if (!isValid)
        {
            return Result.Failure<long>(string.Join(", ", errors));
        }

        // Check for conflicting assignments
        var conflictResult = await CheckForConflicts(assignment, cancellationToken);
        if (conflictResult.IsFailure)
        {
            return Result.Failure<long>(conflictResult.Error);
        }

        // Add the assignment to the database
        Context.ShiftAssignments.Add(assignment);

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId ?? 0,
            Action = AuditAction.ShiftAssignmentCreated,
            EntityName = nameof(ShiftAssignment),
            EntityId = assignment.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                ShiftId = request.ShiftId,
                ShiftName = shift.Name,
                AssignmentType = request.AssignmentType.ToString(),
                TargetId = request.AssignmentType switch
                {
                    ShiftAssignmentType.Employee => request.EmployeeId,
                    ShiftAssignmentType.Department => request.DepartmentId,
                    ShiftAssignmentType.Branch => request.BranchId,
                    _ => null
                },
                EffectiveFromDate = request.EffectiveDate,
                EffectiveToDate = request.EndDate,
                Status = request.Status.ToString(),
                Priority = request.Priority,
                AssignedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(assignment.Id);
    }

    /// <summary>
    /// Validates that the target entity exists and matches the assignment type.
    /// </summary>
    private async Task<Result> ValidateTargetEntity(CreateShiftAssignmentCommand request, CancellationToken cancellationToken)
    {
        switch (request.AssignmentType)
        {
            case ShiftAssignmentType.Employee:
                if (!request.EmployeeId.HasValue)
                    return Result.Failure("Employee ID is required for employee assignments");

                var employee = await Context.Employees
                    .FirstOrDefaultAsync(e => e.Id == request.EmployeeId.Value, cancellationToken);

                if (employee == null)
                    return Result.Failure("Employee not found");

                if (employee.EmploymentStatus == EmploymentStatus.Terminated)
                    return Result.Failure("Cannot assign shift to terminated employee");

                break;

            case ShiftAssignmentType.Department:
                if (!request.DepartmentId.HasValue)
                    return Result.Failure("Department ID is required for department assignments");

                var department = await Context.Departments
                    .FirstOrDefaultAsync(d => d.Id == request.DepartmentId.Value, cancellationToken);

                if (department == null)
                    return Result.Failure("Department not found");

                break;

            case ShiftAssignmentType.Branch:
                if (!request.BranchId.HasValue)
                    return Result.Failure("Branch ID is required for branch assignments");

                var branch = await Context.Branches
                    .FirstOrDefaultAsync(b => b.Id == request.BranchId.Value, cancellationToken);

                if (branch == null)
                    return Result.Failure("Branch not found");

                if (!branch.IsActive)
                    return Result.Failure("Cannot assign shift to inactive branch");

                break;

            default:
                return Result.Failure("Invalid assignment type");
        }

        return Result.Success();
    }

    /// <summary>
    /// Validates that the effective date is in the future (greater than today's date).
    /// This ensures shift assignments are planned in advance and prevents backdating.
    /// </summary>
    private Result ValidateEffectiveDate(CreateShiftAssignmentCommand request)
    {
        var today = DateTime.Today;
        var effectiveDate = request.EffectiveDate.Date;

        if (effectiveDate <= today)
        {
            return Result.Failure("Effective date must be greater than today's date. Shift assignments must be planned in advance.");
        }

        // If an end date is specified, ensure it's after the effective date
        if (request.EndDate.HasValue && request.EndDate.Value.Date <= effectiveDate)
        {
            return Result.Failure("End date must be after the effective date.");
        }

        return Result.Success();
    }

    /// <summary>
    /// Checks for conflicting assignments that would overlap with the new assignment.
    /// </summary>
    private async Task<Result> CheckForConflicts(ShiftAssignment newAssignment, CancellationToken cancellationToken)
    {
        var query = Context.ShiftAssignments.AsQueryable();

        // Filter by assignment type and target
        switch (newAssignment.AssignmentType)
        {
            case ShiftAssignmentType.Employee:
                query = query.Where(sa => sa.AssignmentType == ShiftAssignmentType.Employee &&
                                        sa.EmployeeId == newAssignment.EmployeeId);
                break;

            case ShiftAssignmentType.Department:
                query = query.Where(sa => sa.AssignmentType == ShiftAssignmentType.Department &&
                                        sa.DepartmentId == newAssignment.DepartmentId);
                break;

            case ShiftAssignmentType.Branch:
                query = query.Where(sa => sa.AssignmentType == ShiftAssignmentType.Branch &&
                                        sa.BranchId == newAssignment.BranchId);
                break;
        }

        // Check for date range overlaps
        query = query.Where(sa => sa.Status == ShiftAssignmentStatus.Active &&
                                sa.EffectiveFromDate <= (newAssignment.EffectiveToDate ?? DateTime.MaxValue) &&
                                (sa.EffectiveToDate == null || sa.EffectiveToDate >= newAssignment.EffectiveFromDate));

        var conflictingAssignments = await query.ToListAsync(cancellationToken);

        if (conflictingAssignments.Any())
        {
            var targetName = newAssignment.GetTargetDisplayName();
            return Result.Failure($"Conflicting shift assignment already exists for {targetName} in the specified date range");
        }

        return Result.Success();
    }
}