using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.ApproveResignation;

public class ApproveResignationCommandHandler : BaseHandler<ApproveResignationCommand, Result>
{
    public ApproveResignationCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ApproveResignationCommand request, CancellationToken cancellationToken)
    {
        var resignation = await Context.ResignationRequests
            .Include(r => r.Employee)
            .FirstOrDefaultAsync(r => r.Id == request.Id && !r.IsDeleted, cancellationToken);

        if (resignation == null)
            return Result.Failure("Resignation request not found.");

        if (resignation.Status != ResignationStatus.Pending)
            return Result.Failure("Only pending resignation requests can be approved.");

        resignation.Status = ResignationStatus.Approved;
        resignation.ApprovedByUserId = CurrentUser.UserId;
        resignation.ApprovedAt = DateTime.UtcNow;
        resignation.Notes = string.IsNullOrEmpty(request.Comments) ? resignation.Notes : request.Comments;
        resignation.ModifiedAtUtc = DateTime.UtcNow;
        resignation.ModifiedBy = CurrentUser.Username;

        // Update employee status
        var employee = resignation.Employee;
        employee.EmploymentStatus = EmploymentStatus.Resigned;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
