using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.Services;

/// <summary>
/// Service implementation for daily attendance generation operations.
/// Provides automated attendance record generation for all employees based on their shift assignments.
/// </summary>
public class DailyAttendanceGeneratorService : IDailyAttendanceGeneratorService
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceRepository _attendanceRepository;
    private readonly IAttendanceTransactionRepository _transactionRepository;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly ILogger<DailyAttendanceGeneratorService> _logger;

    public DailyAttendanceGeneratorService(
        IApplicationDbContext context,
        IAttendanceRepository attendanceRepository,
        IAttendanceTransactionRepository transactionRepository,
        IAttendanceCalculationService calculationService,
        ILogger<DailyAttendanceGeneratorService> logger)
    {
        _context = context;
        _attendanceRepository = attendanceRepository;
        _transactionRepository = transactionRepository;
        _calculationService = calculationService;
        _logger = logger;
    }

    public async Task<int> GenerateAttendanceRecordsAsync(DateTime date, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting attendance generation for date: {Date}", date.Date);

        var activeEmployees = await _context.Employees
            .Where(e => e.EmploymentStatus == EmploymentStatus.Active)
            .ToListAsync(cancellationToken);

        var recordsGenerated = 0;

        foreach (var employee in activeEmployees)
        {
            try
            {
                var wasGenerated = await GenerateAttendanceRecordForEmployeeAsync(employee.Id, date, cancellationToken);
                if (wasGenerated)
                {
                    recordsGenerated++;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating attendance record for employee {EmployeeId} on {Date}",
                    employee.Id, date.Date);
            }
        }

        _logger.LogInformation("Generated {Count} attendance records for date: {Date}",
            recordsGenerated, date.Date);

        return recordsGenerated;
    }

    public async Task<int> GenerateAttendanceRecordsForBranchAsync(long branchId, DateTime date, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting attendance generation for branch {BranchId} on date: {Date}",
            branchId, date.Date);

        var branchEmployees = await _context.Employees
            .Where(e => e.BranchId == branchId && e.EmploymentStatus == EmploymentStatus.Active)
            .ToListAsync(cancellationToken);

        var recordsGenerated = 0;

        foreach (var employee in branchEmployees)
        {
            try
            {
                var wasGenerated = await GenerateAttendanceRecordForEmployeeAsync(employee.Id, date, cancellationToken);
                if (wasGenerated)
                {
                    recordsGenerated++;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating attendance record for employee {EmployeeId} on {Date}",
                    employee.Id, date.Date);
            }
        }

        _logger.LogInformation("Generated {Count} attendance records for branch {BranchId} on date: {Date}",
            recordsGenerated, branchId, date.Date);

        return recordsGenerated;
    }

    public async Task<bool> GenerateAttendanceRecordForEmployeeAsync(long employeeId, DateTime date, CancellationToken cancellationToken = default)
    {
        _logger.LogDebug("=== Starting attendance generation for employee {EmployeeId} on {Date} ===", employeeId, date.Date);

        // Check if attendance record already exists
        var existingRecord = await _attendanceRepository.GetByEmployeeAndDateAsync(employeeId, date, cancellationToken);
        if (existingRecord != null)
        {
            _logger.LogWarning("Attendance record already exists for employee {EmployeeId} on {Date} - skipping generation",
                employeeId, date.Date);
            return false;
        }
        _logger.LogDebug("No existing attendance record found for employee {EmployeeId} on {Date} - proceeding with generation", employeeId, date.Date);

        try
        {
            // Get employee information to check hire date
            _logger.LogDebug("Getting employee information for employee {EmployeeId}", employeeId);
            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == employeeId, cancellationToken);

            if (employee == null)
            {
                _logger.LogWarning("Employee {EmployeeId} not found - skipping attendance generation", employeeId);
                return false;
            }

            // Rule 1: Check if the date is before the employee's hire date
            if (date.Date < employee.HireDate.Date)
            {
                _logger.LogDebug("Date {Date} is before employee {EmployeeId} hire date {HireDate} - skipping attendance generation",
                    date.Date, employeeId, employee.HireDate.Date);
                return false;
            }

            // Get the effective shift assignment for the employee on this date
            _logger.LogDebug("Getting effective shift assignment for employee {EmployeeId} on {Date}", employeeId, date.Date);
            var shiftAssignment = await _calculationService.GetEffectiveShiftAssignmentAsync(employeeId, date, cancellationToken);

            // If no shift assignment exists, auto-assign the default shift
            if (shiftAssignment == null)
            {
                _logger.LogDebug("No shift assignment found for employee {EmployeeId} - attempting to auto-assign default shift", employeeId);
                shiftAssignment = await AutoAssignDefaultShiftAsync(employeeId, date, cancellationToken);

                if (shiftAssignment == null)
                {
                    _logger.LogWarning("No default shift available for auto-assignment to employee {EmployeeId} - generating attendance record without shift", employeeId);
                    // Continue with null shift assignment - will generate record with Absent status
                }
                else
                {
                    _logger.LogInformation("Successfully auto-assigned default shift {ShiftId} to employee {EmployeeId}", shiftAssignment.ShiftId, employeeId);
                }
            }
            else
            {
                _logger.LogDebug("Found effective shift assignment {ShiftAssignmentId} for employee {EmployeeId} on {Date}", shiftAssignment.Id, employeeId, date.Date);
            }

            // Get shift details if we have a shift assignment
            Shift? shift = null;
            if (shiftAssignment != null)
            {
                shift = await _context.Shifts
                    .Include(s => s.ShiftPeriods)
                    .FirstOrDefaultAsync(s => s.Id == shiftAssignment.ShiftId, cancellationToken);

                if (shift == null)
                {
                    _logger.LogWarning("Shift {ShiftId} not found for shift assignment {ShiftAssignmentId} - treating as no shift",
                        shiftAssignment.ShiftId, shiftAssignment.Id);
                    shiftAssignment = null; // Reset to null if shift not found
                }
            }

            // Always generate attendance record, regardless of shift assignment or working days
            // The status determination will be handled in the calculation service

            // Get any existing transactions for this employee and date
            _logger.LogDebug("Getting transactions for employee {EmployeeId} on {Date}", employeeId, date.Date);
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(employeeId, date, cancellationToken);
            _logger.LogDebug("Found {TransactionCount} transactions for employee {EmployeeId} on {Date}", transactions.Count, employeeId, date.Date);

            // Calculate the attendance record - the calculation service will handle status determination
            _logger.LogDebug("Calculating attendance record for employee {EmployeeId} on {Date} with shift assignment: {HasShift}",
                employeeId, date.Date, shiftAssignment != null);
            var attendanceRecord = await _calculationService.CalculateAttendanceAsync(
                employeeId, date, transactions, shiftAssignment, cancellationToken);
            _logger.LogDebug("Calculated attendance record for employee {EmployeeId} on {Date} with status {Status}", employeeId, date.Date, attendanceRecord.Status);

            // Create the attendance record
            _logger.LogDebug("Creating attendance record for employee {EmployeeId} on {Date}", employeeId, date.Date);
            await _attendanceRepository.CreateAsync(attendanceRecord, cancellationToken);

            _logger.LogInformation("Successfully generated attendance record for employee {EmployeeId} on {Date} with status {Status}",
                employeeId, date.Date, attendanceRecord.Status);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating attendance record for employee {EmployeeId} on {Date}: {ErrorMessage}",
                employeeId, date.Date, ex.Message);
            return false;
        }
    }

    public async Task<AttendanceGenerationResult> RunDailyGenerationAsync(CancellationToken cancellationToken = default)
    {
        var date = DateTime.UtcNow.Date;
        var stopwatch = Stopwatch.StartNew();

        _logger.LogInformation("Starting daily attendance generation for {Date}", date);

        var result = new AttendanceGenerationResult
        {
            Date = date
        };

        try
        {
            // Get all active employees
            var activeEmployees = await _context.Employees
                .Where(e => e.EmploymentStatus == EmploymentStatus.Active)
                .CountAsync(cancellationToken);

            result.TotalEmployees = activeEmployees;

            // Simple approach: Delete existing records for today and recreate them fresh
            var recordsDeleted = await _attendanceRepository.DeleteByDateAsync(date, cancellationToken);
            _logger.LogInformation("Deleted {DeletedCount} existing attendance records for {Date}", recordsDeleted, date);

            // Clear the Entity Framework context to ensure fresh data
            if (_context is DbContext dbContext)
            {
                dbContext.ChangeTracker.Clear();
            }

            // Generate fresh attendance records for all active employees
            var recordsGenerated = await GenerateAttendanceRecordsAsync(date, cancellationToken);
            result.RecordsGenerated = recordsGenerated;
            result.RecordsUpdated = recordsDeleted; // Show deleted records as "updated"
            result.RecordsSkipped = 0; // No records are skipped with this approach

            _logger.LogInformation("Daily attendance generation completed. Generated: {Generated}, Previously deleted: {Deleted}, Total Employees: {TotalEmployees}",
                result.RecordsGenerated, result.RecordsUpdated, result.TotalEmployees);
        }
        catch (Exception ex)
        {
            result.ErrorCount++;
            result.Errors.Add($"Failed to run daily generation: {ex.Message}");
            _logger.LogError(ex, "Error during daily attendance generation for {Date}", date);
        }

        stopwatch.Stop();
        result.Duration = stopwatch.Elapsed;

        return result;
    }

    public async Task<int> RecalculateAttendanceRecordsAsync(DateTime date, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting attendance recalculation for date: {Date}", date.Date);

        // Get all attendance records for the date that are not finalized
        var attendanceRecords = await _context.AttendanceRecords
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
            .Where(ar => ar.AttendanceDate.Date == date.Date && !ar.IsFinalized)
            .ToListAsync(cancellationToken);

        var recordsUpdated = 0;

        foreach (var record in attendanceRecords)
        {
            try
            {
                // Get the latest transactions for this record
                var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                    record.EmployeeId, date, cancellationToken);

                // Recalculate the attendance record
                var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                    record, transactions, cancellationToken);

                // Update the record if changes were made
                if (HasSignificantChanges(record, recalculatedRecord))
                {
                    await _attendanceRepository.UpdateAsync(recalculatedRecord, cancellationToken);
                    recordsUpdated++;

                    _logger.LogDebug("Recalculated attendance record for employee {EmployeeId} on {Date}",
                        record.EmployeeId, date.Date);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error recalculating attendance record for employee {EmployeeId} on {Date}",
                    record.EmployeeId, date.Date);
            }
        }

        _logger.LogInformation("Recalculated {Count} attendance records for date: {Date}",
            recordsUpdated, date.Date);

        return recordsUpdated;
    }


    public async Task<int> GenerateMissingAttendanceRecordsAsync(DateTime startDate, DateTime endDate, long? branchId = null, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Generating missing attendance records from {StartDate} to {EndDate} for branch {BranchId}",
            startDate.Date, endDate.Date, branchId);

        var totalGenerated = 0;
        var currentDate = startDate.Date;

        while (currentDate <= endDate.Date)
        {
            int generatedForDate;

            if (branchId.HasValue)
            {
                generatedForDate = await GenerateAttendanceRecordsForBranchAsync(branchId.Value, currentDate, cancellationToken);
            }
            else
            {
                generatedForDate = await GenerateAttendanceRecordsAsync(currentDate, cancellationToken);
            }

            totalGenerated += generatedForDate;
            currentDate = currentDate.AddDays(1);
        }

        _logger.LogInformation("Generated {Count} missing attendance records from {StartDate} to {EndDate}",
            totalGenerated, startDate.Date, endDate.Date);

        return totalGenerated;
    }

    public async Task<int> FinalizeAttendanceRecordsAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Finalizing attendance records for date: {Date}, branch: {BranchId}",
            date.Date, branchId);

        var query = _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Where(ar => ar.AttendanceDate.Date == date.Date && !ar.IsFinalized);

        if (branchId.HasValue)
        {
            query = query.Where(ar => ar.Employee.BranchId == branchId.Value);
        }

        var recordsToFinalize = await query.ToListAsync(cancellationToken);
        var finalizedCount = 0;

        foreach (var record in recordsToFinalize)
        {
            try
            {
                // Final recalculation before finalizing
                var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                    record.EmployeeId, date, cancellationToken);

                var finalRecord = await _calculationService.RecalculateAttendanceAsync(
                    record, transactions, cancellationToken);

                // Mark as finalized
                finalRecord.IsFinalized = true;

                await _attendanceRepository.UpdateAsync(finalRecord, cancellationToken);
                finalizedCount++;

                _logger.LogDebug("Finalized attendance record for employee {EmployeeId} on {Date}",
                    record.EmployeeId, date.Date);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error finalizing attendance record for employee {EmployeeId} on {Date}",
                    record.EmployeeId, date.Date);
            }
        }

        _logger.LogInformation("Finalized {Count} attendance records for date: {Date}",
            finalizedCount, date.Date);

        return finalizedCount;
    }

    /// <summary>
    /// Auto-assigns the default shift to an employee if they don't have a shift assignment.
    /// This ensures all employees have a shift assignment for attendance calculation.
    /// </summary>
    /// <param name="employeeId">ID of the employee to assign the default shift to</param>
    /// <param name="effectiveDate">Date when the assignment should be effective</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created shift assignment or null if no default shift exists</returns>
    private async Task<ShiftAssignment?> AutoAssignDefaultShiftAsync(
        long employeeId,
        DateTime effectiveDate,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Find the default shift
            var defaultShift = await _context.Shifts
                .Where(s => s.IsDefault && s.Status == ShiftStatus.Active && !s.IsDeleted)
                .FirstOrDefaultAsync(cancellationToken);

            if (defaultShift == null)
            {
                _logger.LogWarning("No active default shift found for auto-assignment");
                return null;
            }

            // Check if employee already has a shift assignment (double-check to avoid conflicts)
            var existingAssignment = await _calculationService.GetEffectiveShiftAssignmentAsync(
                employeeId, effectiveDate, cancellationToken);

            if (existingAssignment != null)
            {
                _logger.LogDebug("Employee {EmployeeId} already has shift assignment {AssignmentId} - skipping auto-assignment",
                    employeeId, existingAssignment.Id);
                return existingAssignment;
            }

            // Create new shift assignment
            var shiftAssignment = new ShiftAssignment
            {
                ShiftId = defaultShift.Id,
                AssignmentType = ShiftAssignmentType.Employee,
                EmployeeId = employeeId,
                EffectiveFromDate = effectiveDate.Date, // Start from the current date
                Status = ShiftAssignmentStatus.Active,
                Priority = 50, // Default priority for auto-assignments
                Notes = $"Auto-assigned default shift '{defaultShift.Name}' for attendance generation",
                AssignedByUserId = 1 // System user ID - should be configurable
            };

            // Add and save the assignment
            await _context.ShiftAssignments.AddAsync(shiftAssignment, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            // Load the related entities for the calculation service
            shiftAssignment.Shift = defaultShift;

            _logger.LogInformation("Auto-assigned default shift '{ShiftName}' (ID: {ShiftId}) to employee {EmployeeId}",
                defaultShift.Name, defaultShift.Id, employeeId);

            return shiftAssignment;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error auto-assigning default shift to employee {EmployeeId}: {ErrorMessage}",
                employeeId, ex.Message);
            return null;
        }
    }

    private bool HasSignificantChanges(AttendanceRecord original, AttendanceRecord recalculated)
    {
        return original.Status != recalculated.Status ||
               Math.Abs(original.WorkingHours - recalculated.WorkingHours) > 0.01m ||
               Math.Abs(original.BreakHours - recalculated.BreakHours) > 0.01m ||
               Math.Abs(original.OvertimeHours - recalculated.OvertimeHours) > 0.01m ||
               original.LateMinutes != recalculated.LateMinutes ||
               original.EarlyLeaveMinutes != recalculated.EarlyLeaveMinutes ||
               original.ActualCheckInTime != recalculated.ActualCheckInTime ||
               original.ActualCheckOutTime != recalculated.ActualCheckOutTime;
    }
}