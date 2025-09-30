using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuseById;

public class GetEmployeeExcuseByIdQueryHandler : IRequestHandler<GetEmployeeExcuseByIdQuery, Result<EmployeeExcuseDetailDto>>
{
    private readonly IApplicationDbContext _context;

    public GetEmployeeExcuseByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<EmployeeExcuseDetailDto>> Handle(GetEmployeeExcuseByIdQuery request, CancellationToken cancellationToken)
    {
        var excuse = await _context.EmployeeExcuses
            .Include(e => e.Employee)
                .ThenInclude(emp => emp!.Department)
            .Include(e => e.Employee)
                .ThenInclude(emp => emp!.Branch)
            .Where(e => e.Id == request.Id && !e.IsDeleted)
            .Select(e => new EmployeeExcuseDetailDto
            {
                Id = e.Id,
                EmployeeId = e.EmployeeId,
                EmployeeName = e.Employee!.FirstName + " " + e.Employee.LastName,
                EmployeeNumber = e.Employee.EmployeeNumber ?? string.Empty,
                DepartmentName = e.Employee.Department != null ? e.Employee.Department.Name : string.Empty,
                BranchName = e.Employee.Branch != null ? e.Employee.Branch.Name : string.Empty,
                ExcuseDate = e.ExcuseDate,
                ExcuseType = e.ExcuseType,
                ExcuseTypeDisplay = e.ExcuseType == ExcuseType.PersonalExcuse ? "Personal Excuse" : "Official Duty",
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                DurationHours = (double)e.DurationHours,
                Reason = e.Reason,
                ApprovalStatus = e.ApprovalStatus,
                ApprovalStatusDisplay = e.ApprovalStatus.ToString(),
                AttachmentUrl = e.AttachmentPath,
                ReviewerComments = e.ProcessingNotes,
                ReviewedByUserId = e.ApprovedById,
                ReviewerName = e.ApprovedById.HasValue ? "HR Staff" : null,
                ReviewedAtUtc = e.ApprovedAt,
                CreatedAtUtc = e.CreatedAtUtc,
                UpdatedAtUtc = e.ModifiedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (excuse == null)
        {
            return Result.Failure<EmployeeExcuseDetailDto>("Employee excuse not found");
        }

        return Result.Success(excuse);
    }
}