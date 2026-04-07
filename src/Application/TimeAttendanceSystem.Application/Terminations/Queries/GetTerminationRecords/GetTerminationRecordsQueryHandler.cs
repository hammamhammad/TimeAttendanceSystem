using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Terminations.Queries.Common;

namespace TecAxle.Hrms.Application.Terminations.Queries.GetTerminationRecords;

public class GetTerminationRecordsQueryHandler : BaseHandler<GetTerminationRecordsQuery, Result<object>>
{
    public GetTerminationRecordsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetTerminationRecordsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.TerminationRecords
            .Include(t => t.Employee).ThenInclude(e => e.Branch)
            .Include(t => t.Employee).ThenInclude(e => e.Department)
            .Where(t => !t.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(t => CurrentUser.BranchIds.Contains(t.Employee.BranchId));

        if (request.BranchId.HasValue)
            query = query.Where(t => t.Employee.BranchId == request.BranchId.Value);

        if (request.TerminationType.HasValue)
            query = query.Where(t => t.TerminationType == request.TerminationType.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(t => t.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(t => new TerminationRecordDto
            {
                Id = t.Id,
                EmployeeId = t.EmployeeId,
                EmployeeName = t.Employee.FirstName + " " + t.Employee.LastName,
                EmployeeNameAr = t.Employee.FirstNameAr != null && t.Employee.LastNameAr != null
                    ? t.Employee.FirstNameAr + " " + t.Employee.LastNameAr : null,
                EmployeeNumber = t.Employee.EmployeeNumber,
                BranchName = t.Employee.Branch.Name,
                DepartmentName = t.Employee.Department != null ? t.Employee.Department.Name : null,
                TerminationType = t.TerminationType,
                TerminationDate = t.TerminationDate,
                LastWorkingDate = t.LastWorkingDate,
                Reason = t.Reason,
                ReasonAr = t.ReasonAr,
                ResignationRequestId = t.ResignationRequestId,
                ProcessedByUserId = t.ProcessedByUserId,
                Notes = t.Notes,
                CreatedAtUtc = t.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        return Result.Success<object>(new
        {
            items,
            totalCount,
            page = request.Page,
            pageSize = request.PageSize
        });
    }
}
