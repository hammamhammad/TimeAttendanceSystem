using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.ApproveResignation;

public class ApproveResignationCommandHandler : BaseHandler<ApproveResignationCommand, Result>
{
    private readonly ILifecycleEventPublisher _lifecyclePublisher;

    public ApproveResignationCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILifecycleEventPublisher lifecyclePublisher)
        : base(context, currentUser)
    {
        _lifecyclePublisher = lifecyclePublisher;
    }

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

        // v13.5 lifecycle automation: fire event AFTER persist. Handler may create a
        // TerminationRecord depending on tenant settings. Exceptions in the handler are
        // swallowed — they cannot affect the approval itself.
        await _lifecyclePublisher.PublishAsync(
            new ResignationApprovedEvent(resignation.Id, resignation.EmployeeId, CurrentUser.UserId),
            cancellationToken);

        return Result.Success();
    }
}
