using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Reports.DTOs;
using TecAxle.Hrms.Application.Reports.Queries;
using TecAxle.Hrms.Application.Reports.Services;

namespace TecAxle.Hrms.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly IReportsService _reportsService;
    private readonly ICurrentUser _currentUser;

    public ReportsController(IReportsService reportsService, ICurrentUser currentUser)
    {
        _reportsService = reportsService;
        _currentUser = currentUser;
    }

    // ============================================================
    // Existing Attendance & Leave Reports
    // ============================================================

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

    // ============================================================
    // Payroll Reports
    // ============================================================

    /// <summary>
    /// Gets the salary register for a specific payroll period.
    /// Returns a breakdown of all employee salary components for the period.
    /// </summary>
    [HttpGet("salary-register")]
    [ProducesResponseType(typeof(SalaryRegisterReport), StatusCodes.Status200OK)]
    public async Task<ActionResult<SalaryRegisterReport>> GetSalaryRegister(
        [FromQuery] long payrollPeriodId)
    {
        var report = await _reportsService.GetSalaryRegisterAsync(payrollPeriodId, _currentUser.BranchIds);
        return Ok(report);
    }

    /// <summary>
    /// Gets the department cost report aggregated by department.
    /// Shows total salary costs per department for a given year and optional month.
    /// </summary>
    [HttpGet("department-cost")]
    [ProducesResponseType(typeof(DepartmentCostReport), StatusCodes.Status200OK)]
    public async Task<ActionResult<DepartmentCostReport>> GetDepartmentCostReport(
        [FromQuery] int year,
        [FromQuery] int? month = null,
        [FromQuery] long? branchId = null)
    {
        var report = await _reportsService.GetDepartmentCostReportAsync(year, month, branchId, _currentUser.BranchIds);
        return Ok(report);
    }

    /// <summary>
    /// Gets year-to-date earnings report for employees.
    /// Returns paginated YTD salary totals grouped by employee.
    /// </summary>
    [HttpGet("ytd-earnings")]
    [ProducesResponseType(typeof(YtdEarningsReport), StatusCodes.Status200OK)]
    public async Task<ActionResult<YtdEarningsReport>> GetYtdEarningsReport(
        [FromQuery] int year,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var report = await _reportsService.GetYtdEarningsReportAsync(year, branchId, departmentId, page, pageSize, _currentUser.BranchIds);
        return Ok(report);
    }

    // ============================================================
    // HR Compliance Reports
    // ============================================================

    /// <summary>
    /// Gets contracts expiring within the specified threshold.
    /// Returns active contracts with end dates within the threshold period.
    /// </summary>
    [HttpGet("contract-expiry")]
    [ProducesResponseType(typeof(ContractExpiryReport), StatusCodes.Status200OK)]
    public async Task<ActionResult<ContractExpiryReport>> GetContractExpiryReport(
        [FromQuery] int daysThreshold = 30,
        [FromQuery] long? branchId = null)
    {
        var report = await _reportsService.GetContractExpiryReportAsync(daysThreshold, branchId, _currentUser.BranchIds);
        return Ok(report);
    }

    /// <summary>
    /// Gets employee documents expiring within the specified threshold.
    /// Returns documents with expiry dates within the threshold period.
    /// </summary>
    [HttpGet("document-expiry")]
    [ProducesResponseType(typeof(DocumentExpiryReport), StatusCodes.Status200OK)]
    public async Task<ActionResult<DocumentExpiryReport>> GetDocumentExpiryReport(
        [FromQuery] int daysThreshold = 30,
        [FromQuery] long? branchId = null)
    {
        var report = await _reportsService.GetDocumentExpiryReportAsync(daysThreshold, branchId, _currentUser.BranchIds);
        return Ok(report);
    }

    /// <summary>
    /// Gets employee certifications expiring within the specified threshold.
    /// Returns active/pending certifications with expiry dates within the threshold period.
    /// </summary>
    [HttpGet("certification-expiry")]
    [ProducesResponseType(typeof(CertificationExpiryReport), StatusCodes.Status200OK)]
    public async Task<ActionResult<CertificationExpiryReport>> GetCertificationExpiryReport(
        [FromQuery] int daysThreshold = 30,
        [FromQuery] long? branchId = null)
    {
        var report = await _reportsService.GetCertificationExpiryReportAsync(daysThreshold, branchId, _currentUser.BranchIds);
        return Ok(report);
    }

    /// <summary>
    /// Gets a compliance summary with counts of expiring contracts, documents, and certifications.
    /// Provides counts at 7-day, 30-day, and 90-day thresholds plus already-expired counts.
    /// </summary>
    [HttpGet("compliance-summary")]
    [ProducesResponseType(typeof(ComplianceSummaryReport), StatusCodes.Status200OK)]
    public async Task<ActionResult<ComplianceSummaryReport>> GetComplianceSummary(
        [FromQuery] long? branchId = null)
    {
        var report = await _reportsService.GetComplianceSummaryAsync(branchId, _currentUser.BranchIds);
        return Ok(report);
    }
}
