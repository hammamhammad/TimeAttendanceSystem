using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Attendance.Queries.GetLeaveExcuseDetails;

/// <summary>
/// Query handler for retrieving leave, excuse, and remote work details for a specific employee and date.
/// Implements optimized database queries with proper joins and filtering.
/// </summary>
public class GetLeaveExcuseDetailsQueryHandler : IRequestHandler<GetLeaveExcuseDetailsQuery, Result<LeaveExcuseDetailsResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetLeaveExcuseDetailsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the retrieval of leave, excuse, and remote work details for the specified employee and date.
    /// </summary>
    /// <param name="request">Query with employee ID and date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Leave and excuse details response</returns>
    public async Task<Result<LeaveExcuseDetailsResponse>> Handle(
        GetLeaveExcuseDetailsQuery request,
        CancellationToken cancellationToken)
    {
        // Validate input parameters
        if (request.EmployeeId <= 0)
            return Result.Failure<LeaveExcuseDetailsResponse>("Employee ID must be greater than 0");

        // Query date should be normalized to date only (remove time component)
        var queryDate = request.Date.Date;

        // Fetch employee vacations that are active on the specified date
        var vacations = await GetEmployeeVacationsAsync(request.EmployeeId, queryDate, cancellationToken);

        // Fetch employee excuses for the specified date
        var excuses = await GetEmployeeExcusesAsync(request.EmployeeId, queryDate, cancellationToken);

        // Future: Fetch remote work arrangements
        var remoteWork = new List<RemoteWorkDetailDto>(); // Placeholder for future implementation

        // Build response
        var response = new LeaveExcuseDetailsResponse
        {
            Vacations = vacations,
            Excuses = excuses,
            RemoteWork = remoteWork
        };

        return Result.Success(response);
    }

    /// <summary>
    /// Retrieves employee vacations that are active on the specified date.
    /// </summary>
    private async Task<List<EmployeeVacationDetailDto>> GetEmployeeVacationsAsync(
        long employeeId,
        DateTime date,
        CancellationToken cancellationToken)
    {
        return await _context.EmployeeVacations
            .Where(ev => !ev.IsDeleted &&
                        ev.EmployeeId == employeeId &&
                        ev.StartDate <= date &&
                        ev.EndDate >= date) // Vacation is active on the specified date
            .Select(ev => new EmployeeVacationDetailDto
            {
                Id = ev.Id,
                EmployeeName = ev.Employee.FullName,
                VacationTypeName = ev.VacationType.Name,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                DurationDays = ev.TotalDays,
                IsApproved = ev.IsApproved,
                Notes = ev.Notes,
                CreatedAtUtc = ev.CreatedAtUtc
            })
            .OrderByDescending(ev => ev.CreatedAtUtc)
            .ToListAsync(cancellationToken);
    }

    /// <summary>
    /// Retrieves employee excuses for the specified date.
    /// </summary>
    private async Task<List<AttendanceExcuseDetailDto>> GetEmployeeExcusesAsync(
        long employeeId,
        DateTime date,
        CancellationToken cancellationToken)
    {
        return await _context.EmployeeExcuses
            .Where(ee => !ee.IsDeleted &&
                        ee.EmployeeId == employeeId &&
                        ee.ExcuseDate.Date == date) // Excuse is for the specified date
            .Select(ee => new AttendanceExcuseDetailDto
            {
                Id = ee.Id,
                EmployeeName = ee.Employee.FullName,
                ExcuseDate = ee.ExcuseDate,
                ExcuseType = ee.ExcuseType,
                ExcuseTypeDisplay = ee.ExcuseType == ExcuseType.PersonalExcuse ? "Personal Excuse" : "Official Duty",
                StartTime = ee.StartTime,
                EndTime = ee.EndTime,
                DurationHours = ee.DurationHours,
                Reason = ee.Reason,
                ApprovalStatus = ee.ApprovalStatus,
                ApprovalStatusDisplay = GetApprovalStatusDisplay(ee.ApprovalStatus),
                ApprovedByName = ee.ApprovedBy != null ? ee.ApprovedBy.Username : null,
                ApprovedAt = ee.ApprovedAt,
                RejectionReason = ee.RejectionReason,
                HasAttachment = !string.IsNullOrEmpty(ee.AttachmentPath),
                AttachmentPath = ee.AttachmentPath,
                ProcessingNotes = ee.ProcessingNotes,
                CreatedAtUtc = ee.CreatedAtUtc
            })
            .OrderByDescending(ee => ee.CreatedAtUtc)
            .ToListAsync(cancellationToken);
    }

    /// <summary>
    /// Gets the display text for approval status.
    /// </summary>
    private static string GetApprovalStatusDisplay(ApprovalStatus status)
    {
        return status switch
        {
            ApprovalStatus.Pending => "Pending",
            ApprovalStatus.Approved => "Approved",
            ApprovalStatus.Rejected => "Rejected",
            _ => "Unknown"
        };
    }
}