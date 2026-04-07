using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CompleteEmployeeTransfer;

public class CompleteEmployeeTransferCommandHandler : BaseHandler<CompleteEmployeeTransferCommand, Result>
{
    public CompleteEmployeeTransferCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(CompleteEmployeeTransferCommand request, CancellationToken cancellationToken)
    {
        var transfer = await Context.EmployeeTransfers
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (transfer == null)
            return Result.Failure("Transfer not found.");

        if (transfer.Status != TransferStatus.Approved)
            return Result.Failure("Only approved transfers can be completed.");

        // Update the employee entity with new branch, department, and job title
        var employee = transfer.Employee;
        employee.BranchId = transfer.ToBranchId;
        employee.DepartmentId = transfer.ToDepartmentId;

        if (!string.IsNullOrEmpty(transfer.ToJobTitle))
            employee.JobTitle = transfer.ToJobTitle;

        if (transfer.ToJobTitleAr != null)
            employee.JobTitleAr = transfer.ToJobTitleAr;

        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        // Mark transfer as completed
        transfer.Status = TransferStatus.Completed;
        transfer.CompletedAt = DateTime.UtcNow;
        transfer.ModifiedAtUtc = DateTime.UtcNow;
        transfer.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
