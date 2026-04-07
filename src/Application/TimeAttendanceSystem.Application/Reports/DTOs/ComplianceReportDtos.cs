namespace TecAxle.Hrms.Application.Reports.DTOs;

// ========== Contract Expiry Report ==========

public class ContractExpiryReport
{
    public int DaysThreshold { get; set; }
    public int TotalExpiringContracts { get; set; }
    public List<ContractExpiryItem> Items { get; set; } = new();
}

public class ContractExpiryItem
{
    public long ContractId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public string ContractType { get; set; } = string.Empty;
    public string ContractNumber { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int DaysRemaining { get; set; }
    public string Status { get; set; } = string.Empty;
}

// ========== Document Expiry Report ==========

public class DocumentExpiryReport
{
    public int DaysThreshold { get; set; }
    public int TotalExpiringDocuments { get; set; }
    public List<DocumentExpiryItem> Items { get; set; } = new();
}

public class DocumentExpiryItem
{
    public long DocumentId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public string DocumentName { get; set; } = string.Empty;
    public string DocumentType { get; set; } = string.Empty;
    public DateTime? ExpiryDate { get; set; }
    public int DaysRemaining { get; set; }
    public string VerificationStatus { get; set; } = string.Empty;
}

// ========== Certification Expiry Report ==========

public class CertificationExpiryReport
{
    public int DaysThreshold { get; set; }
    public int TotalExpiringCertifications { get; set; }
    public List<CertificationExpiryItem> Items { get; set; } = new();
}

public class CertificationExpiryItem
{
    public long CertificationId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public string CertificationName { get; set; } = string.Empty;
    public string? IssuingAuthority { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public int DaysRemaining { get; set; }
    public string Status { get; set; } = string.Empty;
}

// ========== Compliance Summary ==========

public class ComplianceSummaryReport
{
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;

    // Contract expiry counts
    public int ContractsExpiring7Days { get; set; }
    public int ContractsExpiring30Days { get; set; }
    public int ContractsExpiring90Days { get; set; }

    // Document expiry counts
    public int DocumentsExpiring7Days { get; set; }
    public int DocumentsExpiring30Days { get; set; }
    public int DocumentsExpiring90Days { get; set; }

    // Certification expiry counts
    public int CertificationsExpiring7Days { get; set; }
    public int CertificationsExpiring30Days { get; set; }
    public int CertificationsExpiring90Days { get; set; }

    // Already expired counts
    public int ContractsAlreadyExpired { get; set; }
    public int DocumentsAlreadyExpired { get; set; }
    public int CertificationsAlreadyExpired { get; set; }
}
