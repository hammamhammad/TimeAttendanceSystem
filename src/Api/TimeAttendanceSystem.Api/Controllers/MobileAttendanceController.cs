using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.MobileAttendance.Commands.ProcessMobileTransaction;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for mobile attendance transactions with GPS + NFC dual verification.
/// Used by the Flutter ESS mobile app for employee check-in/out operations.
/// </summary>
[ApiController]
[Route("api/v1/mobile/attendance")]
[Authorize]
public class MobileAttendanceController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public MobileAttendanceController(
        IMediator mediator,
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _mediator = mediator;
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Process a mobile attendance transaction (check-in, check-out, break start/end).
    /// Requires GPS geofence validation and NFC tag verification.
    /// </summary>
    [HttpPost("transaction")]
    public async Task<IActionResult> ProcessTransaction([FromBody] MobileTransactionRequest request)
    {
        var command = new ProcessMobileTransactionCommand(
            request.EmployeeId,
            request.BranchId,
            request.TransactionType,
            request.Latitude,
            request.Longitude,
            request.NfcTagUid,
            request.NfcPayload,
            request.DeviceId,
            request.DeviceModel,
            request.Platform,
            request.AppVersion
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        var transactionResult = result.Value;
        
        if (!transactionResult.Success)
        {
            return Ok(new 
            { 
                success = false, 
                message = transactionResult.Message 
            });
        }

        return Ok(new 
        { 
            success = true,
            transactionId = transactionResult.TransactionId,
            message = transactionResult.Message,
            transactionTime = transactionResult.TransactionTime
        });
    }

    /// <summary>
    /// Quick check if the user is within the geofence of a branch.
    /// Used to show UI indicators before attempting a transaction.
    /// </summary>
    [HttpPost("check-location")]
    public async Task<IActionResult> CheckLocation([FromBody] LocationCheckRequest request)
    {
        // Get branch coordinates
        var query = new CheckLocationQuery(request.BranchId, request.Latitude, request.Longitude);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Get a monthly attendance summary for the current authenticated employee.
    /// Returns aggregated statistics including working days, present/absent/late counts, and hours.
    /// </summary>
    /// <param name="year">The year to query (e.g. 2026)</param>
    /// <param name="month">The month to query (1-12)</param>
    /// <returns>Monthly attendance summary with day counts and hour totals</returns>
    [HttpGet("summary")]
    public async Task<IActionResult> GetAttendanceSummary([FromQuery] int year, [FromQuery] int month)
    {
        if (month < 1 || month > 12)
        {
            return BadRequest(new { error = "Month must be between 1 and 12" });
        }

        if (year < 2000 || year > 2100)
        {
            return BadRequest(new { error = "Year must be between 2000 and 2100" });
        }

        // Get current employee from user context through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

        if (employeeLink == null)
        {
            return NotFound(new { error = "Employee profile not found for current user" });
        }

        var employeeId = employeeLink.EmployeeId;

        // Define the date range for the requested month
        var startDate = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc);
        var endDate = startDate.AddMonths(1);

        // Query attendance records for the employee and month
        var records = await _context.AttendanceRecords
            .Where(ar => ar.EmployeeId == employeeId
                && ar.AttendanceDate >= startDate
                && ar.AttendanceDate < endDate)
            .AsNoTracking()
            .ToListAsync();

        // Statuses that count as "working days" (days where attendance is expected)
        var workingDayStatuses = new[]
        {
            AttendanceStatus.Present,
            AttendanceStatus.Absent,
            AttendanceStatus.Late,
            AttendanceStatus.EarlyLeave,
            AttendanceStatus.Overtime,
            AttendanceStatus.Incomplete,
            AttendanceStatus.Pending,
            AttendanceStatus.Excused,
            AttendanceStatus.RemoteWork
        };

        var totalWorkingDays = records.Count(r => workingDayStatuses.Contains(r.Status));

        var presentDays = records.Count(r =>
            r.Status == AttendanceStatus.Present
            || r.Status == AttendanceStatus.Overtime
            || r.Status == AttendanceStatus.RemoteWork);

        var absentDays = records.Count(r => r.Status == AttendanceStatus.Absent);

        var lateDays = records.Count(r => r.Status == AttendanceStatus.Late);

        var totalWorkingHours = records.Sum(r => r.WorkingHours);

        var totalOvertimeHours = records.Sum(r => r.OvertimeHours);

        return Ok(new
        {
            year,
            month,
            totalWorkingDays,
            presentDays,
            absentDays,
            lateDays,
            totalWorkingHours = Math.Round(totalWorkingHours, 2),
            totalOvertimeHours = Math.Round(totalOvertimeHours, 2)
        });
    }
}

public record MobileTransactionRequest(
    long EmployeeId,
    long BranchId,
    MobileTransactionType TransactionType,
    double Latitude,
    double Longitude,
    string? NfcTagUid,
    string? NfcPayload,
    string DeviceId,
    string? DeviceModel,
    string Platform,
    string? AppVersion
);

public record LocationCheckRequest(
    long BranchId,
    double Latitude,
    double Longitude
);
