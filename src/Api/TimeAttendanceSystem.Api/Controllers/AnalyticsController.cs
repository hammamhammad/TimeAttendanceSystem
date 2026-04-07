using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/analytics")]
[Authorize]
public class AnalyticsController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public AnalyticsController(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>Returns headcount trends over time.</summary>
    [HttpGet("headcount")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetHeadcount(
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-12);
        var end = endDate ?? DateTime.UtcNow;

        var query = _context.Employees
            .AsNoTracking()
            .Where(e => !e.IsDeleted);

        if (branchId.HasValue) query = query.Where(e => e.BranchId == branchId.Value);
        if (departmentId.HasValue) query = query.Where(e => e.DepartmentId == departmentId.Value);

        var totalActive = await query.CountAsync(e => e.IsActive);
        var totalInactive = await query.CountAsync(e => !e.IsActive);

        // Monthly trend: new hires per month
        var hiresByMonth = await query
            .Where(e => e.HireDate >= start && e.HireDate <= end)
            .GroupBy(e => new { e.HireDate.Year, e.HireDate.Month })
            .Select(g => new
            {
                year = g.Key.Year,
                month = g.Key.Month,
                count = g.Count()
            })
            .OrderBy(x => x.year).ThenBy(x => x.month)
            .ToListAsync();

        // By branch
        var byBranch = await query
            .Where(e => e.IsActive)
            .GroupBy(e => new { e.BranchId, e.Branch.Name })
            .Select(g => new { branchId = g.Key.BranchId, branchName = g.Key.Name, count = g.Count() })
            .OrderByDescending(x => x.count)
            .ToListAsync();

        return Ok(new
        {
            totalActive,
            totalInactive,
            total = totalActive + totalInactive,
            hiresByMonth,
            byBranch
        });
    }

    /// <summary>Returns gender and age group demographics.</summary>
    [HttpGet("headcount/demographics")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetDemographics()
    {
        var employees = _context.Employees
            .AsNoTracking()
            .Where(e => e.IsActive && !e.IsDeleted);

        var byGender = await employees
            .GroupBy(e => e.Gender)
            .Select(g => new { gender = g.Key != null ? g.Key.ToString() : "Unknown", count = g.Count() })
            .ToListAsync();

        var today = DateTime.UtcNow.Date;
        var allEmps = await employees
            .Where(e => e.DateOfBirth != null)
            .Select(e => new { e.DateOfBirth })
            .ToListAsync();

        var byAgeGroup = allEmps
            .Select(e =>
            {
                var age = today.Year - e.DateOfBirth!.Value.Year;
                if (e.DateOfBirth.Value.Date > today.AddYears(-age)) age--;
                return age;
            })
            .GroupBy(age => age switch
            {
                < 25 => "Under 25",
                < 35 => "25-34",
                < 45 => "35-44",
                < 55 => "45-54",
                _ => "55+"
            })
            .Select(g => new { ageGroup = g.Key, count = g.Count() })
            .OrderBy(x => x.ageGroup)
            .ToList();

        var byEmploymentStatus = await employees
            .GroupBy(e => e.EmploymentStatus)
            .Select(g => new { status = g.Key.ToString(), count = g.Count() })
            .ToListAsync();

        return Ok(new
        {
            byGender,
            byAgeGroup,
            byEmploymentStatus
        });
    }

    /// <summary>Returns attrition rate from terminations and resignations.</summary>
    [HttpGet("attrition")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetAttrition(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] long? branchId = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-12);
        var end = endDate ?? DateTime.UtcNow;

        var terminationsQuery = _context.TerminationRecords
            .AsNoTracking()
            .Where(t => t.TerminationDate >= start && t.TerminationDate <= end && !t.IsDeleted);

        var resignationsQuery = _context.ResignationRequests
            .AsNoTracking()
            .Where(r => r.Status == ResignationStatus.Approved
                && r.LastWorkingDate >= start && r.LastWorkingDate <= end && !r.IsDeleted);

        if (branchId.HasValue)
        {
            terminationsQuery = terminationsQuery.Where(t => t.Employee.BranchId == branchId.Value);
            resignationsQuery = resignationsQuery.Where(r => r.Employee.BranchId == branchId.Value);
        }

        var terminationsByMonth = await terminationsQuery
            .GroupBy(t => new { t.TerminationDate.Year, t.TerminationDate.Month })
            .Select(g => new { year = g.Key.Year, month = g.Key.Month, count = g.Count() })
            .OrderBy(x => x.year).ThenBy(x => x.month)
            .ToListAsync();

        var resignationsByMonth = await resignationsQuery
            .GroupBy(r => new { r.LastWorkingDate.Year, r.LastWorkingDate.Month })
            .Select(g => new { year = g.Key.Year, month = g.Key.Month, count = g.Count() })
            .OrderBy(x => x.year).ThenBy(x => x.month)
            .ToListAsync();

        var byReason = await terminationsQuery
            .GroupBy(t => t.TerminationType)
            .Select(g => new { reason = g.Key.ToString(), count = g.Count() })
            .ToListAsync();

        var totalTerminations = await terminationsQuery.CountAsync();
        var totalResignations = await resignationsQuery.CountAsync();
        var avgHeadcount = await _context.Employees
            .CountAsync(e => e.IsActive && !e.IsDeleted
                && (!branchId.HasValue || e.BranchId == branchId.Value));

        var attritionRate = avgHeadcount > 0
            ? Math.Round((decimal)(totalTerminations + totalResignations) / avgHeadcount * 100, 2)
            : 0m;

        return Ok(new
        {
            totalTerminations,
            totalResignations,
            totalAttrition = totalTerminations + totalResignations,
            attritionRate,
            terminationsByMonth,
            resignationsByMonth,
            byReason
        });
    }

    /// <summary>Returns recruitment metrics: cost per hire, time to fill.</summary>
    [HttpGet("recruitment")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetRecruitment(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-12);
        var end = endDate ?? DateTime.UtcNow;

        var requisitions = _context.JobRequisitions
            .AsNoTracking()
            .Where(r => r.CreatedAtUtc >= start && r.CreatedAtUtc <= end && !r.IsDeleted);

        var totalRequisitions = await requisitions.CountAsync();
        var filledRequisitions = await requisitions.CountAsync(r => r.Status == RequisitionStatus.Filled);
        var openRequisitions = await requisitions.CountAsync(r => r.Status == RequisitionStatus.Open || r.Status == RequisitionStatus.Approved);

        var applications = _context.JobApplications
            .AsNoTracking()
            .Where(a => a.AppliedDate >= start && a.AppliedDate <= end && !a.IsDeleted);

        var totalApplications = await applications.CountAsync();
        var hiredCount = await applications.CountAsync(a => a.Status == ApplicationStatus.Hired);

        var byStatus = await applications
            .GroupBy(a => a.Status)
            .Select(g => new { status = g.Key.ToString(), count = g.Count() })
            .ToListAsync();

        // Average time to fill: from requisition creation to filled status
        var filledReqs = await requisitions
            .Where(r => r.Status == RequisitionStatus.Filled && r.ModifiedAtUtc.HasValue)
            .Select(r => new { r.CreatedAtUtc, r.ModifiedAtUtc })
            .ToListAsync();

        var avgTimeToFillDays = filledReqs.Any()
            ? Math.Round(filledReqs.Average(r => (r.ModifiedAtUtc!.Value - r.CreatedAtUtc).TotalDays), 1)
            : 0;

        // Budget analysis
        var avgBudgetMin = await requisitions
            .Where(r => r.BudgetedSalaryMin.HasValue)
            .AverageAsync(r => (decimal?)r.BudgetedSalaryMin) ?? 0;
        var avgBudgetMax = await requisitions
            .Where(r => r.BudgetedSalaryMax.HasValue)
            .AverageAsync(r => (decimal?)r.BudgetedSalaryMax) ?? 0;

        return Ok(new
        {
            totalRequisitions,
            filledRequisitions,
            openRequisitions,
            totalApplications,
            hiredCount,
            avgTimeToFillDays,
            avgBudgetRange = new { min = Math.Round(avgBudgetMin, 2), max = Math.Round(avgBudgetMax, 2) },
            applicationsByStatus = byStatus
        });
    }

    /// <summary>Returns training metrics: hours per employee, completion rate.</summary>
    [HttpGet("training")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetTraining(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] long? branchId = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-12);
        var end = endDate ?? DateTime.UtcNow;

        var enrollments = _context.TrainingEnrollments
            .AsNoTracking()
            .Where(e => e.EnrolledAt >= start && e.EnrolledAt <= end && !e.IsDeleted);

        if (branchId.HasValue)
        {
            enrollments = enrollments.Where(e => e.Employee.BranchId == branchId.Value);
        }

        var total = await enrollments.CountAsync();
        var completed = await enrollments.CountAsync(e => e.Status == TrainingEnrollmentStatus.Completed);
        var inProgress = await enrollments.CountAsync(e => e.Status == TrainingEnrollmentStatus.InProgress);
        var cancelled = await enrollments.CountAsync(e => e.Status == TrainingEnrollmentStatus.Cancelled);

        var completionRate = total > 0 ? Math.Round((decimal)completed / total * 100, 2) : 0;

        // Total training hours from completed session enrollments
        var totalHours = await enrollments
            .Where(e => e.Status == TrainingEnrollmentStatus.Completed && e.TrainingSessionId != null)
            .Join(_context.TrainingSessions.AsNoTracking().Where(s => !s.IsDeleted),
                e => e.TrainingSessionId,
                s => s.Id,
                (e, s) => s.TrainingCourseId)
            .Join(_context.TrainingCourses.AsNoTracking().Where(c => !c.IsDeleted),
                courseId => courseId,
                c => c.Id,
                (courseId, c) => c.DurationHours)
            .SumAsync(h => h);

        var activeEmployeeCount = await _context.Employees
            .CountAsync(e => e.IsActive && !e.IsDeleted
                && (!branchId.HasValue || e.BranchId == branchId.Value));

        var hoursPerEmployee = activeEmployeeCount > 0
            ? Math.Round(totalHours / activeEmployeeCount, 2)
            : 0;

        var byStatus = await enrollments
            .GroupBy(e => e.Status)
            .Select(g => new { status = g.Key.ToString(), count = g.Count() })
            .ToListAsync();

        return Ok(new
        {
            totalEnrollments = total,
            completed,
            inProgress,
            cancelled,
            completionRate,
            totalTrainingHours = totalHours,
            hoursPerEmployee,
            byStatus
        });
    }

    /// <summary>Returns leave utilization by type.</summary>
    [HttpGet("leave")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetLeave(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] long? branchId = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-12);
        var end = endDate ?? DateTime.UtcNow;

        var vacations = _context.EmployeeVacations
            .AsNoTracking()
            .Where(v => v.StartDate >= start && v.EndDate <= end && v.IsApproved && !v.IsDeleted);

        if (branchId.HasValue)
        {
            vacations = vacations.Where(v => v.Employee.BranchId == branchId.Value);
        }

        var totalDaysTaken = await vacations.SumAsync(v => v.TotalDays);

        var byType = await vacations
            .GroupBy(v => new { v.VacationTypeId, v.VacationType.Name })
            .Select(g => new
            {
                vacationTypeId = g.Key.VacationTypeId,
                vacationTypeName = g.Key.Name,
                count = g.Count(),
                totalDays = g.Sum(v => v.TotalDays)
            })
            .OrderByDescending(x => x.totalDays)
            .ToListAsync();

        var byMonth = await vacations
            .GroupBy(v => new { v.StartDate.Year, v.StartDate.Month })
            .Select(g => new
            {
                year = g.Key.Year,
                month = g.Key.Month,
                count = g.Count(),
                totalDays = g.Sum(v => v.TotalDays)
            })
            .OrderBy(x => x.year).ThenBy(x => x.month)
            .ToListAsync();

        var activeEmployeeCount = await _context.Employees
            .CountAsync(e => e.IsActive && !e.IsDeleted
                && (!branchId.HasValue || e.BranchId == branchId.Value));

        var avgDaysPerEmployee = activeEmployeeCount > 0
            ? Math.Round((decimal)totalDaysTaken / activeEmployeeCount, 2)
            : 0;

        return Ok(new
        {
            totalDaysTaken,
            avgDaysPerEmployee,
            byType,
            byMonth
        });
    }

    /// <summary>Returns overtime hours and trends.</summary>
    [HttpGet("overtime")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetOvertime(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] long? branchId = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-12);
        var end = endDate ?? DateTime.UtcNow;

        var records = _context.AttendanceRecords
            .AsNoTracking()
            .Where(a => a.AttendanceDate >= start && a.AttendanceDate <= end
                && a.OvertimeHours > 0 && !a.IsDeleted);

        if (branchId.HasValue)
        {
            records = records.Where(a => a.Employee.BranchId == branchId.Value);
        }

        var totalOvertimeHours = await records.SumAsync(a => a.OvertimeHours);
        var totalRecordsWithOT = await records.CountAsync();
        var distinctEmployeesWithOT = await records.Select(a => a.EmployeeId).Distinct().CountAsync();

        var byMonth = await records
            .GroupBy(a => new { a.AttendanceDate.Year, a.AttendanceDate.Month })
            .Select(g => new
            {
                year = g.Key.Year,
                month = g.Key.Month,
                totalHours = g.Sum(a => a.OvertimeHours),
                employeeCount = g.Select(a => a.EmployeeId).Distinct().Count()
            })
            .OrderBy(x => x.year).ThenBy(x => x.month)
            .ToListAsync();

        var avgOvertimePerEmployee = distinctEmployeesWithOT > 0
            ? Math.Round(totalOvertimeHours / distinctEmployeesWithOT, 2)
            : 0;

        return Ok(new
        {
            totalOvertimeHours = Math.Round(totalOvertimeHours, 2),
            totalRecordsWithOvertime = totalRecordsWithOT,
            distinctEmployeesWithOvertime = distinctEmployeesWithOT,
            avgOvertimePerEmployee,
            byMonth
        });
    }

    /// <summary>Returns payroll cost trends.</summary>
    [HttpGet("payroll")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetPayroll(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null,
        [FromQuery] long? branchId = null)
    {
        var start = startDate ?? DateTime.UtcNow.AddMonths(-12);
        var end = endDate ?? DateTime.UtcNow;

        var periods = _context.PayrollPeriods
            .AsNoTracking()
            .Where(p => p.StartDate >= start && p.EndDate <= end && !p.IsDeleted);

        if (branchId.HasValue)
        {
            periods = periods.Where(p => p.BranchId == branchId.Value);
        }

        var payrollSummary = await periods
            .OrderBy(p => p.StartDate)
            .Select(p => new
            {
                periodName = p.Name,
                startDate = p.StartDate,
                endDate = p.EndDate,
                status = p.Status.ToString(),
                totalGross = p.TotalGross,
                totalDeductions = p.TotalDeductions,
                totalNet = p.TotalNet,
                employeeCount = p.EmployeeCount
            })
            .ToListAsync();

        var totalGross = payrollSummary.Sum(p => p.totalGross);
        var totalNet = payrollSummary.Sum(p => p.totalNet);
        var totalDeductions = payrollSummary.Sum(p => p.totalDeductions);

        // Average salary from latest payroll records
        var latestPeriodId = await periods
            .Where(p => p.Status == PayrollPeriodStatus.Paid || p.Status == PayrollPeriodStatus.Approved)
            .OrderByDescending(p => p.EndDate)
            .Select(p => p.Id)
            .FirstOrDefaultAsync();

        decimal avgSalary = 0;
        if (latestPeriodId > 0)
        {
            avgSalary = await _context.PayrollRecords
                .AsNoTracking()
                .Where(r => r.PayrollPeriodId == latestPeriodId && !r.IsDeleted)
                .AverageAsync(r => (decimal?)r.NetSalary) ?? 0;
        }

        return Ok(new
        {
            totalGross,
            totalDeductions,
            totalNet,
            avgNetSalary = Math.Round(avgSalary, 2),
            periods = payrollSummary
        });
    }

    /// <summary>Returns engagement survey scores over time.</summary>
    [HttpGet("engagement")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetEngagement()
    {
        // Get completed survey distributions with engagement/ENPS types
        var engagementDistributions = await _context.SurveyDistributions
            .AsNoTracking()
            .Where(d => !d.IsDeleted
                && (d.Status == SurveyDistributionStatus.Closed || d.Status == SurveyDistributionStatus.Active))
            .Join(_context.SurveyTemplates.AsNoTracking().Where(t => !t.IsDeleted
                && (t.SurveyType == SurveyType.EngagementSurvey || t.SurveyType == SurveyType.ENPS || t.SurveyType == SurveyType.PulseSurvey)),
                d => d.SurveyTemplateId,
                t => t.Id,
                (d, t) => new { Distribution = d, Template = t })
            .OrderBy(x => x.Distribution.StartDate)
            .ToListAsync();

        var results = new List<object>();

        foreach (var item in engagementDistributions)
        {
            // Get average score from responses with numeric values
            var avgScore = await _context.SurveyResponses
                .AsNoTracking()
                .Where(r => r.SurveyDistributionId == item.Distribution.Id
                    && r.ResponseValue != null
                    && !r.IsDeleted)
                .AverageAsync(r => (double?)r.ResponseValue) ?? 0;

            var responseCount = await _context.SurveyParticipants
                .CountAsync(p => p.SurveyDistributionId == item.Distribution.Id
                    && p.Status == SurveyParticipantStatus.Completed
                    && !p.IsDeleted);

            var participationRate = item.Distribution.TotalRecipients > 0
                ? Math.Round((double)responseCount / item.Distribution.TotalRecipients * 100, 1)
                : 0;

            results.Add(new
            {
                distributionId = item.Distribution.Id,
                title = item.Distribution.Title,
                surveyType = item.Template.SurveyType.ToString(),
                startDate = item.Distribution.StartDate,
                endDate = item.Distribution.EndDate,
                avgScore = Math.Round(avgScore, 2),
                responseCount,
                totalRecipients = item.Distribution.TotalRecipients,
                participationRate
            });
        }

        return Ok(new
        {
            surveys = results,
            totalSurveys = results.Count
        });
    }

    /// <summary>Returns combined executive KPI summary.</summary>
    [HttpGet("executive-summary")]
    [Authorize(Policy = "AnalyticsRead")]
    public async Task<IActionResult> GetExecutiveSummary()
    {
        var now = DateTime.UtcNow;
        var thisMonthStart = new DateTime(now.Year, now.Month, 1);
        var lastMonthStart = thisMonthStart.AddMonths(-1);

        // Headcount
        var totalActive = await _context.Employees
            .CountAsync(e => e.IsActive && !e.IsDeleted);
        var newHiresThisMonth = await _context.Employees
            .CountAsync(e => e.HireDate >= thisMonthStart && !e.IsDeleted);

        // Attrition (last 12 months)
        var yearStart = now.AddMonths(-12);
        var terminations12m = await _context.TerminationRecords
            .CountAsync(t => t.TerminationDate >= yearStart && !t.IsDeleted);
        var resignations12m = await _context.ResignationRequests
            .CountAsync(r => r.Status == ResignationStatus.Approved
                && r.LastWorkingDate >= yearStart && !r.IsDeleted);
        var annualAttritionRate = totalActive > 0
            ? Math.Round((decimal)(terminations12m + resignations12m) / totalActive * 100, 2)
            : 0;

        // Open positions
        var openPositions = await _context.JobRequisitions
            .CountAsync(r => (r.Status == RequisitionStatus.Open || r.Status == RequisitionStatus.Approved) && !r.IsDeleted);

        // Leave (this month)
        var employeesOnLeaveToday = await _context.EmployeeVacations
            .CountAsync(v => v.StartDate <= now.Date && v.EndDate >= now.Date && v.IsApproved && !v.IsDeleted);

        // Overtime (this month)
        var overtimeThisMonth = await _context.AttendanceRecords
            .Where(a => a.AttendanceDate >= thisMonthStart && a.OvertimeHours > 0 && !a.IsDeleted)
            .SumAsync(a => (decimal?)a.OvertimeHours) ?? 0;

        // Training completion rate
        var totalEnrollments = await _context.TrainingEnrollments
            .CountAsync(e => !e.IsDeleted);
        var completedEnrollments = await _context.TrainingEnrollments
            .CountAsync(e => e.Status == TrainingEnrollmentStatus.Completed && !e.IsDeleted);
        var trainingCompletionRate = totalEnrollments > 0
            ? Math.Round((decimal)completedEnrollments / totalEnrollments * 100, 2)
            : 0;

        // Latest payroll total
        var latestPayroll = await _context.PayrollPeriods
            .AsNoTracking()
            .Where(p => !p.IsDeleted && (p.Status == PayrollPeriodStatus.Paid || p.Status == PayrollPeriodStatus.Approved))
            .OrderByDescending(p => p.EndDate)
            .Select(p => new { p.TotalGross, p.TotalNet, p.EmployeeCount })
            .FirstOrDefaultAsync();

        return Ok(new
        {
            headcount = new
            {
                totalActive,
                newHiresThisMonth
            },
            attrition = new
            {
                annualAttritionRate,
                totalSeparations12Months = terminations12m + resignations12m
            },
            recruitment = new
            {
                openPositions
            },
            leave = new
            {
                employeesOnLeaveToday
            },
            overtime = new
            {
                totalOvertimeHoursThisMonth = Math.Round(overtimeThisMonth, 2)
            },
            training = new
            {
                completionRate = trainingCompletionRate
            },
            payroll = new
            {
                latestGross = latestPayroll?.TotalGross ?? 0,
                latestNet = latestPayroll?.TotalNet ?? 0,
                employeeCount = latestPayroll?.EmployeeCount ?? 0
            }
        });
    }
}
