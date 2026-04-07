using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Timesheets;

public class Project : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? ClientName { get; set; }
    public string? ClientNameAr { get; set; }
    public long? ManagerEmployeeId { get; set; }
    public long BranchId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? BudgetHours { get; set; }
    public ProjectStatus Status { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsChargeable { get; set; } = true;

    // Navigation
    public Employee? ManagerEmployee { get; set; }
    public Branch Branch { get; set; } = null!;
    public ICollection<ProjectTask> Tasks { get; set; } = new List<ProjectTask>();
}
