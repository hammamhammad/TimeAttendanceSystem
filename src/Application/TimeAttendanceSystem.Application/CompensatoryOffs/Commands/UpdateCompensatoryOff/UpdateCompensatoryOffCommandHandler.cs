using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.UpdateCompensatoryOff;

public class UpdateCompensatoryOffCommandHandler : BaseHandler<UpdateCompensatoryOffCommand, Result>
{
    public UpdateCompensatoryOffCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateCompensatoryOffCommand request, CancellationToken cancellationToken)
    {
        if (request.EarnedDate >= request.ExpiryDate)
            return Result.Failure("Earned date must be before expiry date.");

        var compensatoryOff = await Context.CompensatoryOffs
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

        if (compensatoryOff == null)
            return Result.Failure("Compensatory off not found.");

        if (compensatoryOff.Status != CompensatoryOffStatus.Available)
            return Result.Failure("Only compensatory offs with Available status can be updated.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(compensatoryOff.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        // Validate employee exists if changed
        if (request.EmployeeId != compensatoryOff.EmployeeId)
        {
            var employee = await Context.Employees
                .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

            if (employee == null)
                return Result.Failure("Employee not found.");

            if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
                return Result.Failure("Access denied to the target employee's branch.");
        }

        compensatoryOff.EmployeeId = request.EmployeeId;
        compensatoryOff.EarnedDate = request.EarnedDate;
        compensatoryOff.ExpiryDate = request.ExpiryDate;
        compensatoryOff.Reason = request.Reason;
        compensatoryOff.ReasonAr = request.ReasonAr;
        compensatoryOff.HoursWorked = request.HoursWorked;
        compensatoryOff.Notes = request.Notes;
        compensatoryOff.ModifiedAtUtc = DateTime.UtcNow;
        compensatoryOff.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
