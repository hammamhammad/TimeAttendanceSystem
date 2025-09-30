using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateBulkEmployeeVacation;

/// <summary>
/// Command handler for creating bulk employee vacation records.
/// Implements comprehensive validation, conflict detection, and batch processing for multiple employees.
/// </summary>
public class CreateBulkEmployeeVacationCommandHandler : IRequestHandler<CreateBulkEmployeeVacationCommand, Result<BulkVacationCreationResult>>
{
    private readonly IApplicationDbContext _context;

    public CreateBulkEmployeeVacationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the creation of bulk employee vacation records with comprehensive validation and processing.
    /// </summary>
    /// <param name="request">Command containing bulk vacation assignment details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing bulk creation statistics and details</returns>
    public async Task<Result<BulkVacationCreationResult>> Handle(CreateBulkEmployeeVacationCommand request, CancellationToken cancellationToken)
    {
        // Validate vacation type exists and is active
        var vacationType = await _context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.Id == request.VacationTypeId && vt.IsActive, cancellationToken);

        if (vacationType == null)
        {
            return Result.Failure<BulkVacationCreationResult>("Vacation type not found or inactive");
        }

        // Validate assignment target exists
        var targetValidationResult = await ValidateAssignmentTarget(request, cancellationToken);
        if (targetValidationResult.IsFailure)
        {
            return Result.Failure<BulkVacationCreationResult>(targetValidationResult.Error);
        }

        // Get eligible employees based on assignment type
        var eligibleEmployees = await GetEligibleEmployees(request, cancellationToken);

        if (!eligibleEmployees.Any())
        {
            return Result.Failure<BulkVacationCreationResult>("No eligible employees found for the specified criteria");
        }

        // Create vacation records with conflict checking
        var result = await CreateVacationRecords(eligibleEmployees, request, vacationType, cancellationToken);

