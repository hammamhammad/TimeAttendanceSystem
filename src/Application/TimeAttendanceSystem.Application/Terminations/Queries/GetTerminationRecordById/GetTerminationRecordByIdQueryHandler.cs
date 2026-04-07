using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Terminations.Queries.Common;

namespace TecAxle.Hrms.Application.Terminations.Queries.GetTerminationRecordById;

public class GetTerminationRecordByIdQueryHandler : BaseHandler<GetTerminationRecordByIdQuery, Result<TerminationRecordDto>>
{
    public GetTerminationRecordByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<TerminationRecordDto>> Handle(GetTerminationRecordByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.TerminationRecords
            .Include(t => t.Employee).ThenInclude(e => e.Branch)
            .Include(t => t.Employee).ThenInclude(e => e.Department)
            .Where(t => t.Id == request.Id && !t.IsDeleted);

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(t => CurrentUser.BranchIds.Contains(t.Employee.BranchId));

        var dto = await query
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
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<TerminationRecordDto>("Termination record not found.");

        return Result.Success(dto);
    }
}
