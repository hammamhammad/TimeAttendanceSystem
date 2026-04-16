using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Lifecycle.Commands;

// --- Suspend ---
// Sets Employee.IsSuspended=true + flips the linked User.IsActive=false so login is blocked.
// Employee.IsActive stays true so the record remains visible in reports / payroll until
// final-settlement-paid fully deactivates them.
public record SuspendEmployeeCommand(long EmployeeId, string Reason, long? TriggeredByUserId) : IRequest<Result>;

public class SuspendEmployeeCommandHandler : BaseHandler<SuspendEmployeeCommand, Result>
{
    public SuspendEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(SuspendEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .Include(e => e.EmployeeUserLink)
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure("Employee not found.");

        if (employee.IsSuspended) // idempotent
            return Result.Success();

        employee.IsSuspended = true;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

        // Block login on the linked user, if any.
        if (employee.EmployeeUserLink != null)
        {
            var user = await Context.Users.FirstOrDefaultAsync(
                u => u.Id == employee.EmployeeUserLink.UserId && !u.IsDeleted, cancellationToken);
            if (user != null && user.IsActive)
            {
                user.IsActive = false;
                user.ModifiedAtUtc = DateTime.UtcNow;
                user.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            }
        }

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}

// --- Activate ---
// Pre-hire → active transition triggered by onboarding completion (opt-in). Clears
// IsPreHire, flips IsActive=true, stamps OnboardingCompletedAt if not already set.
public record ActivateEmployeeCommand(long EmployeeId, long? TriggeredByUserId) : IRequest<Result>;

public class ActivateEmployeeCommandHandler : BaseHandler<ActivateEmployeeCommand, Result>
{
    public ActivateEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ActivateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees.FirstOrDefaultAsync(
            e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure("Employee not found.");

        // Idempotent: if already active and not pre-hire, just ensure the milestone.
        var changed = false;
        if (employee.IsPreHire)
        {
            employee.IsPreHire = false;
            changed = true;
        }
        if (!employee.IsActive)
        {
            employee.IsActive = true;
            changed = true;
        }
        if (employee.OnboardingCompletedAt == null)
        {
            employee.OnboardingCompletedAt = DateTime.UtcNow;
            changed = true;
        }

        if (changed)
        {
            employee.ModifiedAtUtc = DateTime.UtcNow;
            employee.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            await Context.SaveChangesAsync(cancellationToken);
        }

        return Result.Success();
    }
}

// --- Deactivate ---
// Final offboarding step. Idempotent. Clears IsSuspended (no longer "awaiting settlement" —
// fully off-boarded) and flips IsActive=false. Safe to call when employee is already inactive.
public record DeactivateEmployeeCommand(long EmployeeId, string Reason, long? TriggeredByUserId) : IRequest<Result>;

public class DeactivateEmployeeCommandHandler : BaseHandler<DeactivateEmployeeCommand, Result>
{
    public DeactivateEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeactivateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .Include(e => e.EmployeeUserLink)
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure("Employee not found.");

        if (!employee.IsActive && !employee.IsSuspended) // already in terminal state
            return Result.Success();

        employee.IsActive = false;
        employee.IsSuspended = false; // no longer "awaiting", now fully deactivated
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

        // Belt-and-braces: ensure linked user is also inactive.
        if (employee.EmployeeUserLink != null)
        {
            var user = await Context.Users.FirstOrDefaultAsync(
                u => u.Id == employee.EmployeeUserLink.UserId && !u.IsDeleted, cancellationToken);
            if (user != null && user.IsActive)
            {
                user.IsActive = false;
                user.ModifiedAtUtc = DateTime.UtcNow;
                user.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            }
        }

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
