using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.VacationTypes;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.CreateVacationType;

/// <summary>
/// Simplified CQRS command for creating a new vacation type in the Time Attendance System.
/// Contains only essential fields: name (bilingual), branch association.
/// </summary>
/// <param name="BranchId">ID of the branch where the vacation type will be configured (null for all branches)</param>
/// <param name="Name">Vacation type name in primary language (required)</param>
/// <param name="NameAr">Vacation type name in Arabic for bilingual support (optional)</param>
/// <remarks>
/// Command Validation Rules:
/// - BranchId must exist if specified (null means applies to all branches)
/// - Name is required and must be unique within scope (branch-specific or global)
/// - Name and Arabic name length limits enforced for database compatibility
///
/// Business Rules:
/// - Vacation type name uniqueness enforced per branch scope
/// - Active status defaults to true for immediate availability
/// - Multi-tenant isolation through branch relationship (null = all branches)
/// </remarks>
public record CreateVacationTypeCommand(
    long? BranchId,
    string Name,
    string? NameAr
) : IRequest<Result<long>>;