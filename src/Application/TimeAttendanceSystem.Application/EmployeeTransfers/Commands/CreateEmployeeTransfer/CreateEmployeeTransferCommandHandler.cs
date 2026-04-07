using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CreateEmployeeTransfer;

public class CreateEmployeeTransferCommandHandler : BaseHandler<CreateEmployeeTransferCommand, Result<long>>
{
    public CreateEmployeeTransferCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateEmployeeTransferCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        var toBranch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.ToBranchId && !b.IsDeleted, cancellationToken);

        if (toBranch == null)
            return Result.Failure<long>("Target branch not found.");

        if (request.ToDepartmentId.HasValue)
        {
            var toDept = await Context.Departments
                .FirstOrDefaultAsync(d => d.Id == request.ToDepartmentId.Value && !d.IsDeleted, cancellationToken);

            if (toDept == null)
                return Result.Failure<long>("Target department not found.");
        }

        if (request.EffectiveDate.Date < DateTime.Today)
            return Result.Failure<long>("Effective date cannot be in the past.");

        // Check for existing pending transfer
        var hasPending = await Context.EmployeeTransfers
            .AnyAsync(t => t.EmployeeId == request.EmployeeId
                        && t.Status == Domain.Common.TransferStatus.Pending
                        && !t.IsDeleted, cancellationToken);

        if (hasPending)
            return Result.Failure<long>("Employee already has a pending transfer request.");

        var transfer = new EmployeeTransfer
        {
            EmployeeId = request.EmployeeId,
            FromBranchId = employee.BranchId,
            ToBranchId = request.ToBranchId,
            FromDepartmentId = employee.DepartmentId,
            ToDepartmentId = request.ToDepartmentId,
            FromJobTitle = employee.JobTitle,
            ToJobTitle = request.ToJobTitle,
            FromJobTitleAr = employee.JobTitleAr,
            ToJobTitleAr = request.ToJobTitleAr,
            RequestDate = DateTime.UtcNow,
            EffectiveDate = request.EffectiveDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Notes = request.Notes,
            Status = Domain.Common.TransferStatus.Pending,
            SubmittedByUserId = CurrentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.EmployeeTransfers.Add(transfer);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(transfer.Id);
    }
}
