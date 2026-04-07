using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Reports.DTOs;
using TecAxle.Hrms.Application.Reports.Queries;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Vacations;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Reports.Services;

public interface IReportsService
{
    Task<AttendanceReportSummary> GetAttendanceReportAsync(ReportFilter filter);
    Task<byte[]> GetAttendanceReportCsvAsync(ReportFilter filter);
    Task<LeaveReportSummary> GetLeaveReportAsync(ReportFilter filter);

    // Payroll Reports
    Task<SalaryRegisterReport> GetSalaryRegisterAsync(long payrollPeriodId, IReadOnlyList<long> branchIds);
    Task<DepartmentCostReport> GetDepartmentCostReportAsync(int year, int? month, long? branchId, IReadOnlyList<long> branchIds);
    Task<YtdEarningsReport> GetYtdEarningsReportAsync(int year, long? branchId, long? departmentId, int page, int pageSize, IReadOnlyList<long> branchIds);

    // Compliance Reports
    Task<ContractExpiryReport> GetContractExpiryReportAsync(int daysThreshold, long? branchId, IReadOnlyList<long> branchIds);
    Task<DocumentExpiryReport> GetDocumentExpiryReportAsync(int daysThreshold, long? branchId, IReadOnlyList<long> branchIds);
    Task<CertificationExpiryReport> GetCertificationExpiryReportAsync(int daysThreshold, long? branchId, IReadOnlyList<long> branchIds);
    Task<ComplianceSummaryReport> GetComplianceSummaryAsync(long? branchId, IReadOnlyList<long> branchIds);
}

public class ReportsService : IReportsService
{
    private readonly IApplicationDbContext _context;

    public ReportsService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<AttendanceReportSummary> GetAttendanceReportAsync(ReportFilter filter)
    {
        var query = _context.AttendanceRecords
            .Include(r => r.Employee)
                .ThenInclude(e => e.Department)
            .Include(r => r.ShiftAssignment)
                .ThenInclude(sa => sa.Shift)
            .Where(r => r.AttendanceDate >= filter.FromDate.Date && r.AttendanceDate <= filter.ToDate.Date);

        if (filter.BranchId.HasValue)
            query = query.Where(r => r.Employee.BranchId == filter.BranchId.Value);

        if (filter.DepartmentId.HasValue)
            query = query.Where(r => r.Employee.DepartmentId == filter.DepartmentId.Value);

        if (filter.EmployeeId.HasValue)
            query = query.Where(r => r.EmployeeId == filter.EmployeeId.Value);

        var records = await query.ToListAsync();

        var items = records.Select(r => new AttendanceReportItem
        {
            EmployeeId = r.EmployeeId,
            EmployeeName = r.Employee.FullName,
            DepartmentName = r.Employee.Department?.Name ?? "N/A",
            Date = r.AttendanceDate,
            ShiftName = r.ShiftAssignment?.Shift?.Name ?? "N/A",
            CheckIn = r.ActualCheckInTime?.TimeOfDay,
            CheckOut = r.ActualCheckOutTime?.TimeOfDay,
            Status = r.Status.ToString(),
            WorkedHours = (double)r.WorkingHours,
            LateMinutes = r.LateMinutes,
            OvertimeMinutes = (int)(r.OvertimeHours * 60), // Convert decimal hours to minutes
            IsRegularHoliday = r.Status == AttendanceStatus.Holiday,
            IsPublicHoliday = r.Status == AttendanceStatus.Holiday,
            WeeklyRequiredHours = (double)(r.ShiftAssignment?.Shift?.RequiredWeeklyHours ?? 0)
        }).OrderBy(i => i.Date).ThenBy(i => i.EmployeeName).ToList();

        // Calculate Weekly Totals
        CalculateWeeklyStats(items);

        return new AttendanceReportSummary
        {
            Filter = filter,
            Items = items,
            TotalDays = items.Count,
            TotalPresent = items.Count(i => i.Status == AttendanceStatus.Present.ToString()),
            TotalAbsent = items.Count(i => i.Status == AttendanceStatus.Absent.ToString()),
            TotalLate = items.Count(i => i.LateMinutes > 0),
            TotalLeaves = items.Count(i => i.Status == AttendanceStatus.OnLeave.ToString())
        };
    }

