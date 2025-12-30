using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Api.Models;
using TimeAttendanceSystem.Application.LeaveManagement.Commands.SetLeaveEntitlement;
using TimeAttendanceSystem.Application.LeaveManagement.Commands.ProcessMonthlyAccrual;
using TimeAttendanceSystem.Application.LeaveManagement.Commands.AdjustLeaveBalance;
using TimeAttendanceSystem.Application.LeaveManagement.Queries.GetEmployeeLeaveBalance;
using TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveBalanceSummary;
using TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveTransactionHistory;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for employee leave balance and entitlement management.
/// Provides comprehensive leave balance tracking, accrual processing, and transaction history.
/// </summary>
/// <remarks>
/// Leave Balance Management Features:
/// - Leave entitlement configuration and management
/// - Real-time leave balance tracking and queries
/// - Monthly accrual processing (manual and automated)
/// - Balance adjustments for corrections and special grants
/// - Transaction history and audit trail
/// - Multi-vacation-type balance summaries
///
/// Security and Authorization:
/// - All endpoints require authentication (JWT token)
/// - Permission-based authorization for sensitive operations
/// - Branch-level data access control for multi-tenant isolation
/// - Audit logging for all balance modifications
/// - Input validation and business rule enforcement
///
/// Business Logic Integration:
/// - Integration with LeaveAccrualService for calculations
/// - Policy-based accrual rules enforcement
/// - Proration for mid-year hires
/// - Carry-over and expiration management
/// - Balance reservation for vacation requests
/// </remarks>
[ApiController]
[Route("api/v1/leave-balances")]
[Authorize]
public class LeaveBalancesController : ControllerBase
{
    private readonly IMediator _mediator;

    public LeaveBalancesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves leave balance for a specific employee, vacation type, and year.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Vacation type ID</param>
    /// <param name="year">Calendar year</param>
    /// <returns>Leave balance details with accrual and usage information</returns>
    /// <response code="200">Leave balance retrieved successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="403">User lacks permission to view balance</response>
    /// <response code="404">Balance not found or employee does not exist</response>
    [HttpGet("employee/{employeeId}/vacation-type/{vacationTypeId}/year/{year}")]
    [Authorize(Policy = "LeaveBalanceRead")]
    public async Task<IActionResult> GetEmployeeLeaveBalance(long employeeId, long vacationTypeId, int year)
    {
        var query = new GetEmployeeLeaveBalanceQuery(employeeId, vacationTypeId, year);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        if (result.Value == null)
        {
            return NotFound(new { error = "Leave balance not found" });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Retrieves comprehensive leave balance summary for an employee across all vacation types.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="year">Calendar year</param>
    /// <returns>Summary of all leave balances with totals</returns>
    /// <response code="200">Leave balance summary retrieved successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="403">User lacks permission to view balance</response>
    /// <response code="404">Employee not found</response>
    [HttpGet("employee/{employeeId}/summary/{year}")]
    [Authorize(Policy = "LeaveBalanceRead")]
    public async Task<IActionResult> GetLeaveBalanceSummary(long employeeId, int year)
    {
        var query = new GetLeaveBalanceSummaryQuery(employeeId, year);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Retrieves transaction history for an employee's leave balance with pagination.
    /// </summary>
    /// <param name="employeeId">Employee ID</param>
    /// <param name="vacationTypeId">Optional vacation type ID filter</param>
    /// <param name="year">Optional year filter</param>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 50, max: 100)</param>
    /// <returns>Paginated transaction history</returns>
    /// <response code="200">Transaction history retrieved successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="403">User lacks permission to view transaction history</response>
    /// <response code="404">Employee not found</response>
    [HttpGet("employee/{employeeId}/transactions")]
    [Authorize(Policy = "LeaveBalanceRead")]
    public async Task<IActionResult> GetLeaveTransactionHistory(
        long employeeId,
        [FromQuery] long? vacationTypeId = null,
        [FromQuery] int? year = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50)
    {
        var query = new GetLeaveTransactionHistoryQuery(employeeId, vacationTypeId, year, page, pageSize);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Sets or updates leave entitlement for an employee.
    /// </summary>
    /// <param name="request">Leave entitlement configuration</param>
    /// <returns>Created or updated entitlement ID</returns>
    /// <response code="200">Leave entitlement set successfully</response>
    /// <response code="400">Invalid request or validation failure</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="403">User lacks permission to manage entitlements</response>
    [HttpPost("entitlements")]
    [Authorize(Policy = "LeaveEntitlementManagement")]
    public async Task<IActionResult> SetLeaveEntitlement([FromBody] SetLeaveEntitlementRequest request)
    {
        var command = new SetLeaveEntitlementCommand(
            request.EmployeeId,
            request.VacationTypeId,
            request.Year,
            request.AnnualDays,
            request.CarryOverDays,
            request.MaxCarryOverDays,
            request.ExpiresAtYearEnd,
            request.EffectiveStartDate,
            request.EffectiveEndDate,
            request.Notes);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { entitlementId = result.Value });
    }

    /// <summary>
    /// Processes monthly accrual for employees.
    /// Can process all employees or a specific employee.
    /// </summary>
    /// <param name="request">Monthly accrual processing parameters</param>
    /// <returns>Number of employees processed</returns>
    /// <response code="200">Monthly accrual processed successfully</response>
    /// <response code="400">Invalid request or validation failure</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="403">User lacks permission to process accrual</response>
    [HttpPost("accrual/process-monthly")]
    [Authorize(Policy = "LeaveAccrualManagement")]
    public async Task<IActionResult> ProcessMonthlyAccrual([FromBody] ProcessMonthlyAccrualRequest request)
    {
        var command = new ProcessMonthlyAccrualCommand(
            request.Year,
            request.Month,
            request.EmployeeId);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { processedCount = result.Value, message = $"Processed monthly accrual for {result.Value} employee(s)" });
    }

    /// <summary>
    /// Adjusts leave balance manually for corrections or special grants.
    /// </summary>
    /// <param name="request">Balance adjustment details</param>
    /// <returns>Success indicator</returns>
    /// <response code="200">Balance adjusted successfully</response>
    /// <response code="400">Invalid request or validation failure</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="403">User lacks permission to adjust balances</response>
    [HttpPost("adjustments")]
    [Authorize(Policy = "LeaveBalanceAdjustment")]
    public async Task<IActionResult> AdjustLeaveBalance([FromBody] AdjustLeaveBalanceRequest request)
    {
        var command = new AdjustLeaveBalanceCommand(
            request.EmployeeId,
            request.VacationTypeId,
            request.Year,
            request.AdjustmentDays,
            request.Reason);

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { success = true, message = "Leave balance adjusted successfully" });
    }
}
