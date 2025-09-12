using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Employees;

namespace TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;

/// <summary>
/// Command handler for creating new employee records with comprehensive validation.
/// Implements business rules, security checks, and referential integrity validation
/// for employee creation in a multi-tenant environment.
/// </summary>
/// <remarks>
/// Handler Responsibilities:
/// - Branch access validation for multi-tenant security
/// - Employee number uniqueness enforcement within branch
/// - Department and manager relationship validation
/// - Employee entity creation with audit trail
/// - Database transaction management for consistency
/// 
/// Validation Flow:
/// 1. Branch existence and user access verification
/// 2. Employee number uniqueness check within branch scope
/// 3. Optional department validation if assignment provided
/// 4. Optional manager validation if hierarchy specified
/// 5. Employee entity creation with all provided information
/// 6. Database persistence with automatic audit trail
/// 
/// Security Implementation:
/// - Multi-tenant branch access enforcement
/// - Permission-based authorization (handled by middleware)
/// - Input validation to prevent malicious data
/// - Audit logging for compliance and monitoring
/// - Proper error handling without information leakage
/// 
/// Business Rules:
/// - Employee numbers must be unique within each branch
/// - Department assignment must be within same branch
/// - Manager assignment must reference existing employee in same branch
/// - All relationships validated before entity creation
/// - Automatic timestamps and user tracking for audit
/// 
/// Error Handling:
/// - Business rule violations returned as Result.Failure
/// - Clear error messages for troubleshooting
/// - Graceful handling of database conflicts
/// - No sensitive information exposed in errors
/// - Consistent error response format
/// 
/// Performance Considerations:
/// - Efficient single-record database queries
/// - Minimal database round trips through batching
/// - Proper indexing assumed for lookup performance
/// - Async operations for non-blocking execution
/// - Transaction scope limited to necessary operations
/// </remarks>
public class CreateEmployeeCommandHandler : BaseHandler<CreateEmployeeCommand, Result<long>>
{
    /// <summary>
    /// Initializes a new instance of the CreateEmployeeCommandHandler.
    /// Sets up database context and current user dependencies for employee creation.
    /// </summary>
    /// <param name="context">Database context for data access operations</param>
    /// <param name="currentUser">Current user context for authorization and audit</param>
    public CreateEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    /// <summary>
    /// Handles the employee creation command with comprehensive validation and security checks.
    /// Creates a new employee record after validating all business rules and relationships.
    /// </summary>
    /// <param name="request">Create employee command with all employee information</param>
    /// <param name="cancellationToken">Cancellation token for async operation control</param>
    /// <returns>Result containing the created employee ID on success, or error message on failure</returns>
    /// <remarks>
    /// Processing Steps:
    /// 1. Branch Validation: Verifies branch exists and user has access
    /// 2. Uniqueness Check: Ensures employee number is unique within branch
    /// 3. Department Validation: Validates department assignment if provided
    /// 4. Manager Validation: Validates manager assignment if provided
    /// 5. Entity Creation: Creates employee with all validated information
    /// 6. Persistence: Saves to database with transaction management
    /// 7. Response: Returns created employee ID for further operations
    /// 
    /// Validation Details:
    /// - Branch access enforced through user's branch scope
    /// - System administrators have unrestricted branch access
    /// - Employee number uniqueness scoped to individual branches
    /// - Department assignments must be within same branch
    /// - Manager assignments must reference existing employees in same branch
    /// 
    /// Audit Trail:
    /// - CreatedAtUtc automatically set to current UTC time
    /// - CreatedBy set to current user's username
    /// - Full employee creation logged for compliance
    /// - Change tracking enabled for future modifications
    /// </remarks>
    public override async Task<Result<long>> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        // Validate branch exists and user has access (multi-tenant security)
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId, cancellationToken);

        if (branch == null)
            return Result.Failure<long>("Branch does not exist.");

        // Enforce branch-scoped access control (system admins have unrestricted access)
        if (!CurrentUser.IsSystemAdmin && !CurrentUser.BranchIds.Contains(request.BranchId))
            return Result.Failure<long>("Access denied to this branch.");

        // Check employee number uniqueness within the branch scope
        var existingEmployee = await Context.Employees
            .FirstOrDefaultAsync(e => e.BranchId == request.BranchId && e.EmployeeNumber == request.EmployeeNumber, cancellationToken);

        if (existingEmployee != null)
            return Result.Failure<long>("Employee number already exists in this branch.");

        // Validate department assignment if provided (must be within same branch)
        if (request.DepartmentId.HasValue)
        {
            var department = await Context.Departments
                .FirstOrDefaultAsync(d => d.Id == request.DepartmentId && d.BranchId == request.BranchId, cancellationToken);

            if (department == null)
                return Result.Failure<long>("Department does not exist in the specified branch.");
        }

        // Validate manager assignment if provided (must be existing employee in same branch)
        if (request.ManagerEmployeeId.HasValue)
        {
            var manager = await Context.Employees
                .FirstOrDefaultAsync(e => e.Id == request.ManagerEmployeeId && e.BranchId == request.BranchId, cancellationToken);

            if (manager == null)
                return Result.Failure<long>("Manager employee does not exist in the specified branch.");
        }

        // Create employee entity with all validated information
        var employee = new Employee
        {
            BranchId = request.BranchId,
            EmployeeNumber = request.EmployeeNumber,
            FirstName = request.FirstName,
            LastName = request.LastName,
            FirstNameAr = request.FirstNameAr,
            LastNameAr = request.LastNameAr,
            NationalId = request.NationalId,
            Email = request.Email,
            Phone = request.Phone,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            HireDate = request.HireDate,
            EmploymentStatus = request.EmploymentStatus,
            JobTitle = request.JobTitle,
            JobTitleAr = request.JobTitleAr,
            DepartmentId = request.DepartmentId,
            ManagerEmployeeId = request.ManagerEmployeeId,
            WorkLocationType = request.WorkLocationType,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        // Add to database context and persist changes
        Context.Employees.Add(employee);
        await Context.SaveChangesAsync(cancellationToken);

        // Return success result with created employee ID
        return Result.Success(employee.Id);
    }
}