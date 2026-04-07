using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.CreateCompensatoryOff;

public class CreateCompensatoryOffCommandHandler : BaseHandler<CreateCompensatoryOffCommand, Result<long>>
{
    public CreateCompensatoryOffCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateCompensatoryOffCommand request, CancellationToken cancellationToken)
    {
        if (request.EarnedDate >= request.ExpiryDate)
            return Result.Failure<long>("Earned date must be before expiry date.");

        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        var compensatoryOff = new CompensatoryOff
        {
            EmployeeId = request.EmployeeId,
            EarnedDate = request.EarnedDate,
            ExpiryDate = request.ExpiryDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Status = CompensatoryOffStatus.Available,
            HoursWorked = request.HoursWorked,
            ApprovedByUserId = CurrentUser.UserId,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.CompensatoryOffs.Add(compensatoryOff);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(compensatoryOff.Id);
    }
}
