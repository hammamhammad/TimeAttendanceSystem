using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Queries;

/// <summary>
/// Query to get a specific fingerprint request by ID
/// </summary>
public record GetFingerprintRequestByIdQuery : IRequest<Result<FingerprintRequestDto>>
{
    /// <summary>
    /// Request ID
    /// </summary>
    public long Id { get; set; }
}

/// <summary>
/// Handler for GetFingerprintRequestByIdQuery
/// </summary>
public class GetFingerprintRequestByIdQueryHandler
    : BaseHandler<GetFingerprintRequestByIdQuery, Result<FingerprintRequestDto>>
{
    public GetFingerprintRequestByIdQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<FingerprintRequestDto>> Handle(
        GetFingerprintRequestByIdQuery request,
        CancellationToken cancellationToken)
    {
        var fingerprintRequest = await Context.FingerprintRequests
            .Include(fr => fr.Employee)
                .ThenInclude(e => e.Department)
            .Include(fr => fr.Technician)
            .Where(fr => fr.Id == request.Id && !fr.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (fingerprintRequest == null)
            return Result.Failure<FingerprintRequestDto>("Fingerprint request not found");

        // Check if user has permission to view this request
        if (!CurrentUser.IsSystemAdmin)
        {
            var employeeLink = await Context.EmployeeUserLinks
                .FirstOrDefaultAsync(eul => eul.UserId == CurrentUser.UserId, cancellationToken);

            if (employeeLink == null || fingerprintRequest.EmployeeId != employeeLink.EmployeeId)
                return Result.Failure<FingerprintRequestDto>("You do not have permission to view this request");
        }

        var dto = new FingerprintRequestDto
        {
            Id = fingerprintRequest.Id,
            EmployeeId = fingerprintRequest.EmployeeId,
            EmployeeName = fingerprintRequest.Employee != null
                ? $"{fingerprintRequest.Employee.FirstName} {fingerprintRequest.Employee.LastName}"
                : "",
            EmployeeNumber = fingerprintRequest.Employee?.EmployeeNumber ?? "",
            DepartmentName = fingerprintRequest.Employee?.Department?.Name,
            RequestType = fingerprintRequest.RequestType.ToString(),
            IssueDescription = fingerprintRequest.IssueDescription,
            AffectedFingers = fingerprintRequest.AffectedFingers,
            PreferredDate = fingerprintRequest.PreferredDate,
            PreferredTime = fingerprintRequest.PreferredTime,
            ScheduledDate = fingerprintRequest.ScheduledDate,
            ScheduledTime = fingerprintRequest.ScheduledTime,
            CompletedDate = fingerprintRequest.CompletedDate,
            Status = fingerprintRequest.Status.ToString(),
            TechnicianId = fingerprintRequest.TechnicianId,
            TechnicianName = fingerprintRequest.Technician?.Username,
            TechnicianNotes = fingerprintRequest.TechnicianNotes,
            CreatedAtUtc = fingerprintRequest.CreatedAtUtc,
            ModifiedAtUtc = fingerprintRequest.ModifiedAtUtc
        };

        return Result.Success(dto);
    }
}
