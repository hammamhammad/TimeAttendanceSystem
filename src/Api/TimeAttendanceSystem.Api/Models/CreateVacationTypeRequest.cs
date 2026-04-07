namespace TecAxle.Hrms.Api.Models;

/// <summary>
/// Simplified request model for creating a new vacation type.
/// Contains only essential fields: name (bilingual), branch association.
/// </summary>
/// <remarks>
/// Request Validation:
/// - Branch ID must be valid and user must have access (can be null for all branches)
/// - Name is required and must be unique within the branch scope
/// - Name and Arabic name length limits enforced for database compatibility
///
/// Business Rules:
/// - Name uniqueness enforced per branch scope for multi-tenant isolation
/// - Multi-tenant isolation through branch relationship (null = all branches)
/// - Active status defaults to true for immediate availability
/// </remarks>
public class CreateVacationTypeRequest
{
    /// <summary>
    /// ID of the branch where this vacation type will be configured.
    /// Can be null to apply to all branches.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Vacation type name in the primary language (required).
    /// Must be unique within the specified branch scope.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Vacation type name in Arabic for bilingual support (optional).
    /// Provides localization for Arabic-speaking organizations.
    /// </summary>
    public string? NameAr { get; set; }

    /// <summary>
    /// Whether this vacation type allows half-day leave requests.
    /// When true, employees can request morning or afternoon half-day leaves.
    /// </summary>
    public bool AllowHalfDay { get; set; }

    /// <summary>
    /// Whether this vacation type allows leave encashment.
    /// When true, employees can convert unused leave balance to cash.
    /// </summary>
    public bool AllowEncashment { get; set; }

    /// <summary>
    /// Maximum number of days that can be encashed.
    /// Only applicable when AllowEncashment is true. Null means no limit.
    /// </summary>
    public int? EncashmentMaxDays { get; set; }
}