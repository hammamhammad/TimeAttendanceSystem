using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EndOfServicePolicies.Commands.DeleteEndOfServicePolicy;

public record DeleteEndOfServicePolicyCommand(long Id) : ICommand<Result>;

public class DeleteEndOfServicePolicyCommandHandler : BaseHandler<DeleteEndOfServicePolicyCommand, Result>
{
    public DeleteEndOfServicePolicyCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteEndOfServicePolicyCommand request, CancellationToken cancellationToken)
    {
        var policy = await Context.EndOfServicePolicies
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);

        if (policy == null)
            return Result.Failure("End-of-service policy not found.");

        // Guard: don't allow deletion if any EndOfServiceBenefit was calculated against this policy.
        var hasReferences = await Context.EndOfServiceBenefits
            .AnyAsync(e => e.EndOfServicePolicyId == request.Id, cancellationToken);
        if (hasReferences)
            return Result.Failure("Cannot delete policy: one or more EOS benefit records reference it. Deactivate instead.");

        policy.IsDeleted = true;
        policy.IsActive = false;
        policy.ModifiedAtUtc = DateTime.UtcNow;
        policy.ModifiedBy = CurrentUser.Username ?? "system";

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
