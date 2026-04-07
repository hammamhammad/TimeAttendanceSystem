using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.RejectResignation;

public class RejectResignationCommandHandler : BaseHandler<RejectResignationCommand, Result>
{
    public RejectResignationCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(RejectResignationCommand request, CancellationToken cancellationToken)
    {
        var resignation = await Context.ResignationRequests
            .FirstOrDefaultAsync(r => r.Id == request.Id && !r.IsDeleted, cancellationToken);

        if (resignation == null)
            return Result.Failure("Resignation request not found.");

        if (resignation.Status != ResignationStatus.Pending)
            return Result.Failure("Only pending resignation requests can be rejected.");

        resignation.Status = ResignationStatus.Rejected;
        resignation.RejectionReason = request.RejectionReason;
        resignation.ModifiedAtUtc = DateTime.UtcNow;
        resignation.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
