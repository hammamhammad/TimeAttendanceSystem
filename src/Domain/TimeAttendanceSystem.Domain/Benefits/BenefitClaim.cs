using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Benefits;

public class BenefitClaim : BaseEntity
{
    public long BenefitEnrollmentId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime ClaimDate { get; set; }
    public decimal ClaimAmount { get; set; }
    public decimal? ApprovedAmount { get; set; }
    public string Currency { get; set; } = "SAR";
    public BenefitClaimType ClaimType { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public BenefitClaimStatus Status { get; set; }
    public DateTime? ProcessedAt { get; set; }
    public long? ProcessedByUserId { get; set; }
    public string? RejectionReason { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public BenefitEnrollment BenefitEnrollment { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
