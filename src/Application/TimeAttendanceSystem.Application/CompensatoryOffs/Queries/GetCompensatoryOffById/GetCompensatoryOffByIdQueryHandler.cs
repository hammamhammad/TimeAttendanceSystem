using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompensatoryOffs.Queries.Common;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetCompensatoryOffById;

public class GetCompensatoryOffByIdQueryHandler : BaseHandler<GetCompensatoryOffByIdQuery, Result<CompensatoryOffDto>>
{
    public GetCompensatoryOffByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<CompensatoryOffDto>> Handle(GetCompensatoryOffByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.CompensatoryOffs
            .Include(c => c.Employee).ThenInclude(e => e.Branch)
            .Include(c => c.Employee).ThenInclude(e => e.Department)
            .Where(c => c.Id == request.Id && !c.IsDeleted);

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(c => CurrentUser.BranchIds.Contains(c.Employee.BranchId));

        var dto = await query
            .Select(c => new CompensatoryOffDto
            {
                Id = c.Id,
                EmployeeId = c.EmployeeId,
                EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                EmployeeNameAr = c.Employee.FirstNameAr != null && c.Employee.LastNameAr != null
                    ? c.Employee.FirstNameAr + " " + c.Employee.LastNameAr : null,
                EmployeeNumber = c.Employee.EmployeeNumber,
                BranchName = c.Employee.Branch.Name,
                DepartmentName = c.Employee.Department != null ? c.Employee.Department.Name : null,
                EarnedDate = c.EarnedDate,
                ExpiryDate = c.ExpiryDate,
                Reason = c.Reason,
                ReasonAr = c.ReasonAr,
                Status = c.Status,
                StatusName = c.Status.ToString(),
                UsedVacationId = c.UsedVacationId,
                HoursWorked = c.HoursWorked,
                ApprovedByUserId = c.ApprovedByUserId,
                Notes = c.Notes,
                CreatedAtUtc = c.CreatedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<CompensatoryOffDto>("Compensatory off not found.");

        return Result.Success(dto);
    }
}
