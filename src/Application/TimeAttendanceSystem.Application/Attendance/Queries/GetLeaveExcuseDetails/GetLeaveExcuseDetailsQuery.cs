using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Attendance.Queries.GetLeaveExcuseDetails;

/// <summary>
/// CQRS query for retrieving leave, excuse, and remote work details for a specific employee and date.
/// Used in the Daily Attendance Detail page to provide comprehensive absence information.
/// </summary>
/// <param name="EmployeeId">The employee identifier</param>
/// <param name="Date">The specific date to query leave/excuse details for</param>
/// <remarks>
/// Query Features:
/// - Retrieves employee vacations active on the specified date
/// - Retrieves employee excuses for the specified date
/// - Future: Remote work arrangements for the date
/// - Optimized queries with proper joins and filtering
/// - Returns only relevant data for display purposes
///
/// Use Cases:
/// - Daily Attendance Detail page showing why an employee was absent/late
/// - Supervisor dashboard understanding employee absence reasons
/// - HR compliance tracking for leave and excuse management
/// - Attendance reporting with detailed absence breakdowns
///
/// Performance Considerations:
/// - Uses indexed queries on date and employee
/// - Returns DTOs optimized for display
/// - Minimal data transfer with projection
/// - Single query per data type for efficiency
/// </remarks>
public record GetLeaveExcuseDetailsQuery(
    long EmployeeId,
    DateTime Date
) : IRequest<Result<LeaveExcuseDetailsResponse>>;