        return Result.Success(result);
    }

    /// <summary>
    /// Validates that the assignment target (Branch or Department) exists.
    /// </summary>
    private async Task<Result> ValidateAssignmentTarget(CreateBulkEmployeeVacationCommand request, CancellationToken cancellationToken)
    {
        switch (request.AssignmentType)
        {
            case BulkAssignmentType.Branch:
                if (!request.BranchId.HasValue)
                {
                    return Result.Failure("Branch ID is required for branch assignment");
                }

                var branchExists = await _context.Branches
                    .AnyAsync(b => b.Id == request.BranchId.Value, cancellationToken);

                if (!branchExists)
                {
                    return Result.Failure("Branch not found");
                }
                break;

            case BulkAssignmentType.Department:
                if (!request.DepartmentId.HasValue)
                {
                    return Result.Failure("Department ID is required for department assignment");
                }

                var departmentExists = await _context.Departments
                    .AnyAsync(d => d.Id == request.DepartmentId.Value, cancellationToken);

                if (!departmentExists)
                {
                    return Result.Failure("Department not found");
                }
                break;

            default:
                return Result.Failure("Invalid assignment type");
        }

        return Result.Success();
    }

    /// <summary>
    /// Retrieves eligible employees based on the assignment type and criteria.
    /// </summary>
    private async Task<List<Employee>> GetEligibleEmployees(CreateBulkEmployeeVacationCommand request, CancellationToken cancellationToken)
    {
        var query = _context.Employees
            .Where(e => e.EmploymentStatus == EmploymentStatus.Active);

        switch (request.AssignmentType)
        {
            case BulkAssignmentType.Branch:
                query = query.Where(e => e.BranchId == request.BranchId!.Value);
                break;

            case BulkAssignmentType.Department:
                query = query.Where(e => e.DepartmentId == request.DepartmentId!.Value);
                break;
        }

        return await query.ToListAsync(cancellationToken);
    }

    /// <summary>
    /// Creates vacation records for eligible employees, handling conflicts and batch processing.
    /// </summary>
    private async Task<BulkVacationCreationResult> CreateVacationRecords(
        List<Employee> eligibleEmployees,
        CreateBulkEmployeeVacationCommand request,
        Domain.VacationTypes.VacationType vacationType,
        CancellationToken cancellationToken)
    {
        var result = new BulkVacationCreationResult
        {
            TotalEligibleEmployees = eligibleEmployees.Count
        };

        var vacationsToCreate = new List<EmployeeVacation>();

        // Check each employee for conflicts
        foreach (var employee in eligibleEmployees)
        {
            // Check for overlapping vacations
            var hasOverlap = await _context.EmployeeVacations
                .Where(ev => ev.EmployeeId == employee.Id)
                .Where(ev => ev.StartDate <= request.EndDate && ev.EndDate >= request.StartDate)
                .AnyAsync(cancellationToken);

            if (hasOverlap)
            {
                result.SkippedEmployees.Add(new SkippedEmployee
                {
                    EmployeeId = employee.Id,
                    EmployeeName = employee.FullName,
                    EmployeeNumber = employee.EmployeeNumber,
                    Reason = "Has overlapping vacation in the specified date range"
                });
                result.EmployeesSkipped++;
                continue;
            }

            // Create vacation entity
            var vacation = new EmployeeVacation
            {
                EmployeeId = employee.Id,
                VacationTypeId = request.VacationTypeId,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                IsApproved = request.IsApproved,
                Notes = request.Notes
            };

            // Calculate total days
            vacation.CalculateTotalDays();

            // Validate vacation business rules
            var (isValid, errors) = vacation.ValidateVacation();
            if (!isValid)
            {
                result.SkippedEmployees.Add(new SkippedEmployee
                {
                    EmployeeId = employee.Id,
                    EmployeeName = employee.FullName,
                    EmployeeNumber = employee.EmployeeNumber,
                    Reason = $"Validation failed: {string.Join(", ", errors)}"
                });
                result.EmployeesSkipped++;
                continue;
            }

            vacationsToCreate.Add(vacation);
        }

        // Batch create vacation records
        if (vacationsToCreate.Any())
        {
            _context.EmployeeVacations.AddRange(vacationsToCreate);
            await _context.SaveChangesAsync(cancellationToken);

            result.VacationsCreated = vacationsToCreate.Count;

            // Update attendance records for approved vacations
            if (request.IsApproved)
            {
                await UpdateAttendanceRecordsAsync(vacationsToCreate, vacationType, cancellationToken);
            }
        }

        return result;
    }

    /// <summary>
    /// Updates attendance records for all approved vacation periods.
    /// </summary>
    private async Task UpdateAttendanceRecordsAsync(
        List<EmployeeVacation> vacations,
        Domain.VacationTypes.VacationType vacationType,
        CancellationToken cancellationToken)
    {
        try
        {
            foreach (var vacation in vacations)
            {
                // Get all dates in the vacation period
                var vacationDates = vacation.GetVacationDates();

                foreach (var date in vacationDates)
                {
                    // Find or create attendance record for this date
                    var attendanceRecord = await _context.AttendanceRecords
                        .FirstOrDefaultAsync(ar => ar.EmployeeId == vacation.EmployeeId &&
                                                  ar.AttendanceDate.Date == date.Date, cancellationToken);

                    if (attendanceRecord != null)
                    {
                        // Update existing attendance record to OnLeave
                        attendanceRecord.Status = AttendanceStatus.OnLeave;
                        attendanceRecord.Notes = string.IsNullOrEmpty(attendanceRecord.Notes)
                            ? $"On vacation: {vacationType.Name}"
                            : $"{attendanceRecord.Notes}\nOn vacation: {vacationType.Name}";
                    }
                    else
                    {
                        // Create new attendance record for vacation day
                        var newAttendanceRecord = new AttendanceRecord
                        {
                            EmployeeId = vacation.EmployeeId,
                            AttendanceDate = date,
                            Status = AttendanceStatus.OnLeave,
                            ScheduledHours = 0,
                            WorkingHours = 0,
                            BreakHours = 0,
                            OvertimeHours = 0,
                            Notes = $"On vacation: {vacationType.Name}"
                        };

                        _context.AttendanceRecords.Add(newAttendanceRecord);
                    }
                }
            }

            // Save attendance record changes
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception)
        {
            // Log error but don't fail the vacation creation
            // Attendance integration is secondary to vacation creation
            // TODO: Add proper logging here
        }
    }
}