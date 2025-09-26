namespace TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypeById;

/// <summary>
/// Simplified Data Transfer Object representing detailed vacation type information for single record views.
/// Contains only essential fields: name (bilingual), branch association, and active status with permissions.
/// </summary>
/// <param name="Id">Unique identifier for the vacation type</param>
/// <param name="BranchId">Identifier of the branch this vacation type belongs to (null means all branches)</param>
/// <param name="BranchName">Name of the branch for display purposes (null when applies to all branches)</param>
/// <param name="Name">Vacation type name in primary language</param>
/// <param name="NameAr">Vacation type name in Arabic for bilingual support (optional)</param>
/// <param name="IsActive">Indicates if the vacation type is active and available for use</param>
/// <param name="CreatedAtUtc">UTC timestamp when the vacation type was created</param>
/// <param name="ModifiedAtUtc">UTC timestamp when the vacation type was last modified (optional)</param>
/// <param name="CanBeModified">Indicates if the vacation type can be edited</param>
/// <param name="CanBeDeleted">Indicates if the vacation type can be deleted</param>
/// <remarks>
/// Simplified DTO Design:
/// - Contains only essential fields: Names, Branch, Active Status, Permissions
/// - BranchId null = applies to all branches; specific value = branch-specific
/// - Bilingual support maintained for Arabic organizations
/// - Permission flags for UI operation availability
/// - Lightweight for detailed views and edit forms
/// </remarks>
public record VacationTypeDetailDto(
    long Id,
    long? BranchId,
    string? BranchName,
    string Name,
    string? NameAr,
    bool IsActive,
    DateTime CreatedAtUtc,
    DateTime? ModifiedAtUtc,
    bool CanBeModified,
    bool CanBeDeleted
);