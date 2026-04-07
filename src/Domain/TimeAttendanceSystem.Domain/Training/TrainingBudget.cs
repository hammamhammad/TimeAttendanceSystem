using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingBudget : BaseEntity
{
    public long? BranchId { get; set; }
    public long? DepartmentId { get; set; }
    public int FiscalYear { get; set; }
    public decimal AllocatedBudget { get; set; }
    public decimal SpentAmount { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? Notes { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
    public Department? Department { get; set; }
}
