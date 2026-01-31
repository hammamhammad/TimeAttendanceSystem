using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.LockNfcTag;

/// <summary>
/// Handler for applying permanent write-protection to an NFC tag.
/// Records the user and timestamp of the lock operation.
/// </summary>
public class LockNfcTagCommandHandler : BaseHandler<LockNfcTagCommand, Result>
{
    public LockNfcTagCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(LockNfcTagCommand request, CancellationToken cancellationToken)
    {
        var nfcTag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (nfcTag == null)
        {
            return Result.Failure("NFC tag not found");
        }

        if (nfcTag.IsWriteProtected)
        {
            return Result.Failure("NFC tag is already write-protected");
        }

        nfcTag.IsWriteProtected = true;
        nfcTag.LockedAt = DateTime.UtcNow;
        nfcTag.LockedByUserId = CurrentUser.UserId;
        nfcTag.ModifiedAtUtc = DateTime.UtcNow;
        nfcTag.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
