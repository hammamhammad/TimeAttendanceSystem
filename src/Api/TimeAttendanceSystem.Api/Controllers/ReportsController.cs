using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Reports.DTOs;
using TimeAttendanceSystem.Application.Reports.Queries;
using TimeAttendanceSystem.Application.Reports.Services;

namespace TimeAttendanceSystem.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly IReportsService _reportsService;

    public ReportsController(IReportsService reportsService)
    {
        _reportsService = reportsService;
    }

    [HttpGet("attendance")]
    [ProducesResponseType(typeof(AttendanceReportSummary), StatusCodes.Status200OK)]
    public async Task<ActionResult<AttendanceReportSummary>> GetAttendanceReport(
        [FromQuery] DateTime from,
        [FromQuery] DateTime to,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] long? employeeId = null)
    {
        var filter = new ReportFilter
        {
            FromDate = from,
            ToDate = to,
            BranchId = branchId,
            DepartmentId = departmentId,
            EmployeeId = employeeId
        };

        var report = await _reportsService.GetAttendanceReportAsync(filter);
        return Ok(report);
    }

    [HttpGet("attendance/export")]
    public async Task<IActionResult> GetAttendanceReportCsv(
        [FromQuery] DateTime from,
        [FromQuery] DateTime to,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] long? employeeId = null)
    {
        var filter = new ReportFilter
        {
            FromDate = from,
            ToDate = to,
            BranchId = branchId,
            DepartmentId = departmentId,
            EmployeeId = employeeId
        };

        var csvBytes = await _reportsService.GetAttendanceReportCsvAsync(filter);
        return File(csvBytes, "text/csv", $"attendance_report_{from:yyyyMMdd}_{to:yyyyMMdd}.csv");
    }

    [HttpGet("leaves")]
    [ProducesResponseType(typeof(LeaveReportSummary), StatusCodes.Status200OK)]
    public async Task<ActionResult<LeaveReportSummary>> GetLeaveReport(
        [FromQuery] DateTime from,
        [FromQuery] DateTime to,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] long? employeeId = null)
    {
        var filter = new ReportFilter
        {
            FromDate = from,
            ToDate = to,
            BranchId = branchId,
            DepartmentId = departmentId,
            EmployeeId = employeeId
        };

        var report = await _reportsService.GetLeaveReportAsync(filter);
        return Ok(report);
    }
}
