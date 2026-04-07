using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Recruitment;

public class JobRequisition : BaseEntity
{
    public long BranchId { get; set; }
    public long DepartmentId { get; set; }
    public string RequisitionNumber { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? JobGradeId { get; set; }
    public JobEmploymentType EmploymentType { get; set; }
    public int NumberOfPositions { get; set; } = 1;
    public int FilledPositions { get; set; }
    public RequisitionPriority Priority { get; set; } = RequisitionPriority.Medium;
    public decimal? BudgetedSalaryMin { get; set; }
    public decimal? BudgetedSalaryMax { get; set; }
    public string? Currency { get; set; } = "SAR";
    public string? RequiredSkills { get; set; }
    public string? RequiredQualifications { get; set; }
    public string? RequiredQualificationsAr { get; set; }
    public int? RequiredExperienceYears { get; set; }
    public DateTime? TargetHireDate { get; set; }
    public string? Justification { get; set; }
    public string? JustificationAr { get; set; }
    public bool IsReplacement { get; set; }
    public long? ReplacingEmployeeId { get; set; }
    public RequisitionStatus Status { get; set; } = RequisitionStatus.Draft;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? RequestedByEmployeeId { get; set; }
    public string? Notes { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Branch Branch { get; set; } = null!;
    public Department Department { get; set; } = null!;
    public JobGrade? JobGrade { get; set; }
    public Employee? ReplacingEmployee { get; set; }
    public Employee? RequestedByEmployee { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<JobPosting> Postings { get; set; } = new List<JobPosting>();
}
