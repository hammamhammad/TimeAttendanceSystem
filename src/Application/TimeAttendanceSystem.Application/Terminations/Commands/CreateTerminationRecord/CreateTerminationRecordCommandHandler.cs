using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.Terminations.Commands.CreateTerminationRecord;

public class CreateTerminationRecordCommandHandler : BaseHandler<CreateTerminationRecordCommand, Result<long>>
{
    private readonly ILifecycleEventPublisher _lifecyclePublisher;

    public CreateTerminationRecordCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILifecycleEventPublisher lifecyclePublisher)
        : base(context, currentUser)
    {
        _lifecyclePublisher = lifecyclePublisher;
    }

    public override async Task<Result<long>> Handle(CreateTerminationRecordCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        // v13.5: Do NOT directly flip IsActive=false here. The termination-created
        // lifecycle handler will run SuspendEmployeeCommand (gated by
        // AutoSuspendEmployeeOnTerminationCreated, default true) which sets IsSuspended=true
        // and blocks login. Full deactivation (IsActive=false) happens at final-settlement-paid.
        employee.EmploymentStatus = EmploymentStatus.Terminated;
        employee.TerminationDate = request.TerminationDate;
        employee.LastWorkingDate = request.LastWorkingDate;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        var termination = new TerminationRecord
        {
            EmployeeId = request.EmployeeId,
            TerminationType = request.TerminationType,
            TerminationDate = request.TerminationDate,
            LastWorkingDate = request.LastWorkingDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            ResignationRequestId = request.ResignationRequestId,
            ProcessedByUserId = CurrentUser.UserId,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.TerminationRecords.Add(termination);
        await Context.SaveChangesAsync(cancellationToken);

        // v13.5: Clearance auto-creation is now driven by a lifecycle handler (reading
        // TenantSettings.AutoCreateClearanceOnTermination; default true → same as v13.x).
        // The handler also runs SuspendEmployeeCommand based on
        // AutoSuspendEmployeeOnTerminationCreated.
        await _lifecyclePublisher.PublishAsync(
            new TerminationCreatedEvent(termination.Id, request.EmployeeId, CurrentUser.UserId),
            cancellationToken);

        return Result.Success(termination.Id);
    }
}
