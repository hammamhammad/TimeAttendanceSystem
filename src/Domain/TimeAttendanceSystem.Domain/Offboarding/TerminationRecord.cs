using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Offboarding;

public class TerminationRecord : BaseEntity
{
    public long EmployeeId { get; set; }
    public TerminationType TerminationType { get; set; }
    public DateTime TerminationDate { get; set; }
    public DateTime LastWorkingDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public long? ResignationRequestId { get; set; }
    public long? ProcessedByUserId { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public ResignationRequest? ResignationRequest { get; set; }
    public ClearanceChecklist? ClearanceChecklist { get; set; }
    public EndOfServiceBenefit? EndOfServiceBenefit { get; set; }
    public FinalSettlement? FinalSettlement { get; set; }
    public ExitInterview? ExitInterview { get; set; }
}
