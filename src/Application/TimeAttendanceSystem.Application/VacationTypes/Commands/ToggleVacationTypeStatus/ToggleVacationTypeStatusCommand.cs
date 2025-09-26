using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.ToggleVacationTypeStatus;

/// <summary>
/// CQRS command for toggling the active status of a vacation type in the Time Attendance System.
/// Enables administrators to activate or deactivate vacation types based on organizational needs
/// while maintaining data integrity and ensuring proper business rule enforcement.
/// </summary>
/// <param name="Id">Unique identifier of the vacation type to toggle status</param>
/// <remarks>
/// Command Validation Rules:
/// - Id must be positive and correspond to an existing vacation type
/// - User must have vacation type modification permissions
/// - Cannot deactivate vacation types with pending vacation requests
/// - Multi-tenant access validation through user's branch scope
/// - Status changes must comply with organizational policies
///
/// Business Rules:
/// - Active vacation types are available for new vacation requests
/// - Inactive vacation types cannot be used for new vacation requests
/// - Status changes preserve existing vacation records and audit trails
/// - Deactivation validation ensures no disruption to ongoing processes
/// - Activation allows immediate use for new vacation requests
///
/// Security Considerations:
/// - User must have vacation type status modification permissions
/// - Branch access validated through user's branch scope authorization
/// - Prevents unauthorized status changes across organizational boundaries
/// - Audit trail captures all status change attempts for security monitoring
/// - Multi-tenant data isolation maintained through branch relationship
///
/// Impact Assessment:
/// - Status changes affect availability for new vacation requests
/// - Existing vacation records remain unaffected by status changes
/// - Pending requests using inactive types may require special handling
/// - Reporting and analytics consider status for availability calculations
/// - Calendar integration reflects status in vacation type visibility
///
/// Response Information:
/// - Returns Result&lt;bool&gt; indicating status toggle success or failure
/// - Provides detailed error messages for validation failures and business rule violations
/// - Includes current status after successful toggle operation
/// - Supports localized error messages based on user language preferences
/// </remarks>
public record ToggleVacationTypeStatusCommand(long Id) : IRequest<Result<bool>>;