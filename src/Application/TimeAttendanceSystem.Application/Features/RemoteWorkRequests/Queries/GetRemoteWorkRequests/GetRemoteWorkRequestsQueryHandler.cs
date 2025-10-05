using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequests;

/// <summary>
/// Handler for getting remote work requests.
/// </summary>
public class GetRemoteWorkRequestsQueryHandler : IRequestHandler<GetRemoteWorkRequestsQuery, List<RemoteWorkRequestDto>>
{
    private readonly IApplicationDbContext _context;

    public GetRemoteWorkRequestsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<RemoteWorkRequestDto>> Handle(GetRemoteWorkRequestsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.RemoteWorkRequests
            .Include(a => a.Employee)
            .Include(a => a.CreatedByUser)
            .Include(a => a.ApprovedByUser)
            .AsQueryable();

        if (request.EmployeeId.HasValue)
            query = query.Where(a => a.EmployeeId == request.EmployeeId.Value);

        if (request.Status.HasValue)
            query = query.Where(a => a.Status == request.Status.Value);

        if (request.StartDate.HasValue)
            query = query.Where(a => a.EndDate >= request.StartDate.Value);

        if (request.EndDate.HasValue)
            query = query.Where(a => a.StartDate <= request.EndDate.Value);

        var requests = await query
            .OrderByDescending(a => a.StartDate)
            .Select(a => new RemoteWorkRequestDto
            {
                Id = a.Id,
                EmployeeId = a.EmployeeId,
                EmployeeName = a.Employee != null ? $"{a.Employee.FirstName} {a.Employee.LastName}" : null,
                StartDate = a.StartDate,
                EndDate = a.EndDate,
                Reason = a.Reason,
                CreatedByUserId = a.CreatedByUserId,
                CreatedByUserName = a.CreatedByUser != null ? a.CreatedByUser.Username : null,
                Status = a.Status,
                ApprovedByUserId = a.ApprovedByUserId,
                ApprovedByUserName = a.ApprovedByUser != null ? a.ApprovedByUser.Username : null,
                ApprovedAt = a.ApprovedAt,
                RejectionReason = a.RejectionReason,
                RemoteWorkPolicyId = a.RemoteWorkPolicyId,
                WorkingDaysCount = a.WorkingDaysCount,
                CreatedAtUtc = a.CreatedAtUtc,
                ModifiedAtUtc = a.ModifiedAtUtc
            })
            .ToListAsync(cancellationToken);

        return requests;
    }
}