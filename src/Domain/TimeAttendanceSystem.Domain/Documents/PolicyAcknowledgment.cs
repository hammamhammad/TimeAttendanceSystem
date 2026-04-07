using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Documents;

public class PolicyAcknowledgment : BaseEntity
{
    public long CompanyPolicyId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime AcknowledgedAt { get; set; }
    public string? IpAddress { get; set; }

    // Navigation
    public CompanyPolicy CompanyPolicy { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
