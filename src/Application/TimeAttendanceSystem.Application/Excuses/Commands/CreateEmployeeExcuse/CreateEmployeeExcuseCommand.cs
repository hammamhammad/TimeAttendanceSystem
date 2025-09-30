using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Commands.CreateEmployeeExcuse;

/// <summary>
/// CQRS command for creating a new employee excuse request.
/// Handles excuse creation with policy validation and approval workflow management.
/// </summary>
/// <param name="EmployeeId">Employee identifier for excuse assignment</param>
/// <param name="ExcuseDate">Date of the excuse</param>
/// <param name="ExcuseType">Type of excuse (Personal or Official Duty)</param>
/// <param name="StartTime">Start time of the excuse period</param>
/// <param name="EndTime">End time of the excuse period</param>
/// <param name="Reason">Reason for the excuse request</param>
/// <param name="AttachmentPath">Optional path to supporting documentation</param>
/// <param name="AffectsSalary">Whether this excuse affects salary calculation</param>
/// <param name="ProcessingNotes">Optional processing notes for approval workflow</param>
/// <remarks>
/// Command Processing:
/// - Validates employee exists and is active
/// - Retrieves applicable excuse policy for validation
/// - Validates time range and duration constraints
/// - Checks for overlapping excuses on the same date
/// - Enforces policy limits for personal excuses
/// - Creates excuse with appropriate approval status
/// - Updates attendance records if auto-approved
///
/// Business Rules Enforced:
/// - End time must be after start time
/// - Duration must comply with policy limits
/// - Personal excuses are subject to policy validation
/// - Official duties are exempt from policy limits
/// - No overlapping excuse periods allowed
/// - Retroactive limits enforced per policy
///
/// Integration Effects:
/// - Approved excuses update attendance status to Excused/OnDuty
/// - Policy limits checked against existing excuses in period
/// - Attendance calculation integration for approved excuses
/// - Approval workflow based on policy configuration
/// </remarks>
public record CreateEmployeeExcuseCommand(
    long EmployeeId,
    DateTime ExcuseDate,
    ExcuseType ExcuseType,
    TimeOnly StartTime,
    TimeOnly EndTime,
    string Reason,
    string? AttachmentPath = null,
    bool AffectsSalary = true,
    string? ProcessingNotes = null
) : IRequest<Result<long>>;