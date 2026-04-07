using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Resignations.Queries.Common;

namespace TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequestById;

public class GetResignationRequestByIdQueryHandler : BaseHandler<GetResignationRequestByIdQuery, Result<ResignationRequestDto>>
{
    public GetResignationRequestByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<ResignationRequestDto>> Handle(GetResignationRequestByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.ResignationRequests
            .Include(r => r.Employee).ThenInclude(e => e.Branch)
            .Include(r => r.Employee).ThenInclude(e => e.Department)
            .Where(r => r.Id == request.Id && !r.IsDeleted);

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(r => CurrentUser.BranchIds.Contains(r.Employee.BranchId));

        var dto = await query
            .Select(r => new ResignationRequestDto
            {
                Id = r.Id,
                EmployeeId = r.EmployeeId,
                EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                EmployeeNameAr = r.Employee.FirstNameAr != null && r.Employee.LastNameAr != null
                    ? r.Employee.FirstNameAr + " " + r.Employee.LastNameAr : null,
                EmployeeNumber = r.Employee.EmployeeNumber,
                BranchName = r.Employee.Branch.Name,
                DepartmentName = r.Employee.Department != null ? r.Employee.Department.Name : null,
                ResignationDate = r.ResignationDate,
                LastWorkingDate = r.LastWorkingDate,
                NoticePeriodDays = r.NoticePeriodDays,
                WaivedNoticeDays = r.WaivedNoticeDays,
                Reason = r.Reason,
                ReasonAr = r.ReasonAr,
                Status = r.Status,
                RejectionReason = r.RejectionReason,
                ApprovedByUserId = r.ApprovedByUserId,
                ApprovedAt = r.ApprovedAt,
                Notes = r.Notes,
                SubmittedByUserId = r.SubmittedByUserId,
                CreatedAtUtc = r.CreatedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<ResignationRequestDto>("Resignation request not found.");

        return Result.Success(dto);
    }
}
