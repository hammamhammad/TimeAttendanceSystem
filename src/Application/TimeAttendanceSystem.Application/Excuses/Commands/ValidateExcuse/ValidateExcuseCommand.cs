using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ValidateExcuse;

/// <summary>
/// CQRS command for validating excuse creation parameters.
/// Checks policy compliance and business rules without creating the excuse.
/// </summary>
/// <param name="EmployeeId">Employee identifier</param>
/// <param name="ExcuseDate">Date of the excuse</param>
/// <param name="ExcuseType">Type of excuse (Personal/Official)</param>
/// <param name="StartTime">Start time of the excuse (HH:mm format)</param>
/// <param name="EndTime">End time of the excuse (HH:mm format)</param>
/// <remarks>
/// Command Processing:
/// - Validates employee exists and is active
/// - Checks applicable excuse policy
/// - Validates duration limits
/// - Checks monthly/daily usage against limits
/// - Validates overlap with existing excuses
/// - Returns validation result with errors and warnings
///
/// Business Rules Validated:
/// - Employee must be active and exist
/// - Excuse date cannot be in the future beyond policy limits
/// - Duration must be within policy limits
/// - Monthly/daily limits must not be exceeded
/// - No overlapping excuses on the same date
/// - Retroactive limits enforcement
///
/// Returns:
/// - Validation status (valid/invalid)
/// - List of validation errors
/// - List of policy warnings
/// - Calculated duration
/// - Approval requirement status
/// </remarks>
public record ValidateExcuseCommand(
    long EmployeeId,
    DateTime ExcuseDate,
    ExcuseType ExcuseType,
    string StartTime,
    string EndTime
) : IRequest<Result<ExcuseValidationDto>>
{
    /// <summary>
    /// Gets the start time as TimeOnly object
    /// </summary>
    public TimeOnly StartTimeValue
    {
        get
        {
            if (TimeOnly.TryParse(StartTime, out var result))
                return result;
            throw new ArgumentException($"Invalid start time format: {StartTime}");
        }
    }

    /// <summary>
    /// Gets the end time as TimeOnly object
    /// </summary>
    public TimeOnly EndTimeValue
    {
        get
        {
            if (TimeOnly.TryParse(EndTime, out var result))
                return result;
            throw new ArgumentException($"Invalid end time format: {EndTime}");
        }
    }
};

/// <summary>
/// DTO for excuse validation results.
/// </summary>
public class ExcuseValidationDto
{
    public bool IsValid { get; set; }
    public List<string> ValidationErrors { get; set; } = new();
    public List<string> PolicyWarnings { get; set; } = new();
    public decimal DurationHours { get; set; }
    public bool RequiresApproval { get; set; }
}