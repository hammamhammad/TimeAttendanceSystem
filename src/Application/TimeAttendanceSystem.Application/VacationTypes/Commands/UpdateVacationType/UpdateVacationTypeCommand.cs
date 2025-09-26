using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.UpdateVacationType;

/// <summary>
/// Simplified CQRS command for updating an existing vacation type in the Time Attendance System.
/// Contains only essential fields: name (bilingual), branch association.
/// </summary>
/// <param name="Id">Unique identifier of the vacation type to update</param>
/// <param name="BranchId">ID of the branch where the vacation type is configured (null for all branches)</param>
/// <param name="Name">Vacation type name in primary language (required)</param>
/// <param name="NameAr">Vacation type name in Arabic for bilingual support (optional)</param>
/// <remarks>
/// Command Validation Rules:
/// - Id must exist and be accessible by the current user
/// - BranchId must exist if specified (null means applies to all branches)
/// - Name is required and must be unique within scope (branch-specific or global, excluding current record)
/// - Name and Arabic name length limits enforced for database compatibility
///
/// Business Rules:
/// - Vacation type name uniqueness enforced per branch scope
/// - Multi-tenant isolation through branch relationship (null = all branches)
/// </remarks>
public record UpdateVacationTypeCommand(
    long Id,
    long? BranchId,
    string Name,
    string? NameAr
) : IRequest<Result>;