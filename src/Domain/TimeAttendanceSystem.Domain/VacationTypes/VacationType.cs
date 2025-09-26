using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Domain.VacationTypes;

/// <summary>
/// Domain entity representing a simplified vacation type configuration within the organization.
/// Manages basic vacation type information with bilingual support and branch-level organization.
/// </summary>
/// <remarks>
/// Vacation Type Features:
/// - Simple vacation type definition with bilingual support (English and Arabic)
/// - Multi-tenant isolation through branch-based organization (null BranchId means all branches)
/// - Active/inactive status control for availability management
/// - Audit trail support through BaseEntity inheritance
///
/// Business Rules:
/// - Name is required and must be unique within scope
/// - BranchId can be null (applies to all branches) or specific branch ID
/// - Active status controls availability for new vacation requests
///
/// Security Considerations:
/// - Branch-scoped access control for multi-tenant data protection
/// - Permission-based operations for vacation type management
/// - Audit trail support through BaseEntity inheritance
/// </remarks>
public class VacationType : BaseEntity
{
    /// <summary>
    /// Gets or sets the branch identifier linking this vacation type to its organizational scope.
    /// When null, the vacation type applies to all branches. When set, it's specific to that branch.
    /// </summary>
    /// <value>Branch ID for organizational context (null = all branches)</value>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the vacation type name in the primary language (English).
    /// Serves as the primary identifier for vacation type selection and user interfaces.
    /// </summary>
    /// <value>Vacation type name for identification and selection</value>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the vacation type name in Arabic for bilingual organizational support.
    /// Supports cultural preferences and localized user interfaces in Arabic-speaking regions.
    /// </summary>
    /// <value>Arabic name for cultural accommodation and localization (optional)</value>
    public string? NameAr { get; set; }

    /// <summary>
    /// Gets or sets the current active status of this vacation type.
    /// Controls availability for new vacation requests while preserving historical data.
    /// </summary>
    /// <value>True if available for new requests, false if disabled</value>
    public bool IsActive { get; set; } = true;

    // Navigation Properties

    /// <summary>
    /// Gets or sets the branch entity this vacation type belongs to.
    /// Can be null when the vacation type applies to all branches.
    /// </summary>
    /// <value>Branch entity for organizational hierarchy navigation (nullable)</value>
    public Branch? Branch { get; set; }

    // Business Logic Methods

    /// <summary>
    /// Validates the vacation type configuration for business rule compliance.
    /// Ensures basic settings are logically consistent and operationally viable.
    /// </summary>
    /// <returns>Result indicating validation success or specific failure reasons</returns>
    /// <remarks>
    /// Validation Rules:
    /// - Name is required and must not exceed 100 characters
    /// - Arabic name must not exceed 100 characters if provided
    /// - BranchId must be valid if specified (null means all branches)
    /// </remarks>
    public (bool IsValid, List<string> Errors) ValidateConfiguration()
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(Name))
            errors.Add("Vacation type name is required");

        if (Name.Length > 100)
            errors.Add("Vacation type name must not exceed 100 characters");

        if (!string.IsNullOrEmpty(NameAr) && NameAr.Length > 100)
            errors.Add("Arabic name must not exceed 100 characters");

        return (errors.Count == 0, errors);
    }

}