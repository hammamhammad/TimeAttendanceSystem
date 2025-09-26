using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.DeleteVacationType;

/// <summary>
/// CQRS command for soft-deleting a vacation type in the Time Attendance System.
/// Implements safe deletion with business rule validation to prevent data integrity issues
/// while maintaining referential integrity for existing vacation records and audit trails.
/// </summary>
/// <param name="Id">Unique identifier of the vacation type to delete</param>
/// <remarks>
/// Command Validation Rules:
/// - Id must be positive and correspond to an existing vacation type
/// - Vacation type must not be in use by active vacation records
/// - User must have vacation type deletion permissions
/// - Cannot delete vacation types with pending vacation requests
/// - Cannot delete vacation types currently assigned to employees
///
/// Business Rules:
/// - Soft delete implementation preserves data integrity and audit trails
/// - Deletion validation ensures no orphaned vacation records
/// - Multi-tenant isolation maintained through user's branch scope
/// - Referential integrity checks prevent deletion of active vacation types
/// - Audit trail automatically updated for compliance and change tracking
///
/// Security Considerations:
/// - User must have vacation type deletion permissions
/// - Branch access validated through user's branch scope authorization
/// - Prevents unauthorized deletion across organizational boundaries
/// - Audit trail captures deletion attempts for security monitoring
/// - Multi-tenant data isolation maintained through branch relationship
///
/// Data Integrity Protection:
/// - Validates vacation type is not referenced by existing vacation records
/// - Checks for pending vacation requests using this vacation type
/// - Ensures no active employee assignments to this vacation type
/// - Prevents cascade deletion that could affect historical data
/// - Maintains referential integrity across related entities
///
/// Response Information:
/// - Returns Result&lt;bool&gt; indicating deletion success or failure
/// - Provides detailed error messages for validation failures and business rule violations
/// - Includes specific reasons why deletion might be prevented
/// - Supports localized error messages based on user language preferences
/// </remarks>
public record DeleteVacationTypeCommand(long Id) : IRequest<Result<bool>>;