using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Api.Models;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Attendance.Queries.GetMonthlyReport;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for attendance management operations.
/// Provides endpoints for attendance records, transactions, and reporting.
/// </summary>
[ApiController]
[Route("api/v1/attendance")]
[Authorize]
public class AttendanceController : ControllerBase
{
    private readonly IAttendanceRepository _attendanceRepository;
    private readonly IAttendanceTransactionRepository _transactionRepository;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly IDailyAttendanceGeneratorService _generatorService;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly ILogger<AttendanceController> _logger;
    private readonly IMediator _mediator;

    public AttendanceController(
        IAttendanceRepository attendanceRepository,
        IAttendanceTransactionRepository transactionRepository,
        IAttendanceCalculationService calculationService,
        IDailyAttendanceGeneratorService generatorService,
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILogger<AttendanceController> logger,
        IMediator mediator)
    {
        _attendanceRepository = attendanceRepository;
        _transactionRepository = transactionRepository;
        _calculationService = calculationService;
        _generatorService = generatorService;
        _context = context;
        _currentUser = currentUser;
        _logger = logger;
        _mediator = mediator;
    }

    /// <summary>
    /// Gets attendance records for the specified date range and filters.
    /// </summary>
    /// <param name="request">Report request with filters and pagination</param>
    /// <returns>Paginated list of attendance records</returns>
    [HttpPost("report")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<List<AttendanceRecordResponse>>> GetAttendanceReport(
        [FromBody] AttendanceReportRequest request)
    {
        try
        {
            // Validate date range
            if (request.StartDate > request.EndDate)
            {
                return BadRequest("Start date must be before or equal to end date");
            }

            // Limit date range to prevent performance issues
            var daysDifference = (request.EndDate - request.StartDate).Days;
            if (daysDifference > 90)
            {
                return BadRequest("Date range cannot exceed 90 days");
            }

            List<AttendanceRecord> attendanceRecords;

            if (request.EmployeeId.HasValue)
            {
                // Get records for specific employee
                attendanceRecords = await _attendanceRepository.GetByEmployeeAndDateRangeAsync(
                    request.EmployeeId.Value, request.StartDate, request.EndDate);
            }
            else if (request.DepartmentId.HasValue)
            {
                // Get records for department
                attendanceRecords = await _attendanceRepository.GetByDepartmentAndDateRangeAsync(
                    request.DepartmentId.Value, request.StartDate, request.EndDate);
            }
            else if (request.BranchId.HasValue)
            {
                // Get records for branch
                attendanceRecords = await _attendanceRepository.GetByBranchAndDateRangeAsync(
                    request.BranchId.Value, request.StartDate, request.EndDate);
            }
            else
            {
                // Check user permissions and allow unfiltered data for authorized users
                if (_currentUser.Permissions.Contains("Attendance.ReadAll") ||
                    _currentUser.Permissions.Contains("Report.ReadAll") ||
                    _currentUser.Roles.Contains("SystemAdmin") ||
                    _currentUser.Roles.Contains("Admin") ||
                    _currentUser.IsSystemAdmin)
                {
                    // Get all attendance records within user's accessible scope
                    _logger.LogInformation("User {UserId} accessing all attendance records without filters", _currentUser.UserId);
                    attendanceRecords = await _attendanceRepository.GetAllByDateRangeAsync(request.StartDate, request.EndDate);
                }
                else if (_currentUser.Permissions.Contains("Attendance.Read") ||
                         _currentUser.Permissions.Contains("Report.Read"))
                {
                    // Regular users can access limited scope - for now, require at least one filter for performance
                    _logger.LogWarning("User {UserId} attempted to access attendance records without filters - permission denied", _currentUser.UserId);
                    return BadRequest("At least one filter (EmployeeId, DepartmentId, or BranchId) must be specified. Contact your administrator if you need access to view all records without filters.");
                }
                else
                {
                    _logger.LogWarning("User {UserId} attempted to access attendance records without sufficient permissions", _currentUser.UserId);
                    return Forbid("You do not have permission to access attendance records");
                }
            }

            // Apply pagination
            var pagedRecords = attendanceRecords
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            // Map to response model
            var response = new List<AttendanceRecordResponse>();

            foreach (var record in pagedRecords)
            {
                var recordResponse = MapToAttendanceRecordResponse(record);

                // Include transactions if requested
                if (request.IncludeTransactions)
                {
                    var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                        record.EmployeeId, record.AttendanceDate);
                    recordResponse.Transactions = transactions.Select(MapToAttendanceTransactionResponse).ToList();
                }

                // Include working day analysis if requested
                if (request.IncludeWorkingDayAnalysis)
                {
                    var transactions = recordResponse.Transactions.Any()
                        ? await _transactionRepository.GetByEmployeeAndDateAsync(record.EmployeeId, record.AttendanceDate)
                        : new List<AttendanceTransaction>();

                    var workingDay = await _calculationService.CalculateWorkingDayAsync(record, transactions);
                    recordResponse.WorkingDayAnalysis = MapToWorkingDayAnalysisResponse(workingDay);
                }

                response.Add(recordResponse);
            }

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating attendance report");
            return StatusCode(500, "An error occurred while generating the attendance report");
        }
    }