    private void CalculateWeeklyStats(List<AttendanceReportItem> items)
    {
        var employeeGroups = items.GroupBy(i => i.EmployeeId);
        
        foreach (var empGroup in employeeGroups)
        {
            // Group by week (Sunday start)
            var weekGroups = empGroup.GroupBy(i => GetStartOfWeek(i.Date));
            
            foreach (var week in weekGroups)
            {
                var totalWorked = week.Sum(i => i.WorkedHours);
                // Use the maximum required hours found in the week (in case of shift change, take the higher requirement)
                var required = week.Max(i => i.WeeklyRequiredHours);
                
                var overtime = Math.Max(0, totalWorked - required);
                var shortage = Math.Max(0, required - totalWorked);
                
                // Only apply if there IS a requirement
                if (required <= 0)
                {
                    overtime = 0;
                    shortage = 0;
                }

                foreach (var item in week)
                {
                    item.WeeklyTotalHours = totalWorked;
                    item.WeeklyOvertimeHours = overtime;
                    item.WeeklyShortageHours = shortage;
                }
            }
        }
    }

    private DateTime GetStartOfWeek(DateTime dt)
    {
        int diff = (7 + (dt.DayOfWeek - DayOfWeek.Sunday)) % 7;
        return dt.Date.AddDays(-1 * diff);
    }

    public async Task<byte[]> GetAttendanceReportCsvAsync(ReportFilter filter)
    {
        var report = await GetAttendanceReportAsync(filter);
        var sb = new System.Text.StringBuilder();

        // Header
        sb.AppendLine("Date,Employee,Department,Shift,CheckIn,CheckOut,Worked(Hrs),Late(Min),Status,WeeklyTotal,WeeklyOT");

        foreach (var item in report.Items)
        {
            var checkIn = item.CheckIn.HasValue ? item.CheckIn.Value.ToString(@"hh\:mm") : "-";
            var checkOut = item.CheckOut.HasValue ? item.CheckOut.Value.ToString(@"hh\:mm") : "-";
            var weeklyTotal = item.WeeklyTotalHours.ToString("F1");
            var weeklyOt = item.WeeklyOvertimeHours > 0 ? $"+{item.WeeklyOvertimeHours:F1}" : (item.WeeklyShortageHours > 0 ? $"-{item.WeeklyShortageHours:F1}" : "0");

            sb.AppendLine($"{item.Date:yyyy-MM-dd},{EscapeCsv(item.EmployeeName)},{EscapeCsv(item.DepartmentName)},{EscapeCsv(item.ShiftName)},{checkIn},{checkOut},{item.WorkedHours:F2},{item.LateMinutes},{item.Status},{weeklyTotal},{weeklyOt}");
        }

        return System.Text.Encoding.UTF8.GetBytes(sb.ToString());
    }

