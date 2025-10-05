using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById;

/// <summary>
/// Handler for getting a remote work request by ID.
/// </summary>
public class GetRemoteWorkRequestByIdQueryHandler : IRequestHandler<GetRemoteWorkRequestByIdQuery, Result<RemoteWorkRequestDto>>
{
    private readonly IApplicationDbContext _context;

    public GetRemoteWorkRequestByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<RemoteWorkRequestDto>> Handle(GetRemoteWorkRequestByIdQuery request, CancellationToken cancellationToken)
    {
        var remoteWorkRequest = await _context.RemoteWorkRequests
            .Include(a => a.Employee)
            .Include(a => a.CreatedByUser)
            .Include(a => a.ApprovedByUser)
            .Where(a => a.Id == request.Id)
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
            .FirstOrDefaultAsync(cancellationToken);

        if (remoteWorkRequest == null)
            throw new NotFoundException("Remote work request not found");

        return Result<RemoteWorkRequestDto>.Success(remoteWorkRequest);
    }
}
