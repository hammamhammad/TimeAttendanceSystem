using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcuseStatistics;

/// <summary>
/// CQRS query for retrieving employee excuse usage statistics.
/// Provides comprehensive statistics for excuse usage within a specific period.
/// </summary>
/// <param name="EmployeeId">Employee identifier to get statistics for</param>
/// <param name="Year">Year for statistics calculation</param>
/// <param name="Month">Optional month for more granular statistics (null for entire year)</param>
/// <remarks>
/// Query Processing:
/// - Validates employee exists and is accessible
/// - Calculates usage statistics for the specified period
/// - Includes both approved and pending excuses in relevant metrics
/// - Compares usage against applicable policy limits
/// - Returns comprehensive statistics including remaining allowances
///
/// Statistics Returned:
/// - Total personal excuses count and hours
/// - Total official duties count and hours
/// - Remaining personal excuse allowances
/// - Breakdown by approval status
/// - Policy compliance indicators
///
/// Security Considerations:
/// - Employee-specific data access control
/// - Branch-scoped access for multi-tenant environments
/// - Sensitive data filtering based on user permissions
/// </remarks>
public record GetExcuseStatisticsQuery(
    long EmployeeId,
    int Year,
    int? Month = null
) : IRequest<Result<ExcuseStatisticsDto>>;

/// <summary>
/// DTO for excuse usage statistics.
/// </summary>
public class ExcuseStatisticsDto
{
    public int TotalPersonalExcuses { get; set; }
    public decimal TotalPersonalExcuseHours { get; set; }
    public int TotalOfficialDuties { get; set; }
    public decimal TotalOfficialDutyHours { get; set; }
    public int RemainingPersonalExcuses { get; set; }
    public decimal RemainingPersonalExcuseHours { get; set; }
    public int ApprovedExcuses { get; set; }
    public int PendingExcuses { get; set; }
    public int RejectedExcuses { get; set; }
}