    /// <summary>
    /// Gets comprehensive attendance history for a specific employee with absent days included.
    /// This endpoint ensures that missing attendance records are generated as "Absent" status.
    /// </summary>
    /// <param name="employeeId">Employee identifier</param>
    /// <param name="startDate">Start date for the period</param>
    /// <param name="endDate">End date for the period</param>
    /// <returns>Complete attendance history including absent days</returns>
    [HttpGet("employee/{employeeId}/history")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<List<AttendanceRecordResponse>>> GetEmployeeAttendanceHistory(
        long employeeId,
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
    {
        try
        {
            // Validate date range
            if (startDate > endDate)
            {
                return BadRequest("Start date must be before or equal to end date");
            }

            var daysDifference = (endDate - startDate).Days;
            if (daysDifference > 90)
            {
                return BadRequest("Date range cannot exceed 90 days");
            }

            _logger.LogInformation("Getting attendance history for employee {EmployeeId} from {StartDate} to {EndDate}",
                employeeId, startDate.Date, endDate.Date);

            // First, ensure attendance records exist for all days in the range
            var currentDate = startDate.Date;
            while (currentDate <= endDate.Date)
            {
                // Generate missing attendance record if it doesn't exist
                try
                {
                    await _generatorService.GenerateAttendanceRecordForEmployeeAsync(employeeId, currentDate);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Could not generate attendance record for employee {EmployeeId} on {Date}",
                        employeeId, currentDate);
                }
                currentDate = currentDate.AddDays(1);
            }

            // Now get all records for the date range
            var attendanceRecords = await _attendanceRepository.GetByEmployeeAndDateRangeAsync(
                employeeId, startDate, endDate);

            // Sort by date descending
            var sortedRecords = attendanceRecords.OrderByDescending(r => r.AttendanceDate).ToList();

            // Map to response model
            var response = new List<AttendanceRecordResponse>();
            foreach (var record in sortedRecords)
            {
                var recordResponse = MapToAttendanceRecordResponse(record);
                response.Add(recordResponse);
            }

            _logger.LogInformation("Retrieved {RecordCount} attendance records for employee {EmployeeId}",
                response.Count, employeeId);

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving attendance history for employee {EmployeeId}", employeeId);
            return StatusCode(500, "An error occurred while retrieving attendance history");
        }
    }

    /// <summary>
    /// Gets attendance record for a specific employee and date.
    /// </summary>
    /// <param name="employeeId">Employee identifier</param>
    /// <param name="date">Attendance date</param>
    /// <returns>Attendance record with transactions</returns>
    [HttpGet("employee/{employeeId}/date/{date:datetime}")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<AttendanceRecordResponse>> GetAttendanceRecord(
        long employeeId, DateTime date)
    {
        try
        {
            var record = await _attendanceRepository.GetByEmployeeAndDateAsync(employeeId, date);
            if (record == null)
            {
                return NotFound($"No attendance record found for employee {employeeId} on {date:yyyy-MM-dd}");
            }

            var response = MapToAttendanceRecordResponse(record);

            // Include transactions
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(employeeId, date);
            response.Transactions = transactions.Select(MapToAttendanceTransactionResponse).ToList();

            // Include working day analysis
            var workingDay = await _calculationService.CalculateWorkingDayAsync(record, transactions);
            response.WorkingDayAnalysis = MapToWorkingDayAnalysisResponse(workingDay);

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving attendance record for employee {EmployeeId} on {Date}",
                employeeId, date);
            return StatusCode(500, "An error occurred while retrieving the attendance record");
        }
    }

    /// <summary>
    /// Creates a new attendance transaction (check-in, check-out, break).
    /// </summary>
    /// <param name="request">Transaction creation request</param>
    /// <returns>Created transaction details</returns>
    [HttpPost("transactions")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<AttendanceTransactionResponse>> CreateTransaction(
        [FromBody] CreateAttendanceTransactionRequest request)
    {
        try
        {
            // Validate the request
            if (request.EmployeeId <= 0)
            {
                return BadRequest("Valid employee ID is required");
            }

            // Set default values
            var transactionTime = request.TransactionTimeUtc ?? DateTime.UtcNow;
            var attendanceDate = request.AttendanceDate ?? transactionTime.Date;

            // Create the transaction
            var transaction = new AttendanceTransaction
            {
                EmployeeId = request.EmployeeId,
                TransactionType = request.TransactionType,
                TransactionTimeUtc = transactionTime,
                TransactionTimeLocal = transactionTime, // TODO: Convert to branch timezone
                AttendanceDate = attendanceDate,
                IsManual = true,
                EnteredByUserId = _currentUser.UserId,
                Notes = request.Notes,
                Location = request.Location,
                DeviceId = request.DeviceId,
                IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString()
            };

            // Validate the transaction
            var validationResult = transaction.ValidateTransaction();
            if (!validationResult.IsValid)
            {
                return BadRequest($"Transaction validation failed: {string.Join(", ", validationResult.Errors)}");
            }

            // Create the transaction
            var createdTransaction = await _transactionRepository.CreateAsync(transaction);

            // Recalculate attendance record
            await RecalculateAttendanceRecord(request.EmployeeId, attendanceDate);

            var response = MapToAttendanceTransactionResponse(createdTransaction);
            return CreatedAtAction(nameof(GetTransaction), new { id = createdTransaction.Id }, response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating attendance transaction for employee {EmployeeId}",
                request.EmployeeId);
            return StatusCode(500, "An error occurred while creating the attendance transaction");
        }
    }

    /// <summary>
    /// Gets a specific attendance transaction by ID.
    /// </summary>
    /// <param name="id">Transaction identifier</param>
    /// <returns>Transaction details</returns>
    [HttpGet("transactions/{id}")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<AttendanceTransactionResponse>> GetTransaction(long id)
    {
        try
        {
            var transaction = await _transactionRepository.GetByIdAsync(id);
            if (transaction == null)
            {
                return NotFound($"Transaction with ID {id} not found");
            }

            var response = MapToAttendanceTransactionResponse(transaction);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving transaction {TransactionId}", id);
            return StatusCode(500, "An error occurred while retrieving the transaction");
        }
    }

    /// <summary>
    /// Gets attendance statistics for the specified period and filters.
    /// </summary>
    /// <param name="startDate">Start date for statistics</param>
    /// <param name="endDate">End date for statistics</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="departmentId">Optional department filter</param>
    /// <returns>Attendance statistics</returns>
    [HttpGet("statistics")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<AttendanceStatistics>> GetAttendanceStatistics(
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null)
    {
        try
        {
            // Validate date range
            if (startDate > endDate)
            {
                return BadRequest("Start date must be before or equal to end date");
            }

            var daysDifference = (endDate - startDate).Days;
            if (daysDifference > 365)
            {
                return BadRequest("Date range cannot exceed 365 days for statistics");
            }

            var statistics = await _attendanceRepository.GetStatisticsAsync(
                branchId, departmentId, startDate, endDate);

            return Ok(statistics);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving attendance statistics");
            return StatusCode(500, "An error occurred while retrieving attendance statistics");
        }
    }

    /// <summary>
    /// Gets consolidated dashboard data including today's stats, weekly trend, and recent activity.
    /// </summary>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="departmentId">Optional department filter</param>
    /// <returns>Dashboard data</returns>
    [HttpGet("dashboard")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<AttendanceDashboardResponse>> GetDashboardData(
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null)
    {
        try
        {
            var today = DateTime.Today;
            var weekAgo = today.AddDays(-6); // Last 7 days including today

            // Get today's statistics
            var todayStats = await _attendanceRepository.GetStatisticsAsync(
                branchId, departmentId, today, today);

            // Get daily statistics for the last 7 days
            var weeklyTrend = await _attendanceRepository.GetDailyStatisticsAsync(
                weekAgo, today, branchId, departmentId);

            // Get incomplete records
            var incompleteRecords = await _attendanceRepository.GetIncompleteRecordsAsync(
                branchId, today);

            // Get recent transactions
            var recentTransactions = await _transactionRepository.GetRecentTransactionsAsync(
                10, branchId, departmentId);

            // Build response
            var response = new AttendanceDashboardResponse
            {
                TodayStats = new AttendanceStatisticsResponse
                {
                    TotalEmployees = todayStats.TotalRecords,
                    PresentEmployees = todayStats.PresentCount,
                    AbsentEmployees = todayStats.AbsentCount,
                    LateEmployees = todayStats.LateCount,
                    OvertimeEmployees = todayStats.TotalRecords - todayStats.PresentCount - todayStats.AbsentCount,
                    AverageWorkingHours = (double)todayStats.AverageWorkingHours,
                    TotalOvertimeHours = (double)todayStats.TotalOvertimeHours,
                    AttendanceRate = (double)todayStats.AttendanceRate,
                    Period = new DateRangePeriod { StartDate = today, EndDate = today }
                },
                WeeklyTrend = weeklyTrend.Select(d => new DailyStatisticsResponse
                {
                    Date = d.Date,
                    TotalEmployees = d.TotalEmployees,
                    PresentEmployees = d.PresentEmployees,
                    AbsentEmployees = d.AbsentEmployees,
                    LateEmployees = d.LateEmployees
                }).ToList(),
                IncompleteRecords = incompleteRecords.Select(MapToAttendanceRecordResponse).ToList(),
                RecentTransactions = recentTransactions.Select(t => new RecentTransactionResponse
                {
                    Id = t.Id,
                    EmployeeId = t.EmployeeId,
                    EmployeeNumber = t.Employee?.EmployeeNumber ?? "",
                    EmployeeName = t.Employee != null ? $"{t.Employee.FirstName} {t.Employee.LastName}" : "",
                    TransactionType = (int)t.TransactionType,
                    TransactionTypeText = t.TransactionType.ToString(),
                    TransactionTimeUtc = t.TransactionTimeUtc,
                    TransactionTimeLocal = t.TransactionTimeLocal,
                    IsManual = t.IsManual,
                    EnteredByUserName = t.EnteredByUser?.Username,
                    Notes = t.Notes,
                    Location = t.Location,
                    DeviceId = t.DeviceId
                }).ToList()
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving dashboard data");
            return StatusCode(500, "An error occurred while retrieving dashboard data");
        }
    }

    /// <summary>
    /// Generates attendance records for a specific date.
    /// Admin endpoint for manual attendance generation.
    /// </summary>
    /// <param name="date">Date to generate attendance for</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <returns>Generation result</returns>
    [HttpPost("generate/{date:datetime}")]
    [Authorize(Policy = "SystemAdmin")] // Require admin privileges
    public async Task<ActionResult<Models.AttendanceGenerationResult>> GenerateAttendance(
        DateTime date, [FromQuery] long? branchId = null)
    {
        try
        {
            int recordsGenerated;

            if (branchId.HasValue)
            {
                recordsGenerated = await _generatorService.GenerateAttendanceRecordsForBranchAsync(
                    branchId.Value, date);
            }
            else
            {
                recordsGenerated = await _generatorService.GenerateAttendanceRecordsAsync(date);
            }

            var result = new Models.AttendanceGenerationResult
            {
                Date = date,
                RecordsGenerated = recordsGenerated,
                TotalEmployees = recordsGenerated, // Simplified for single date generation
                RecordsSkipped = 0,
                RecordsUpdated = 0,
                ErrorCount = 0,
                Errors = new List<string>(),
                Duration = 0 // Not measured for simple generation
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating attendance for date {Date}", date);
            return StatusCode(500, "An error occurred while generating attendance records");
        }
    }

    /// <summary>
    /// Gets incomplete attendance records (missing check-out).
    /// </summary>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="upToDate">Check records up to this date</param>
    /// <returns>List of incomplete attendance records</returns>
    [HttpGet("incomplete")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<List<AttendanceRecordResponse>>> GetIncompleteRecords(
        [FromQuery] long? branchId = null,
        [FromQuery] DateTime? upToDate = null)
    {
        try
        {
            var incompleteRecords = await _attendanceRepository.GetIncompleteRecordsAsync(
                branchId, upToDate);

            var response = incompleteRecords.Select(MapToAttendanceRecordResponse).ToList();
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving incomplete attendance records");
            return StatusCode(500, "An error occurred while retrieving incomplete records");
        }
    }

    /// <summary>
    /// Runs the daily attendance generation process.
    /// This simulates the background job that runs automatically each day.
    /// Admin endpoint for manual daily attendance generation.
    /// </summary>
    /// <returns>Complete daily generation result</returns>
    [HttpPost("generate/daily")]
    [AllowAnonymous] // Temporarily allow for testing
    public async Task<ActionResult<Models.AttendanceGenerationResult>> RunDailyGeneration()
    {
        try
        {
            _logger.LogInformation("Generate daily attendance endpoint called by user {UserId}", _currentUser.UserId);

            var serviceResult = await _generatorService.RunDailyGenerationAsync();

            _logger.LogInformation("Daily attendance generation completed. Generated: {Generated}, Updated: {Updated}, Errors: {Errors}",
                serviceResult.RecordsGenerated, serviceResult.RecordsUpdated, serviceResult.ErrorCount);

            // Map service result to API response model
            var apiResult = new Models.AttendanceGenerationResult
            {
                Date = serviceResult.Date,
                TotalEmployees = serviceResult.TotalEmployees,
                RecordsGenerated = serviceResult.RecordsGenerated,
                RecordsSkipped = serviceResult.RecordsSkipped,
                RecordsUpdated = serviceResult.RecordsUpdated,
                ErrorCount = serviceResult.ErrorCount,
                Errors = serviceResult.Errors,
                Duration = (long)serviceResult.Duration.TotalMilliseconds
            };

            return Ok(apiResult);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running daily attendance generation");
            return StatusCode(500, "An error occurred while running daily attendance generation");
        }
    }

    // Private helper methods
    private async Task RecalculateAttendanceRecord(long employeeId, DateTime date)
    {
        var existingRecord = await _attendanceRepository.GetByEmployeeAndDateAsync(employeeId, date);
        if (existingRecord != null)
        {
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(employeeId, date);
            var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                existingRecord, transactions);
            await _attendanceRepository.UpdateAsync(recalculatedRecord);
        }
        else
        {
            // Generate new attendance record
            await _generatorService.GenerateAttendanceRecordForEmployeeAsync(employeeId, date);
        }
    }

    private static AttendanceRecordResponse MapToAttendanceRecordResponse(AttendanceRecord record)
    {
        return new AttendanceRecordResponse
        {
            Id = record.Id,
            EmployeeId = record.EmployeeId,
            EmployeeNumber = record.Employee?.EmployeeNumber ?? "",
            EmployeeName = record.Employee?.FullName ?? "",
            AttendanceDate = record.AttendanceDate,
            Status = record.Status,
            StatusText = record.Status.ToString(),
            ScheduledStartTime = record.ScheduledStartTime,
            ScheduledEndTime = record.ScheduledEndTime,
            ActualCheckInTime = record.ActualCheckInTime,
            ActualCheckOutTime = record.ActualCheckOutTime,
            ScheduledHours = record.ScheduledHours,
            WorkingHours = record.WorkingHours,
            BreakHours = record.BreakHours,
            OvertimeHours = record.OvertimeHours,
            LateMinutes = record.LateMinutes,
            EarlyLeaveMinutes = record.EarlyLeaveMinutes,
            IsManualOverride = record.IsManualOverride,
            IsApproved = record.IsApproved,
            IsFinalized = record.IsFinalized,
            Notes = record.Notes
        };
    }

    private static AttendanceTransactionResponse MapToAttendanceTransactionResponse(AttendanceTransaction transaction)
    {
        return new AttendanceTransactionResponse
        {
            Id = transaction.Id,
            TransactionType = transaction.TransactionType,
            TransactionTypeText = transaction.TransactionType.ToString(),
            TransactionTimeUtc = transaction.TransactionTimeUtc,
            TransactionTimeLocal = transaction.TransactionTimeLocal,
            IsManual = transaction.IsManual,
            EnteredByUserName = transaction.EnteredByUser?.Username,
            Notes = transaction.Notes,
            Location = transaction.Location,
            DeviceId = transaction.DeviceId,
            IsVerified = transaction.IsVerified
        };
    }

    /// <summary>
    /// Gets a specific attendance record by ID for editing purposes.
    /// </summary>
    /// <param name="id">Attendance record identifier</param>
    /// <returns>Attendance record details</returns>
    [HttpGet("{id:long}")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<AttendanceRecordResponse>> GetAttendanceRecordById(long id)
    {
        try
        {
            var record = await _attendanceRepository.GetByIdAsync(id);
            if (record == null)
            {
                return NotFound($"Attendance record with ID {id} not found");
            }

            // Check if user has access to this record's branch/department
            if (!_currentUser.IsSystemAdmin && !_currentUser.Roles.Contains("SystemAdmin"))
            {
                // Add additional access control if needed based on user's branch/department scope
            }

            return Ok(MapToAttendanceRecordResponse(record));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving attendance record {RecordId}", id);
            return StatusCode(500, "An error occurred while retrieving the attendance record");
        }
    }

    /// <summary>
    /// Updates an existing attendance record with manual overrides.
    /// Allows authorized users to modify attendance data when corrections are needed.
    /// </summary>
    /// <param name="id">Attendance record identifier</param>
    /// <param name="request">Update request with new values</param>
    /// <returns>Updated attendance record</returns>
    [HttpPut("{id}")]
    [Authorize(Policy = "AttendanceManagement")] // Require special permissions for attendance modifications
    public async Task<ActionResult<AttendanceRecordResponse>> UpdateAttendanceRecord(
        long id, [FromBody] UpdateAttendanceRecordRequest request)
    {
        try
        {
            // Validate request has updates
            if (!request.HasUpdates())
            {
                return BadRequest("At least one field must be provided for update");
            }

            // Validate time order
            var (timeValid, timeError) = request.ValidateTimeOrder();
            if (!timeValid)
            {
                return BadRequest(timeError);
            }

            // Validate hours logic
            var (hoursValid, hoursError) = request.ValidateHoursLogic();
            if (!hoursValid)
            {
                return BadRequest(hoursError);
            }

            // Validate override requirements
            var (overrideValid, overrideError) = request.ValidateOverrideRequirements();
            if (!overrideValid)
            {
                return BadRequest(overrideError);
            }

            // Get existing attendance record
            var existingRecord = await _attendanceRepository.GetByIdAsync(id);
            if (existingRecord == null)
            {
                return NotFound($"Attendance record with ID {id} not found");
            }

            // Check if record is finalized and user has override permissions
            if (existingRecord.IsFinalized && !_currentUser.Permissions.Contains("Attendance.Override"))
            {
                return Forbid("Cannot modify finalized attendance records without override permissions");
            }

            // Apply updates to the record (only manually editable fields according to business rules)
            var hasManualOverrides = false;
            var hasTimeChanges = false;

            // Time fields are editable and trigger recalculation
            if (request.ActualCheckInTime.HasValue)
            {
                existingRecord.ActualCheckInTime = request.ActualCheckInTime;
                hasManualOverrides = true;
                hasTimeChanges = true;
            }

            if (request.ActualCheckOutTime.HasValue)
            {
                existingRecord.ActualCheckOutTime = request.ActualCheckOutTime;
                hasManualOverrides = true;
                hasTimeChanges = true;
            }

            // Break hours are editable if employee's shift includes a break
            if (request.BreakHours.HasValue)
            {
                existingRecord.BreakHours = request.BreakHours.Value;
                hasManualOverrides = true;
            }

            // Note: Status, Working Hours, Overtime Hours, Late Minutes, and Early Leave Minutes
            // are calculated automatically and not manually editable per business rules

            if (request.IsApproved.HasValue)
            {
                existingRecord.IsApproved = request.IsApproved.Value;
                if (request.IsApproved.Value)
                {
                    existingRecord.ApprovedByUserId = _currentUser.UserId;
                    existingRecord.ApprovedAtUtc = DateTime.UtcNow;
                }
                else
                {
                    // Remove approval if setting to false
                    existingRecord.ApprovedByUserId = null;
                    existingRecord.ApprovedAtUtc = null;
                }
            }

            if (!string.IsNullOrWhiteSpace(request.Notes))
            {
                existingRecord.Notes = request.Notes;
            }

            // Set manual override flags if any data was manually changed
            if (hasManualOverrides)
            {
                existingRecord.IsManualOverride = true;
                existingRecord.OverrideByUserId = _currentUser.UserId;
                existingRecord.OverrideAtUtc = DateTime.UtcNow;
                existingRecord.OverrideNotes = request.OverrideNotes;
            }

            // If time fields were modified, trigger automatic recalculation BEFORE updating the record
            if (hasTimeChanges)
            {
                await RecalculateAttendanceAfterTimeEdit(existingRecord, request, cancellationToken: default);
            }

            // Validate the updated record
            var (isValid, errors) = existingRecord.ValidateRecord();
            if (!isValid)
            {
                return BadRequest($"Record validation failed: {string.Join(", ", errors)}");
            }

            // Update the record
            var updatedRecord = await _attendanceRepository.UpdateAsync(existingRecord);

            // Map to response
            var response = MapToAttendanceRecordResponse(updatedRecord);

            _logger.LogInformation("Updated attendance record {RecordId} for employee {EmployeeId} by user {UserId}",
                id, existingRecord.EmployeeId, _currentUser.UserId);

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating attendance record {RecordId}", id);
            return StatusCode(500, "An error occurred while updating the attendance record");
        }
    }

    /// <summary>
    /// Bulk updates multiple attendance records for batch operations.
    /// Useful for applying corrections to multiple records at once.
    /// </summary>
    /// <param name="requests">Array of update requests with record IDs</param>
    /// <returns>Results of all update operations</returns>
    [HttpPut("bulk")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<List<BulkUpdateResult>>> BulkUpdateAttendanceRecords(
        [FromBody] List<BulkAttendanceUpdateRequest> requests)
    {
        try
        {
            if (requests == null || !requests.Any())
            {
                return BadRequest("At least one update request must be provided");
            }

            if (requests.Count > 100)
            {
                return BadRequest("Cannot update more than 100 records at once");
            }

            var results = new List<BulkUpdateResult>();

            foreach (var request in requests)
            {
                try
                {
                    var updateResult = await UpdateSingleRecord(request.Id, request.Updates);
                    results.Add(new BulkUpdateResult
                    {
                        Id = request.Id,
                        Success = true,
                        Message = "Updated successfully"
                    });
                }
                catch (Exception ex)
                {
                    results.Add(new BulkUpdateResult
                    {
                        Id = request.Id,
                        Success = false,
                        Message = ex.Message
                    });
                    _logger.LogError(ex, "Error in bulk update for record {RecordId}", request.Id);
                }
            }

            _logger.LogInformation("Bulk updated {SuccessCount} of {TotalCount} attendance records by user {UserId}",
                results.Count(r => r.Success), results.Count, _currentUser.UserId);

            return Ok(results);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in bulk attendance record update");
            return StatusCode(500, "An error occurred during bulk update operation");
        }
    }

    // Private helper method for bulk updates
    private async Task<AttendanceRecord> UpdateSingleRecord(long id, UpdateAttendanceRecordRequest request)
    {
        var existingRecord = await _attendanceRepository.GetByIdAsync(id);
        if (existingRecord == null)
        {
            throw new ArgumentException($"Attendance record with ID {id} not found");
        }

        // Apply the same update logic as the single update endpoint
        // (This is a simplified version - in production, extract to a service method)
        var hasManualOverrides = false;

        if (request.Status.HasValue)
        {
            existingRecord.Status = request.Status.Value;
            hasManualOverrides = true;
        }

        // Set manual override flags
        if (hasManualOverrides)
        {
            existingRecord.IsManualOverride = true;
            existingRecord.OverrideByUserId = _currentUser.UserId;
            existingRecord.OverrideAtUtc = DateTime.UtcNow;
            existingRecord.OverrideNotes = request.OverrideNotes;
        }

        return await _attendanceRepository.UpdateAsync(existingRecord);
    }

    /// <summary>
    /// Recalculates attendance record after manual time edits.
    /// Creates/updates transactions and recalculates all derived fields.
    /// </summary>
    /// <param name="attendanceRecord">The attendance record being updated</param>
    /// <param name="request">The update request with new time values</param>
    /// <param name="cancellationToken">Cancellation token</param>
    private async Task RecalculateAttendanceAfterTimeEdit(
        AttendanceRecord attendanceRecord,
        UpdateAttendanceRecordRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            // Get existing transactions for the attendance date
            var existingTransactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                attendanceRecord.EmployeeId, attendanceRecord.AttendanceDate);

            var transactionsList = existingTransactions.ToList();

            // Update or create check-in transaction
            if (request.ActualCheckInTime.HasValue)
            {
                await CreateOrUpdateTimeTransaction(
                    attendanceRecord.EmployeeId,
                    attendanceRecord.AttendanceDate,
                    TransactionType.CheckIn,
                    request.ActualCheckInTime.Value,
                    transactionsList);
            }

            // Update or create check-out transaction
            if (request.ActualCheckOutTime.HasValue)
            {
                await CreateOrUpdateTimeTransaction(
                    attendanceRecord.EmployeeId,
                    attendanceRecord.AttendanceDate,
                    TransactionType.CheckOut,
                    request.ActualCheckOutTime.Value,
                    transactionsList);
            }

            // Get updated transactions after modifications
            var updatedTransactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                attendanceRecord.EmployeeId, attendanceRecord.AttendanceDate);

            // Recalculate attendance using the calculation service
            var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                attendanceRecord, updatedTransactions, cancellationToken);

            // Update the attendance record with recalculated values
            // Only update calculated fields, preserve manual overrides for other fields
            attendanceRecord.Status = recalculatedRecord.Status;
            attendanceRecord.WorkingHours = recalculatedRecord.WorkingHours;
            attendanceRecord.OvertimeHours = recalculatedRecord.OvertimeHours;
            attendanceRecord.LateMinutes = recalculatedRecord.LateMinutes;
            attendanceRecord.EarlyLeaveMinutes = recalculatedRecord.EarlyLeaveMinutes;

            // Update break hours only if not manually overridden
            if (!request.BreakHours.HasValue)
            {
                attendanceRecord.BreakHours = recalculatedRecord.BreakHours;
            }

            _logger.LogInformation("Recalculated attendance record {RecordId} after time edit. Status: {Status}, Working Hours: {WorkingHours}",
                attendanceRecord.Id, attendanceRecord.Status, attendanceRecord.WorkingHours);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error recalculating attendance record {RecordId} after time edit", attendanceRecord.Id);
            // Don't throw - allow the update to proceed even if recalculation fails
        }
    }

    /// <summary>
    /// Creates or updates a time transaction (check-in/check-out) for manual edits.
    /// </summary>
    private async Task CreateOrUpdateTimeTransaction(
        long employeeId,
        DateTime attendanceDate,
        TransactionType transactionType,
        DateTime transactionTime,
        List<AttendanceTransaction> existingTransactions)
    {
        // Find existing transaction of the same type
        var existingTransaction = existingTransactions.FirstOrDefault(t => t.TransactionType == transactionType);

        if (existingTransaction != null)
        {
            // Update existing transaction
            existingTransaction.TransactionTimeUtc = transactionTime.ToUniversalTime();
            existingTransaction.TransactionTimeLocal = transactionTime;
            existingTransaction.IsManual = true;
            existingTransaction.EnteredByUserId = _currentUser.UserId;
            existingTransaction.Notes = $"Updated via attendance record edit at {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC";

            await _transactionRepository.UpdateAsync(existingTransaction);
        }
        else
        {
            // Create new transaction
            var newTransaction = new AttendanceTransaction
            {
                EmployeeId = employeeId,
                TransactionType = transactionType,
                TransactionTimeUtc = transactionTime.ToUniversalTime(),
                TransactionTimeLocal = transactionTime,
                AttendanceDate = attendanceDate,
                IsManual = true,
                EnteredByUserId = _currentUser.UserId,
                Notes = $"Created via attendance record edit at {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC",
                Location = "Manual Edit",
                IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString()
            };

            await _transactionRepository.CreateAsync(newTransaction);
        }
    }

    /// <summary>
    /// Manually calculates attendance for a specific employee on a specific date.
    /// This endpoint allows manual recalculation of attendance based on the shift assigned on that date.
    /// </summary>
    /// <param name="employeeId">Employee identifier</param>
    /// <param name="date">Date to calculate attendance for</param>
    /// <returns>Calculated attendance record</returns>
    [HttpPost("calculate/employee/{employeeId}/date/{date:datetime}")]
    [AllowAnonymous] // Temporarily allow for testing
    public async Task<ActionResult<AttendanceRecordResponse>> CalculateAttendanceForEmployeeDate(
        long employeeId, DateTime date)
    {
        try
        {
            _logger.LogInformation("Manual attendance calculation requested for employee {EmployeeId} on {Date} by user {UserId}",
                employeeId, date.Date, _currentUser.UserId);

            // Check if attendance record already exists
            var existingRecord = await _attendanceRepository.GetByEmployeeAndDateAsync(employeeId, date);

            if (existingRecord != null)
            {
                // Recalculate existing record
                var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(employeeId, date);

                // Detach the existing record to avoid tracking conflicts
                _attendanceRepository.Detach(existingRecord);

                var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                    existingRecord, transactions);

                var updatedRecord = await _attendanceRepository.UpdateAsync(recalculatedRecord);

                _logger.LogInformation("Recalculated existing attendance record {RecordId} for employee {EmployeeId} on {Date}",
                    existingRecord.Id, employeeId, date.Date);

                return Ok(MapToAttendanceRecordResponse(updatedRecord));
            }
            else
            {
                // Generate new attendance record
                var generated = await _generatorService.GenerateAttendanceRecordForEmployeeAsync(employeeId, date);

                if (!generated)
                {
                    return BadRequest($"Could not generate attendance record for employee {employeeId} on {date:yyyy-MM-dd}. Check employee exists and date is valid.");
                }

                // Retrieve the newly generated record
                var newRecord = await _attendanceRepository.GetByEmployeeAndDateAsync(employeeId, date);

                if (newRecord == null)
                {
                    return StatusCode(500, $"Failed to retrieve generated attendance record for employee {employeeId} on {date:yyyy-MM-dd}");
                }

                _logger.LogInformation("Generated new attendance record for employee {EmployeeId} on {Date}",
                    employeeId, date.Date);

                return Ok(MapToAttendanceRecordResponse(newRecord));
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calculating attendance for employee {EmployeeId} on {Date}", employeeId, date);
            return StatusCode(500, "An error occurred while calculating attendance");
        }
    }

    /// <summary>
    /// Manually calculates attendance for all employees on a specific date.
    /// This endpoint forces recalculation/generation for all active employees.
    /// </summary>
    /// <param name="date">Date to calculate attendance for</param>
    /// <param name="forceRecalculate">Whether to recalculate existing records</param>
    /// <returns>Calculation result summary</returns>
    [HttpPost("calculate/date/{date:datetime}")]
    [Authorize(Policy = "SystemAdmin")]
    public async Task<ActionResult<Models.AttendanceGenerationResult>> CalculateAttendanceForDate(
        DateTime date, [FromQuery] bool forceRecalculate = false)
    {
        try
        {
            _logger.LogInformation("Manual attendance calculation requested for date {Date} (force recalculate: {ForceRecalculate}) by user {UserId}",
                date.Date, forceRecalculate, _currentUser.UserId);

            var result = new Models.AttendanceGenerationResult
            {
                Date = date,
                Errors = new List<string>()
            };

            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            if (forceRecalculate)
            {
                // Recalculate all existing records for the date
                var recalculatedCount = await _generatorService.RecalculateAttendanceRecordsAsync(date);
                result.RecordsUpdated = recalculatedCount;
            }

            // Generate attendance for any employees missing records
            var generatedCount = await _generatorService.GenerateAttendanceRecordsAsync(date);
            result.RecordsGenerated = generatedCount;

            stopwatch.Stop();
            result.Duration = stopwatch.ElapsedMilliseconds;

            _logger.LogInformation("Manual attendance calculation completed for {Date}. Generated: {Generated}, Updated: {Updated}",
                date.Date, result.RecordsGenerated, result.RecordsUpdated);

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calculating attendance for date {Date}", date);
            return StatusCode(500, "An error occurred while calculating attendance for the specified date");
        }
    }

    /// <summary>
    /// Bulk manual calculation for multiple employees and dates.
    /// Useful for fixing attendance records after system issues or data imports.
    /// </summary>
    /// <param name="request">Bulk calculation request with employee IDs and date range</param>
    /// <returns>Bulk calculation results</returns>
    [HttpPost("calculate/bulk")]
    [Authorize(Policy = "SystemAdmin")]
    public async Task<ActionResult<BulkCalculationResult>> BulkCalculateAttendance(
        [FromBody] BulkCalculationRequest request)
    {
        try
        {
            // Validate request
            if (request.StartDate > request.EndDate)
            {
                return BadRequest("Start date must be before or equal to end date");
            }

            var dateRange = (request.EndDate - request.StartDate).Days;
            if (dateRange > 31)
            {
                return BadRequest("Date range cannot exceed 31 days");
            }

            if (request.EmployeeIds != null && request.EmployeeIds.Count > 100)
            {
                return BadRequest("Cannot process more than 100 employees at once");
            }

            _logger.LogInformation("Bulk attendance calculation requested for {EmployeeCount} employees from {StartDate} to {EndDate} by user {UserId}",
                request.EmployeeIds?.Count ?? 0, request.StartDate.Date, request.EndDate.Date, _currentUser.UserId);

            var result = new BulkCalculationResult
            {
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                EmployeeResults = new List<EmployeeCalculationResult>(),
                Errors = new List<string>()
            };

            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            // Process each date in the range
            for (var date = request.StartDate.Date; date <= request.EndDate.Date; date = date.AddDays(1))
            {
                if (request.EmployeeIds != null && request.EmployeeIds.Any())
                {
                    // Process specific employees
                    foreach (var employeeId in request.EmployeeIds)
                    {
                        try
                        {
                            var existingRecord = await _attendanceRepository.GetByEmployeeAndDateAsync(employeeId, date);

                            if (existingRecord != null && request.ForceRecalculate)
                            {
                                // Recalculate existing record
                                var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(employeeId, date);
                                var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                                    existingRecord, transactions);
                                await _attendanceRepository.UpdateAsync(recalculatedRecord);

                                AddEmployeeResult(result, employeeId, date, "Recalculated", true);
                            }
                            else if (existingRecord == null)
                            {
                                // Generate new record
                                var generated = await _generatorService.GenerateAttendanceRecordForEmployeeAsync(employeeId, date);
                                AddEmployeeResult(result, employeeId, date, generated ? "Generated" : "Skipped", generated);
                            }
                            else
                            {
                                AddEmployeeResult(result, employeeId, date, "Existed", true);
                            }
                        }
                        catch (Exception ex)
                        {
                            AddEmployeeResult(result, employeeId, date, $"Error: {ex.Message}", false);
                            result.Errors.Add($"Employee {employeeId} on {date:yyyy-MM-dd}: {ex.Message}");
                        }
                    }
                }
                else
                {
                    // Process all employees for the date
                    try
                    {
                        var generated = await _generatorService.GenerateAttendanceRecordsAsync(date);
                        if (request.ForceRecalculate)
                        {
                            var recalculated = await _generatorService.RecalculateAttendanceRecordsAsync(date);
                            result.TotalRecalculated += recalculated;
                        }
                        result.TotalGenerated += generated;
                    }
                    catch (Exception ex)
                    {
                        result.Errors.Add($"Date {date:yyyy-MM-dd}: {ex.Message}");
                    }
                }
            }

            stopwatch.Stop();
            result.Duration = stopwatch.ElapsedMilliseconds;
            result.TotalProcessed = result.EmployeeResults.Count;
            result.TotalSuccessful = result.EmployeeResults.Count(r => r.Success);

            _logger.LogInformation("Bulk attendance calculation completed. Processed: {Processed}, Successful: {Successful}, Errors: {Errors}",
                result.TotalProcessed, result.TotalSuccessful, result.Errors.Count);

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in bulk attendance calculation");
            return StatusCode(500, "An error occurred during bulk attendance calculation");
        }
    }

    // Helper method for bulk calculation results
    private static void AddEmployeeResult(BulkCalculationResult result, long employeeId, DateTime date, string action, bool success)
    {
        result.EmployeeResults.Add(new EmployeeCalculationResult
        {
            EmployeeId = employeeId,
            Date = date,
            Action = action,
            Success = success
        });
    }

    /// <summary>
    /// Changes the shift assignment for a specific attendance record and recalculates attendance.
    /// This creates a temporary shift assignment for the specific date and recalculates the attendance record.
    /// </summary>
    /// <param name="recordId">Attendance record identifier</param>
    /// <param name="request">Shift change request</param>
    /// <returns>Updated attendance record</returns>
    [HttpPost("{recordId}/change-shift")]
    [Authorize(Policy = "AttendanceManagement")]
    public async Task<ActionResult<AttendanceRecordResponse>> ChangeAttendanceShift(
        long recordId, [FromBody] ChangeAttendanceShiftRequest request)
    {
        try
        {
            // Get the existing attendance record
            var attendanceRecord = await _attendanceRepository.GetByIdAsync(recordId);
            if (attendanceRecord == null)
            {
                return NotFound($"Attendance record with ID {recordId} not found");
            }

            _logger.LogInformation("Changing shift for attendance record {RecordId} to shift {ShiftId} by user {UserId}",
                recordId, request.ShiftId, _currentUser.UserId);

            // Get the effective shift assignment for the employee on the attendance date
            var currentShiftAssignment = await _calculationService.GetEffectiveShiftAssignmentAsync(
                attendanceRecord.EmployeeId, attendanceRecord.AttendanceDate);

            if (currentShiftAssignment?.ShiftId == request.ShiftId)
            {
                return BadRequest("The selected shift is already assigned to this employee for this date");
            }

            // Create a temporary shift assignment for this specific date
            // This allows us to override the shift for just this one attendance record
            var tempShiftAssignment = new Domain.Shifts.ShiftAssignment
            {
                EmployeeId = attendanceRecord.EmployeeId,
                ShiftId = request.ShiftId,
                AssignmentType = Domain.Common.ShiftAssignmentType.Employee,
                EffectiveFromDate = attendanceRecord.AttendanceDate.Date,
                EffectiveToDate = attendanceRecord.AttendanceDate.Date.AddDays(1).AddTicks(-1),
                Status = Domain.Common.ShiftAssignmentStatus.Active,
                Priority = 100, // Maximum allowed priority to override other assignments
                Notes = $"Temporary assignment for attendance record {recordId}. {request.Notes ?? ""}",
                AssignedByUserId = _currentUser.UserId ?? 0,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "System"
            };

            // Persist the temporary shift assignment to the database
            _context.ShiftAssignments.Add(tempShiftAssignment);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Created temporary shift assignment {AssignmentId} for employee {EmployeeId} on {Date}",
                tempShiftAssignment.Id, attendanceRecord.EmployeeId, attendanceRecord.AttendanceDate);

            // Get all transactions for this attendance date
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                attendanceRecord.EmployeeId, attendanceRecord.AttendanceDate);

            // Recalculate attendance using the new shift assignment
            var recalculatedRecord = await _calculationService.CalculateAttendanceAsync(
                attendanceRecord.EmployeeId,
                attendanceRecord.AttendanceDate,
                transactions,
                tempShiftAssignment);

            // Update the attendance record to reference the new shift assignment
            attendanceRecord.ShiftAssignmentId = tempShiftAssignment.Id;

            // Update the attendance record with recalculated values
            attendanceRecord.Status = recalculatedRecord.Status;
            attendanceRecord.ScheduledStartTime = recalculatedRecord.ScheduledStartTime;
            attendanceRecord.ScheduledEndTime = recalculatedRecord.ScheduledEndTime;
            attendanceRecord.ScheduledHours = recalculatedRecord.ScheduledHours;
            attendanceRecord.WorkingHours = recalculatedRecord.WorkingHours;
            attendanceRecord.BreakHours = recalculatedRecord.BreakHours;
            attendanceRecord.OvertimeHours = recalculatedRecord.OvertimeHours;
            attendanceRecord.LateMinutes = recalculatedRecord.LateMinutes;
            attendanceRecord.EarlyLeaveMinutes = recalculatedRecord.EarlyLeaveMinutes;

            // Mark as manual override
            attendanceRecord.IsManualOverride = true;
            attendanceRecord.OverrideByUserId = _currentUser.UserId;
            attendanceRecord.OverrideAtUtc = DateTime.UtcNow;
            attendanceRecord.OverrideNotes = $"Shift changed to {request.ShiftId}. {request.Notes ?? ""}";

            // Update the record
            var updatedRecord = await _attendanceRepository.UpdateAsync(attendanceRecord);

            _logger.LogInformation("Successfully changed shift for attendance record {RecordId} from shift {OldShift} to {NewShift}",
                recordId, currentShiftAssignment?.ShiftId, request.ShiftId);

            return Ok(MapToAttendanceRecordResponse(updatedRecord));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error changing shift for attendance record {RecordId}", recordId);
            return StatusCode(500, "An error occurred while changing the shift assignment");
        }
    }

    private static WorkingDayAnalysisResponse MapToWorkingDayAnalysisResponse(WorkingDay workingDay)
    {
        return new WorkingDayAnalysisResponse
        {
            WorkStartTime = workingDay.WorkStartTime,
            WorkEndTime = workingDay.WorkEndTime,
            TotalTimeOnPremises = workingDay.TotalTimeOnPremises,
            ProductiveWorkingTime = workingDay.ProductiveWorkingTime,
            TotalBreakTime = workingDay.TotalBreakTime,
            BreakPeriodCount = workingDay.BreakPeriodCount,
            LongestBreakDuration = workingDay.LongestBreakDuration,
            CoreHoursWorked = workingDay.CoreHoursWorked,
            CoreHoursCompliant = workingDay.CoreHoursCompliant,
            RegularOvertimeHours = workingDay.RegularOvertimeHours,
            PremiumOvertimeHours = workingDay.PremiumOvertimeHours,
            EfficiencyPercentage = workingDay.EfficiencyPercentage,
            IsCalculationComplete = workingDay.IsCalculationComplete
        };
    }

    /// <summary>
    /// Gets monthly attendance report with summary statistics and employee records.
    /// </summary>
    /// <param name="request">Monthly report request with month, year, and filters</param>
    /// <returns>Monthly report with statistics and employee records</returns>
    [HttpPost("monthly-report")]
    [ProducesResponseType(typeof(MonthlyReportResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MonthlyReportResponse>> GetMonthlyReport([FromBody] MonthlyReportRequest request)
    {
        _logger.LogInformation("Getting monthly report for {Month}/{Year}", request.Month, request.Year);

        var query = new GetMonthlyReportQuery(
            request.Month,
            request.Year,
            request.BranchIds,
            request.DepartmentIds,
            request.EmployeeIds
        );

        var result = await _mediator.Send(query);

        if (!result.IsSuccess)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value);
    }
}