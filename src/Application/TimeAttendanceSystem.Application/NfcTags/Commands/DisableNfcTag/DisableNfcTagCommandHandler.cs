using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Application.NfcTags.Commands.DisableNfcTag;

/// <summary>
/// Handler for temporarily disabling an NFC tag.
/// </summary>
public class DisableNfcTagCommandHandler : BaseHandler<DisableNfcTagCommand, Result>
{
    public DisableNfcTagCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(DisableNfcTagCommand request, CancellationToken cancellationToken)
    {
        var tag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (tag == null)
        {
            return Result.Failure("NFC tag not found");
        }

        if (tag.Status == NfcTagStatus.Disabled)
        {
            return Result.Failure("NFC tag is already disabled");
        }

        if (tag.Status == NfcTagStatus.Lost)
        {
            return Result.Failure("Cannot disable a lost NFC tag");
        }

        tag.Status = NfcTagStatus.Disabled;
        tag.IsActive = false;
        tag.ModifiedAtUtc = DateTime.UtcNow;
        tag.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
