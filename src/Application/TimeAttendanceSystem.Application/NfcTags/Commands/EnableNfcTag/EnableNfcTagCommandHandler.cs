using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.EnableNfcTag;

/// <summary>
/// Handler for re-enabling a disabled NFC tag.
/// </summary>
public class EnableNfcTagCommandHandler : BaseHandler<EnableNfcTagCommand, Result>
{
    public EnableNfcTagCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(EnableNfcTagCommand request, CancellationToken cancellationToken)
    {
        var tag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (tag == null)
        {
            return Result.Failure("NFC tag not found");
        }

        if (tag.Status != NfcTagStatus.Disabled)
        {
            return Result.Failure("Only disabled tags can be re-enabled");
        }

        tag.Status = NfcTagStatus.Active;
        tag.IsActive = true;
        tag.ModifiedAtUtc = DateTime.UtcNow;
        tag.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
