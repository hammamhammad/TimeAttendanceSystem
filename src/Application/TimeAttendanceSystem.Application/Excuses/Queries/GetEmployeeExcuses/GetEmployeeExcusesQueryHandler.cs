using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuses;

/// <summary>
/// Query handler for retrieving employee excuse requests with filtering and pagination.
/// Implements comprehensive filtering and efficient data projection.
/// </summary>
public class GetEmployeeExcusesQueryHandler : IRequestHandler<GetEmployeeExcusesQuery, Result<PagedResult<EmployeeExcuseDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetEmployeeExcusesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the retrieval of employee excuses with applied filters and pagination.
    /// </summary>
    /// <param name="request">Query parameters including filters and pagination</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of employee excuse DTOs</returns>
    public async Task<Result<PagedResult<EmployeeExcuseDto>>> Handle(GetEmployeeExcusesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.EmployeeExcuses
            .AsNoTracking()
            .Include(ee => ee.Employee)
                .ThenInclude(e => e.Department)
            .Include(ee => ee.Employee)
                .ThenInclude(e => e.Branch)
            .Include(ee => ee.ApprovedBy)
            .AsQueryable();

        // Apply employee filter if specified
        if (request.EmployeeId.HasValue)
        {
            query = query.Where(ee => ee.EmployeeId == request.EmployeeId.Value);
        }

        // Apply date range filters
        if (request.StartDate.HasValue)
        {
            query = query.Where(ee => ee.ExcuseDate.Date >= request.StartDate.Value.Date);
        }

        if (request.EndDate.HasValue)
        {
            query = query.Where(ee => ee.ExcuseDate.Date <= request.EndDate.Value.Date);
        }

        // Apply excuse type filter if specified
        if (request.ExcuseType.HasValue)
        {
            query = query.Where(ee => ee.ExcuseType == request.ExcuseType.Value);
        }

        // Apply approval status filter if specified
        if (request.ApprovalStatus.HasValue)
        {
            query = query.Where(ee => ee.ApprovalStatus == request.ApprovalStatus.Value);
        }

        // Apply branch filter if specified
        if (request.BranchId.HasValue)
        {
            query = query.Where(ee => ee.Employee.BranchId == request.BranchId.Value);
        }

        // Order by excuse date (newest first), then by creation time
        query = query.OrderByDescending(ee => ee.ExcuseDate)
                    .ThenByDescending(ee => ee.CreatedAtUtc);

        // Project to DTO
        var dtoQuery = query.Select(ee => new EmployeeExcuseDto
        {
            Id = ee.Id,
            EmployeeId = ee.EmployeeId,
            EmployeeName = $"{ee.Employee.FirstName} {ee.Employee.LastName}",
            EmployeeNumber = ee.Employee.EmployeeNumber,
            DepartmentName = ee.Employee.Department != null ? ee.Employee.Department.Name : "",
            BranchName = ee.Employee.Branch != null ? ee.Employee.Branch.Name : "",
            ExcuseDate = ee.ExcuseDate,
            ExcuseType = ee.ExcuseType,
            ExcuseTypeDisplay = ee.ExcuseType == ExcuseType.PersonalExcuse ? "Personal Excuse" : "Official Duty",
            StartTime = ee.StartTime,
            EndTime = ee.EndTime,
            TimeRange = $"{ee.StartTime:HH:mm} - {ee.EndTime:HH:mm}",
            DurationHours = ee.DurationHours,
            Reason = ee.Reason,
            ApprovalStatus = ee.ApprovalStatus,
            ApprovalStatusDisplay = ee.ApprovalStatus.ToString(),
            ApprovedById = ee.ApprovedById,
            ApprovedByName = ee.ApprovedBy != null ? ee.ApprovedBy.Username : null,
            ApprovedAt = ee.ApprovedAt,
            RejectionReason = ee.RejectionReason,
            AttachmentPath = ee.AttachmentPath,
            AffectsSalary = ee.AffectsSalary,
            ProcessingNotes = ee.ProcessingNotes,
            CreatedAtUtc = ee.CreatedAtUtc,
            CreatedBy = ee.CreatedBy,
            ModifiedAtUtc = ee.ModifiedAtUtc,
            ModifiedBy = ee.ModifiedBy,
            CanBeModified = ee.ApprovalStatus != ApprovalStatus.Approved && ee.ExcuseDate.Date >= DateTime.Today,
            ExcuseSummary = $"{ee.ExcuseDate:MMM dd, yyyy} {ee.StartTime:HH:mm} - {ee.EndTime:HH:mm} ({ee.DurationHours:F1}h) - {(ee.ExcuseType == ExcuseType.PersonalExcuse ? "Personal" : "Official Duty")} - {ee.ApprovalStatus}"
        });

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination
        var excuses = await dtoQuery
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var result = new PagedResult<EmployeeExcuseDto>(
            excuses,
            totalCount,
            request.PageNumber,
            request.PageSize
        );

        return Result.Success(result);
    }
}