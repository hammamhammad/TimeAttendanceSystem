using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Queries;

/// <summary>
/// Query to get fingerprint requests with filtering and pagination
/// </summary>
public record GetFingerprintRequestsQuery : IRequest<Result<PagedResult<FingerprintRequestDto>>>
{
    /// <summary>
    /// Filter by employee ID (optional)
    /// </summary>
    public long? EmployeeId { get; set; }

    /// <summary>
    /// Filter by status (optional)
    /// </summary>
    public string? Status { get; set; }

    /// <summary>
    /// Page number (1-based)
    /// </summary>
    public int Page { get; set; } = 1;

    /// <summary>
    /// Page size
    /// </summary>
    public int PageSize { get; set; } = 20;
}

/// <summary>
/// Handler for GetFingerprintRequestsQuery
/// </summary>
public class GetFingerprintRequestsQueryHandler
    : BaseHandler<GetFingerprintRequestsQuery, Result<PagedResult<FingerprintRequestDto>>>
{
    public GetFingerprintRequestsQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<FingerprintRequestDto>>> Handle(
        GetFingerprintRequestsQuery request,
        CancellationToken cancellationToken)
    {
        var query = Context.FingerprintRequests
            .Include(fr => fr.Employee)
                .ThenInclude(e => e.Department)
            .Include(fr => fr.Technician)
            .Where(fr => !fr.IsDeleted)
            .AsQueryable();

        // If not system admin, filter to only show own requests
        if (!CurrentUser.IsSystemAdmin)
        {
            var employeeLink = await Context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == CurrentUser.UserId, cancellationToken);

            if (employeeLink == null)
                return Result.Failure<PagedResult<FingerprintRequestDto>>("Employee not found for current user");

            query = query.Where(fr => fr.EmployeeId == employeeLink.EmployeeId);
        }
        else
        {
            // Admin can filter by employee ID
            if (request.EmployeeId.HasValue)
            {
                query = query.Where(fr => fr.EmployeeId == request.EmployeeId.Value);
            }
        }

        // Filter by status
        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (Enum.TryParse<Domain.FingerprintRequests.FingerprintRequestStatus>(request.Status, true, out var status))
            {
                query = query.Where(fr => fr.Status == status);
            }
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination
        var items = await query
            .OrderByDescending(fr => fr.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(fr => new FingerprintRequestDto
            {
                Id = fr.Id,
                EmployeeId = fr.EmployeeId,
                EmployeeName = fr.Employee != null ? $"{fr.Employee.FirstName} {fr.Employee.LastName}" : "",
                EmployeeNumber = fr.Employee != null ? fr.Employee.EmployeeNumber : "",
                DepartmentName = fr.Employee != null && fr.Employee.Department != null
                    ? fr.Employee.Department.Name
                    : null,
                RequestType = fr.RequestType.ToString(),
                IssueDescription = fr.IssueDescription,
                AffectedFingers = fr.AffectedFingers,
                PreferredDate = fr.PreferredDate,
                PreferredTime = fr.PreferredTime,
                ScheduledDate = fr.ScheduledDate,
                ScheduledTime = fr.ScheduledTime,
                CompletedDate = fr.CompletedDate,
                Status = fr.Status.ToString(),
                TechnicianId = fr.TechnicianId,
                TechnicianName = fr.Technician != null ? fr.Technician.Username : null,
                TechnicianNotes = fr.TechnicianNotes,
                CreatedAtUtc = fr.CreatedAtUtc,
                ModifiedAtUtc = fr.ModifiedAtUtc
            })
            .ToListAsync(cancellationToken);

        var pagedResult = new PagedResult<FingerprintRequestDto>(
            items,
            totalCount,
            request.Page,
            request.PageSize
        );

        return Result.Success(pagedResult);
    }
}