    private string EscapeCsv(string field)
    {
        if (string.IsNullOrEmpty(field)) return "";
        if (field.Contains(",") || field.Contains("\"") || field.Contains("\n"))
        {
            return $"\"{field.Replace("\"", "\"\"")}\"";
        }
        return field;
    }

    public async Task<LeaveReportSummary> GetLeaveReportAsync(ReportFilter filter)
    {
        var query = _context.EmployeeVacations
            .Include(v => v.Employee)
                .ThenInclude(e => e.Department)
            .Include(v => v.VacationType)
            .Include(v => v.WorkflowInstance)
            .Where(v => v.StartDate <= filter.ToDate && v.EndDate >= filter.FromDate);

        if (filter.BranchId.HasValue)
            query = query.Where(v => v.Employee.BranchId == filter.BranchId.Value);

        if (filter.DepartmentId.HasValue)
            query = query.Where(v => v.Employee.DepartmentId == filter.DepartmentId.Value);

        if (filter.EmployeeId.HasValue)
            query = query.Where(v => v.EmployeeId == filter.EmployeeId.Value);

        var vacations = await query.ToListAsync();

        var items = vacations.Select(v => new LeaveReportItem
        {
            EmployeeId = v.EmployeeId,
            EmployeeName = v.Employee.FullName,
            DepartmentName = v.Employee.Department?.Name ?? "N/A",
            LeaveType = v.VacationType?.Name ?? "N/A",
            StartDate = v.StartDate,
            EndDate = v.EndDate,
            TotalDays = v.TotalDays,
            Status = v.WorkflowInstance != null ? v.WorkflowInstance.Status.ToString() : (v.IsApproved ? "Approved" : "Pending"),
            Reason = v.Notes ?? string.Empty
        }).OrderBy(i => i.StartDate).ToList();

        return new LeaveReportSummary
        {
            Filter = filter,
            Items = items,
            TotalRequests = items.Count,
            TotalApprovedDays = items.Where(i => i.Status == WorkflowStatus.Approved.ToString() || i.Status == "Approved").Sum(i => i.TotalDays)
        };
    }

    // ============================================================
    // Payroll Reports
    // ============================================================

    public async Task<SalaryRegisterReport> GetSalaryRegisterAsync(long payrollPeriodId, IReadOnlyList<long> branchIds)
    {
        var period = await _context.PayrollPeriods
            .Include(p => p.Branch)
            .FirstOrDefaultAsync(p => p.Id == payrollPeriodId && !p.IsDeleted);

        if (period == null)
            return new SalaryRegisterReport { PayrollPeriodId = payrollPeriodId };

        // Branch scope check
        if (branchIds.Any() && !branchIds.Contains(period.BranchId))
            return new SalaryRegisterReport { PayrollPeriodId = payrollPeriodId };

        var records = await _context.PayrollRecords
            .Include(r => r.Employee)
                .ThenInclude(e => e.Department)
            .Include(r => r.Employee)
                .ThenInclude(e => e.Branch)
            .Where(r => r.PayrollPeriodId == payrollPeriodId && !r.Employee.IsDeleted)
            .OrderBy(r => r.Employee.Department!.Name)
            .ThenBy(r => r.Employee.FullName)
            .ToListAsync();

        var items = records.Select(r => new SalaryRegisterItem
        {
            EmployeeId = r.EmployeeId,
            EmployeeName = r.Employee.FullName,
            EmployeeNumber = r.Employee.EmployeeNumber,
            DepartmentName = r.Employee.Department?.Name ?? "N/A",
            BranchName = r.Employee.Branch?.Name ?? "N/A",
            BaseSalary = r.BaseSalary,
            TotalAllowances = r.TotalAllowances,
            OvertimePay = r.OvertimePay,
            GrossEarnings = r.GrossEarnings,
            TotalDeductions = r.TotalDeductions,
            TaxAmount = r.TaxAmount,
            SocialInsuranceAmount = r.SocialInsuranceEmployee,
            NetSalary = r.NetSalary,
            WorkingDays = r.WorkingDays,
            PaidDays = r.PaidDays,
            OvertimeHours = r.OvertimeHours,
            AbsentDays = r.AbsentDays,
            Status = r.Status.ToString()
        }).ToList();

        return new SalaryRegisterReport
        {
            PayrollPeriodId = payrollPeriodId,
            PeriodName = period.Name,
            PeriodStartDate = period.StartDate,
            PeriodEndDate = period.EndDate,
            BranchName = period.Branch?.Name ?? "N/A",
            TotalEmployees = items.Count,
            TotalGrossEarnings = items.Sum(i => i.GrossEarnings),
            TotalNetSalary = items.Sum(i => i.NetSalary),
            Items = items
        };
    }

    public async Task<DepartmentCostReport> GetDepartmentCostReportAsync(int year, int? month, long? branchId, IReadOnlyList<long> branchIds)
    {
        var query = _context.PayrollRecords
            .Include(r => r.Employee)
                .ThenInclude(e => e.Department)
            .Include(r => r.Employee)
                .ThenInclude(e => e.Branch)
            .Include(r => r.PayrollPeriod)
            .Where(r => r.PayrollPeriod.StartDate.Year == year && !r.Employee.IsDeleted);

        if (month.HasValue)
            query = query.Where(r => r.PayrollPeriod.StartDate.Month == month.Value);

        if (branchId.HasValue)
            query = query.Where(r => r.Employee.BranchId == branchId.Value);

        // Apply branch scope
        if (branchIds.Any())
            query = query.Where(r => branchIds.Contains(r.Employee.BranchId));

        var records = await query.ToListAsync();

        var departmentGroups = records
            .Where(r => r.Employee.DepartmentId.HasValue)
            .GroupBy(r => new { r.Employee.DepartmentId, DepartmentName = r.Employee.Department?.Name ?? "N/A", BranchName = r.Employee.Branch?.Name ?? "N/A" })
            .Select(g => new DepartmentCostItem
            {
                DepartmentId = g.Key.DepartmentId!.Value,
                DepartmentName = g.Key.DepartmentName,
                BranchName = g.Key.BranchName,
                EmployeeCount = g.Select(r => r.EmployeeId).Distinct().Count(),
                TotalBaseSalary = g.Sum(r => r.BaseSalary),
                TotalAllowances = g.Sum(r => r.TotalAllowances),
                TotalOvertimePay = g.Sum(r => r.OvertimePay),
                TotalGrossEarnings = g.Sum(r => r.GrossEarnings),
                TotalDeductions = g.Sum(r => r.TotalDeductions),
                TotalNetSalary = g.Sum(r => r.NetSalary),
                AverageSalary = g.Select(r => r.EmployeeId).Distinct().Count() > 0
                    ? g.Sum(r => r.NetSalary) / g.Select(r => r.EmployeeId).Distinct().Count()
                    : 0
            })
            .OrderBy(d => d.BranchName)
            .ThenBy(d => d.DepartmentName)
            .ToList();

        return new DepartmentCostReport
        {
            Year = year,
            Month = month,
            BranchId = branchId,
            TotalCost = departmentGroups.Sum(d => d.TotalNetSalary),
            TotalEmployees = departmentGroups.Sum(d => d.EmployeeCount),
            Items = departmentGroups
        };
    }

    public async Task<YtdEarningsReport> GetYtdEarningsReportAsync(int year, long? branchId, long? departmentId, int page, int pageSize, IReadOnlyList<long> branchIds)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.PayrollRecords
            .Include(r => r.Employee)
                .ThenInclude(e => e.Department)
            .Include(r => r.Employee)
                .ThenInclude(e => e.Branch)
            .Include(r => r.PayrollPeriod)
            .Where(r => r.PayrollPeriod.StartDate.Year == year && !r.Employee.IsDeleted);

        if (branchId.HasValue)
            query = query.Where(r => r.Employee.BranchId == branchId.Value);

        if (departmentId.HasValue)
            query = query.Where(r => r.Employee.DepartmentId == departmentId.Value);

        // Apply branch scope
        if (branchIds.Any())
            query = query.Where(r => branchIds.Contains(r.Employee.BranchId));

        var records = await query.ToListAsync();

        var employeeGroups = records
            .GroupBy(r => new
            {
                r.EmployeeId,
                EmployeeName = r.Employee.FullName,
                EmployeeNumber = r.Employee.EmployeeNumber,
                DepartmentName = r.Employee.Department?.Name ?? "N/A",
                BranchName = r.Employee.Branch?.Name ?? "N/A"
            })
            .Select(g => new YtdEarningsItem
            {
                EmployeeId = g.Key.EmployeeId,
                EmployeeName = g.Key.EmployeeName,
                EmployeeNumber = g.Key.EmployeeNumber,
                DepartmentName = g.Key.DepartmentName,
                BranchName = g.Key.BranchName,
                YtdBaseSalary = g.Sum(r => r.BaseSalary),
                YtdAllowances = g.Sum(r => r.TotalAllowances),
                YtdOvertimePay = g.Sum(r => r.OvertimePay),
                YtdGrossEarnings = g.Sum(r => r.GrossEarnings),
                YtdTotalDeductions = g.Sum(r => r.TotalDeductions),
                YtdTaxDeductions = g.Sum(r => r.TaxAmount),
                YtdSocialInsurance = g.Sum(r => r.SocialInsuranceEmployee),
                YtdNetEarnings = g.Sum(r => r.NetSalary),
                MonthsProcessed = g.Select(r => r.PayrollPeriodId).Distinct().Count()
            })
            .OrderBy(e => e.EmployeeName)
            .ToList();

        var totalRecords = employeeGroups.Count;
        var pagedItems = employeeGroups
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return new YtdEarningsReport
        {
            Year = year,
            TotalRecords = totalRecords,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalRecords / pageSize),
            Items = pagedItems
        };
    }

    // ============================================================
    // Compliance Reports
    // ============================================================

    public async Task<ContractExpiryReport> GetContractExpiryReportAsync(int daysThreshold, long? branchId, IReadOnlyList<long> branchIds)
    {
        var thresholdDate = DateTime.UtcNow.AddDays(daysThreshold);

        var query = _context.EmployeeContracts
            .Include(c => c.Employee)
                .ThenInclude(e => e.Department)
            .Include(c => c.Employee)
                .ThenInclude(e => e.Branch)
            .Where(c => !c.IsDeleted
                && c.Status == ContractStatus.Active
                && c.EndDate.HasValue
                && c.EndDate.Value <= thresholdDate
                && !c.Employee.IsDeleted);

        if (branchId.HasValue)
            query = query.Where(c => c.Employee.BranchId == branchId.Value);

        // Apply branch scope
        if (branchIds.Any())
            query = query.Where(c => branchIds.Contains(c.Employee.BranchId));

        var contracts = await query
            .OrderBy(c => c.EndDate)
            .ToListAsync();

        var items = contracts.Select(c => new ContractExpiryItem
        {
            ContractId = c.Id,
            EmployeeId = c.EmployeeId,
            EmployeeName = c.Employee.FullName,
            EmployeeNumber = c.Employee.EmployeeNumber,
            DepartmentName = c.Employee.Department?.Name ?? "N/A",
            BranchName = c.Employee.Branch?.Name ?? "N/A",
            ContractType = c.ContractType.ToString(),
            ContractNumber = c.ContractNumber,
            StartDate = c.StartDate,
            EndDate = c.EndDate,
            DaysRemaining = c.EndDate.HasValue ? (int)(c.EndDate.Value.Date - DateTime.UtcNow.Date).TotalDays : 0,
            Status = c.Status.ToString()
        }).ToList();

        return new ContractExpiryReport
        {
            DaysThreshold = daysThreshold,
            TotalExpiringContracts = items.Count,
            Items = items
        };
    }

    public async Task<DocumentExpiryReport> GetDocumentExpiryReportAsync(int daysThreshold, long? branchId, IReadOnlyList<long> branchIds)
    {
        var thresholdDate = DateTime.UtcNow.AddDays(daysThreshold);

        var query = _context.EmployeeDocuments
            .Include(d => d.Employee)
                .ThenInclude(e => e.Department)
            .Include(d => d.Employee)
                .ThenInclude(e => e.Branch)
            .Where(d => !d.IsDeleted
                && d.ExpiryDate.HasValue
                && d.ExpiryDate.Value <= thresholdDate
                && !d.Employee.IsDeleted);

        if (branchId.HasValue)
            query = query.Where(d => d.Employee.BranchId == branchId.Value);

        // Apply branch scope
        if (branchIds.Any())
            query = query.Where(d => branchIds.Contains(d.Employee.BranchId));

        var documents = await query
            .OrderBy(d => d.ExpiryDate)
            .ToListAsync();

        var items = documents.Select(d => new DocumentExpiryItem
        {
            DocumentId = d.Id,
            EmployeeId = d.EmployeeId,
            EmployeeName = d.Employee.FullName,
            EmployeeNumber = d.Employee.EmployeeNumber,
            DepartmentName = d.Employee.Department?.Name ?? "N/A",
            BranchName = d.Employee.Branch?.Name ?? "N/A",
            DocumentName = d.DocumentName,
            DocumentType = d.DocumentType.ToString(),
            ExpiryDate = d.ExpiryDate,
            DaysRemaining = d.ExpiryDate.HasValue ? (int)(d.ExpiryDate.Value.Date - DateTime.UtcNow.Date).TotalDays : 0,
            VerificationStatus = d.VerificationStatus.ToString()
        }).ToList();

        return new DocumentExpiryReport
        {
            DaysThreshold = daysThreshold,
            TotalExpiringDocuments = items.Count,
            Items = items
        };
    }

    public async Task<CertificationExpiryReport> GetCertificationExpiryReportAsync(int daysThreshold, long? branchId, IReadOnlyList<long> branchIds)
    {
        var thresholdDate = DateTime.UtcNow.AddDays(daysThreshold);

        var query = _context.EmployeeCertifications
            .Include(c => c.Employee)
                .ThenInclude(e => e.Department)
            .Include(c => c.Employee)
                .ThenInclude(e => e.Branch)
            .Where(c => !c.IsDeleted
                && c.ExpiryDate.HasValue
                && c.ExpiryDate.Value <= thresholdDate
                && (c.Status == CertificationStatus.Active || c.Status == CertificationStatus.Pending)
                && !c.Employee.IsDeleted);

        if (branchId.HasValue)
            query = query.Where(c => c.Employee.BranchId == branchId.Value);

        // Apply branch scope
        if (branchIds.Any())
            query = query.Where(c => branchIds.Contains(c.Employee.BranchId));

        var certifications = await query
            .OrderBy(c => c.ExpiryDate)
            .ToListAsync();

        var items = certifications.Select(c => new CertificationExpiryItem
        {
            CertificationId = c.Id,
            EmployeeId = c.EmployeeId,
            EmployeeName = c.Employee.FullName,
            EmployeeNumber = c.Employee.EmployeeNumber,
            DepartmentName = c.Employee.Department?.Name ?? "N/A",
            BranchName = c.Employee.Branch?.Name ?? "N/A",
            CertificationName = c.CertificationName,
            IssuingAuthority = c.IssuingAuthority,
            IssueDate = c.IssueDate,
            ExpiryDate = c.ExpiryDate,
            DaysRemaining = c.ExpiryDate.HasValue ? (int)(c.ExpiryDate.Value.Date - DateTime.UtcNow.Date).TotalDays : 0,
            Status = c.Status.ToString()
        }).ToList();

        return new CertificationExpiryReport
        {
            DaysThreshold = daysThreshold,
            TotalExpiringCertifications = items.Count,
            Items = items
        };
    }

    public async Task<ComplianceSummaryReport> GetComplianceSummaryAsync(long? branchId, IReadOnlyList<long> branchIds)
    {
        var now = DateTime.UtcNow;
        var date7 = now.AddDays(7);
        var date30 = now.AddDays(30);
        var date90 = now.AddDays(90);

        // Build base queries with branch scoping
        var contractQuery = _context.EmployeeContracts
            .Where(c => !c.IsDeleted && c.Status == ContractStatus.Active && c.EndDate.HasValue && !c.Employee.IsDeleted);

        var documentQuery = _context.EmployeeDocuments
            .Where(d => !d.IsDeleted && d.ExpiryDate.HasValue && !d.Employee.IsDeleted);

        var certQuery = _context.EmployeeCertifications
            .Where(c => !c.IsDeleted && c.ExpiryDate.HasValue
                && (c.Status == CertificationStatus.Active || c.Status == CertificationStatus.Pending)
                && !c.Employee.IsDeleted);

        if (branchId.HasValue)
        {
            contractQuery = contractQuery.Where(c => c.Employee.BranchId == branchId.Value);
            documentQuery = documentQuery.Where(d => d.Employee.BranchId == branchId.Value);
            certQuery = certQuery.Where(c => c.Employee.BranchId == branchId.Value);
        }

        if (branchIds.Any())
        {
            contractQuery = contractQuery.Where(c => branchIds.Contains(c.Employee.BranchId));
            documentQuery = documentQuery.Where(d => branchIds.Contains(d.Employee.BranchId));
            certQuery = certQuery.Where(c => branchIds.Contains(c.Employee.BranchId));
        }

        // Get counts for contracts
        var contractsExpiring7 = await contractQuery.CountAsync(c => c.EndDate!.Value > now && c.EndDate!.Value <= date7);
        var contractsExpiring30 = await contractQuery.CountAsync(c => c.EndDate!.Value > now && c.EndDate!.Value <= date30);
        var contractsExpiring90 = await contractQuery.CountAsync(c => c.EndDate!.Value > now && c.EndDate!.Value <= date90);
        var contractsExpired = await contractQuery.CountAsync(c => c.EndDate!.Value <= now);

        // Get counts for documents
        var documentsExpiring7 = await documentQuery.CountAsync(d => d.ExpiryDate!.Value > now && d.ExpiryDate!.Value <= date7);
        var documentsExpiring30 = await documentQuery.CountAsync(d => d.ExpiryDate!.Value > now && d.ExpiryDate!.Value <= date30);
        var documentsExpiring90 = await documentQuery.CountAsync(d => d.ExpiryDate!.Value > now && d.ExpiryDate!.Value <= date90);
        var documentsExpired = await documentQuery.CountAsync(d => d.ExpiryDate!.Value <= now);

        // Get counts for certifications
        var certsExpiring7 = await certQuery.CountAsync(c => c.ExpiryDate!.Value > now && c.ExpiryDate!.Value <= date7);
        var certsExpiring30 = await certQuery.CountAsync(c => c.ExpiryDate!.Value > now && c.ExpiryDate!.Value <= date30);
        var certsExpiring90 = await certQuery.CountAsync(c => c.ExpiryDate!.Value > now && c.ExpiryDate!.Value <= date90);
        var certsExpired = await certQuery.CountAsync(c => c.ExpiryDate!.Value <= now);

        string? branchName = null;
        if (branchId.HasValue)
        {
            var branch = await _context.Branches.FirstOrDefaultAsync(b => b.Id == branchId.Value);
            branchName = branch?.Name;
        }

        return new ComplianceSummaryReport
        {
            BranchId = branchId,
            BranchName = branchName,
            GeneratedAt = DateTime.UtcNow,
            ContractsExpiring7Days = contractsExpiring7,
            ContractsExpiring30Days = contractsExpiring30,
            ContractsExpiring90Days = contractsExpiring90,
            DocumentsExpiring7Days = documentsExpiring7,
            DocumentsExpiring30Days = documentsExpiring30,
            DocumentsExpiring90Days = documentsExpiring90,
            CertificationsExpiring7Days = certsExpiring7,
            CertificationsExpiring30Days = certsExpiring30,
            CertificationsExpiring90Days = certsExpiring90,
            ContractsAlreadyExpired = contractsExpired,
            DocumentsAlreadyExpired = documentsExpired,
            CertificationsAlreadyExpired = certsExpired
        };
    }
}
