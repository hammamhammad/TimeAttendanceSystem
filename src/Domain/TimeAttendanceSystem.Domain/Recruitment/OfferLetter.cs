using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Recruitment;

public class OfferLetter : BaseEntity
{
    public long JobApplicationId { get; set; }
    public long CandidateId { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public long? JobGradeId { get; set; }
    public decimal OfferedSalary { get; set; }
    public string Currency { get; set; } = "SAR";
    public ContractType ContractType { get; set; } = ContractType.Permanent;
    public DateTime StartDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string? BenefitsDescription { get; set; }
    public string? BenefitsDescriptionAr { get; set; }
    public string? SpecialConditions { get; set; }
    public string? DocumentUrl { get; set; }
    public OfferStatus Status { get; set; } = OfferStatus.Draft;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? SentAt { get; set; }
    public DateTime? RespondedAt { get; set; }
    public long? CreatedEmployeeId { get; set; }  // set when employee is created from accepted offer
    public string? Notes { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public JobApplication JobApplication { get; set; } = null!;
    public Candidate Candidate { get; set; } = null!;
    public JobGrade? JobGrade { get; set; }
    public Employee? CreatedEmployee { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
