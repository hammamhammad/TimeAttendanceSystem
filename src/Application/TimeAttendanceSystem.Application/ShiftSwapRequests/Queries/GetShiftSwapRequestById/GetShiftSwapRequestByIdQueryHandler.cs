using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.ShiftSwapRequests.Queries.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Queries.GetShiftSwapRequestById;

public class GetShiftSwapRequestByIdQueryHandler : BaseHandler<GetShiftSwapRequestByIdQuery, Result<ShiftSwapRequestDto>>
{
    public GetShiftSwapRequestByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<ShiftSwapRequestDto>> Handle(GetShiftSwapRequestByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.ShiftSwapRequests
            .Include(s => s.Employee)
            .Include(s => s.SwapWithEmployee)
            .Include(s => s.OriginalShift)
            .Include(s => s.SwapShift)
            .Where(s => s.Id == request.Id && !s.IsDeleted);

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(s => CurrentUser.BranchIds.Contains(s.Employee.BranchId));

        var dto = await query
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
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<ShiftSwapRequestDto>("Shift swap request not found.");

        return Result.Success(dto);
    }
}
