using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.ShiftSwapRequests.Queries.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Queries.GetShiftSwapRequests;

public class GetShiftSwapRequestsQueryHandler : BaseHandler<GetShiftSwapRequestsQuery, Result<object>>
{
    public GetShiftSwapRequestsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetShiftSwapRequestsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.ShiftSwapRequests
            .Include(s => s.Employee)
            .Include(s => s.SwapWithEmployee)
            .Include(s => s.OriginalShift)
            .Include(s => s.SwapShift)
            .Where(s => !s.IsDeleted)
            .AsQueryable();

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(s => CurrentUser.BranchIds.Contains(s.Employee.BranchId));

        if (request.BranchId.HasValue)
            query = query.Where(s => s.Employee.BranchId == request.BranchId.Value);

        if (request.DepartmentId.HasValue)
            query = query.Where(s => s.Employee.DepartmentId == request.DepartmentId.Value);

        if (request.EmployeeId.HasValue)
            query = query.Where(s => s.EmployeeId == request.EmployeeId.Value || s.SwapWithEmployeeId == request.EmployeeId.Value);

        if (request.Status.HasValue)
            query = query.Where(s => s.Status == request.Status.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(s => s.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(s => new ShiftSwapRequestDto
            {
                Id = s.Id,
                EmployeeId = s.EmployeeId,
                EmployeeName = s.Employee.FirstName + " " + s.Employee.LastName,
                EmployeeNameAr = s.Employee.FirstNameAr != null && s.Employee.LastNameAr != null
                    ? s.Employee.FirstNameAr + " " + s.Employee.LastNameAr : null,
                SwapWithEmployeeId = s.SwapWithEmployeeId,
                SwapWithEmployeeName = s.SwapWithEmployee.FirstName + " " + s.SwapWithEmployee.LastName,
                SwapWithEmployeeNameAr = s.SwapWithEmployee.FirstNameAr != null && s.SwapWithEmployee.LastNameAr != null
                    ? s.SwapWithEmployee.FirstNameAr + " " + s.SwapWithEmployee.LastNameAr : null,
                OriginalDate = s.OriginalDate,
                SwapDate = s.SwapDate,
                OriginalShiftId = s.OriginalShiftId,
                OriginalShiftName = s.OriginalShift != null ? s.OriginalShift.Name : null,
                SwapShiftId = s.SwapShiftId,
                SwapShiftName = s.SwapShift != null ? s.SwapShift.Name : null,
                Reason = s.Reason,
                ReasonAr = s.ReasonAr,
                Status = s.Status,
                StatusName = s.Status.ToString(),
                RejectionReason = s.RejectionReason,
                WorkflowInstanceId = s.WorkflowInstanceId,
                CreatedAtUtc = s.CreatedAtUtc
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
