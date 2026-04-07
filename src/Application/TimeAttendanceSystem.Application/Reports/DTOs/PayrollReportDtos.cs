namespace TecAxle.Hrms.Application.Reports.DTOs;

// ========== Salary Register ==========

public class SalaryRegisterReport
{
    public long PayrollPeriodId { get; set; }
    public string PeriodName { get; set; } = string.Empty;
    public DateTime PeriodStartDate { get; set; }
    public DateTime PeriodEndDate { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public int TotalEmployees { get; set; }
    public decimal TotalGrossEarnings { get; set; }
    public decimal TotalNetSalary { get; set; }
    public List<SalaryRegisterItem> Items { get; set; } = new();
}

public class SalaryRegisterItem
{
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public decimal BaseSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal OvertimePay { get; set; }
    public decimal GrossEarnings { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal SocialInsuranceAmount { get; set; }
    public decimal NetSalary { get; set; }
    public int WorkingDays { get; set; }
    public int PaidDays { get; set; }
    public decimal OvertimeHours { get; set; }
    public int AbsentDays { get; set; }
    public string Status { get; set; } = string.Empty;
}

// ========== Department Cost Report ==========

public class DepartmentCostReport
{
    public int Year { get; set; }
    public int? Month { get; set; }
    public long? BranchId { get; set; }
    public decimal TotalCost { get; set; }
    public int TotalEmployees { get; set; }
    public List<DepartmentCostItem> Items { get; set; } = new();
}

public class DepartmentCostItem
{
    public long DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public int EmployeeCount { get; set; }
    public decimal TotalBaseSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal TotalOvertimePay { get; set; }
    public decimal TotalGrossEarnings { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TotalNetSalary { get; set; }
    public decimal AverageSalary { get; set; }
}

// ========== YTD Earnings Report ==========

public class YtdEarningsReport
{
    public int Year { get; set; }
    public int TotalRecords { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public List<YtdEarningsItem> Items { get; set; } = new();
}

public class YtdEarningsItem
{
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public decimal YtdBaseSalary { get; set; }
    public decimal YtdAllowances { get; set; }
    public decimal YtdOvertimePay { get; set; }
    public decimal YtdGrossEarnings { get; set; }
    public decimal YtdTotalDeductions { get; set; }
    public decimal YtdTaxDeductions { get; set; }
    public decimal YtdSocialInsurance { get; set; }
    public decimal YtdNetEarnings { get; set; }
    public int MonthsProcessed { get; set; }
}
