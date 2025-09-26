namespace TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypes;

/// <summary>
/// Simplified Data Transfer Object representing vacation type information for list views and administrative operations.
/// Contains only essential fields: name (bilingual), branch association, and active status.
/// </summary>
/// <param name="Id">Unique identifier for the vacation type</param>
/// <param name="BranchId">Identifier of the branch this vacation type belongs to (null means all branches)</param>
/// <param name="BranchName">Name of the branch for display purposes (null when applies to all branches)</param>
/// <param name="Name">Vacation type name in primary language</param>
/// <param name="NameAr">Vacation type name in Arabic for bilingual support (optional)</param>
/// <param name="IsActive">Indicates if the vacation type is active and available for use</param>
/// <param name="CreatedAtUtc">UTC timestamp when the vacation type was created</param>
/// <param name="ModifiedAtUtc">UTC timestamp when the vacation type was last modified (optional)</param>
/// <remarks>
/// Simplified DTO Design:
/// - Contains only essential fields: Names, Branch, Active Status
/// - BranchId null = applies to all branches; specific value = branch-specific
/// - Bilingual support maintained for Arabic organizations
/// - Lightweight for efficient serialization and network transmission
/// - Suitable for vacation type selection dropdowns and management lists
/// </remarks>
public record VacationTypeDto(
    long Id,
    long? BranchId,
    string? BranchName,
    string Name,
    string? NameAr,
    bool IsActive,
    DateTime CreatedAtUtc,
    DateTime? ModifiedAtUtc
);