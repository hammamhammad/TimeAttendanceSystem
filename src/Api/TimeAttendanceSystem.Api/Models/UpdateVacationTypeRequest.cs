namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Simplified request model for updating an existing vacation type.
/// Contains only essential fields: name (bilingual), branch association.
/// </summary>
/// <remarks>
/// Request Validation:
/// - Branch ID must be valid and user must have access (can be null for all branches)
/// - Name is required and must be unique within the branch scope (excluding current record)
/// - Name and Arabic name length limits enforced for database compatibility
///
/// Business Rules:
/// - Name uniqueness enforced per branch scope excluding current record
/// - Multi-tenant isolation through branch relationship (null = all branches)
/// </remarks>
public class UpdateVacationTypeRequest
{
    /// <summary>
    /// ID of the branch where this vacation type is configured.
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
}