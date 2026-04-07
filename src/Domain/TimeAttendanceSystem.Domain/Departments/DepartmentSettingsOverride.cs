using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Shifts;

namespace TecAxle.Hrms.Domain.Departments;

/// <summary>
/// Department-level overrides with very limited scope.
/// Only default shift and approval behavior are overridable at the department level.
/// One row per department (optional — no row means full inheritance from branch/tenant).
/// </summary>
public class DepartmentSettingsOverride : BaseEntity
{
    public long DepartmentId { get; set; }
    public Department Department { get; set; } = null!;

    /// <summary>Default shift for this department. Null = use branch/tenant default.</summary>
    public long? DefaultShiftId { get; set; }
    public Shift? DefaultShift { get; set; }

    /// <summary>Whether approval comments are required. Null = inherit from tenant.</summary>
    public bool? RequireApprovalComments { get; set; }
}
