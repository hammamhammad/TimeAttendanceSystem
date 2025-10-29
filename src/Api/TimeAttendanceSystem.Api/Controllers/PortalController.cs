using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Features.Portal.EmployeeDashboard.Queries;
using TimeAttendanceSystem.Application.Features.Portal.ManagerDashboard.Queries;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for employee self-service portal features.
/// Provides dashboard and portal-related functionality for employees and managers.
/// </summary>
[ApiController]
[Route("api/v1/portal")]
[Authorize]
public class PortalController : ControllerBase
{
    private readonly IMediator _mediator;

    public PortalController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves the employee dashboard with attendance stats, vacation balance, and recent activity.
    /// </summary>
    /// <returns>Employee dashboard data including stats and activity timeline</returns>
    [HttpGet("employee-dashboard")]
    [ProducesResponseType(typeof(Result<EmployeeDashboardDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetEmployeeDashboard()
    {
        var query = new GetEmployeeDashboardQuery();
        var result = await _mediator.Send(query);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }

    /// <summary>
    /// Retrieves the manager dashboard with team stats and pending approvals.
    /// </summary>
    /// <returns>Manager dashboard data including team overview and approval queue</returns>
    [HttpGet("manager-dashboard")]
    [Authorize(Policy = "ManagerAccess")]
    [ProducesResponseType(typeof(Result<ManagerDashboardDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetManagerDashboard()
    {
        // TODO: Implement GetManagerDashboardQuery handler
        var result = Result<ManagerDashboardDto>.Success(new ManagerDashboardDto
        {
            ManagerId = 0,
            ManagerName = "Placeholder",
            TeamSize = 0,
            PresentToday = 0,
            AbsentToday = 0,
            LateToday = 0,
            PendingApprovals = 0,
            TeamAttendanceRate = 0,
            TeamOvertimeHours = 0,
            PendingApprovalsSummary = new PendingApprovalsSummaryDto
            {
                PendingVacations = 0,
                PendingExcuses = 0,
                PendingRemoteWorkRequests = 0,
                PendingFingerprintRequests = 0
            }
        });

        return Ok(result);
    }
}
