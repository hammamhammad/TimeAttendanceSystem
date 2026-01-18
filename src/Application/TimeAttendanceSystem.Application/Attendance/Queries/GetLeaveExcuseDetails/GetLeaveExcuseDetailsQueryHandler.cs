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
        // IMPORTANT: Must specify UTC kind for PostgreSQL timestamp with time zone compatibility
        var queryDate = DateTime.SpecifyKind(request.Date.Date, DateTimeKind.Utc);

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
        // Fetch full entities to avoid EF Core translation issues
        var vacations = await _context.EmployeeVacations
            .Include(ev => ev.Employee)
            .Include(ev => ev.VacationType)
            .Where(ev => !ev.IsDeleted &&
                        ev.EmployeeId == employeeId &&
                        ev.StartDate <= date &&
                        ev.EndDate >= date)
            .OrderByDescending(ev => ev.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        // Map to DTOs on the client side
        var today = DateTime.UtcNow.Date;
        return vacations.Select(ev =>
        {
            var (status, statusDisplay) = GetVacationStatus(ev.IsApproved, ev.EndDate, today);
            return new EmployeeVacationDetailDto
            {
                Id = ev.Id,
                EmployeeName = ev.Employee?.FullName ?? string.Empty,
                VacationTypeName = ev.VacationType?.Name ?? string.Empty,
                StartDate = ev.StartDate,
                EndDate = ev.EndDate,
                DurationDays = ev.TotalDays,
                IsApproved = ev.IsApproved,
                Notes = ev.Notes,
                CreatedAtUtc = ev.CreatedAtUtc,
                Status = status,
                StatusDisplay = statusDisplay
            };
        }).ToList();
    }

    /// <summary>
    /// Computes the vacation status based on approval and dates.
    /// </summary>
    private static (string Status, string StatusDisplay) GetVacationStatus(bool isApproved, DateTime endDate, DateTime today)
    {
        if (isApproved)
        {
            // Approved vacation - check if completed (past) or still active
            if (endDate.Date < today)
                return ("Completed", "Completed");
            return ("Approved", "Approved");
        }
        else
        {
            // Not approved - check if expired (end date has passed)
            if (endDate.Date < today)
                return ("Expired", "Expired");
            return ("Pending", "Pending");
        }
    }

    /// <summary>
    /// Retrieves employee excuses for the specified date.
    /// </summary>
    private async Task<List<AttendanceExcuseDetailDto>> GetEmployeeExcusesAsync(
        long employeeId,
        DateTime date,
        CancellationToken cancellationToken)
    {
        // Normalize date to start and end of day for comparison
        // IMPORTANT: Must specify UTC kind for PostgreSQL timestamp with time zone compatibility
        var startOfDay = DateTime.SpecifyKind(date.Date, DateTimeKind.Utc);
        var endOfDay = DateTime.SpecifyKind(date.Date.AddDays(1), DateTimeKind.Utc);

        // Fetch full entities to avoid EF Core translation issues with TimeOnly
        var excuses = await _context.EmployeeExcuses
            .Include(ee => ee.Employee)
            .Include(ee => ee.ApprovedBy)
            .Where(ee => !ee.IsDeleted &&
                        ee.EmployeeId == employeeId &&
                        ee.ExcuseDate >= startOfDay &&
                        ee.ExcuseDate < endOfDay)
            .OrderByDescending(ee => ee.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        // Map to DTOs on the client side
        return excuses.Select(ee => new AttendanceExcuseDetailDto
        {
            Id = ee.Id,
            EmployeeName = ee.Employee?.FullName ?? string.Empty,
            ExcuseDate = ee.ExcuseDate,
            ExcuseType = ee.ExcuseType,
            ExcuseTypeDisplay = ee.ExcuseType == ExcuseType.PersonalExcuse ? "Personal Excuse" : "Official Duty",
            StartTime = ee.StartTime,
            EndTime = ee.EndTime,
            DurationHours = ee.DurationHours,
            Reason = ee.Reason,
            ApprovalStatus = ee.ApprovalStatus,
            ApprovalStatusDisplay = GetApprovalStatusDisplay(ee.ApprovalStatus),
            ApprovedByName = ee.ApprovedBy?.Username,
            ApprovedAt = ee.ApprovedAt,
            RejectionReason = ee.RejectionReason,
            HasAttachment = !string.IsNullOrEmpty(ee.AttachmentPath),
            AttachmentPath = ee.AttachmentPath,
            ProcessingNotes = ee.ProcessingNotes,
            CreatedAtUtc = ee.CreatedAtUtc
        }).ToList();
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
            ApprovalStatus.Cancelled => "Cancelled",
            _ => "Unknown"
        };
    }
}