using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.WithdrawResignation;

public class WithdrawResignationCommandHandler : BaseHandler<WithdrawResignationCommand, Result>
{
    public WithdrawResignationCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(WithdrawResignationCommand request, CancellationToken cancellationToken)
    {
        var resignation = await Context.ResignationRequests
            .FirstOrDefaultAsync(r => r.Id == request.Id && !r.IsDeleted, cancellationToken);

        if (resignation == null)
            return Result.Failure("Resignation request not found.");

        if (resignation.Status != ResignationStatus.Pending)
            return Result.Failure("Only pending resignation requests can be withdrawn.");

        resignation.Status = ResignationStatus.Withdrawn;
        resignation.ModifiedAtUtc = DateTime.UtcNow;
        resignation.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
